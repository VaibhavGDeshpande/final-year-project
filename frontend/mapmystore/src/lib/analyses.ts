import { createClient } from "@/lib/supabase/client";

export interface AnalysisResult {
    success: boolean;
    confidence: number;
    top_factors: string[];
    [key: string]: unknown;
}

export interface StoreAnalysis {
    id: string;
    user_id: string;
    store_category: string;
    location_lat: number;
    location_lng: number;
    prediction_result: AnalysisResult;
    created_at: string;
}

/**
 * Save a new store analysis for the currently logged-in user.
 */
export async function saveAnalysis(data: {
    store_category: string;
    location_lat: number;
    location_lng: number;
    prediction_result: AnalysisResult;
}) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const { error } = await supabase.from("store_analyses").insert({
        user_id: user.id,
        ...data,
    });

    if (error) throw error;
}

/**
 * Fetch all saved analyses for the currently logged-in user,
 * newest first.
 */
export async function getUserAnalyses(): Promise<StoreAnalysis[]> {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
        .from("store_analyses")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

    if (error) throw error;
    return (data ?? []) as StoreAnalysis[];
}

/**
 * Delete a single analysis by ID.
 * RLS ensures users can only delete their own rows.
 */
export async function deleteAnalysis(id: string) {
    const supabase = createClient();
    const { error } = await supabase
        .from("store_analyses")
        .delete()
        .eq("id", id);

    if (error) throw error;
}
