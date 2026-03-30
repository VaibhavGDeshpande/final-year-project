import Link from "next/link";

export default function MetricsDocsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12">
        <div className="mb-8 border-b pb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Understanding Your MapMyStore Metrics</h1>
          </div>
          <p className="mt-3 text-gray-500 text-lg">A comprehensive guide on how to interpret the AI-driven market intelligence charts and mapping visualizations.</p>
        </div>

        <div className="space-y-10">
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span> 
              Revenue Projection (Bar Chart)
            </h2>
            <div className="prose text-gray-600 max-w-none">
              <p>This chart breaks down the <strong>Estimated Monthly Revenue</strong> mapped directly against the <strong>Success Score</strong> for your top 5 candidate locations.</p>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li><strong>What it means:</strong> It allows you to rapidly compare the absolute highest earnings potential between your premier choices.</li>
                <li><strong>How to use it:</strong> Often, the #1 ranked candidate might have a slightly lower revenue but a vastly superior Success Score. Use this to determine if the extra revenue of candidate #2 is worth the risk!</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span> 
              Success Probability vs Revenue (Scatter Plot)
            </h2>
            <div className="prose text-gray-600 max-w-none">
              <p>This is your most powerful tool for risk assessment. It graphs the <strong>Success Probability</strong> on the X-axis against the <strong>Expected Revenue</strong> on the Y-axis.</p>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li><strong>The Red Dots:</strong> These indicate the AI's Top 3 recommended sites. They should ideally fall in the top-right quadrant (High Probability, High Revenue).</li>
                <li><strong>Bubble Size:</strong> The radius of each point represents the overall Suitability Score of the location.</li>
                <li><strong>How to use it:</strong> Look for outliers. A dot high on the Y-axis but low on the X-axis might be a highly profitable but highly risky location (e.g. very high commercial rent).</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span> 
              Confidence Distribution (Pie Chart)
            </h2>
            <div className="prose text-gray-600 max-w-none">
              <p>The XGBoost ML model evaluates its own prediction accuracy based on historical data patterns matching the current target zone.</p>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li><strong>Levels:</strong> Range from VERY_HIGH to VERY_LOW.</li>
                <li><strong>How to use it:</strong> If you see a large slice of "LOW" confidence, the target city or store type may be lacking sufficient training data in the model, or the competitive landscape is highly unpredictable. Use caution.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center text-sm">4</span> 
              Interactive Map Visualization
            </h2>
            <div className="prose text-gray-600 max-w-none">
              <p>The geographical representation of your candidate hexagon zones mapped over CartoDB Positron maps.</p>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li><strong>Heatmap Layer:</strong> The red/yellow heatmap displays raw <strong>Demand Density</strong>. Dark crimson indicates massive customer aggregations or massive traffic.</li>
                <li><strong>Blue Pins:</strong> Clicking on any pin will reveal the candidate's exact ML estimates (Revenue, Confidence, Probabilities) right over the target ward!</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
