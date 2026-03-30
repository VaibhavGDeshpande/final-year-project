import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex h-6 w-6 items-center justify-center rounded bg-blue-600 text-white">
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <span className="text-lg font-bold tracking-tight text-gray-900 dark:text-gray-100">
                                MapMy<span className="text-blue-600 dark:text-blue-400">Store</span>
                            </span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs leading-relaxed">
                            AI-driven retail site selection platform. We analyze demographics, footfall, and competition to help you find the perfect location for your business.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 tracking-wider uppercase mb-4">Product</h3>
                        <ul className="space-y-3">
                            <li><Link href="/" className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Analyzer</Link></li>
                            <li><Link href="/dashboard" className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Dashboard</Link></li>
                            <li><Link href="/pricing" className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Pricing</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 tracking-wider uppercase mb-4">Resources</h3>
                        <ul className="space-y-3">
                            <li><Link href="/docs/metrics" className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">ML Metrics Documentation</Link></li>
                            <li><a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">API Reference</a></li>
                            <li><a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Support</a></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 border-t border-gray-100 dark:border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                        &copy; {new Date().getFullYear()} MapMyStore AI Logic Framework. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        <span className="text-xs font-semibold px-2 py-1 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full border border-green-200 dark:border-green-800/50 flex items-center gap-1.5 transition-colors">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                            All Systems Operational
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
