import { createClient } from "@/lib/supabase/server";
import { notFound, redirect } from "next/navigation";
import SharedResultsContent, { SiteAnalysisResponse } from "@/components/SharedResultsContent";
import Link from "next/link";

export default async function PastResultPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;
    
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // Fetch the specific analysis
    const { data: analysis, error } = await supabase
        .from("store_analyses")
        .select("*")
        .eq("id", id)
        .eq("user_id", user.id) // Enforce ownership explicitly
        .single();

    if (error || !analysis) {
        console.error("Analysis not found:", error);
        notFound();
    }

    // Parse the prediction_result JSON back into an object
    let predictionResult;
    try {
        predictionResult = typeof analysis.prediction_result === "string"
            ? JSON.parse(analysis.prediction_result)
            : analysis.prediction_result;
    } catch {
        notFound();
    }

    // Reconstruct the SiteAnalysisResponse structure required by SharedResultsContent
    // Older stored analyses might lack `meta` or `heatmap`, so we provide graceful fallbacks.
    const reconstructedData: SiteAnalysisResponse = {
        meta: predictionResult.meta || {
            city: predictionResult.city || "Unknown City",
            candidateCount: predictionResult.rankings?.length || 0,
            timestamp: analysis.created_at,
        },
        rankings: predictionResult.rankings || [],
        heatmap: predictionResult.heatmap || [],
    };

    return (
        <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
            {/* Top Bar for Past Results */}
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-6 py-3 shadow-sm">
                <div className="flex items-center gap-4">
                    <Link
                        href="/dashboard"
                        className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                    >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Dashboard
                    </Link>
                    <div className="h-4 w-px bg-gray-300 dark:bg-gray-700" />
                    <span className="flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 dark:border-blue-900/50 dark:bg-blue-900/30 dark:text-blue-400">
                        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        Past Analysis Archive
                    </span>
                </div>
                <div className="text-xs text-gray-400 dark:text-gray-500">
                    Run Date: {new Date(analysis.created_at).toLocaleString()}
                </div>
            </div>

            {/* Render the Shared Results UI seamlessly bypassing the load screen */}
            <SharedResultsContent 
                data={reconstructedData} 
                type={analysis.store_category} 
            />
        </div>
    );
}
