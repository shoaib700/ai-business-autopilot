import { useEffect, useState } from "react";

export default function Dashboard() {
  const [visitors7Days, setVisitors7Days] = useState(null);
  const [gaError, setGaError] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch Google Analytics visitors
  useEffect(() => {
    fetch("/api/analytics")
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          setGaError(true);
        } else {
          setVisitors7Days(data.activeUsers || 0);
        }
      })
      .catch(() => setGaError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">AI Business Autopilot Dashboard</h1>

      {/* Section: Google Analytics Status */}
      <div className="mt-4 p-4 border rounded-lg bg-gray-50">
        <h2 className="text-lg font-semibold mb-2">Google Analytics Status</h2>

        {!gaError && (
          <p className="text-gray-700 mb-2">
            Google Analytics is connected.  
            For detailed traffic, open the Analytics Dashboard:
          </p>
        )}

        {/* Open Analytics Button */}
        <a
          href="https://analytics.google.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline font-semibold"
        >
          Open Google Analytics
        </a>

        {/* Error Fallback */}
        {gaError && (
          <div className="mt-4 p-4 bg-yellow-100 rounded-md">
            <p className="text-gray-800 font-medium">
              GA4 API is not returning data.  
              Click the button above to view full stats directly.
            </p>
          </div>
        )}
      </div>

      {/* Section: Visitors Last 7 Days */}
      <div className="mt-6 p-4 border rounded-lg bg-white shadow-sm">
        <h2 className="text-lg font-semibold mb-2">Visitors (Last 7 Days)</h2>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : gaError ? (
          <p className="text-gray-500">Analytics API unavailable.</p>
        ) : (
          <p className="text-2xl font-bold text-gray-900">
            {visitors7Days}
          </p>
        )}
      </div>
    </div>
  );
}
