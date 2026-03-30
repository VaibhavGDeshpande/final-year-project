import Link from "next/link";

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-900 text-white selection:bg-blue-500/30">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-10 mix-blend-overlay"></div>
      <div className="absolute -top-[30%] -right-[10%] h-[1000px] w-[1000px] rounded-full bg-gradient-to-tr from-blue-700/40 to-purple-600/40 blur-[120px]"></div>
      <div className="absolute -bottom-[30%] -left-[10%] h-[800px] w-[800px] rounded-full bg-gradient-to-tr from-teal-500/30 to-blue-900/40 blur-[120px]"></div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-6 lg:px-12">
        <div className="text-2xl font-extrabold tracking-tighter">
          Map<span className="text-blue-400">My</span>Store
        </div>
        <div className="flex gap-4">
          <Link href="/login" className="rounded-full px-5 py-2 text-sm font-medium transition-colors hover:bg-white/10">
            Sign In
          </Link>
          <Link href="/dashboard" className="rounded-full bg-blue-500 px-5 py-2 text-sm font-medium text-white shadow-lg shadow-blue-500/30 transition-all hover:bg-blue-400 hover:shadow-blue-500/50">
            Enter Dashboard
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center px-4 pt-32 text-center lg:pt-40">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 mb-8 backdrop-blur-md shadow-xl">
          <span className="flex h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
          <span className="text-xs font-semibold text-gray-300 tracking-wide uppercase">XGBoost ML Models Live</span>
        </div>

        <h1 className="max-w-5xl text-5xl font-extrabold leading-tight tracking-tight sm:text-7xl drop-shadow-sm">
          Discover your next <br />
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 bg-clip-text text-transparent">highly profitable</span> retail zone.
        </h1>
        
        <p className="mx-auto mt-8 max-w-2xl text-lg text-gray-300 sm:text-xl leading-relaxed">
          MapMyStore analyzes 35+ geospatial features, demographics, and competitive density using advanced Machine Learning to pinpoint where your next business should open.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row gap-4">
          <Link href="/dashboard" className="group flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-gray-900 transition-all hover:bg-gray-100 hover:scale-105 active:scale-95 h-12">
            Start Analyzing
            <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
          <Link href="/login" className="flex items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur px-8 py-4 text-sm font-bold text-white transition-all hover:bg-white/10 h-12">
            Admin Login
          </Link>
        </div>

        {/* Dashboard Preview Mockup */}
        <div className="mt-20 relative w-full max-w-5xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10 bottom-0 top-[40%]"></div>
          <div className="rounded-t-2xl border border-white/10 border-b-0 bg-gray-800/50 backdrop-blur-xl p-2 sm:p-3 shadow-2xl">
            <div className="aspect-[21/9] w-full rounded-lg bg-gray-900 border border-white/5 overflow-hidden flex items-center justify-center relative">
              <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 gap-0 opacity-10">
                   {Array.from({length: 72}).map((_, i) => (
                     <div key={i} className="border border-blue-500/20"></div>
                   ))}
              </div>
              <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-red-600/20 blur-[80px] -translate-x-1/2 -translate-y-1/2 rounded-full"></div>
              <div className="text-center z-20">
                <div className="text-gray-400 font-mono text-sm tracking-widest bg-gray-900/80 px-4 py-2 rounded border border-white/10 backdrop-blur">
                  GEOJSON_MAP_READY
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}