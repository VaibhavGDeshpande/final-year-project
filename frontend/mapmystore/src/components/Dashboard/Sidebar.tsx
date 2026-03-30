"use client";

import { usePathname, useRouter } from "next/navigation";

const menuItems = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Results", path: "/results" },
  { label: "Reports", path: "/results" },
  { label: "Settings", path: "#" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <aside className="w-64 border-r dark:border-gray-800 bg-white dark:bg-gray-900 p-4 transition-colors">
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={() => router.push(item.path)}
            className={`w-full rounded px-3 py-2 text-left text-sm transition-colors ${
              pathname === item.path
                ? "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Footer info */}
      <div className="mt-8 text-xs text-gray-500">
        ML-Based Retail Optimization
      </div>
    </aside>
  );
}
