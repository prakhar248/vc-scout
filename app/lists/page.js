"use client";

import { useEffect, useState } from "react";

export default function ListsPage() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("saved-companies") || "[]");
    setCompanies(saved);
  }, []);

  const removeCompany = (id) => {
    const updated = companies.filter((c) => c.id !== id);
    setCompanies(updated);
    localStorage.setItem("saved-companies", JSON.stringify(updated));
  };

  const exportJSON = () => {
    const data = localStorage.getItem("saved-companies") || "[]";
    const blob = new Blob([data], { type: "application/json" });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "saved-companies.json";
    a.click();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Saved Companies</h1>

      <button
        className="mb-6 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition duration-200 cursor-pointer"
        onClick={exportJSON}
      >
        Export JSON
      </button>

      {companies.length === 0 && (
        <p className="text-gray-400">No companies saved yet</p>
      )}

      <ul className="space-y-3">
        {companies.map((c) => (
          <li
            key={c.id}
            className="border border-gray-700 p-4 rounded hover:bg-gray-800 transition duration-200"
          >
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <h2 className="font-semibold text-white">{c.name}</h2>
                <p className="text-gray-400">{c.category}</p>
              </div>
              <button
                onClick={() => removeCompany(c.id)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm whitespace-nowrap transition duration-200 cursor-pointer"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}