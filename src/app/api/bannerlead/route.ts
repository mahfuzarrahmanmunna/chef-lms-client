import clientPromise from "@/lib/db";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

/* 
  Types definition for our Banner Lead document 
  Matching the simpler data structure sent from the Banner Consult Form
*/
interface BannerLeadDocument {
  _id: ObjectId;
  name: string;
  phone: string;
  status: "New" | "Contacted" | "Enrolled";
  createdAt: Date;
}

// GET all banner leads (for Admin Dashboard)
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("lms-chef");

    const leads = await db
      .collection("banner-leads") // Using a specific collection for banner leads
      .find({})
      .sort({ createdAt: -1 }) // Sort by newest inquiries first
      .toArray();

    // Format data for frontend (convert _id to string id)
    const formattedLeads = leads.map((lead: any) => ({
      id: lead._id.toString(),
      name: lead.name,
      phone: lead.phone,
      status: lead.status,
      createdAt: lead.createdAt,
    }));

    return NextResponse.json(formattedLeads);
  } catch (error) {
    console.error("GET Banner Leads Error:", error);
    return NextResponse.json(
      { message: "Failed to fetch banner leads" },
      { status: 500 },
    );
  }
}

// ➕ Create new Banner Lead / Inquiry
export async function POST(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("lms-chef");

    const body = await req.json();

    // Destructure expected fields from the Banner Consult Form component
    const { name, phone } = body;

    // Basic Validation
    if (!name || !phone) {
      return NextResponse.json(
        { message: "Name and Phone number are required" },
        { status: 400 },
      );
    }

    const newLead = {
      name: name,
      phone: phone,
      status: "New", // Default status
      createdAt: new Date(),
    };

    const result = await db.collection("banner-leads").insertOne(newLead);

    return NextResponse.json({
      message: "Consultation request submitted successfully",
      insertedId: result.insertedId,
      lead: { id: result.insertedId.toString(), ...newLead },
    });
  } catch (error) {
    console.error("POST Banner Lead Error:", error);
    return NextResponse.json(
      { message: "Failed to submit consultation request" },
      { status: 500 },
    );
  }
}
