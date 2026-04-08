import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const totalUsers = await prisma.user.count();
  const totalCourses = await prisma.course.count();
  const totalReviews = await prisma.review.count();

  return NextResponse.json({
    totalUsers,
    totalCourses,
    totalReviews,
  });
}