import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const courses = await prisma.course.findMany({
    include: { reviews: true },
  });
  return NextResponse.json(courses);
}

export async function POST(req: Request) {
  const body = await req.json();

  const course = await prisma.course.create({
    data: body,
  });

  return NextResponse.json(course);
}