"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { User, Session } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

// ── Types ────────────────────────────────────────────────────────────────────

type AuthProvider = "google" | "email" | "github" | string | null;

interface AuthContextValue {
    user: User | null;
    session: Session | null;
    /** "google" | "email" | null — how the user signed in */
    provider: AuthProvider;
    loading: boolean;
    signOut: () => Promise<void>;
}

// ── Context ──────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue>({
    user: null,
    session: null,
    provider: null,
    loading: true,
    signOut: async () => {},
});

// ── Provider ─────────────────────────────────────────────────────────────────

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const supabase = createClient();

    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [provider, setProvider] = useState<AuthProvider>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 1. Hydrate from existing session on mount
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);
            setProvider((session?.user?.app_metadata?.provider as AuthProvider) ?? null);
            setLoading(false);
        });

        // 2. Subscribe to future auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setSession(session);
                setUser(session?.user ?? null);
                setProvider((session?.user?.app_metadata?.provider as AuthProvider) ?? null);
                setLoading(false);
            }
        );

        return () => subscription.unsubscribe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const signOut = async () => {
        await supabase.auth.signOut();
    };

    return (
        <AuthContext.Provider value={{ user, session, provider, loading, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

// ── Hook export (convenience) ─────────────────────────────────────────────────

export { AuthContext };
