"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

import AnalysisCharts from "@/components/AnalysisCharts";
import ExportPanel from "@/components/ExportPanel";
import ResultsTable from "@/components/ResultsTable";

// Dynamically load Leaflet map (no SSR)
const MapVisualization = dynamic(
  () => import("@/components/MapVisualization"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400">
        Loading map…
      </div>
    ),
  }
);

// =====================
// Types
// =====================
interface SiteAnalysisResponse {
  meta: {
    city: string;
    candidateCount: number;
    timestamp: string;
  };
  rankings: Array<{
    id: string;
    lat: number;
    lng: number;

    // Core ML Outputs
    suitabilityScore: number;
    successScore: number;
    successProbability: number;
    expectedRevenue: number;

    // New ML model outputs (from upgraded model)
    confidenceLevel?: 'VERY_HIGH' | 'HIGH' | 'MEDIUM' | 'LOW' | 'VERY_LOW';
    recommendation?: 'RECOMMENDED' | 'NOT_RECOMMENDED';

    // Feature Breakdown
    demand: {
      demandScore: number;
      orderCount: number;
    };
    coverageScore: number;
    costScore: number;

    // Rich Metadata
    ward?: string;
    population?: number;
    keyFactors: string[];
    metrics: {
      rent: number;
      footfall: number;
      competition: string;
    }
  }>;
  heatmap?: Array<{
    lat: number;
    lng: number;
    intensity: number;
  }>;
}

// =====================
// Helpers
// =====================
function ConfidenceBadge({ level }: { level?: string }) {
  if (!level) return null;
  const styles: Record<string, string> = {
    VERY_HIGH: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    HIGH: 'bg-green-100 text-green-700 border-green-200',
    MEDIUM: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    LOW: 'bg-orange-100 text-orange-700 border-orange-200',
    VERY_LOW: 'bg-red-100 text-red-700 border-red-200',
  };
  const label = level.replace('_', ' ');
  return (
    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${styles[level] ?? 'bg-gray-100 text-gray-600 border-gray-200'}`}>
      {label}
    </span>
  );
}

function RecommendationChip({ value }: { value?: string }) {
  if (!value) return null;
  const isRec = value === 'RECOMMENDED';
  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
      isRec ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-gray-100 text-gray-500 border-gray-200'
    }`}>
      {isRec ? '✓ Recommended' : '✗ Not Recommended'}
    </span>
  );
}

