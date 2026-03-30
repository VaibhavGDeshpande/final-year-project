"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef } from "react";

// ---------- Reusable Animation Variants ----------
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  visible: ((i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.65 },
  })) as any,
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

function FadeInSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      custom={delay}
      variants={fadeUp}
    >
      {children}
    </motion.div>
  );
}

// ---------- Data ----------
const stats = [
  { label: "Geospatial Features Analyzed", value: "35+" },
  { label: "ML Accuracy (Validation Set)", value: "91%" },
  { label: "Candidate Zones Ranked", value: "Top 10" },
  { label: "Cities Supported", value: "∞" },
];

const features = [
  {
    icon: "🗺️",
    title: "Geospatial Intelligence",
    desc: "Hexagonal H3 grid analysis covering footfall, road density, competitor proximity and zoning data.",
  },
  {
    icon: "🤖",
    title: "XGBoost ML Engine",
    desc: "Our gradient-boosted model is trained on real-world retail success patterns to predict site viability.",
  },
  {
    icon: "📊",
    title: "Interactive Analytics",
    desc: "Revenue projections, scatter plots and confidence distributions give you a complete decision dashboard.",
  },
  {
    icon: "📍",
    title: "Live Map Visualization",
    desc: "Interactive Leaflet map with demand heatmaps and ranked pin-drop overlays in real-time.",
  },
  {
    icon: "📤",
    title: "Export Ready",
    desc: "Download your full analysis as a PDF or Excel report with one click for stakeholder presentations.",
  },
  {
    icon: "🌙",
    title: "Dark & Light Mode",
    desc: "A beautifully crafted dual-theme UI that adapts to your environment — including the map tiles.",
  },
];

