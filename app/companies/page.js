import companies from "@/data/companies.json";

export default function CompaniesPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Companies</h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>Name</th>
            <th>Category</th>
            <th>Location</th>
          </tr>
        </thead>

        <tbody>
          {companies.map((c) => (
            <tr key={c.id} className="border">
              <td>
                <a href={`/companies/${c.id}`} className="text-blue-600">
                  {c.name}
                </a>
              </td>
              <td>{c.category}</td>
              <td>{c.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}