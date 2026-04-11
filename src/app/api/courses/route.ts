import clientPromise from "@/lib/db";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

// GET all courses
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("lms-chef");

    const courses = await db
      .collection("courses")
      .find({})
      .toArray();

    // Convert MongoDB _id to string id
    const formattedCourses = courses.map(course => ({
      id: course._id.toString(),
      title: course.title,
      description: course.description,
      price: course.price,
      level: course.level,
      duration: course.duration,
      thumbnail: course.thumbnail,
      reviews: course.reviews || []
    }));

    return NextResponse.json(formattedCourses);
  } catch (error) {
    console.error("GET Courses Error:", error);
    return NextResponse.json(
      { message: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}

// ➕ Create new course
export async function POST(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("lms-chef");

    const body = await req.json();
    
    const newCourse = {
      title: body.title,
      description: body.description,
      price: body.price,
      level: body.level,
      duration: body.duration,
      thumbnail: body.thumbnail || "",
      reviews: body.reviews || [],
      createdAt: new Date(),
    };

    const result = await db.collection("courses").insertOne(newCourse);

    return NextResponse.json({
      message: "Course created successfully",
      insertedId: result.insertedId,
      course: { id: result.insertedId.toString(), ...newCourse }
    });
  } catch (error) {
    console.error("POST Course Error:", error);
    return NextResponse.json(
      { message: "Failed to create course" },
      { status: 500 }
    );
  }
}