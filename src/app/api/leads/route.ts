import clientPromise from "@/lib/db";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

/* 
  Types definition for our Lead/Inquiry document 
  Matching the data structure sent from the Contact Form
*/
interface LeadDocument {
  _id: ObjectId;
  name: string;
  address: string;
  phone: string; // The number user typed
  countryCode: string; // e.g. "+880"
  fullPhoneNumber: string; // Combined: "+880 171..."
  countryName: string; // e.g. "Bangladesh"
  interestedProgram: string;
  status: "New" | "Contacted" | "Enrolled"; // Basic status tracking
  createdAt: Date;
}

// GET all leads (for Admin Dashboard)
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("lms-chef");

    const leads = await db
      .collection("leads")
      .find({})
      .sort({ createdAt: -1 }) // Sort by newest inquiries first
      .toArray();

    // Format data for frontend (convert _id to string id)
    const formattedLeads = leads.map((lead: any) => ({
      id: lead._id.toString(),
      name: lead.name,
      address: lead.address,
      phone: lead.phone,
      countryCode: lead.countryCode,
      fullPhoneNumber: lead.fullPhoneNumber,
      countryName: lead.countryName,
      interestedProgram: lead.interestedProgram,
      status: lead.status,
      createdAt: lead.createdAt,
    }));

    return NextResponse.json(formattedLeads);
  } catch (error) {
    console.error("GET Leads Error:", error);
    return NextResponse.json(
      { message: "Failed to fetch leads" },
      { status: 500 },
    );
  }
}

// ➕ Create new Lead / Inquiry
export async function POST(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("lms-chef");

    const body = await req.json();

    // Destructure expected fields from the ContactCTA component
    const { name, address, phone, selectedCountry, program } = body;

    // Basic Validation
    if (!name || !phone) {
      return NextResponse.json(
        { message: "Name and Phone number are required" },
        { status: 400 },
      );
    }

    const newLead = {
      name: name,
      address: address || "",
      phone: phone, // Just the number part
      countryCode: selectedCountry?.code || "",
      countryName: selectedCountry?.name || "Unknown",
      // Combine them for easy display in admin panel
      fullPhoneNumber: `${selectedCountry?.code || ""} ${phone}`,
      interestedProgram: program,
      status: "New", // Default status
      createdAt: new Date(),
    };

    const result = await db.collection("leads").insertOne(newLead);

    return NextResponse.json({
      message: "Inquiry submitted successfully",
      insertedId: result.insertedId,
      lead: { id: result.insertedId.toString(), ...newLead },
    });
  } catch (error) {
    console.error("POST Lead Error:", error);
    return NextResponse.json(
      { message: "Failed to submit inquiry" },
      { status: 500 },
    );
  }
}
