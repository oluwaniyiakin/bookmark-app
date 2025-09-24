"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">📑 Bookmark App</h1>
      <div className="flex gap-4">
        <Link href="/">Home</Link>
        <Link href="/bookmarks">Bookmarks</Link>
        <Link href="/login">Login</Link>
      </div>
    </nav>
  );
}
