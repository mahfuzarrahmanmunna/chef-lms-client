import clientPromise from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('lms-chef'); 

    // collections
    const usersCollection = db.collection("users");
    const coursesCollection = db.collection("courses");
    const offersCollection = db.collection("offers");

    // counts
    const totalUsers = await usersCollection.countDocuments();
    const totalCourses = await coursesCollection.countDocuments();
    const totalOffers = await offersCollection.countDocuments({
      isActive: true, 
    });

    return NextResponse.json({
      totalUsers,
      totalCourses,
      totalOffers,
    });
  } catch (error) {
    console.error("Dashboard API Error:", error);

    return NextResponse.json(
      { message: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}