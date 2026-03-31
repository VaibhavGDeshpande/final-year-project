import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function AnalysisHistory() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  // Fetch from `store_analyses`
  const { data, error } = await supabase
    .from("store_analyses")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(10); // Show max 10 to keep dashboard clean

  if (error) {
    console.error("Failed to load analysis history:", error.message);
    return null; // Silent catch, fallback to null layout
  }

  if (!data || data.length === 0) {
    return (
      <div className="mt-8 rounded-xl border border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-gray-800/20 p-8 text-center backdrop-blur-sm">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-500">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">No recent analyses</h3>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Run your first AI store analysis above to see it appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-10">
      <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-white">
        <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Your Recent Analyses
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((row: any) => {
          const prediction = typeof row.prediction_result === 'string' 
            ? JSON.parse(row.prediction_result) 
            : row.prediction_result;

          const date = new Date(row.created_at).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit"
          });

          const confidence = prediction?.confidence;
          const isHigh = confidence >= 0.7;

          return (
            <Link
              href={`/results/past/${row.id}`}
              key={row.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800 p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md cursor-pointer"
            >
              <div>
                <div className="flex items-start justify-between">
                  <span className="rounded-full bg-blue-50 dark:bg-blue-900/30 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-400">
                    {row.store_category}
                  </span>
                  <span className="text-xs font-medium text-gray-400 dark:text-gray-500">
                    {date}
                  </span>
                </div>
                <h3 className="mt-4 text-base font-bold text-gray-900 dark:text-gray-100 line-clamp-1">
                  {prediction?.city || "Unknown City"}
                </h3>
                <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {row.location_lat.toFixed(4)}, {row.location_lng.toFixed(4)}
                </div>
              </div>

              <div className="mt-5 border-t border-gray-50 dark:border-gray-700 pt-4 flex items-center justify-between">
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Peak Confidence</span>
                <span className={`text-sm font-bold ${isHigh ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-500'}`}>
                  {confidence ? (confidence).toFixed(1) + "%" : "N/A"}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
