"""
ML Bridge — called by the Node.js backend.
Reads hex-grid candidates from stdin (JSON), aggregates real training data
within 500m of each hex, builds a fresh spatial feature vector, and runs
the category-specific XGBoost model to get genuinely varied scores.

Usage (from Node):
  echo '<json>' | python ml_bridge.py
"""
import sys, json, joblib, warnings
import numpy as np
import pandas as pd
from pathlib import Path

warnings.filterwarnings('ignore')

if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

project_root = Path(__file__).parent.parent

# ── Category model map ──────────────────────────────────────────────────────
MODEL_MAP = {
    'retail':      'retail_general',
    'clothing':    'retail_fashion',
    'cafe':        'food',
    'pharmacy':    'services',
    'logistics':    'retail_general',
    'electronics': 'retail_electronics',
}

AVG_TICKET = {
    'retail': 800, 'clothing': 1500, 'cafe': 350,
    'pharmacy': 400, 'logistics': 5000, 'electronics': 8000,
}

# ── Revenue multiplier by success probability band ──────────────────────────
# Gives meaningful variation: 60% acc → lower rev, 95% → higher rev
def estimate_revenue(success_prob, footfall_density, income, category_key):
    ticket       = AVG_TICKET.get(category_key, 800)
    daily_visits = max(5, footfall_density * 50)          # footfall_density 0-1 → 5-50 visits
    conversion   = 0.05 + success_prob * 0.12             # 5% to 17% conversion
    monthly_rev  = int(daily_visits * 30 * conversion * ticket)
    # Scale by income tier (0.5x for low, 1.0x for mid, 1.5x for high)
    income_mul   = min(1.8, max(0.4, income / 40000))
    return int(monthly_rev * income_mul)

# ── Key factors — dynamically chosen from spatial features ──────────────────
def derive_key_factors(stats, category_key, budget):
    factors = []
    footfall     = stats.get('footfall_generator_count', 0)
    transit      = stats.get('transit_stop_count', 0)
    competitor   = stats.get('competitor_count', 0)
    income       = stats.get('avg_monthly_income', 30000)
    rent         = stats.get('commercial_rent_per_sqft', 30)
    road_density = stats.get('road_density_km', 1)

    if footfall > 4:
        factors.append('Near Footfall Generators')
    if transit > 5:
        factors.append('Dense Transit Access')
    elif transit > 2:
        factors.append('Good Transit Access')
    if competitor < 4:
        factors.append('Market Opportunity')
    elif competitor > 15:
        factors.append('High Competition Zone')
    if income > 50000:
        factors.append('Affluent Catchment')
    elif income > 30000:
        factors.append('Middle-Income Market')
    if rent * 300 < budget * 0.3:
        factors.append('Affordable Rent')
    if road_density > 3:
        factors.append('High Road Connectivity')
    if category_key == 'cafe' and footfall > 3:
        factors.append('Strong Lunch/Dinner Crowd')
    if category_key in ('electronics', 'clothing') and income > 45000:
        factors.append('High-Value Customers')

    return factors[:3] if factors else ['Steady Growth Potential']


def haversine_km(lat1, lon1, lat2_arr, lon2_arr):
    """Vectorised haversine: returns distance in km from (lat1,lon1) to each row."""
    R    = 6371.0
    dlat = np.radians(lat2_arr - lat1)
    dlon = np.radians(lon2_arr - lon1)
    a    = np.sin(dlat / 2) ** 2 + np.cos(np.radians(lat1)) * np.cos(np.radians(lat2_arr)) * np.sin(dlon / 2) ** 2
    return R * 2 * np.arcsin(np.sqrt(a))


def load_training_data():
    path = project_root / 'data' / 'processed' / 'training_data.csv'
    return pd.read_csv(path)


def get_model(category_key):
    cat       = MODEL_MAP.get(category_key, 'retail_general')
    model_dir = project_root / 'models' / 'category_specific'

    for d in [model_dir / 'improved', model_dir]:
        mp = d / f'{cat}_model.pkl'
        fp = d / f'{cat}_features.pkl'
        if mp.exists() and fp.exists():
            feats = joblib.load(fp)
            # Reject old one-hot encoded models (locality_SomeName)
            if any(f.startswith('locality_') and f != 'locality_dist_m' for f in feats):
                continue
            return joblib.load(mp), feats, cat

    raise FileNotFoundError(f'No clean model found for category: {cat}')


def spatial_aggregate(df, clat, clng, radius_km=0.8):
    """
    For a hex centre (clat, clng), aggregate all training rows within
    radius_km. Returns a dict of mean numeric features for that location.
    Falls back to nearest-1 row if nothing found within radius.
    """
    dist     = haversine_km(clat, clng, df['latitude'].values, df['longitude'].values)
    mask     = dist <= radius_km
    nearby   = df[mask]

    if len(nearby) == 0:
        # Expand to nearest record
        nearby = df.iloc[[int(np.argmin(dist))]]

    # Aggregate: mean of numeric cols, mode for strings
    num_cols = nearby.select_dtypes(include=[np.number]).columns.tolist()
    agg      = nearby[num_cols].mean().to_dict()

    # Keep string fields from record closest to hex centre
    nearest_local = nearby.iloc[int(np.argmin(dist[mask])) if mask.sum() > 0 else 0]
    for col in ['ward_name', 'locality', 'rental_zone']:
        if col in nearest_local:
            agg[col] = nearest_local[col]

    # Real competitor count = how many stores of any type are nearby
    agg['competitor_count']  = float(len(nearby))
    agg['dist_km_to_centre'] = float(dist[mask].min() if mask.sum() > 0 else dist.min())

    return agg


