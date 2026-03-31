"use client";

const teamMembers = [
    {
        name: "Prathamesh Gaikwad (Leader)",
        role: "ML Model training and apis management",
        contribution: "Led data collection pipelines using Google Places API and OpenStreetMap, implemented spatial data processing and census data integration.",
        skills: ["Data Engineering", "Python", "PostgreSQL", "REST APIs", "XGBoost"],
        gradient: "from-purple-500 to-pink-600",
        initials: "PG",

    },
    {
        name: "Sushant Suryawanshi",
        role: "ML Model Training and research",
        contribution: "Designed and implemented the XGBoost ML pipeline, feature engineering framework.",
        skills: ["Machine Learning", "XGBoost", "Next.js", "FastAPI", "Geospatial Analysis"],
        gradient: "from-blue-500 to-indigo-600",
        initials: "SS",

    },
    {
        name: "Vaibhav Ganesh Deshpande",
        role: "Full-stack Nextjs and research",
        contribution: "Conducted the literature review, performed statistical analysis, designed the success label criteria, and created data visualizations.",
        skills: ["Research", "Statistics", "GIS", "Data Visualization", "Pandas"],
        gradient: "from-emerald-500 to-teal-600",
        initials: "VD",

    },
    {
        name: "Vedant Deshmukh",
        role: "ML Researcher & Data Scientist",
        contribution: "Developed category-specific feature engineering, tuned XGBoost hyperparameters, implemented SMOTE-based class balancing, and analyzed model performance metrics.",
        skills: ["Scikit-learn", "SMOTE", "Model Evaluation", "Feature Engineering", "NumPy"],
        gradient: "from-orange-500 to-red-600",
        initials: "VD",

    },
];

const supervisors = [
    {
        name: "Professor Pooja Mane",
        title: "Project Guide",
        institution: "PVGCOETM- Pune Vidyarthi Gruha's College of Engineering, Technology and Management",
        note: "Provided guidance on research methodology, model selection, and paper structure.",
        initials: "PM",
        gradient: "from-slate-500 to-slate-700",
    },
];

const project = {
    title: " ML-driven Geospatial Decision Support System for Retail Site Optimization  ",
    institution: "PVGCOETM- Pune Vidyarthi Gruha's College of Engineering, Technology and Management",
    department: "Department of Computer Engineering",
    year: "2026",
    degree: "Bachelor of Engineering (B.E.) — Final Year Project",
};

export default function TeamPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">

            {/* Hero */}
            <div className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-blue-500 opacity-10 blur-3xl" />
                    <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-pink-500 opacity-10 blur-3xl" />
                    <div className="absolute bottom-0 left-1/2 w-80 h-80 rounded-full bg-purple-500 opacity-10 blur-3xl" />
                    {/* Dot grid */}
                    <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="dots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                                <circle cx="2" cy="2" r="1.5" fill="white" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#dots)" />
                    </svg>
                </div>

                <div className="relative mx-auto max-w-4xl px-6 py-20 text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-500/10 px-4 py-1.5 text-sm text-purple-200 mb-6 backdrop-blur-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                        Final Year Project · {project.year}
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">Our Team</h1>
                    <p className="text-purple-200 text-lg mb-2">{project.institution}</p>
                    <p className="text-purple-300 text-sm">{project.department} · {project.degree}</p>
                </div>
            </div>

            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 space-y-16">

                {/* Project Card */}
                <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                        <p className="text-xs font-semibold text-blue-200 uppercase tracking-widest">Research Project</p>
                    </div>
                    <div className="p-6 sm:p-8">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2 leading-snug">{project.title}</h2>
                        <div className="grid sm:grid-cols-3 gap-4">
                            {[
                                { label: "Institution", value: project.institution },
                                { label: "Department", value: project.department },
                                { label: "Academic Year", value: project.year },
                            ].map((item) => (
                                <div key={item.label} className="rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 p-4">
                                    <p className="text-xs text-gray-400 uppercase tracking-wide">{item.label}</p>
                                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mt-1">{item.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Team Members */}
                <div>
                    <div className="text-center mb-10">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Team Members</h2>
                        <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm">The engineers and researchers behind MapMyStore</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                        {teamMembers.map((member, idx) => (
                            <div
                                key={member.name}
                                className="group relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                            >
                                {/* Top gradient bar */}
                                <div className={`h-1.5 bg-gradient-to-r ${member.gradient}`} />

                                <div className="p-6">
                                    <div className="flex items-start gap-4 mb-4">
                                        {/* Avatar */}
                                        <div className={`relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${member.gradient} text-white shadow-lg`}>
                                            <span className="text-lg font-bold">{member.initials}</span>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 dark:text-white text-lg leading-tight">{member.name}</h3>
                                            <p className={`text-sm font-medium bg-gradient-to-r ${member.gradient} bg-clip-text text-transparent`}>{member.role}</p>
                                        </div>
                                    </div>

                                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{member.contribution}</p>

                                    {/* Skills */}
                                    <div className="flex flex-wrap gap-2">
                                        {member.skills.map((skill) => (
                                            <span
                                                key={skill}
                                                className="rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-2.5 py-0.5 text-xs text-gray-600 dark:text-gray-400 font-medium"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Member number badge */}
                                    <div className={`absolute top-4 right-4 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br ${member.gradient} text-white text-xs font-bold opacity-20 group-hover:opacity-100 transition-opacity`}>
                                        {String(idx + 1).padStart(2, "0")}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Supervisor */}
                <div>
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Project Supervisor</h2>
                        <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm">Under the guidance of</p>
                    </div>
                    <div className="flex justify-center">
                        {supervisors.map((sup) => (
                            <div
                                key={sup.name}
                                className="max-w-lg w-full rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm p-6"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${sup.gradient} text-white shadow-md`}>
                                        <span className="font-bold text-base">{sup.initials}</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-white">{sup.name}</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{sup.title}</p>
                                        <p className="text-xs text-blue-600 dark:text-blue-400 mt-0.5">{sup.institution}</p>
                                    </div>
                                </div>
                                <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-xl px-4 py-3 italic">&ldquo;{sup.note}&rdquo;</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Project Stats */}
                <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-8">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-8">Project at a Glance</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
                        {[
                            { value: "16,628", label: "Retail Stores Analyzed", icon: "🏪" },
                            { value: "82%", label: "Avg Model Accuracy", icon: "🎯" },
                            { value: "35+", label: "Engineered Features", icon: "⚙️" },
                            { value: "5", label: "Retail Categories", icon: "📂" },
                        ].map((stat) => (
                            <div key={stat.label} className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
                                <p className="text-2xl mb-2">{stat.icon}</p>
                                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stat.value}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Acknowledgements */}
                <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 text-center">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Acknowledgements</h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed text-sm">
                        We would like to thank the faculty and staff of the Department of Computer Engineering at PVGCOETM for their support throughout this project.
                        We are grateful for the open-source communities behind <strong>XGBoost</strong>, <strong>Scikit-learn</strong>, <strong>OpenStreetMap</strong>, and <strong>GeoPandas</strong>,
                        which made this research possible. We also thank <strong>Google</strong> for providing access to the Places API under their academic research program.
                    </p>
                    <div className="mt-6 flex flex-wrap justify-center gap-3">
                        {["XGBoost", "Scikit-learn", "Next.js", "FastAPI", "Google Places API", "OpenStreetMap", "GeoPandas", "SMOTE"].map((tech) => (
                            <span key={tech} className="rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-1 text-xs text-gray-600 dark:text-gray-400">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
