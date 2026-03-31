"use client";

import { useContext } from "react";
import { AuthContext } from "@/components/AuthProvider";

/**
 * useAuth — access the current Supabase auth state from any client component.
 *
 * @example
 * const { user, provider, loading, signOut } = useAuth()
 * // user.email, user.user_metadata.full_name, user.user_metadata.avatar_url
 * // provider === "google" | "email" | null
 */
export function useAuth() {
    return useContext(AuthContext);
}
