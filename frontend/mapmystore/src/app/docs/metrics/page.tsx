import Link from "next/link";

export default function MetricsDocsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-8 sm:p-12 transition-colors">
        <div className="mb-8 border-b border-gray-100 dark:border-gray-800 pb-6 transition-colors">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight transition-colors">Understanding Your MapMyStore Metrics</h1>
          </div>
          <p className="mt-3 text-gray-500 dark:text-gray-400 text-lg transition-colors">A comprehensive guide on how to interpret the AI-driven market intelligence charts and mapping visualizations.</p>
        </div>

        <div className="space-y-10">
          <section>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2 transition-colors">
              <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors">1</span> 
              Revenue Projection (Bar Chart)
            </h2>
            <div className="prose text-gray-600 dark:text-gray-300 max-w-none transition-colors">
              <p>This chart breaks down the <strong>Estimated Monthly Revenue</strong> mapped directly against the <strong>Success Score</strong> for your top 5 candidate locations.</p>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li><strong className="text-gray-800 dark:text-gray-200">What it means:</strong> It allows you to rapidly compare the absolute highest earnings potential between your premier choices.</li>
                <li><strong className="text-gray-800 dark:text-gray-200">How to use it:</strong> Often, the #1 ranked candidate might have a slightly lower revenue but a vastly superior Success Score. Use this to determine if the extra revenue of candidate #2 is worth the risk!</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2 transition-colors">
              <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors">2</span> 
              Success Probability vs Revenue (Scatter Plot)
            </h2>
            <div className="prose text-gray-600 dark:text-gray-300 max-w-none transition-colors">
              <p>This is your most powerful tool for risk assessment. It graphs the <strong>Success Probability</strong> on the X-axis against the <strong>Expected Revenue</strong> on the Y-axis.</p>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li><strong className="text-gray-800 dark:text-gray-200">The Red Dots:</strong> These indicate the AI's Top 3 recommended sites. They should ideally fall in the top-right quadrant (High Probability, High Revenue).</li>
                <li><strong className="text-gray-800 dark:text-gray-200">Bubble Size:</strong> The radius of each point represents the overall Suitability Score of the location.</li>
                <li><strong className="text-gray-800 dark:text-gray-200">How to use it:</strong> Look for outliers. A dot high on the Y-axis but low on the X-axis might be a highly profitable but highly risky location (e.g. very high commercial rent).</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2 transition-colors">
              <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors">3</span> 
              Confidence Distribution (Pie Chart)
            </h2>
            <div className="prose text-gray-600 dark:text-gray-300 max-w-none transition-colors">
              <p>The XGBoost ML model evaluates its own prediction accuracy based on historical data patterns matching the current target zone.</p>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li><strong className="text-gray-800 dark:text-gray-200">Levels:</strong> Range from VERY_HIGH to VERY_LOW.</li>
                <li><strong className="text-gray-800 dark:text-gray-200">How to use it:</strong> If you see a large slice of "LOW" confidence, the target city or store type may be lacking sufficient training data in the model, or the competitive landscape is highly unpredictable. Use caution.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2 transition-colors">
              <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors">4</span> 
              Interactive Map Visualization
            </h2>
            <div className="prose text-gray-600 dark:text-gray-300 max-w-none transition-colors">
              <p>The geographical representation of your candidate hexagon zones mapped over CartoDB Positron maps.</p>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li><strong className="text-gray-800 dark:text-gray-200">Heatmap Layer:</strong> The red/yellow heatmap displays raw <strong>Demand Density</strong>. Dark crimson indicates massive customer aggregations or massive traffic.</li>
                <li><strong className="text-gray-800 dark:text-gray-200">Blue Pins:</strong> Clicking on any pin will reveal the candidate's exact ML estimates (Revenue, Confidence, Probabilities) right over the target ward!</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
