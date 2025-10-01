"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Left side - Brand */}
      <Link href="/" className="text-xl font-bold text-blue-600">
        📑 DevBookmark
      </Link>

      {/* Middle - Navigation Links */}
      <div className="flex gap-6">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <Link href="/bookmarks" className="hover:underline">
          Bookmarks
        </Link>
      </div>

      {/* Right side - Auth Section */}
      <div>
        {status === "loading" ? (
          <p className="text-gray-500">Loading...</p>
        ) : session ? (
          <div className="flex items-center gap-4">
            {/* Show user profile image if available */}
            {session.user?.image && (
              <img
                src={session.user.image}
                alt={session.user.name ?? "User"}
                className="w-8 h-8 rounded-full border"
              />
            )}
            <span className="text-gray-700 font-medium">
              {session.user?.name ?? "User"}
            </span>
            <button
              onClick={() => signOut()}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => signIn("github")}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Login with GitHub
          </button>
        )}
      </div>
    </nav>
  );
}
