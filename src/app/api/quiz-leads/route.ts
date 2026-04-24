<<<<<<< HEAD
import clientPromise from "@/lib/db";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("lms-chef");
    const collection = db.collection("quiz_leads");

    // 1. Get Filter from URL (e.g., ?filter=week)
    const { searchParams } = new URL(req.url);
    const filter = searchParams.get("filter") || "all";

    let query = {};
    const now = new Date();

    // 2. Define Date Ranges
    if (filter === "today") {
      const startOfDay = new Date(now.setHours(0, 0, 0, 0));
      query = { createdAt: { $gte: startOfDay } };
    } else if (filter === "week") {
      // Calculate start of current week (Assuming Sunday is day 0)
      const day = now.getDay();
      const diff = now.getDate() - day + (day === 0 ? -6 : 1);
      // Simplified: Get previous Sunday
      const startOfWeek = new Date(now.setDate(now.getDate() - day));
      startOfWeek.setHours(0, 0, 0, 0);
      query = { createdAt: { $gte: startOfWeek } };
    } else if (filter === "month") {
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      query = { createdAt: { $gte: startOfMonth } };
    } else if (filter === "year") {
      const startOfYear = new Date(now.getFullYear(), 0, 1);
      query = { createdAt: { $gte: startOfYear } };
    }

    // 3. Fetch Data from DB based on query
    const leads = await collection
      .find(query)
      .sort({ createdAt: -1 }) // Newest first
      .toArray();

    // 4. Format Data (Convert _id, Date to strings)
    const formattedLeads = leads.map((lead: any) => ({
      id: lead._id.toString(),
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      status: lead.status,
      // Convert selections array to string for easier display
      selections: Array.isArray(lead.selections)
        ? lead.selections.join(", ")
        : "N/A",
      date: new Date(lead.createdAt).toLocaleString(),
    }));

    return NextResponse.json(formattedLeads);
  } catch (error) {
    console.error("GET Admin Quiz Error:", error);
    return NextResponse.json(
      { message: "Error fetching leads" },
      { status: 500 },
    );
  }
}
=======
import clientPromise from "@/lib/db";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("lms-chef");
    const collection = db.collection("quiz_leads");

    // 1. Get Filter from URL (e.g., ?filter=week)
    const { searchParams } = new URL(req.url);
    const filter = searchParams.get("filter") || "all";

    let query = {};
    const now = new Date();

    // 2. Define Date Ranges
    if (filter === "today") {
      const startOfDay = new Date(now.setHours(0, 0, 0, 0));
      query = { createdAt: { $gte: startOfDay } };
    } else if (filter === "week") {
      // Calculate start of current week (Assuming Sunday is day 0)
      const day = now.getDay();
      const diff = now.getDate() - day + (day === 0 ? -6 : 1);
      // Simplified: Get previous Sunday
      const startOfWeek = new Date(now.setDate(now.getDate() - day));
      startOfWeek.setHours(0, 0, 0, 0);
      query = { createdAt: { $gte: startOfWeek } };
    } else if (filter === "month") {
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      query = { createdAt: { $gte: startOfMonth } };
    } else if (filter === "year") {
      const startOfYear = new Date(now.getFullYear(), 0, 1);
      query = { createdAt: { $gte: startOfYear } };
    }

    // 3. Fetch Data from DB based on query
    const leads = await collection
      .find(query)
      .sort({ createdAt: -1 }) // Newest first
      .toArray();

    // 4. Format Data (Convert _id, Date to strings)
    const formattedLeads = leads.map((lead: any) => ({
      id: lead._id.toString(),
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      status: lead.status,
      // Convert selections array to string for easier display
      selections: Array.isArray(lead.selections)
        ? lead.selections.join(", ")
        : "N/A",
      date: new Date(lead.createdAt).toLocaleString(),
    }));

    return NextResponse.json(formattedLeads);
  } catch (error) {
    console.error("GET Admin Quiz Error:", error);
    return NextResponse.json(
      { message: "Error fetching leads" },
      { status: 500 },
    );
  }
}
>>>>>>> 7e293a1d71a129fc898b0c0a820200e81a1a5a2d
