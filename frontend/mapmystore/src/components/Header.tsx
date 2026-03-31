"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function Header() {
    const pathname = usePathname();
    const router = useRouter();
    const { user, provider, loading, signOut } = useAuth();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleSignOut = async () => {
        await signOut();
        router.push("/login");
    };

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Dashboard", href: "/dashboard" },
        { name: "Research", href: "/research" },
        { name: "Our Team", href: "/team" },
        { name: "ML Metrics", href: "/docs/metrics" },
    ];

    // Derive avatar/name from Supabase user object
    const displayName = user?.user_metadata?.full_name ?? user?.email ?? "User";
    const avatarUrl = user?.user_metadata?.avatar_url as string | undefined;
    const initial = (displayName.charAt(0) ?? "U").toUpperCase();

    // Provider badge colours
    const providerBadge =
        provider === "google"
            ? { label: "Google", className: "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800" }
            : provider === "email"
            ? { label: "Email", className: "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800" }
            : null;

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-200/80 dark:border-gray-800/80 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md transition-colors duration-300">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm transition-transform group-hover:scale-105">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                            MapMy<span className="text-blue-600 dark:text-blue-400">Store</span>
                        </span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`text-sm font-medium transition-colors ${isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"}`}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    {/* Mobile menu toggle */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline-none"
                        aria-label="Toggle menu"
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {mobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                            )}
                        </svg>
                    </button>

                    {/* Dark mode toggle */}
                    {mounted && (
                        <button
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-label="Toggle Dark Mode"
                        >
                            {theme === "dark" ? (
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.66-8.66h-1m-16 0h-1m14.657-6.343l-.707.707M6.05 17.95l-.707.707m11.314 0l-.707-.707m-11.314-11.314l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            )}
                        </button>
                    )}

                    {/* Auth section */}
                    {!loading && (
                        user ? (
                            <div className="flex items-center gap-3">
                                {/* Provider badge (desktop only) */}
                                {providerBadge && (
                                    <span className={`hidden lg:inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium ${providerBadge.className}`}>
                                        {providerBadge.label}
                                    </span>
                                )}

                                {/* Avatar + name → links to profile */}
                                <Link href="/profile" className="hidden sm:flex items-center gap-2 group">
                                    <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden border border-gray-300 dark:border-gray-600 group-hover:ring-2 group-hover:ring-blue-500 transition-all">
                                        {avatarUrl ? (
                                            <img src={avatarUrl} alt="Profile" className="h-full w-full object-cover" />
                                        ) : (
                                            <span className="text-xs font-bold text-gray-500 dark:text-gray-300">{initial}</span>
                                        )}
                                    </div>
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors max-w-[120px] truncate">
                                        {displayName}
                                    </span>
                                </Link>

                                <button
                                    onClick={handleSignOut}
                                    className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                                >
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className="rounded-lg bg-gray-900 dark:bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 dark:hover:bg-blue-500 transition-all focus:ring-2 focus:ring-blue-500"
                            >
                                Sign In
                            </Link>
                        )
                    )}
                </div>
            </div>

            {/* Mobile Navigation Panel */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-4 space-y-3 shadow-lg absolute w-full">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`block text-base font-medium ${isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-300"}`}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                    {user && (
                        <Link href="/profile" onClick={() => setMobileMenuOpen(false)} className="block text-base font-medium text-gray-600 dark:text-gray-300">
                            My Profile
                        </Link>
                    )}
                </div>
            )}
        </header>
    );
}
