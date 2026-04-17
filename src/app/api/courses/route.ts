import clientPromise from "@/lib/db";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";


// interface CourseDocument {
//   _id: ObjectId; // or ObjectId from 'mongodb'
//   title: string;
//   description: string;
//   type: string;
//   price: number;
//   oldPrice?: number; // Optional because it might not exist
//   currency: string;
//   duration: string;
//   image: string;
//   region: string;
//   city: string;
//   hasCertificate: boolean;
//   createdAt: Date;
// }

// GET all courses
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("lms-chef");

    const courses = await db
      .collection("courses")
      .find({})
      .sort({ createdAt: -1 }) // Sort by newest first
      .toArray();

    // Convert MongoDB _id to string id
    const formattedCourses = courses.map((course: any) => ({
      id: course._id.toString(),
      title: course.title,
      description: course.description,
      type: course.type, // Added type
      price: course.price,
      oldPrice: course.oldPrice, // Added oldPrice
      currency: course.currency, // Added currency
      duration: course.duration,
      image: course.image, // Changed from thumbnail to image
      region: course.region, // Added region
      city: course.city, // Added city
      hasCertificate: course.hasCertificate, // Added hasCertificate
      createdAt: course.createdAt,
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
      type: body.type, // Added
      price: Number(body.price),
      oldPrice: body.oldPrice ? Number(body.oldPrice) : null, // Added
      currency: body.currency || "৳", // Added
      duration: body.duration,
      image: body.image || "", // Renamed from thumbnail
      region: body.region, // Added
      city: body.city, // Added
      hasCertificate: body.hasCertificate || false, // Added
      createdAt: new Date(),
    };

    const result = await db.collection("courses").insertOne(newCourse);

    return NextResponse.json({
      message: "Course created successfully",
      insertedId: result.insertedId,
      course: { id: result.insertedId.toString(), ...newCourse },
    });
  } catch (error) {
    console.error("POST Course Error:", error);
    return NextResponse.json(
      { message: "Failed to create course" },
      { status: 500 }
    );
  }
}