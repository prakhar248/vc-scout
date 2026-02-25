export default function Sidebar() {
  return (
    <div className="w-60 h-screen bg-gray-900 text-white p-4">
      <h1 className="text-xl font-bold mb-6">VC Scout</h1>

      <ul className="space-y-3">
        <li><a href="/companies">Companies</a></li>
        <li><a href="/lists">Lists</a></li>
        <li><a href="/saved">Saved</a></li>
      </ul>
    </div>
  );
}