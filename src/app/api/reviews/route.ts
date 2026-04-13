// import { prisma } from "@/lib/prisma";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const reviews = await prisma.review.findMany({
    include: { course: true },
  });
  return NextResponse.json(reviews);
}

export async function POST(req: Request) {
  const body = await req.json();

  const review = await prisma.review.create({
    data: body,
  });

  return NextResponse.json(review);
}