// ---------- Page ----------
export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="relative overflow-hidden bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 selection:bg-blue-500/30">

      {/* ── Decorative Blobs ── */}
      <div className="pointer-events-none absolute -top-[30%] -right-[10%] h-[900px] w-[900px] rounded-full bg-gradient-to-tr from-blue-400/25 to-purple-400/25 dark:from-blue-700/35 dark:to-purple-600/35 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-[20%] -left-[10%] h-[700px] w-[700px] rounded-full bg-gradient-to-tr from-teal-400/20 to-blue-500/20 dark:from-teal-500/25 dark:to-blue-900/35 blur-[120px]" />

      {/* ═══════════════════════════════════════
          HERO
      ═══════════════════════════════════════ */}
      <section ref={heroRef} className="relative z-10 flex flex-col items-center justify-center px-4 pt-20 pb-12 text-center lg:pt-28">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="flex flex-col items-center gap-6 max-w-5xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-white/10 bg-white/60 dark:bg-white/5 px-4 py-2 backdrop-blur-md shadow-sm dark:shadow-xl transition-colors"
          >
            <span className="flex h-2 w-2 rounded-full bg-green-500 dark:bg-green-400 animate-pulse" />
            <span className="text-xs font-semibold text-gray-600 dark:text-gray-300 tracking-wide uppercase">XGBoost ML Models Live</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="text-5xl font-extrabold leading-tight tracking-tight sm:text-7xl drop-shadow-sm text-gray-900 dark:text-white"
          >
            Discover your next <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-teal-500 dark:from-blue-400 dark:via-purple-400 dark:to-teal-400 bg-clip-text text-transparent">
              highly profitable
            </span>{" "}
            retail zone.
          </motion.h1>

          {/* Sub */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="max-w-2xl text-lg text-gray-600 dark:text-gray-300 sm:text-xl leading-relaxed"
          >
            MapMyStore analyzes 35+ geospatial features, demographics, and competitive density using advanced Machine Learning to pinpoint where your next business should open.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/dashboard"
              className="group flex items-center justify-center gap-2 rounded-full bg-gray-900 dark:bg-white px-8 py-4 text-sm font-bold text-white dark:text-gray-900 transition-all hover:bg-gray-800 dark:hover:bg-gray-100 hover:scale-105 active:scale-95 h-12 shadow-md"
            >
              Start Analyzing
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <Link
              href="/login"
              className="flex items-center justify-center rounded-full border border-gray-300 dark:border-white/20 bg-white/50 dark:bg-white/5 backdrop-blur px-8 py-4 text-sm font-bold text-gray-700 dark:text-white transition-all hover:bg-gray-100 dark:hover:bg-white/10 h-12"
            >
              Admin Login
            </Link>
          </motion.div>
        </motion.div>

        {/* Dashboard Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 relative w-full max-w-5xl mx-auto"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent to-transparent dark:from-gray-900 z-10 bottom-0 top-[40%]" />
          <div className="rounded-t-2xl border border-gray-200 dark:border-white/10 border-b-0 bg-white/40 dark:bg-gray-800/50 backdrop-blur-xl p-2 sm:p-3 shadow-2xl transition-colors">
            <div className="aspect-[21/9] w-full rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-white/5 overflow-hidden flex relative transition-colors">
              {/* Fake Table */}
              <div className="w-1/3 h-full border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-4 flex flex-col gap-3">
                <div className="h-4 w-32 bg-gray-200 dark:bg-gray-800 rounded" />
                <div className="flex-1 flex flex-col gap-2 mt-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className={`p-3 rounded border ${i === 1 ? "border-blue-500/50 bg-blue-50/50 dark:bg-blue-900/20" : "border-gray-100 dark:border-gray-800"} flex items-center justify-between`}>
                      <div className="flex flex-col gap-1.5">
                        <div className="h-3 w-24 bg-gray-300 dark:bg-gray-700 rounded" />
                        <div className="h-2 w-16 bg-gray-200 dark:bg-gray-800 rounded" />
                      </div>
                      <div className="h-6 w-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                        <div className="h-1.5 w-6 bg-green-500 dark:bg-green-400 rounded-full" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Fake Map */}
              <div className="flex-1 h-full relative bg-[#e5e3df] dark:bg-[#1a1a1a]">
                <div className="absolute inset-0 opacity-40 dark:opacity-10" style={{ backgroundImage: "radial-gradient(#4b5563 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
                <div className="absolute top-[30%] left-[40%] w-4 h-4 bg-blue-500 rounded-full border-2 border-white dark:border-gray-900 shadow-lg animate-bounce" />
                <div className="absolute top-[50%] left-[60%] w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-gray-900 shadow-md" />
                <div className="absolute top-[20%] left-[70%] w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-gray-900 shadow-md" />
                <div className="absolute top-[15%] left-[42%] bg-white dark:bg-gray-800 p-2 rounded shadow-xl border border-gray-200 dark:border-gray-700 w-32 flex flex-col gap-1.5 z-10">
                  <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded" />
                  <div className="h-2 w-2/3 bg-gray-100 dark:bg-gray-600 rounded" />
                </div>
                <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur p-3 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg w-48">
                  <div className="h-2 w-20 bg-gray-300 dark:bg-gray-600 rounded mb-3" />
                  <div className="flex items-end gap-2 h-12">
                    <div className="w-1/4 bg-blue-400 rounded-t h-[40%]" />
                    <div className="w-1/4 bg-blue-500 rounded-t h-[70%]" />
                    <div className="w-1/4 bg-blue-600 rounded-t h-[100%]" />
                    <div className="w-1/4 bg-blue-700 rounded-t h-[60%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════
          STATS BAR
      ═══════════════════════════════════════ */}
      <section className="relative z-10 py-16 px-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              variants={fadeUp}
              custom={i}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 backdrop-blur shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
            >
              <span className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-500 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                {s.value}
              </span>
              <span className="mt-2 text-xs text-gray-500 dark:text-gray-400 font-medium leading-snug">{s.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════
          FEATURES GRID
      ═══════════════════════════════════════ */}
      <section className="relative z-10 py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <FadeInSection className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
              Everything you need to{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-500 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                choose smarter
              </span>
            </h2>
            <p className="mt-4 text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto">
              A full-stack intelligence platform powered by geospatial ML, built for retail entrepreneurs.
            </p>
          </FadeInSection>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                variants={fadeUp}
                custom={i}
                className="group p-6 rounded-2xl bg-white/70 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 backdrop-blur shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-all"
              >
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CTA BANNER
      ═══════════════════════════════════════ */}
      <section className="relative z-10 py-24 px-4">
        <FadeInSection className="max-w-3xl mx-auto text-center">
          <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
            <h2 className="relative text-3xl sm:text-4xl font-extrabold text-white mb-4">Ready to find your perfect spot?</h2>
            <p className="relative text-white/80 text-lg mb-8">Run your free AI analysis in under 2 minutes. No sign-up required for the demo.</p>
            <Link
              href="/dashboard"
              className="relative inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-blue-700 hover:bg-blue-50 transition-all hover:scale-105 active:scale-95 shadow-lg"
            >
              Start Free Analysis
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </FadeInSection>
      </section>

    </div>
  );
}