import companies from "@/data/companies.json";

export default function CompaniesPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Companies</h1>

      <table className="w-full border">
        <thead>
            <tr className="bg-gray-800 text-white">
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Location</th>
            </tr>
        </thead>

        <tbody>
            {companies.map((c) => (
                <tr key={c.id} className="border border-gray-700 hover:bg-gray-800 transition">
                <td className="p-3">
                    <a href={`/companies/${c.id}`} className="text-blue-500 hover:underline">
                    {c.name}
                    </a>
                </td>
                <td className="p-3">{c.category}</td>
                <td className="p-3">{c.location}</td>
                </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}