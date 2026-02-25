import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-60 h-screen bg-gray-900 text-white p-4 fixed left-0 top-0 border-r border-gray-700">
      <Link href="/" className="text-xl font-bold mb-6 block hover:text-gray-300">
        VC Scout
      </Link>

      <ul className="space-y-3">
        <li><a href="/companies">Companies</a></li>
        <li><a href="/lists">Lists</a></li>
      </ul>
    </div>
  );
}