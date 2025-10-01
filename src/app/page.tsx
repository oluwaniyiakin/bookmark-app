"use client";

import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  // Get the authentication session
  const { data: session, status } = useSession();

  // Show loading state while checking auth
  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-6 row-start-2 items-center sm:items-start">
        {/* Logo */}
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        {/* If user is authenticated */}
        {session ? (
          <div className="text-center sm:text-left">
            <p className="text-lg font-semibold mb-2">
              Welcome, {session.user?.name || "User"} 👋
            </p>
            {session.user?.image && (
              <Image
                src={session.user.image}
                alt="User Avatar"
                width={50}
                height={50}
                className="rounded-full mx-auto sm:mx-0 mb-4"
              />
            )}
            <button
              onClick={() => signOut()}
              className="rounded-md bg-red-500 text-white px-4 py-2 hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          // If no session, show login button
          <div className="text-center sm:text-left">
            <p className="mb-4">You are not logged in.</p>
            <button
              onClick={() => signIn("github")}
              className="rounded-md bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition"
            >
              Login with GitHub
            </button>
          </div>
        )}

        {/* Docs + Links */}
        <ol className="font-mono list-inside list-decimal text-sm/6 mt-6 text-center sm:text-left">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded">
              src/app/page.tsx
            </code>
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>
      </main>

      {/* Footer Links */}
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline"
          href="https://nextjs.org/learn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline"
          href="https://nextjs.org/docs"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Docs icon"
            width={16}
            height={16}
          />
          Docs
        </a>
      </footer>
    </div>
  );
}
