"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm">
      {/* Left */}
      <Link href="/" className="font-bold text-xl text-blue-600 tracking-tight flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">M</div>
        <span className="hidden sm:inline">Map<span className="text-gray-900">My</span>Store</span>
      </Link>

      {/* Right */}
      <div className="flex items-center gap-4 sm:gap-6">
        <div className="hidden sm:flex flex-col items-end">
          <span className="text-sm font-semibold text-gray-900">
            {session?.user?.name || "Retail Manager"}
          </span>
          <span className="text-xs text-gray-500">
            {session?.user?.email || "Not signed in"}
          </span>
        </div>

        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold border border-blue-200">
          {session?.user?.name ? session.user.name.charAt(0) : "R"}
        </div>

        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white shadow hover:bg-red-600 hover:shadow-md transition-all active:scale-95"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
