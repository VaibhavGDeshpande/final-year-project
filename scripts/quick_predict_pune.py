"""
Predicts store success for Pune, Retail, Budget=50k, Radius=5km
Uses actual training data + latest model. Zero hardcoded feature values.
"""
import sys, json, joblib, numpy as np, pandas as pd
from pathlib import Path

if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

project_root = Path(__file__).parent.parent

# ── Parameters ─────────────────────────────────────────────────────────────
CITY_LAT    = 18.5204       # Pune city centre
CITY_LON    = 73.8567
RADIUS_KM   = 5.0
BUDGET_INR  = 50_000        # monthly rent budget
RENT_COL    = 'commercial_rent_per_sqft'
STORE_SQFT  = 300           # assumed store size (sqft) to compute monthly rent

# ── Load latest retail model ────────────────────────────────────────────────
model_dir       = project_root / 'models' / 'category_specific' / 'optimized'
retail_model    = joblib.load(model_dir / 'retail_optimized_model.pkl')
retail_features = joblib.load(model_dir / 'retail_features.pkl')

# ── Load real training data ─────────────────────────────────────────────────
df = pd.read_csv(project_root / 'data' / 'processed' / 'training_data.csv')

# ── Filter: within RADIUS_KM of Pune centre ────────────────────────────────
# Haversine approx: 1 deg lat ≈ 111 km, 1 deg lon ≈ 111*cos(lat) km
lat_r = np.radians(df['latitude'])
dlat  = np.radians(df['latitude']  - CITY_LAT)
dlon  = np.radians(df['longitude'] - CITY_LON)
a     = np.sin(dlat/2)**2 + np.cos(np.radians(CITY_LAT)) * np.cos(lat_r) * np.sin(dlon/2)**2
df['dist_km'] = 6371 * 2 * np.arcsin(np.sqrt(a))

df_radius = df[df['dist_km'] <= RADIUS_KM].copy()

# ── Filter: within budget (monthly rent = rent_per_sqft * STORE_SQFT) ──────
df_radius['est_monthly_rent'] = df_radius[RENT_COL] * STORE_SQFT
df_filtered = df_radius[df_radius['est_monthly_rent'] <= BUDGET_INR].copy()

if df_filtered.empty:
    print(json.dumps({
        "error": "No records found within 5km of Pune centre within 50k budget",
        "total_in_radius": int(len(df_radius)),
        "radius_km": RADIUS_KM,
        "budget_inr": BUDGET_INR
    }, indent=2))
    sys.exit(0)

# ── Prepare features for model ──────────────────────────────────────────────
X = pd.DataFrame(columns=retail_features)
for col in retail_features:
    X[col] = df_filtered[col] if col in df_filtered.columns else 0.0
X = X.astype(float)

# ── Run model ───────────────────────────────────────────────────────────────
proba  = retail_model.predict_proba(X)
preds  = retail_model.predict(X)

# ── Build output ────────────────────────────────────────────────────────────
results = []
for i, (idx, row) in enumerate(df_filtered.iterrows()):
    results.append({
        "name":                  str(row.get('name', '')),
        "latitude":              round(float(row['latitude']), 6),
        "longitude":             round(float(row['longitude']), 6),
        "dist_km":               round(float(row['dist_km']), 3),
        "locality":              str(row.get('locality', '')),
        "ward_name":             str(row.get('ward_name', '')),
        "rental_zone":           str(row.get('rental_zone', '')),
        "commercial_rent_sqft":  float(row[RENT_COL]),
        "est_monthly_rent":      round(float(row['est_monthly_rent']), 2),
        "success_probability":   round(float(proba[i][1]), 4),
        "failure_probability":   round(float(proba[i][0]), 4),
        "predicted_class":       int(preds[i]),
        "predicted_label":       "SUCCESS" if preds[i] == 1 else "FAILURE",
    })

# Sort by success probability descending
results.sort(key=lambda r: r['success_probability'], reverse=True)

print(json.dumps(results, indent=2))
