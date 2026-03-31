"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { getUserAnalyses, deleteAnalysis, type StoreAnalysis } from "@/lib/analyses";

function ProviderBadge({ provider }: { provider: string }) {
    const config: Record<string, { label: string; icon: string; className: string }> = {
        google: { label: "Signed in with Google", icon: "🔵", className: "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800" },
        email:  { label: "Signed in with Email",  icon: "✉️", className: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800" },
    };
    const c = config[provider] ?? { label: `Provider: ${provider}`, icon: "🔑", className: "bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700" };

    return (
        <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${c.className}`}>
            <span>{c.icon}</span> {c.label}
        </span>
    );
}

export default function ProfilePage() {
    const { user, provider, loading, signOut } = useAuth();
    const [analyses, setAnalyses] = useState<StoreAnalysis[]>([]);
    const [analysesLoading, setAnalysesLoading] = useState(true);
    const [deleting, setDeleting] = useState<string | null>(null);

    useEffect(() => {
        if (!user) return;
        getUserAnalyses()
            .then(setAnalyses)
            .finally(() => setAnalysesLoading(false));
    }, [user]);

    const handleDelete = async (id: string) => {
        setDeleting(id);
        await deleteAnalysis(id);
        setAnalyses((prev) => prev.filter((a) => a.id !== id));
        setDeleting(null);
    };

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
                <p className="text-gray-500 dark:text-gray-400">You must be signed in to view your profile.</p>
                <Link href="/login" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                    Sign In
                </Link>
            </div>
        );
    }

    const displayName = user.user_metadata?.full_name ?? user.email ?? "User";
    const avatarUrl = user.user_metadata?.avatar_url as string | undefined;
    const initial = (displayName.charAt(0) ?? "U").toUpperCase();
    const memberSince = new Date(user.created_at).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" });

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
            {/* Hero */}
            <div className="bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
                    <div className="flex items-center gap-6 flex-wrap">
                        {/* Avatar */}
                        <div className="relative">
                            <div className="h-20 w-20 rounded-2xl overflow-hidden border-2 border-white/20 bg-white/10 flex items-center justify-center shadow-xl">
                                {avatarUrl ? (
                                    <img src={avatarUrl} alt={displayName} className="h-full w-full object-cover" />
                                ) : (
                                    <span className="text-3xl font-bold text-white">{initial}</span>
                                )}
                            </div>
                        </div>

                        <div className="flex-1 min-w-0">
                            <h1 className="text-2xl sm:text-3xl font-bold truncate">{displayName}</h1>
                            <p className="text-blue-200 text-sm mt-1">{user.email}</p>
                            <div className="flex flex-wrap items-center gap-3 mt-3">
                                {provider && <ProviderBadge provider={provider} />}
                                <span className="text-xs text-blue-300">Member since {memberSince}</span>
                            </div>
                        </div>

                        <button
                            onClick={async () => { await signOut(); window.location.href = "/login"; }}
                            className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20 transition-colors backdrop-blur"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">

                {/* Account Info card */}
                <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm overflow-hidden">
                    <div className="flex items-center gap-3 border-b border-gray-100 dark:border-gray-800 px-6 py-4">
                        <span className="text-lg">👤</span>
                        <h2 className="font-bold text-gray-900 dark:text-white">Account Details</h2>
                    </div>
                    <div className="divide-y divide-gray-100 dark:divide-gray-800">
                        {[
                            { label: "Full Name", value: displayName },
                            { label: "Email Address", value: user.email ?? "—" },
                            { label: "User ID", value: user.id, mono: true },
                            { label: "Sign-in Method", value: provider ?? "unknown" },
                            { label: "Account Created", value: memberSince },
                            { label: "Email Confirmed", value: user.email_confirmed_at ? "✅ Yes" : "❌ Not yet" },
                        ].map(({ label, value, mono }) => (
                            <div key={label} className="flex items-center justify-between px-6 py-3 gap-4">
                                <span className="text-xs text-gray-500 dark:text-gray-400 shrink-0 w-36">{label}</span>
                                <span className={`text-sm text-right text-gray-800 dark:text-gray-200 truncate ${mono ? "font-mono text-xs" : ""}`}>
                                    {value}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Saved Analyses */}
                <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm overflow-hidden">
                    <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 px-6 py-4">
                        <div className="flex items-center gap-3">
                            <span className="text-lg">📊</span>
                            <h2 className="font-bold text-gray-900 dark:text-white">Saved Analyses</h2>
                        </div>
                        <span className="rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 px-2 py-0.5 text-xs font-semibold">
                            {analyses.length}
                        </span>
                    </div>

                    {analysesLoading ? (
                        <div className="flex justify-center py-12">
                            <div className="h-6 w-6 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
                        </div>
                    ) : analyses.length === 0 ? (
                        <div className="py-16 text-center">
                            <p className="text-4xl mb-3">🗺️</p>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">No analyses saved yet</p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Run an analysis on the dashboard and save it to see it here.</p>
                            <Link href="/dashboard" className="mt-4 inline-block rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition-colors">
                                Go to Dashboard
                            </Link>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-100 dark:divide-gray-800">
                            {analyses.map((a) => (
                                <div key={a.id} className="flex items-start justify-between px-6 py-4 gap-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{a.store_category}</span>
                                            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${a.prediction_result.success ? "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400" : "bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400"}`}>
                                                {a.prediction_result.success ? "✅ Success" : "❌ Not Viable"}
                                            </span>
                                            <span className="rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-2 py-0.5 text-xs">
                                                {(a.prediction_result.confidence * 100).toFixed(1)}% confidence
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                            📍 {a.location_lat.toFixed(4)}, {a.location_lng.toFixed(4)} ·{" "}
                                            {new Date(a.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(a.id)}
                                        disabled={deleting === a.id}
                                        className="shrink-0 rounded-lg p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors disabled:opacity-50"
                                        aria-label="Delete analysis"
                                        title="Delete"
                                    >
                                        {deleting === a.id ? (
                                            <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                            </svg>
                                        ) : (
                                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
