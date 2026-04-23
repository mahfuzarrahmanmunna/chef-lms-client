import clientPromise from "@/lib/db";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { ObjectId } from "mongodb";

/*  Email Configuration  */
// Ensure these are set in your .env file
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/* 
  1. GET METHOD: Retrieve all quiz leads 
  (Useful for Admin Dashboard) 
*/
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("lms-chef"); // Your DB name

    const leads = await db
      .collection("quiz_leads")
      .find({})
      .sort({ createdAt: -1 }) // Newest first
      .toArray();

    // Format data to convert _id to string (fixes serialization issues)
    const formattedLeads = leads.map((lead: any) => ({
      _id: lead._id.toString(),
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      selections: lead.selections, // The array of selected IDs
      status: lead.status,
      createdAt: lead.createdAt,
    }));

    return NextResponse.json(formattedLeads);
  } catch (error) {
    console.error("GET Quiz Leads Error:", error);
    return NextResponse.json(
      { message: "Failed to fetch leads" },
      { status: 500 },
    );
  }
}

/* 
  2. POST METHOD: Submit new lead & Send Email 
*/
export async function POST(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("lms-chef");

    const body = await req.json();

    const { firstName, lastName, email, phone, countryCode, selections } = body;

    // Basic Validation
    if (!firstName || !lastName || !email || !phone) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      );
    }

    // 1. Save to Database
    const newLead = {
      name: `${firstName} ${lastName}`,
      email: email,
      phone: `${countryCode} ${phone}`,
      selections: selections, // Save the array of selected IDs
      status: "New Quiz Lead",
      createdAt: new Date(),
    };

    const result = await db.collection("quiz_leads").insertOne(newLead);

    // 2. Send Welcome Email
    const mailOptions = {
      from: `"BPSTI Chef Training" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Welcome to BPSTI! Your Culinary Roadmap is Here 🍳",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 8px;">
            <h2 style="color: #EA393A;">Welcome to the Family, ${firstName}!</h2>
            <p>Thank you for taking the time to explore your culinary future.</p>
            <p>We have received your preferences and are excited to help you start your journey.</p>
            
            <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #EA393A; margin: 20px 0;">
              <strong>Your Next Steps:</strong>
              <ul>
                <li>Our team will contact you shortly at ${countryCode} ${phone}.</li>
                <li>Check out our programs on our website.</li>
              </ul>
            </div>

            <p>If you have any immediate questions, feel free to reply to this email.</p>
            
            <br />
            <p>Best Regards,</p>
            <p><strong>The BPSTI Team</strong></p>
          </div>
        </div>
      `,
    };

    // Send Email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      {
        message: "Success: Data saved and email sent.",
        leadId: result.insertedId,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Quiz Submit Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error },
      { status: 500 },
    );
  }
}