// =====================
// Page Content
// =====================
function ResultsContent() {
  const searchParams = useSearchParams();

  const city = searchParams.get("city");
  const type = searchParams.get("type");
  const budget = searchParams.get("budget");
  const radius = searchParams.get("radius");
  const income = searchParams.get("income");
  const zone = searchParams.get("zone");
  const proximity = searchParams.get("proximity");

  const [data, setData] = useState<SiteAnalysisResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [selectedSiteId, setSelectedSiteId] = useState<string | undefined>(undefined);
  const [mobileTab, setMobileTab] = useState<'list' | 'map'>('list');

  const handleSelectSite = (site: any) => {
    setSelectedSiteId(site.id);
  };

  // =====================
  // Fetch backend data
  // =====================
  useEffect(() => {
    if (!city) return;

    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3005/api/analyze-site", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            city,
            type,
            budget: Number(budget),
            radius: Number(radius),
            income,
            zone,
            proximity: proximity ? proximity.split(',') : []
          }),
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.message || "Failed to fetch analysis");
        }

        const result = await res.json();
        setData(result);
      } catch (err: any) {
        setError(err.message || "Unexpected error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [city, type, budget, radius, income, zone, proximity]);

  // =====================
  // States
  // =====================
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Analyzing {city}'s Ecosystem
          </h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Evaluating 40+ ML features including footfall, demographics, and competition...
          </p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-md rounded-xl border border-red-100 dark:border-red-900/50 bg-white dark:bg-gray-800 p-6 text-center shadow transition-colors">
          <h2 className="mb-2 text-lg font-bold text-gray-800 dark:text-gray-100">
            Analysis Failed
          </h2>
          <p className="mb-6 text-red-600 dark:text-red-400">{error}</p>
          <Link
            href="/"
            className="rounded-lg bg-gray-900 dark:bg-blue-600 px-5 py-2 text-white hover:bg-gray-800 dark:hover:bg-blue-700 transition-colors"
          >
            Try Again
          </Link>
        </div>
      </div>
    );
  }

  // =====================
  // Render
  // =====================
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRankings = data.rankings.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.rankings.length / itemsPerPage);
  const currentHeatmapData = data.heatmap?.slice(indexOfFirstItem, indexOfLastItem) ?? [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 transition-colors duration-300">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              AI Site Recommendations for {data.meta.city}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Analyzed {data.meta.candidateCount} locations based on your {type} store profile
            </p>
          </div>

          <ExportPanel exportData={data.rankings} city={data.meta.city} />
        </div>

        {/* Charts */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
             <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Market Intelligence</h2>
             <Link href="/docs/metrics" target="_blank" className="text-sm flex items-center gap-1.5 font-medium text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 shadow-sm hover:bg-blue-100 dark:hover:bg-blue-800/50 hover:shadow-md px-3 py-1.5 rounded-lg transition-all">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                How to read these charts
             </Link>
          </div>
          <AnalysisCharts rankings={data.rankings} />
        </div>

        {/* Rankings + Map */}
        
        {/* Mobile View Toggles */}
        <div className="flex lg:hidden bg-gray-200 dark:bg-gray-800 p-1 rounded-lg mb-6 w-full">
          <button 
            onClick={() => setMobileTab('list')}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${mobileTab === 'list' ? 'bg-white dark:bg-gray-700 shadow text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
          >
            Candidates List
          </button>
          <button 
            onClick={() => setMobileTab('map')}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${mobileTab === 'map' ? 'bg-white dark:bg-gray-700 shadow text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
          >
            Interactive Map
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
           {/* Detailed Table (Left Column) */}
           <div className={`order-2 lg:order-1 h-full flex-col ${mobileTab === 'list' ? 'flex' : 'hidden lg:flex'}`}>
             <ResultsTable 
                rankings={currentRankings} 
                startIndex={indexOfFirstItem}
                selectedId={selectedSiteId} 
                onSelect={(site) => setSelectedSiteId(site.id)} 
             />

             {/* Pagination Controls */}
             {totalPages > 1 && (
               <div className="flex justify-center items-center gap-4 mt-6 p-4">
                 <button
                   onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                   disabled={currentPage === 1}
                   className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 text-sm font-medium text-gray-900 dark:text-gray-200 transition-colors"
                 >
                   Previous
                 </button>
                 <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                   Page {currentPage} of {totalPages}
                 </div>
                 <button
                   onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                   disabled={currentPage === totalPages}
                   className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 text-sm font-medium text-gray-900 dark:text-gray-200 transition-colors"
                 >
                   Next
                 </button>
               </div>
             )}
           </div>

           {/* Map (Right Column) */}
           <div className={`order-1 lg:order-2 lg:sticky lg:top-6 h-[500px] lg:h-[800px] w-full rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-xl overflow-hidden ring-4 ring-white dark:ring-gray-900 transition-colors ${mobileTab === 'map' ? 'block' : 'absolute -left-[9999px] invisible lg:static lg:visible lg:block'}`}>
             <MapVisualization
               center={[currentRankings[0]?.lat || data.rankings[0]?.lat, currentRankings[0]?.lng || data.rankings[0]?.lng]}
               rankings={currentRankings}
               heatmapData={currentHeatmapData}
               startIndex={indexOfFirstItem}
               selectedId={selectedSiteId}
             />
           </div>
        </div>
      </div>
    </div>
  );
}

// =====================
// Score badge
// =====================
function ScoreBadge({ label, value }: { label: string; value: number }) {
  let color = "bg-red-100 text-red-700";
  if (value >= 0.7) color = "bg-green-100 text-green-700";
  else if (value >= 0.4) color = "bg-yellow-100 text-yellow-700";

  return (
    <div className={`rounded px-2 py-1 text-center text-xs ${color}`}>
      <div>{label}</div>
      <div className="font-bold">{value.toFixed(2)}</div>
    </div>
  );
}

// =====================
// Page wrapper
// =====================
export default function ResultsPage() {
  return (
    <Suspense fallback={<div>Loading…</div>}>
      <ResultsContent />
    </Suspense>
  );
}