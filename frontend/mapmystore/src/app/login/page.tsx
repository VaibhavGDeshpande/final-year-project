"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

// ── Google SVG Icon ───────────────────────────────────────────────────────────
function GoogleIcon() {
    return (
        <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
    );
}

// ── Provider badge shown after login ─────────────────────────────────────────
function ProviderBadge({ provider }: { provider: string }) {
    const config = {
        google: { label: "Signed in with Google", color: "bg-blue-50 text-blue-700 border-blue-200" },
        email:  { label: "Signed in with Email",  color: "bg-green-50 text-green-700 border-green-200" },
    }[provider] ?? { label: `Signed in (${provider})`, color: "bg-gray-50 text-gray-700 border-gray-200" };

    return (
        <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${config.color}`}>
            <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
            {config.label}
        </span>
    );
}

// ── Inner component (uses useSearchParams, must be wrapped in Suspense) ───────
function LoginInner() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirectTo") ?? "/dashboard";

    const supabase = createClient();

    const [tab, setTab] = useState<"signin" | "signup">("signin");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const [signedInProvider, setSignedInProvider] = useState<string | null>(null);

    // Auto-detect if user lands back from OAuth redirect
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session?.user) {
                const p = session.user.app_metadata?.provider ?? "email";
                setSignedInProvider(p);
                setTimeout(() => router.push(redirectTo), 800);
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ── Email + Password sign in ──────────────────────────────────────────────
    const handleEmailSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        if (!email || !password) return setError("All fields are required.");
        setLoading(true);

        const { error } = await supabase.auth.signInWithPassword({ email, password });
        setLoading(false);

        if (error) {
            setError(error.message);
        } else {
            setSignedInProvider("email");
            router.push(redirectTo);
        }
    };

    // ── Email + Password sign up ──────────────────────────────────────────────
    const handleEmailSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!firstName || !lastName || !email || !password || !confirmPassword) return setError("All fields are required.");
        if (password !== confirmPassword) return setError("Passwords do not match.");
        if (password.length < 6) return setError("Password must be at least 6 characters.");

        setLoading(true);
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    first_name: firstName,
                    last_name: lastName,
                }
            }
        });
        setLoading(false);

        if (error) {
            setError(error.message);
        } else {
            setSuccess("Account created! Check your email to confirm, then sign in.");
            setTab("signin");
        }
    };

    // ── Google OAuth ──────────────────────────────────────────────────────────
    const handleGoogle = async () => {
        setError("");
        setLoading(true);
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/auth/callback?redirectTo=${redirectTo}`,
            },
        });
        if (error) {
            setError(error.message);
            setLoading(false);
        }
        // Browser will redirect — loading stays true
    };

    return (
        <main className="flex min-h-screen">
            {/* ── Left branding panel ── */}
            <div className="hidden w-1/2 lg:flex relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-blue-900 to-gray-900" />
                <div className="absolute -top-[20%] -left-[10%] w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
                <div className="absolute top-[20%] -right-[10%] w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: "2s" }} />
                <div className="absolute -bottom-[20%] left-[20%] w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: "4s" }} />

                <div className="relative z-10 flex h-full w-full flex-col items-center justify-center p-12 text-center text-white">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 border border-white/20 backdrop-blur mb-6">
                        <svg className="h-8 w-8 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                    <h1 className="mb-4 text-5xl font-extrabold tracking-tight">
                        Map<span className="text-blue-400">My</span>Store
                    </h1>
                    <p className="text-lg text-blue-100 max-w-sm leading-relaxed">
                        The next generation of location intelligence. Discover profitable retail zones using geospatial ML.
                    </p>

                    {/* Feature pills */}
                    <div className="mt-10 flex flex-wrap justify-center gap-2">
                        {["XGBoost ML", "Geospatial Analysis", "35+ Features", "82% Accuracy"].map((f) => (
                            <span key={f} className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white backdrop-blur">
                                {f}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Right auth panel ── */}
            <div className="flex w-full flex-col justify-center px-4 sm:px-8 lg:w-1/2 lg:px-16 xl:px-24 bg-gray-50 dark:bg-gray-950">
                <div className="mx-auto w-full max-w-sm">

                    {/* Back link */}
                    <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 mb-8 transition-colors">
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to home
                    </Link>

                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                        {tab === "signin" ? "Welcome back" : "Create an account"}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
                        {tab === "signin" ? "Sign in to access your dashboard." : "Join MapMyStore to save and revisit your analyses."}
                    </p>

                    {/* Success/Error alerts */}
                    {success && (
                        <div className="mb-4 rounded-xl border border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800 px-4 py-3 text-sm text-green-800 dark:text-green-300">
                            {success}
                        </div>
                    )}
                    {error && (
                        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800 px-4 py-3 text-sm text-red-800 dark:text-red-300">
                            {error}
                        </div>
                    )}

                    {/* Provider badge — shown after OAuth redirect */}
                    {signedInProvider && (
                        <div className="mb-4 flex justify-center">
                            <ProviderBadge provider={signedInProvider} />
                        </div>
                    )}

                    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm p-6 space-y-5">

                        {/* Google OAuth button */}
                        <button
                            onClick={handleGoogle}
                            disabled={loading}
                            className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-200 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-all disabled:opacity-60"
                        >
                            <GoogleIcon />
                            Continue with Google
                        </button>

                        {/* Separator */}
                        <div className="flex items-center gap-3">
                            <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
                            <span className="text-xs text-gray-400">or</span>
                            <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
                        </div>

                        {/* Sign In / Sign Up tabs */}
                        <div className="flex rounded-xl border border-gray-200 dark:border-gray-700 p-1 bg-gray-50 dark:bg-gray-800">
                            {(["signin", "signup"] as const).map((t) => (
                                <button
                                    key={t}
                                    onClick={() => { setTab(t); setError(""); setSuccess(""); }}
                                    className={`flex-1 rounded-lg py-1.5 text-xs font-semibold transition-all ${
                                        tab === t
                                            ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm"
                                            : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                    }`}
                                >
                                    {t === "signin" ? "Sign In" : "Sign Up"}
                                </button>
                            ))}
                        </div>

                        {/* Sign In form */}
                        {tab === "signin" && (
                            <form onSubmit={handleEmailSignIn} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Email address</label>
                                    <input
                                        id="signin-email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2.5 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        placeholder="you@example.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
                                    <input
                                        id="signin-password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2.5 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        placeholder="••••••••"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex w-full justify-center items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-60"
                                >
                                    {loading ? (
                                        <>
                                            <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Signing in...
                                        </>
                                    ) : "Sign In"}
                                </button>
                            </form>
                        )}

                        {/* Sign Up form */}
                        {tab === "signup" && (
                            <form onSubmit={handleEmailSignUp} className="space-y-4">
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">First name</label>
                                        <input
                                            id="signup-first-name"
                                            type="text"
                                            required
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            className="block w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2.5 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                            placeholder="Jane"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Last name</label>
                                        <input
                                            id="signup-last-name"
                                            type="text"
                                            required
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            className="block w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2.5 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                            placeholder="Doe"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Email address</label>
                                    <input
                                        id="signup-email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2.5 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        placeholder="you@example.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
                                    <input
                                        id="signup-password"
                                        type="password"
                                        autoComplete="new-password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2.5 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        placeholder="Min. 6 characters"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm password</label>
                                    <input
                                        id="signup-confirm"
                                        type="password"
                                        autoComplete="new-password"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="block w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2.5 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        placeholder="••••••••"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex w-full justify-center items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-60"
                                >
                                    {loading ? (
                                        <>
                                            <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Creating account...
                                        </>
                                    ) : "Create Account"}
                                </button>
                            </form>
                        )}
                    </div>

                    <p className="mt-6 text-center text-xs text-gray-400 dark:text-gray-500">
                        By continuing, you agree to our{" "}
                        <a href="#" className="underline hover:text-gray-600 dark:hover:text-gray-300">Terms</a>{" "}
                        and{" "}
                        <a href="#" className="underline hover:text-gray-600 dark:hover:text-gray-300">Privacy Policy</a>.
                    </p>
                </div>
            </div>
        </main>
    );
}

// ── Page export (Suspense boundary required for useSearchParams) ──────────────
export default function LoginPage() {
    return (
        <Suspense fallback={
            <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
            </div>
        }>
            <LoginInner />
        </Suspense>
    );
}
