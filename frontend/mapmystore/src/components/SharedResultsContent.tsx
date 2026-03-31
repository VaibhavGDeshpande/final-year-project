"use client";

import { useState } from "react";
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

export interface SiteAnalysisResponse {
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

export default function SharedResultsContent({ data, type }: { data: SiteAnalysisResponse, type: string | null }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [selectedSiteId, setSelectedSiteId] = useState<string | undefined>(undefined);
  const [mobileTab, setMobileTab] = useState<'list' | 'map'>('list');

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
              Analyzed {data.meta.candidateCount} locations based on your {type || 'store'} profile
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
