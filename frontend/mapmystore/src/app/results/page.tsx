"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense, useRef } from "react";
import Link from "next/link";
import SharedResultsContent, { SiteAnalysisResponse } from "@/components/SharedResultsContent";

const apiBaseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/$/, "");
const analyzeSiteEndpoint = `${apiBaseUrl}/api/analyze-site`;

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
  const fetchInitiated = useRef(false);

  useEffect(() => {
    if (!city) return;
    if (fetchInitiated.current) return;
    fetchInitiated.current = true;

    const fetchData = async () => {
      try {
        const res = await fetch(analyzeSiteEndpoint, {
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

        // Save to Supabase in the background
        try {
          const { saveAnalysis } = await import("@/lib/analyses");
          await saveAnalysis({
            store_category: type || "unknown",
            location_lat: result.rankings[0]?.lat || 0,
            location_lng: result.rankings[0]?.lng || 0,
            prediction_result: {
              success: true,
              confidence: result.rankings[0]?.successProbability || 0,
              top_factors: result.rankings[0]?.keyFactors || [],
              rankings: result.rankings,
              city: result.meta?.city,
              meta: result.meta,
              heatmap: result.heatmap
            }
          });
        } catch (e) {
          console.error("Failed to save analysis to history:", e);
        }
      } catch (err: any) {
        setError(err.message || "Unexpected error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [city, type, budget, radius, income, zone, proximity]);

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

  return <SharedResultsContent data={data} type={type} />;
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<div>Loading…</div>}>
      <ResultsContent />
    </Suspense>
  );
}
