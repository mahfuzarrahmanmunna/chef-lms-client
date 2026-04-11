// app/api/courses/[id]/route.ts
import clientPromise from "@/lib/db";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

// ✏️ UPDATE course
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; // Await the params Promise
    const client = await clientPromise;
    const db = client.db("lms-chef");

    const body = await req.json();
    
    // Remove id from the update data if it exists
    const { id: _, ...updateData } = body;

    const result = await db.collection("courses").updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Course updated successfully",
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json(
      { message: "Failed to update course" },
      { status: 500 }
    );
  }
}

// 🗑 DELETE course
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; // Await the params Promise
    const client = await clientPromise;
    const db = client.db("lms-chef");

    const result = await db.collection("courses").deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Course deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json(
      { message: "Failed to delete course" },
      { status: 500 }
    );
  }
}