def run(payload):
    candidates   = payload['candidates']   # [{id, lat, lng}]
    category_key = payload['type']
    budget       = float(payload.get('budget', 100000))
    store_sqft   = 300
    rent_col     = 'commercial_rent_per_sqft'

    df              = load_training_data()
    model, features, cat = get_model(category_key)

    train_lat = df['latitude'].values
    train_lon = df['longitude'].values

    results = []
    seen_wards = {}   # de-duplicate ward-level results to ensure variety

    for cand in candidates:
        clat = cand['lat']
        clng = cand['lng']

        # ── Spatial aggregation ─────────────────────────────────────────────
        stats = spatial_aggregate(df, clat, clng, radius_km=0.8)

        # ── Budget filter ───────────────────────────────────────────────────
        rent_sqft = float(stats.get(rent_col, 30))
        est_rent  = rent_sqft * store_sqft
        if est_rent > budget:
            continue

        # ── Build feature vector ────────────────────────────────────────────
        row_dict = {f: float(stats.get(f, 0.0)) for f in features}

        # Override coordinates to hex centre for distance features
        row_dict['latitude']  = clat
        row_dict['longitude'] = clng
        row_dict['center_lat'] = clat
        row_dict['center_lon'] = clng

        # Recompute a few key engineered features from aggregated data
        transit_cnt   = max(0.01, row_dict.get('transit_stop_count', 1))
        transit_dist  = max(1,    row_dict.get('nearest_transit_m', 500))
        footfall_cnt  = max(0.01, row_dict.get('footfall_generator_count', 1))
        footfall_dist = max(1,    row_dict.get('nearest_generator_m', 500))
        income        = max(1,    row_dict.get('avg_monthly_income', 30000))
        rent_val      = max(0.01, rent_sqft)

        row_dict['transit_accessibility_score']  = transit_cnt  / (transit_dist  / 1000 + 1)
        row_dict['footfall_accessibility_score'] = footfall_cnt / (footfall_dist / 1000 + 1)
        row_dict['rent_to_income_ratio']         = rent_val / (income + 1)
        row_dict['competition_density']          = row_dict.get('competitor_count', 5) / (row_dict.get('total_population', 10000) / 1000 + 1)
        row_dict['market_saturation']            = row_dict.get('competitor_count', 5) / (footfall_cnt + 1)
        row_dict['connectivity_score']           = row_dict.get('road_density_km', 1) * row_dict['transit_accessibility_score']

        X = pd.DataFrame([row_dict])[features].astype(float)

        # ── ML Prediction ────────────────────────────────────────────────────
        proba         = float(model.predict_proba(X)[0][1])
        success_score = round(proba * 100)

        # ── Revenue ──────────────────────────────────────────────────────────
        footfall_density = min(1.0, row_dict['footfall_accessibility_score'] / 5.0)
        monthly_rev      = estimate_revenue(proba, footfall_density, income, category_key)

        # ── Sub-scores ───────────────────────────────────────────────────────
        demand_score   = round(min(1.0, row_dict['footfall_accessibility_score'] / 3.0), 3)
        coverage_score = round(min(1.0, row_dict['transit_accessibility_score']  / 3.0), 3)
        cost_score     = round(max(0.0, 1 - (est_rent / budget)), 3)
        population     = int(stats.get('total_population', 12000))
        competitor_cnt = int(stats.get('competitor_count', 5))
        footfall_daily = max(1, int(footfall_cnt * 20))
        competition_lbl = 'High' if competitor_cnt > 15 else ('Moderate' if competitor_cnt > 6 else 'Low')

        ward     = str(stats.get('ward_name', 'Unknown'))
        locality = str(stats.get('locality',  'Unknown'))

        key_factors = derive_key_factors(stats, category_key, budget)

        results.append({
            'id':  str(cand['id']),
            'lat': round(clat, 6),
            'lng': round(clng, 6),

            'suitabilityScore':   success_score,
            'successScore':       success_score,
            'successProbability': success_score,
            'expectedRevenue':    monthly_rev,

            'demand': {
                'demandScore': demand_score,
                'orderCount':  footfall_daily * 30,
            },
            'coverageScore': coverage_score,
            'costScore':     cost_score,

            'ward':       ward,
            'locality':   locality,
            'population': population,
            'keyFactors': key_factors,
            'metrics': {
                'rent':        round(est_rent),
                'footfall':    footfall_daily,
                'competition': competition_lbl,
            },
        })

    # Sort by composite: success_score + 0.3*cost_score*100 for meaningful ranking
    results.sort(
        key=lambda r: r['suitabilityScore'] * 0.7 + r['costScore'] * 30,
        reverse=True
    )
    return results[:50]


if __name__ == '__main__':
    try:
        payload = json.loads(sys.stdin.read())
        output  = run(payload)
        print(json.dumps(output))
    except Exception as e:
        import traceback
        err = {'error': str(e), 'trace': traceback.format_exc()}
        print(json.dumps(err), file=sys.stderr)
        sys.exit(1)
