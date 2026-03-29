import json, subprocess

payload = {
    'type': 'retail',
    'budget': 50000,
    'candidates': [
        {'id': 'kp',  'lat': 18.5354, 'lng': 73.8863},   # Koregaon Park
        {'id': 'hj',  'lat': 18.5918, 'lng': 73.7390},   # Hinjewadi
        {'id': 'kth', 'lat': 18.4966, 'lng': 73.8612},   # Katraj
        {'id': 'shj', 'lat': 18.5290, 'lng': 73.8355},   # Shivajinagar
        {'id': 'wkd', 'lat': 18.5895, 'lng': 73.7697},   # Wakad
        {'id': 'yer', 'lat': 18.5471, 'lng': 73.8783},   # Yerwada
        {'id': 'dhn', 'lat': 18.4843, 'lng': 73.8531},   # Dhankawadi
        {'id': 'aun', 'lat': 18.5621, 'lng': 73.8014},   # Aundh
    ]
}

r = subprocess.run(
    ['python', 'backend/ml_bridge.py'],
    input=json.dumps(payload), capture_output=True, text=True
)

if r.returncode != 0:
    print('BRIDGE ERROR:', r.stderr[:1000])
else:
    data = json.loads(r.stdout)
    print(f"{'#':<3} {'Ward':<22} {'Score':>6} {'Revenue':>11} {'Demand':>7} {'Cost':>6} {'Rent/mo':>9} {'Competition':<12} Factors")
    print("-" * 110)
    for i, x in enumerate(data, 1):
        ward  = str(x.get('ward', x.get('locality', '?')))[:20]
        print(f"{i:<3} {ward:<22} {x['suitabilityScore']:>5}%  "
              f"Rs{x['expectedRevenue']:>9,}  "
              f"{x['demand']['demandScore']:>6.3f}  "
              f"{x['costScore']:>5.3f}  "
              f"Rs{x['metrics']['rent']:>7,}  "
              f"{x['metrics']['competition']:<12} "
              f"{', '.join(x['keyFactors'])}")
