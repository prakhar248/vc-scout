"use client";

import { useState, useMemo } from "react";
import companies from "@/data/companies.json";

export default function CompaniesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Extract unique categories
  const categories = useMemo(() => {
    return [...new Set(companies.map((c) => c.category))].sort();
  }, []);

  // Filter companies based on search term and category
  const filteredCompanies = useMemo(() => {
    return companies.filter((company) => {
      const matchesSearch =
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || company.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Companies</h1>

      {/* Search and Filter Section */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:gap-4">
        <input
          type="text"
          placeholder="Search by name or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-700 rounded bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition duration-200"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-gray-700 rounded bg-gray-900 text-white focus:outline-none focus:border-blue-500 transition duration-200"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Results Count */}
      <p className="text-gray-400 mb-4">
        Showing {filteredCompanies.length} of {companies.length} companies
      </p>

      {/* Table */}
      <table className="w-full border border-gray-700">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Category</th>
            <th className="p-3 text-left">Location</th>
          </tr>
        </thead>

        <tbody>
          {filteredCompanies.map((c) => (
            <tr
              key={c.id}
              className="border-b border-gray-700 hover:bg-gray-700 transition duration-200"
            >
              <td className="p-3">
                <a
                  href={`/companies/${c.id}`}
                  className="text-blue-500 hover:text-blue-400 hover:underline transition duration-200"
                >
                  {c.name}
                </a>
              </td>
              <td className="p-3 text-gray-300">{c.category}</td>
              <td className="p-3 text-gray-300">{c.location}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* No Results Message */}
      {filteredCompanies.length === 0 && (
        <p className="text-center text-gray-400 mt-6">
          No companies found. Try adjusting your filters.
        </p>
      )}
    </div>
  );
}