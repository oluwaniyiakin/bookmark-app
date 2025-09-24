import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// Create a bookmark
export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { title, url } = await req.json()
  const bookmark = await prisma.bookmark.create({
    data: {
      title,
      url,
      user: { connect: { email: session.user?.email! } },
    },
  })
  return NextResponse.json(bookmark)
}

// Get all bookmarks
export async function GET() {
  const bookmarks = await prisma.bookmark.findMany({
    orderBy: { createdAt: "desc" },
  })
  return NextResponse.json(bookmarks)
}
