"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface Bookmark {
  id: string;
  title: string;
  url: string;
  description?: string;
  createdAt: string;
}

export default function BookmarksPage() {
  const { data: session, status } = useSession();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Fetch bookmarks on page load
  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/bookmarks")
        .then((res) => res.json())
        .then((data) => setBookmarks(data))
        .catch((err) => console.error("Error fetching bookmarks:", err));
    }
  }, [status]);

  // ✅ Add new bookmark
  const addBookmark = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/bookmarks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, url, description }),
    });

    if (res.ok) {
      const newBookmark = await res.json();
      setBookmarks([...bookmarks, newBookmark]);
      setTitle("");
      setUrl("");
      setDescription("");
    } else {
      alert("Failed to add bookmark.");
    }

    setLoading(false);
  };

  if (status === "loading") return <p className="p-6">Loading...</p>;
  if (!session) return <p className="p-6">Please log in to view bookmarks.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Bookmarks</h1>

      {/* ✅ Add Bookmark Form */}
      <form
        onSubmit={addBookmark}
        className="mb-6 flex flex-col gap-3 bg-white shadow-md p-4 rounded-md max-w-md"
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="url"
          placeholder="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Saving..." : "Add Bookmark"}
        </button>
      </form>

      {/* ✅ List of Bookmarks */}
      <ul className="space-y-4">
        {bookmarks.map((bookmark) => (
          <li
            key={bookmark.id}
            className="p-4 border rounded shadow-sm bg-gray-50"
          >
            <a
              href={bookmark.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold text-blue-600 hover:underline"
            >
              {bookmark.title}
            </a>
            <p className="text-sm text-gray-600">{bookmark.description}</p>
            <p className="text-xs text-gray-400">
              Added on {new Date(bookmark.createdAt).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
