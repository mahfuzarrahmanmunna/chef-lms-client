import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }, // 1. Change type to Promise
) {
  const { id } = await params; // 2. Await params to get the object

  await prisma.review.delete({
    where: { id }, // 3. Use the awaited id
  });

  return NextResponse.json({ message: "Review deleted successfully" });
}
