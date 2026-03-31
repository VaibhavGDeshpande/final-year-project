import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

/**
 * /auth/callback
 * Supabase redirects here after Google OAuth.
 * We exchange the code for a session then forward the user.
 */
export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get("code");
    const redirectTo = searchParams.get("redirectTo") ?? "/dashboard";

    if (code) {
        const supabase = await createClient();
        await supabase.auth.exchangeCodeForSession(code);
    }

    return NextResponse.redirect(`${origin}${redirectTo}`);
}
