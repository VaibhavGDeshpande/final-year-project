"use client";

import { useState } from "react";

// const sections = [
//     { id: "abstract", label: "Abstract" },
//     { id: "introduction", label: "1. Introduction" },
//     { id: "methodology", label: "3. Methodology" },
//     { id: "results", label: "4. Results" },
//     { id: "discussion", label: "5. Discussion" },
//     { id: "conclusion", label: "6. Conclusion" },
//     { id: "references", label: "References" },
// ];

// const modelMetrics = [
//     { category: "Retail Electronics", accuracy: 75.6, precision: 0.836, recall: 0.882, f1: 0.859, auc: 0.631, cv: "81.4% ± 1.4%", color: "from-blue-500 to-cyan-500" },
//     { category: "Retail Fashion", accuracy: 74.5, precision: 0.846, recall: 0.844, f1: 0.845, auc: 0.578, cv: "80.4% ± 0.9%", color: "from-purple-500 to-pink-500" },
//     { category: "Retail General", accuracy: 69.2, precision: 0.791, recall: 0.826, f1: 0.808, auc: 0.545, cv: "75.5% ± 0.5%", color: "from-emerald-500 to-teal-500" },
//     { category: "Food", accuracy: 68.0, precision: 0.765, recall: 0.824, f1: 0.794, auc: 0.620, cv: "71.9% ± 4.1%", color: "from-orange-500 to-amber-500" },
//     { category: "Services", accuracy: 64.0, precision: 0.789, recall: 0.750, f1: 0.769, auc: 0.500, cv: "80.5% ± 1.5%", color: "from-rose-500 to-red-500" },
// ];

