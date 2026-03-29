import { spawn }            from 'child_process';
import path                  from 'path';
import { fileURLToPath }     from 'url';
import { getCandidateLocations } from '../city/service.js';

const __dirname     = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT  = path.resolve(__dirname, '..', '..', '..', '..');
const ML_BRIDGE     = path.join(PROJECT_ROOT, 'backend', 'ml_bridge.py');

/**
 * Call the Python ML bridge as a subprocess.
 * Sends JSON payload on stdin, reads JSON result from stdout.
 */
function runMLBridge(payload) {
    return new Promise((resolve, reject) => {
        const py = spawn('python', [ML_BRIDGE], {
            cwd: PROJECT_ROOT,
        });

        let stdout = '';
        let stderr = '';

        py.stdout.on('data', chunk => { stdout += chunk.toString(); });
        py.stderr.on('data', chunk => { stderr += chunk.toString(); });

        py.on('close', code => {
            if (code !== 0) {
                reject(new Error(`ml_bridge.py exited ${code}: ${stderr}`));
                return;
            }
            try {
                resolve(JSON.parse(stdout));
            } catch (e) {
                reject(new Error(`Bad JSON from ml_bridge: ${stdout.slice(0, 300)}`));
            }
        });

        py.stdin.write(JSON.stringify(payload));
        py.stdin.end();
    });
}

export async function analyzeSite(criteria) {
    const { city, type, budget, radius, income, zone, proximity } = criteria;

    // 1. Generate H3 hex-grid candidates for the city
    const candidates = await getCandidateLocations(city);

    // 2. Optionally filter by radius (keep candidates within radius km of city centre)
    let filtered = candidates;
    if (radius && Number(radius) > 0) {
        // City centre is the centroid of all candidates
        const avgLat = candidates.reduce((s, c) => s + c.lat, 0) / candidates.length;
        const avgLng = candidates.reduce((s, c) => s + c.lng, 0) / candidates.length;
        const R = 6371;
        filtered = candidates.filter(c => {
            const dlat = ((c.lat - avgLat) * Math.PI) / 180;
            const dlng = ((c.lng - avgLng) * Math.PI) / 180;
            const a =
                Math.sin(dlat / 2) ** 2 +
                Math.cos((avgLat * Math.PI) / 180) *
                Math.cos((c.lat  * Math.PI) / 180) *
                Math.sin(dlng / 2) ** 2;
            return R * 2 * Math.asin(Math.sqrt(a)) <= Number(radius);
        });
        if (filtered.length === 0) filtered = candidates; // safety fallback
    }

    // 3. Call the real ML bridge ─────────────────────────────────────────────
    const rankings = await runMLBridge({
        candidates: filtered.map(c => ({ id: c.id, lat: c.lat, lng: c.lng })),
        type:   type   || 'retail',
        budget: Number(budget) || 100000,
        income: income || '',
        zone:   zone   || '',
        proximity: Array.isArray(proximity) ? proximity : [],
    });

    // 4. Build heatmap from the ranked results
    const heatmap = rankings.map(r => ({
        lat:       r.lat,
        lng:       r.lng,
        intensity: r.demand?.demandScore ?? r.suitabilityScore / 100,
    }));

    return {
        meta: {
            city,
            candidateCount: rankings.length,
            timestamp: new Date().toISOString(),
        },
        rankings,
        heatmap,
    };
}
