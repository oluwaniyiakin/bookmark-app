import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * ✅ GET - Fetch all bookmarks for the logged-in user
 */
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const bookmarks = await prisma.bookmark.findMany({
    where: { user: { email: session.user.email } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(bookmarks);
}

/**
 * ✅ POST - Add a new bookmark
 */
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, url, description } = await req.json();

  if (!title || !url) {
    return NextResponse.json(
      { error: "Title and URL are required" },
      { status: 400 }
    );
  }

  const newBookmark = await prisma.bookmark.create({
    data: {
      title,
      url,
      description,
      user: {
        connect: { email: session.user.email },
      },
    },
  });

  return NextResponse.json(newBookmark);
}

/**
 * ✅ PUT - Update a bookmark
 */
export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, title, url, description } = await req.json();

  if (!id) {
    return NextResponse.json({ error: "Bookmark ID is required" }, { status: 400 });
  }

  const updatedBookmark = await prisma.bookmark.update({
    where: { id },
    data: { title, url, description },
  });

  return NextResponse.json(updatedBookmark);
}

/**
 * ✅ DELETE - Remove a bookmark
 */
export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await req.json();

  if (!id) {
    return NextResponse.json({ error: "Bookmark ID is required" }, { status: 400 });
  }

  await prisma.bookmark.delete({
    where: { id },
  });

  return NextResponse.json({ message: "Bookmark deleted successfully" });
}