export default function ResearchPage() {
    const [activeSection, setActiveSection] = useState("abstract");

    const scrollToSection = (id: string) => {
        setActiveSection(id);
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
            {/* Hero Banner */}
            <div className="relative overflow-hidden bg-linear-to-br from-blue-900 via-indigo-900 to-purple-900 text-white">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-20 w-72 h-72 bg-blue-400 rounded-full blur-3xl" />
                    <div className="absolute bottom-10 right-20 w-96 h-96 bg-purple-400 rounded-full blur-3xl" />
                </div>
                <div className="relative mx-auto max-w-5xl px-6 py-20 text-center">
                    {/* <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-sm text-blue-200 mb-6 backdrop-blur-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
                        Final Year Research Paper · 2025
                    </div> */}
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
                         ML-driven Geospatial Decision Support System for Retail Site Optimization  
                    </h1>
                    {/* <p className="text-lg text-blue-200 mb-4">A Case Study of Pune City</p> */}
                    {/* <div className="flex flex-wrap justify-center gap-3 mt-8">
                        {["XGBoost", "Geospatial Analysis", "SMOTE", "Feature Engineering", "70.3% Accuracy"].map((tag) => (
                            <span key={tag} className="rounded-full bg-white/10 border border-white/20 px-3 py-1 text-xs text-white backdrop-blur-sm">
                                {tag}
                            </span>
                        ))}
                    </div> */}
                </div>
            </div>

            {/* Submission Status Banner */}
            <div className="border-b border-amber-200 dark:border-amber-800/50 bg-amber-50 dark:bg-amber-900/20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div className="flex items-start sm:items-center gap-3">
                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-800/50 mt-0.5 sm:mt-0">
                                <svg className="h-4 w-4 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">
                                    Paper Submitted — Pending Review
                                </p>
                                <p className="text-xs text-amber-700 dark:text-amber-400 mt-0.5">
                                    This paper has been submitted for publication. The full citation, DOI, and official link will be updated here upon acceptance.
                                </p>
                            </div>
                        </div>
                        <a
                            href="#"
                            onClick={(e) => e.preventDefault()}
                            title="Link will be available after acceptance"
                            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-amber-300 dark:border-amber-700 bg-white dark:bg-amber-900/40 px-3 py-1.5 text-xs font-semibold text-amber-700 dark:text-amber-300 cursor-not-allowed opacity-70 select-none"
                            aria-disabled="true"
                        >
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                            DOI / Link — Available After Acceptance
                        </a>
                    </div>
                </div>
            </div>

            {/* <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex gap-10">
                    <aside className="hidden lg:block w-56 shrink-0">
                        <div className="sticky top-24 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-sm">
                            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">Contents</p>
                            <nav className="space-y-1">
                                {sections.map((s) => (
                                    <button
                                        key={s.id}
                                        onClick={() => scrollToSection(s.id)}
                                        className={`w-full text-left rounded-lg px-3 py-2 text-sm transition-all ${
                                            activeSection === s.id
                                                ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium"
                                                : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                                        }`}
                                    >
                                        {s.label}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </aside>


                    <div className="flex-1 min-w-0 space-y-12">


                        <section id="abstract" className="scroll-mt-24">
                            <SectionCard title="Abstract" icon="📄">
                                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
                                        The success of retail businesses heavily depends on location selection, yet traditional methods of site evaluation remain largely subjective and limited in scope.
                                        This research presents a comprehensive machine learning approach to predict retail store success by analyzing geospatial, demographic, and infrastructure data.
                                        Using data from <strong>16,628 retail establishments</strong> across Pune city, we developed category-specific prediction models that achieved an average accuracy of{" "}
                                        <strong>70.3%</strong>, with the best-performing model (Retail Electronics) reaching <strong>75.6% accuracy</strong>. Our approach integrates multiple data sources
                                        including Google Places API, OpenStreetMap, and census data to engineer <strong>35+ features</strong> capturing location quality, accessibility, and market dynamics.
                                    </p>
                                </div>
                            </SectionCard>
                        </section>

                        <section id="introduction" className="scroll-mt-24">
                            <SectionCard title="1. Introduction" icon="🎯">
                                <SubSection title="1.1 Background & Motivation">
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                        Choosing the right location is one of the most critical decisions for retail businesses. A well-chosen location can drive foot traffic, enhance visibility, and ensure long-term profitability,
                                        while a poor location choice often leads to business failure regardless of product quality or service excellence. Traditional location analysis methods rely heavily on manual surveys,
                                        expert intuition, and limited demographic data, making them time-consuming, expensive, and prone to subjective bias.
                                    </p>
                                    <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                                        The rapid growth of geospatial data availability and advances in machine learning present new opportunities to revolutionize retail location intelligence.
                                        Modern data sources like Google Places API, OpenStreetMap, and government census databases provide rich information about existing businesses, infrastructure, demographics, and points of interest.
                                    </p>
                                </SubSection>
                                <SubSection title="1.2 Research Problem">
                                    <ul className="space-y-3">
                                        {[
                                            { title: "Data Integration Complexity", desc: "Retail success depends on multiple factors spanning different data sources and spatial scales, making integration challenging." },
                                            { title: "Category-Specific Requirements", desc: "Different retail types (food, fashion, electronics) have distinct success drivers that generic models fail to capture." },
                                            { title: "Generalizability Issues", desc: "Models trained on specific locations often fail when applied to new areas due to over-reliance on location-specific features." },
                                            { title: "Class Imbalance", desc: "Real-world data shows that most established stores have positive ratings, creating imbalanced datasets that bias model predictions." },
                                        ].map((item) => (
                                            <li key={item.title} className="flex gap-3">
                                                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                                                <div>
                                                    <span className="font-semibold text-gray-800 dark:text-gray-200">{item.title}:</span>{" "}
                                                    <span className="text-gray-600 dark:text-gray-400">{item.desc}</span>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </SubSection>
                                <SubSection title="1.3 Key Contributions">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {[
                                            { icon: "🗃️", title: "Comprehensive Dataset", desc: "16,628 retail stores with rich geospatial features from multiple sources." },
                                            { icon: "⚙️", title: "Novel Feature Engineering", desc: "35+ features including category-specific metrics capturing nuanced success factors." },
                                            { icon: "🌍", title: "Generalizable Models", desc: "Removing location-specific features makes models work for any location in the city." },
                                            { icon: "💡", title: "Practical Insights", desc: "Feature importance analysis reveals actionable insights for each retail category." },
                                        ].map((c) => (
                                            <div key={c.title} className="flex gap-3 rounded-xl border border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800/50">
                                                <span className="text-2xl">{c.icon}</span>
                                                <div>
                                                    <p className="font-semibold text-sm text-gray-900 dark:text-gray-100">{c.title}</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{c.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </SubSection>
                            </SectionCard>
                        </section>


                        <section id="methodology" className="scroll-mt-24">
                            <SectionCard title="3. Methodology" icon="🔬">
                                <SubSection title="3.1 Data Collection">
                                    <div className="grid sm:grid-cols-3 gap-4 mb-4">
                                        {[
                                            { value: "16,628", label: "Retail Stores", icon: "🏪" },
                                            { value: "2,500+", label: "Footfall Generators", icon: "📍" },
                                            { value: "1,800+", label: "Transit Stops", icon: "🚌" },
                                        ].map((stat) => (
                                            <div key={stat.label} className="text-center rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-100 dark:border-blue-800 p-5">
                                                <div className="text-3xl mb-2">{stat.icon}</div>
                                                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stat.value}</div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{stat.label}</div>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                        Our study focuses on Pune city, Maharashtra — a rapidly growing metropolitan area with diverse retail landscapes spanning traditional markets, modern shopping districts, and emerging commercial zones.
                                        Data was collected using Google Places API (grid-based search with 500m × 500m cells), OpenStreetMap Overpass API, and government census databases.
                                    </p>
                                </SubSection>
                                <SubSection title="3.2 Success Label Definition">
                                    <div className="rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20 p-5">
                                        <p className="font-semibold text-emerald-800 dark:text-emerald-300 mb-3">A store is labeled as <em>successful</em> if:</p>
                                        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                                            <li className="flex gap-2"><span className="text-emerald-500">✓</span> Rating ≥ 4.0 AND Total reviews ≥ 50 (established & well-rated), OR</li>
                                            <li className="flex gap-2"><span className="text-emerald-500">✓</span> Rating ≥ 4.5 (exceptional quality regardless of establishment time)</li>
                                        </ul>
                                        <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">Approximately 78% of stores are labeled successful, reflecting natural survival bias in the dataset.</p>
                                    </div>
                                </SubSection>
                                <SubSection title="3.3 Feature Engineering (35+ Features)">
                                    <div className="grid sm:grid-cols-2 gap-3">
                                        {[
                                            { title: "Base Location Features", items: ["Coordinates", "Distance to city center", "Distance to locality/ward center"] },
                                            { title: "Competition Features", items: ["Competitor count (1km radius)", "Nearest competitor distance", "Competition density"] },
                                            { title: "Infrastructure & Accessibility", items: ["Road density", "Transit stop count & distance", "Commercial rent by zone"] },
                                            { title: "Demographic & Economic", items: ["Population density", "Average monthly income", "Purchasing power index"] },
                                            { title: "Footfall Features", items: ["Generator count (malls, colleges, IT parks)", "Nearest generator distance", "Transit accessibility score"] },
                                            { title: "Engineered Composite Features", items: ["Footfall accessibility score", "Rent-to-income ratio", "Market saturation index"] },
                                        ].map((group) => (
                                            <div key={group.title} className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-900">
                                                <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide mb-2">{group.title}</p>
                                                <ul className="space-y-1">
                                                    {group.items.map((item) => (
                                                        <li key={item} className="text-xs text-gray-600 dark:text-gray-400 flex gap-1.5">
                                                            <span className="text-blue-400">—</span> {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </SubSection>
                                <SubSection title="3.4 Model Development">
                                    <div className="flex gap-4 flex-wrap">
                                        {[
                                            { name: "Algorithm", val: "XGBoost", note: "Superior on tabular data, built-in regularization" },
                                            { name: "Imbalance Handling", val: "SMOTE", note: "Synthetic minority oversampling on training set only" },
                                            { name: "Validation", val: "5-Fold CV", note: "Stratified cross-validation, 80/20 train-test split" },
                                        ].map((m) => (
                                            <div key={m.name} className="flex-1 min-w-40 rounded-xl border border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-900 text-center">
                                                <p className="text-xs text-gray-400 uppercase tracking-wide">{m.name}</p>
                                                <p className="text-xl font-bold text-gray-900 dark:text-gray-100 mt-1">{m.val}</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{m.note}</p>
                                            </div>
                                        ))}
                                    </div>
                                </SubSection>
                            </SectionCard>
                        </section>


                        <section id="results" className="scroll-mt-24">
                            <SectionCard title="4. Results & Analysis" icon="📊">
                                <SubSection title="4.1 Model Performance Summary">
                                    <div className="space-y-4">
                                        {modelMetrics.map((m) => (
                                            <div key={m.category} className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5">
                                                <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`h-3 w-3 rounded-full bg-gradient-to-r ${m.color}`} />
                                                        <span className="font-semibold text-gray-900 dark:text-gray-100">{m.category}</span>
                                                    </div>
                                                    <span className={`text-sm font-bold bg-gradient-to-r ${m.color} bg-clip-text text-transparent`}>
                                                        {m.accuracy}% Accuracy
                                                    </span>
                                                </div>
                                                <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2 mb-4">
                                                    <div
                                                        className={`h-2 rounded-full bg-gradient-to-r ${m.color} transition-all duration-700`}
                                                        style={{ width: `${m.accuracy}%` }}
                                                    />
                                                </div>
                                                <div className="grid grid-cols-4 gap-3 text-center">
                                                    {[
                                                        { label: "Precision", val: m.precision.toFixed(3) },
                                                        { label: "Recall", val: m.recall.toFixed(3) },
                                                        { label: "F1-Score", val: m.f1.toFixed(3) },
                                                        { label: "AUC", val: m.auc.toFixed(3) },
                                                    ].map((metric) => (
                                                        <div key={metric.label}>
                                                            <p className="text-xs text-gray-400">{metric.label}</p>
                                                            <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm">{metric.val}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 p-5 text-white">
                                        <div className="grid grid-cols-3 gap-4 text-center">
                                            <div><p className="text-blue-200 text-xs">Avg Accuracy</p><p className="text-2xl font-bold">70.3%</p></div>
                                            <div><p className="text-blue-200 text-xs">Avg Precision</p><p className="text-2xl font-bold">0.805</p></div>
                                            <div><p className="text-blue-200 text-xs">Avg F1-Score</p><p className="text-2xl font-bold">0.815</p></div>
                                        </div>
                                    </div>
                                </SubSection>
                                <SubSection title="4.2 Key Feature Importance Findings">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {[
                                            { category: "🍽️ Food", factors: ["Footfall generator count (0.105)", "Footfall accessibility score (0.087)", "Transit stop count (0.076)", "Evening potential (0.071)"] },
                                            { category: "📱 Electronics", factors: ["Footfall generator count (0.089)", "High-value customer score (0.078)", "Transit accessibility score (0.071)", "Tech hub proximity (0.065)"] },
                                            { category: "👗 Fashion", factors: ["Visibility score (0.092)", "Shopping district score (0.084)", "Footfall accessibility (0.079)", "Income sensitivity (0.073)"] },
                                            { category: "🛍️ Retail General", factors: ["Footfall accessibility (top)", "Market opportunities", "Affordable rent", "Balanced competition"] },
                                        ].map((cat) => (
                                            <div key={cat.category} className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-900">
                                                <p className="font-semibold text-gray-900 dark:text-gray-100 mb-3">{cat.category}</p>
                                                <ol className="space-y-1.5">
                                                    {cat.factors.map((f, i) => (
                                                        <li key={f} className="flex gap-2 text-xs text-gray-600 dark:text-gray-400">
                                                            <span className="font-bold text-blue-500 w-4">{i + 1}.</span> {f}
                                                        </li>
                                                    ))}
                                                </ol>
                                            </div>
                                        ))}
                                    </div>
                                </SubSection>
                            </SectionCard>
                        </section>


                        <section id="discussion" className="scroll-mt-24">
                            <SectionCard title="5. Discussion" icon="💬">
                                <SubSection title="5.1 Key Findings">
                                    <div className="space-y-4">
                                        {[
                                            { num: "1", title: "Category-Specific Modeling is Essential", desc: "Different retail types have fundamentally different success drivers. Generic models achieve 5-8% lower accuracy than our category-specific approach." },
                                            { num: "2", title: "Engineered Features Outperform Raw Data", desc: "Composite features like footfall accessibility score and visibility score consistently rank among top predictors, capturing complex interactions." },
                                            { num: "3", title: "Generalizability Requires Careful Feature Design", desc: "Removing location-specific features reduces training accuracy by 2-3% but enables generalization to new areas." },
                                            { num: "4", title: "Class Imbalance Handling is Critical", desc: "Without SMOTE, models achieved 85%+ accuracy by predicting 'success' for all cases — useless for practical applications." },
                                            { num: "5", title: "Accessibility Dominates Location Quality", desc: "Across all categories, accessibility features consistently rank as top predictors — redefining 'location, location, location' as 'accessibility, accessibility, accessibility.'" },
                                        ].map((item) => (
                                            <div key={item.num} className="flex gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-bold text-sm">
                                                    {item.num}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{item.title}</p>
                                                    <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">{item.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </SubSection>
                                <SubSection title="5.3 Limitations">
                                    <ul className="space-y-2">
                                        {[
                                            "Google Places ratings may suffer from selection bias — satisfied customers are more likely to leave reviews",
                                            "Data represents a single point in time, missing seasonal variations and temporal trends",
                                            "Services category (123 stores) and Health (19 stores) have limited data, reducing model reliability",
                                            "Models cannot capture qualitative factors like brand reputation, product quality, or store ambiance",
                                            "Applying models to other cities requires retraining with local data",
                                        ].map((lim) => (
                                            <li key={lim} className="flex gap-2 text-sm text-gray-600 dark:text-gray-400">
                                                <span className="text-amber-500 shrink-0 mt-0.5">⚠</span> {lim}
                                            </li>
                                        ))}
                                    </ul>
                                </SubSection>
                            </SectionCard>
                        </section>


                        <section id="conclusion" className="scroll-mt-24">
                            <SectionCard title="6. Conclusion & Future Work" icon="🚀">
                                <SubSection title="6.1 Summary">
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                        This research successfully developed a comprehensive machine learning system for predicting retail store success in urban areas, achieving a <strong>70.3% average accuracy</strong> and{" "}
                                        <strong>75.6%</strong> for the best-performing category (Retail Electronics). Our approach, combining XGBoost with comprehensive geospatial feature engineering and SMOTE-based class balancing,
                                        meaningfully advances over traditional (60–65%) and basic ML (62–68%) approaches.
                                    </p>
                                </SubSection>
                                <SubSection title="6.2 Future Directions">
                                    <div className="grid sm:grid-cols-3 gap-4">
                                        {[
                                            { icon: "⏱️", title: "Temporal Analysis", desc: "Seasonal trends, store longevity prediction, and early warning systems for declining stores." },
                                            { icon: "📡", title: "New Data Sources", desc: "Social media sentiment, parking availability, crime statistics, and pedestrian traffic counts." },
                                            { icon: "🧠", title: "Advanced Modeling", desc: "Ensemble methods, Graph Neural Networks, and transfer learning from other cities." },
                                            { icon: "🌐", title: "Multi-City Deployment", desc: "Identify universal vs. city-specific factors and enable national-level retail intelligence." },
                                            { icon: "💰", title: "Revenue Prediction", desc: "Extend from binary classification to regression — predict monthly revenue and ROI." },
                                            { icon: "📱", title: "Real-Time App", desc: "Interactive web-based map with real-time predictions and what-if scenario analysis." },
                                        ].map((item) => (
                                            <div key={item.title} className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-900">
                                                <div className="text-2xl mb-2">{item.icon}</div>
                                                <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{item.title}</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </SubSection>
                            </SectionCard>
                        </section>


                        <section id="references" className="scroll-mt-24">
                            <SectionCard title="References" icon="📚">
                                <ol className="space-y-4">
                                    {[
                                        "Chen, T., & Guestrin, C. (2016). XGBoost: A scalable tree boosting system. Proceedings of the 22nd ACM SIGKDD International Conference on Knowledge Discovery and Data Mining, 785–794.",
                                        "Chawla, N. V., Bowyer, K. W., Hall, L. O., & Kegelmeyer, W. P. (2002). SMOTE: Synthetic minority over-sampling technique. Journal of Artificial Intelligence Research, 16, 321–357.",
                                        "Pedregosa, F., et al. (2011). Scikit-learn: Machine learning in Python. Journal of Machine Learning Research, 12, 2825–2830.",
                                        "Jordahl, K., et al. (2020). geopandas/geopandas: v0.8.1. Zenodo.",
                                        "Google Places API Documentation. https://developers.google.com/maps/documentation/places/web-service",
                                        "OpenStreetMap Contributors. (2023). OpenStreetMap. https://www.openstreetmap.org",
                                        "Census of India. (2011). Population and demographic data. https://censusindia.gov.in",
                                    ].map((ref, i) => (
                                        <li key={i} className="flex gap-3 text-sm text-gray-600 dark:text-gray-400">
                                            <span className="font-bold text-blue-500 shrink-0 w-6">[{i + 1}]</span>
                                            {ref}
                                        </li>
                                    ))}
                                </ol>
                            </SectionCard>
                        </section>
                    </div>
                </div>
            </div> */}
        </div>
    );
}

// function SectionCard({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
//     return (
//         <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm overflow-hidden">
//             <div className="flex items-center gap-3 border-b border-gray-100 dark:border-gray-800 px-6 py-4">
//                 <span className="text-xl">{icon}</span>
//                 <h2 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h2>
//             </div>
//             <div className="p-6 space-y-8">{children}</div>
//         </div>
//     );
// }

// function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
//     return (
//         <div>
//             <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">{title}</h3>
//             {children}
//         </div>
//     );
// }
