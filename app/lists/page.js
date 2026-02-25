"use client";

import { useEffect, useState } from "react";

export default function ListsPage() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("saved-companies") || "[]");
    setCompanies(saved);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Saved Companies</h1>

      <button
        className="mb-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        onClick={() => {
          const data = localStorage.getItem("saved-companies") || "[]";
          const blob = new Blob([data], { type: "application/json" });

          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "saved-companies.json";
          a.click();
        }}
      >
        Export JSON
      </button>

      {companies.length === 0 && <p>No companies saved yet</p>}

      <ul className="space-y-3">
        {companies.map((c) => (
          <li key={c.id} className="border p-3 rounded">
            <h2 className="font-semibold">{c.name}</h2>
            <p className="text-gray-500">{c.category}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}