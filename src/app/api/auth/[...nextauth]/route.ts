import NextAuth, { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

// Initialize Prisma Client (to interact with your PostgreSQL DB)
const prisma = new PrismaClient();

// NextAuth configuration object
export const authOptions: NextAuthOptions = {
  // Use Prisma adapter so NextAuth can store sessions & users in DB
  adapter: PrismaAdapter(prisma),

  // Authentication providers (GitHub in this case)
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,       // From .env
      clientSecret: process.env.GITHUB_CLIENT_SECRET!, // From .env
    }),
  ],

  // Use JWT strategy for sessions
  session: {
    strategy: "jwt",
  },

  // Custom pages (optional)
  pages: {
    signIn: "/login", // Redirect users here for login
  },

  // Debug mode (only in development)
  debug: process.env.NODE_ENV === "development",
};

// Create the NextAuth handler with our configuration
const handler = NextAuth(authOptions);

// Export GET & POST handlers so Next.js can handle API requests
export { handler as GET, handler as POST };
