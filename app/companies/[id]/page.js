"use client";

import companies from "@/data/companies.json";
import { useState, useEffect, use } from "react";

export default function CompanyProfile({ params }) {
  const { id } = use(params);

  const company = companies.find((c) => c.id === id);
  const [notes, setNotes] = useState("");
  const [enrichment, setEnrichment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

    useEffect(() => {
        const saved = localStorage.getItem(`notes-${id}`);
        if (saved) setNotes(saved);
    }, [id]);

  if (!company) return <div>Company not found</div>;
    
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">{company.name}</h1>

      <p className="text-gray-600 mb-4">{company.description}</p>

      <div className="space-y-2">
        <p><b>Category:</b> {company.category}</p>
        <p><b>Location:</b> {company.location}</p>
        <p>
          <b>Website:</b>{" "}
          <a href={company.website} className="text-blue-600">
            {company.website}
          </a>
        </p>
      </div>
        <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Notes</h2>
            <textarea
                className="w-full border p-2 rounded"
                value={notes}
                onChange={(e) => {
                setNotes(e.target.value);
                localStorage.setItem(`notes-${id}`, e.target.value);
                }}
                placeholder="Write notes about this company..."
            ></textarea>
        </div>
        <button
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => {
                const saved = JSON.parse(localStorage.getItem("saved-companies") || "[]");

                if (!saved.find((c) => c.id === company.id)) {
                    saved.push(company);
                    localStorage.setItem("saved-companies", JSON.stringify(saved));
                    alert("Company saved!");
                } else {
                alert("Already saved");
                }
            }
            }
            >
            Save Company
        </button>
        <button
            className="mt-4 ml-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
            onClick={async () => {
                const cacheKey = `enrich-${company.id}`;
                const cached = localStorage.getItem(cacheKey);

                if (cached) {
                    setEnrichment(JSON.parse(cached));
                    return;
                }

                setLoading(true);
                setError(null);

                try {
                    const res = await fetch("/api/enrich", {
                    method: "POST",
                    body: JSON.stringify({ url: company.website })
                    });

                    const data = await res.json();

                    if (data.error) throw new Error();

                    localStorage.setItem(cacheKey, JSON.stringify(data));
                    setEnrichment(data);
                } catch {
                    setError("Failed to enrich company");
                }

                setLoading(false);
            }}
            >
            {loading ? "Enriching..." : "Enrich Company"}
        </button>
        {enrichment && (
            <div className="mt-6 border border-gray-700 p-4 rounded bg-gray-900 text-gray-200 shadow-lg">
                <h2 className="text-xl font-semibold mb-2">Enrichment</h2>

                <p className="mt-2 leading-relaxed">
                    <b>Summary:</b> {enrichment.summary}
                </p>

                <p className="mt-2">
                    <b className="text-white">Keywords:</b> {enrichment.keywords?.join(", ") || "N/A"}
                </p>

                <p className="mt-2">
                    <b className="text-white">Signals:</b> {enrichment.signals?.join(", ") || "N/A"}
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