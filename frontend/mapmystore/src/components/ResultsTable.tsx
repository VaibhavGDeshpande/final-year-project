"use client";

import { useState, Fragment } from "react";

interface SiteRanking {
  id: string;
  lat: number;
  lng: number;
  suitabilityScore: number;
  successScore: number;
  successProbability: number;
  expectedRevenue: number;
  confidenceLevel?: string;
  recommendation?: string;
  ward?: string;
  population?: number;
  keyFactors: string[];
  metrics: {
    rent: number;
    footfall: number;
    competition: string;
  };
}

interface ResultsTableProps {
  rankings: SiteRanking[];
  startIndex?: number;
  selectedId?: string;
  onSelect: (site: SiteRanking) => void;
}

// Utility functions
const scoreColor = (score: number) => {
  if (score >= 80) return "bg-green-500";
  if (score >= 60) return "bg-yellow-500";
  return "bg-red-500";
};

const badgeStyle = (level?: string) => {
  if (!level) return "bg-gray-100 text-gray-700";
  switch (level) {
    case "VERY_HIGH":
    case "HIGH":
      return "bg-green-100 text-green-700";
    case "MEDIUM":
      return "bg-yellow-100 text-yellow-700";
    case "LOW":
    case "VERY_LOW":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export default function ResultsTable({ rankings, startIndex = 0, selectedId, onSelect }: ResultsTableProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [addresses, setAddresses] = useState<Record<string, string>>({});

  const handleExpand = async (site: SiteRanking) => {
      const isExpanded = expandedId === site.id;
      setExpandedId(isExpanded ? null : site.id);
      
      if (!isExpanded && !addresses[site.id]) {
          try {
              const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${site.lat}&lon=${site.lng}`);
              if (res.ok) {
                  const data = await res.json();
                  setAddresses(prev => ({ ...prev, [site.id]: data.display_name }));
              }
          } catch (e) {
              console.error("Geocoding failed", e);
          }
      }
  };

  if (!rankings || rankings.length === 0) return null;

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm overflow-hidden transition-colors">
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Site Recommendation Matrix
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Interactive breakdown of analyzed locations with ML-driven scores
          </p>
        </div>

        {/* Legend */}
        <div className="flex gap-2 text-[10px] font-bold uppercase tracking-wider">
          <span className="rounded-full bg-green-100 px-2 py-1 text-green-700 border border-green-200">
            Propel
          </span>
          <span className="rounded-full bg-yellow-100 px-2 py-1 text-yellow-700 border border-yellow-200">
            Moderate
          </span>
          <span className="rounded-full bg-red-100 px-2 py-1 text-red-700 border border-red-200">
            Review
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm whitespace-nowrap md:whitespace-normal">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-300 font-semibold uppercase text-xs tracking-tighter transition-colors">
              <th className="px-2 py-3 sm:p-4 w-12 sm:w-16">Rank</th>
              <th className="px-2 py-3 sm:p-4 min-w-[100px] sm:min-w-[150px]">Location</th>
              <th className="px-2 py-3 sm:p-4">Est. Revenue</th>
              <th className="hidden sm:table-cell p-4 text-center">Confidence</th>
              <th className="px-2 py-3 sm:p-4 text-right">Score</th>
              <th className="px-2 py-3 sm:p-4 w-4"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 dark:divide-gray-700 transition-colors">
            {rankings.map((site, index) => {
              const isSelected = selectedId === site.id;
              const isExpanded = expandedId === site.id;

              return (
                <Fragment key={site.id}>
                  <tr
                    onClick={() => {
                        onSelect(site);
                        handleExpand(site);
                    }}
                    className={`cursor-pointer transition hover:bg-gray-50 dark:hover:bg-gray-700/50 ${
                      isSelected ? "bg-blue-50 dark:bg-blue-900/30" : ""
                    }`}
                  >
                    {/* Rank */}
                    <td className="px-2 py-3 sm:p-4 font-bold text-gray-400">
                      #{startIndex + index + 1}
                    </td>

                    {/* Location */}
                    <td className="px-2 py-3 sm:p-4">
                      <div className="font-semibold text-gray-900 dark:text-gray-100">
                        {site.ward || 'Unknown Ward'}
                      </div>
                      <div className="text-[10px] text-gray-400 dark:text-gray-500 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {site.lat.toFixed(4)}, {site.lng.toFixed(4)}
                      </div>
                    </td>

                    {/* Est. Revenue */}
                    <td className="px-2 py-3 sm:p-4 font-medium text-gray-700 dark:text-gray-300">
                      ₹{site.expectedRevenue.toLocaleString('en-IN')}
                    </td>

                    {/* Confidence */}
                    <td className="hidden sm:table-cell p-4 text-center">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold whitespace-nowrap ${badgeStyle(
                          site.confidenceLevel
                        )} border`}
                      >
                        {site.confidenceLevel?.replace('_', ' ')}
                      </span>
                    </td>

                    {/* Suitability Score */}
                    <td className="px-2 py-3 sm:p-4">
                      <div className="flex items-center justify-end gap-3">
                        <span className="font-bold text-gray-900 dark:text-gray-100">
                          {site.successScore}
                        </span>
                        <div className="hidden sm:block h-1.5 w-16 md:w-24 rounded-full bg-gray-100 dark:bg-gray-700">
                          <div
                            className={`h-1.5 rounded-full transition-all duration-500 ${scoreColor(site.successScore)}`}
                            style={{ width: `${site.successScore}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Expand/Collapse Icon */}
                    <td className="px-2 py-3 sm:p-4">
                        <svg className={`w-4 h-4 text-gray-300 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </td>
                  </tr>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <tr className="bg-gray-50/50 dark:bg-gray-800/50 whitespace-normal">
                      <td colSpan={6} className="p-4 sm:p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                          <div>
                            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Core Demographics</h4>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center bg-white p-2.5 rounded-lg border border-gray-100">
                                    <span className="text-xs text-gray-500">Population</span>
                                    <span className="text-sm font-bold">~{site.population?.toLocaleString('en-IN') || 'N/A'}</span>
                                </div>
                                <div className="flex justify-between items-center bg-white p-2.5 rounded-lg border border-gray-100">
                                    <span className="text-xs text-gray-500">Daily Footfall</span>
                                    <span className="text-sm font-bold">{site.metrics.footfall.toLocaleString('en-IN')}</span>
                                </div>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Financial Feasibility</h4>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center bg-white p-2.5 rounded-lg border border-gray-100">
                                    <span className="text-xs text-gray-500">Rent Est. (Monthly)</span>
                                    <span className="text-sm font-bold text-red-600">₹{site.metrics.rent.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between items-center bg-white p-2.5 rounded-lg border border-gray-100">
                                    <span className="text-xs text-gray-500">Competition Complexity</span>
                                    <span className="text-sm font-bold">{site.metrics.competition}</span>
                                </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">ML Insights</h4>
                            <div className="flex flex-wrap gap-2">
                                <span className={`sm:hidden bg-white dark:bg-gray-800 px-2 py-1 rounded text-[10px] font-medium border border-gray-100 dark:border-gray-700 flex items-center gap-1 shadow-sm ${badgeStyle(site.confidenceLevel)}`}>
                                   Conf: {site.confidenceLevel?.replace('_', ' ')}
                                </span>
                                {site.keyFactors.map(factor => (
                                    <span key={factor} className="bg-white dark:bg-gray-800 px-2 py-1 rounded text-[10px] font-medium border border-gray-100 dark:border-gray-700 flex items-center gap-1 shadow-sm">
                                        <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                                        {factor}
                                    </span>
                                ))}
                                {site.recommendation === 'RECOMMENDED' && (
                                    <span className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded text-[10px] font-bold border border-indigo-100 shadow-sm">
                                        STRICT BUY SIGNAL
                                    </span>
                                )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-6 flex flex-col md:flex-row justify-between items-start md:items-center bg-blue-50/50 p-4 rounded-xl border border-blue-100 gap-4">
                            <div className="flex-1 pr-6">
                                <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                                    <svg className="w-3.5 h-3.5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    Exact Address
                                </h4>
                                <p className="text-sm font-medium text-gray-900 leading-snug">
                                    {addresses[site.id] ? addresses[site.id] : <span className="text-gray-400 italic flex items-center gap-2"><div className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div> Fetching address securely via OpenStreetMap...</span>}
                                </p>
                            </div>
                            <div className="flex gap-3 w-full md:w-auto">
                                <a 
                                    href={`https://www.google.com/maps/search/?api=1&query=${site.lat},${site.lng}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-sm active:scale-95"
                                >
                                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                                    </svg>
                                    Google Maps
                                </a>
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onSelect(site);
                                    }}
                                    className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-md active:scale-95"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                    </svg>
                                    Find on Map
                                </button>
                            </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer Note */}
      <div className="mt-6 p-3 bg-gray-50 dark:bg-gray-800/60 rounded-lg flex items-center gap-3 border border-gray-100 dark:border-gray-800 transition-colors">
          <div className="p-2 bg-gray-200 dark:bg-gray-700/80 rounded-full">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
            * These rankings are generated by our proprietary Location Intelligence Engine (LIE). 
            Scores incorporate real-time footfall patterns, spending capacity proxy, and local competition mesh analysis.
          </p>
      </div>
    </div>
  );
}

