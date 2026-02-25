"use client";

import companies from "@/data/companies.json";
import { useState, useEffect, use } from "react";

export default function CompanyProfile({ params }) {
  const { id } = use(params);

  const company = companies.find((c) => c.id === id);
  const [notes, setNotes] = useState("");
  const [enrichment, setEnrichment] = useState(null);
  const [enrichmentTime, setEnrichmentTime] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem(`notes-${id}`);
    if (saved) setNotes(saved);

    // Load cached enrichment and timestamp
    const cacheKey = `enrich-${id}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      setEnrichment(JSON.parse(cached));
      const timeKey = `enrich-time-${id}`;
      const cachedTime = localStorage.getItem(timeKey);
      if (cachedTime) setEnrichmentTime(new Date(cachedTime));
    }
  }, [id]);

  if (!company) return <div>Company not found</div>;

  const handleEnrich = async () => {
    const cacheKey = `enrich-${company.id}`;
    const cached = localStorage.getItem(cacheKey);

    if (cached) {
      setEnrichment(JSON.parse(cached));
      const timeKey = `enrich-time-${company.id}`;
      const cachedTime = localStorage.getItem(timeKey);
      if (cachedTime) setEnrichmentTime(new Date(cachedTime));
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/enrich", {
        method: "POST",
        body: JSON.stringify({ url: company.website }),
      });

      const data = await res.json();

      if (data.error) throw new Error();

      localStorage.setItem(cacheKey, JSON.stringify(data));
      const timeKey = `enrich-time-${company.id}`;
      const now = new Date();
      localStorage.setItem(timeKey, now.toISOString());
      setEnrichment(data);
      setEnrichmentTime(now);
    } catch {
      setError("Failed to enrich company");
    }

    setLoading(false);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">{company.name}</h1>

      <p className="text-gray-400 mb-4">{company.description}</p>

      <div className="space-y-2">
        <p>
          <b>Category:</b> {company.category}
        </p>
        <p>
          <b>Location:</b> {company.location}
        </p>
        <p>
          <b>Website:</b>{" "}
          <a
            href={company.website}
            className="text-blue-500 hover:text-blue-400 hover:underline transition duration-200"
          >
            {company.website}
          </a>
        </p>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Notes</h2>
        <textarea
          className="w-full border border-gray-700 p-3 rounded bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition duration-200"
          value={notes}
          onChange={(e) => {
            setNotes(e.target.value);
            localStorage.setItem(`notes-${id}`, e.target.value);
          }}
          placeholder="Write notes about this company..."
        ></textarea>
      </div>

      <div className="mt-6 flex gap-3 flex-wrap">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition duration-200 hover:shadow-lg cursor-pointer"
          onClick={() => {
            const saved = JSON.parse(
              localStorage.getItem("saved-companies") || "[]"
            );

            if (!saved.find((c) => c.id === company.id)) {
              saved.push(company);
              localStorage.setItem("saved-companies", JSON.stringify(saved));
              alert("Company saved!");
            } else {
              alert("Already saved");
            }
          }}
        >
          Save Company
        </button>

        <button
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition duration-200 hover:shadow-lg cursor-pointer disabled:opacity-50"
          onClick={handleEnrich}
          disabled={loading}
        >
          {loading ? "Enriching..." : "Enrich Company"}
        </button>

        {error && (
          <button
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded transition duration-200 hover:shadow-lg cursor-pointer"
            onClick={handleEnrich}
          >
            Retry
          </button>
        )}
      </div>

      {enrichment && (
        <div className="mt-6 border border-gray-700 p-4 rounded bg-gray-900 text-gray-200 shadow-lg hover:shadow-xl hover:border-gray-500 transition duration-200">
          <div>
            <h2 className="text-xl font-semibold mb-2">Enrichment</h2>
            {enrichmentTime && (
              <p className="text-xs text-gray-500 mb-4">
                Fetched: {enrichmentTime.toLocaleString()}
              </p>
            )}
          </div>

          <p className="mt-2 leading-relaxed">
            <b>Summary:</b> {enrichment.summary}
          </p>

          <p className="mt-2">
            <b className="text-white">Keywords:</b>{" "}
            {enrichment.keywords?.join(", ") || "N/A"}
          </p>

          <p className="mt-2">
            <b className="text-white">Signals:</b>{" "}
            {enrichment.signals?.join(", ") || "N/A"}
          </p>

          <p className="mt-2 text-sm text-gray-400">
            Source: {enrichment.sources?.[0] || "N/A"}
          </p>
        </div>
      )}

      {error && (
        <p className="mt-4 text-red-500 text-sm">{error}</p>
      )}
    </div>
  );
}