export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">VC Scout Dashboard</h1>

      <p className="mt-2 text-sm text-gray-400">
        Built for VC sourcing workflows
    </p>
      <p className="text-gray-500 mb-6">
        Discover and enrich startup leads using AI-powered scouting.
      </p>

      <div className="space-x-4">
        <a
          href="/companies"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Browse Companies
        </a>

        <a
          href="/lists"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          View Saved Lists
        </a>
      </div>
    </div>
  );
}