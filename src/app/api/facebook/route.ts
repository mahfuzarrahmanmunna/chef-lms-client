// src/app/api/facebook/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("🔥 API Route Hit: Fetching Facebook posts...");

    // REPLACE THESE WITH YOUR REAL CREDENTIALS
    const PAGE_ID = "YOUR_PAGE_ID";
    const ACCESS_TOKEN = "YOUR_ACCESS_TOKEN";

    // Basic validation
    if (PAGE_ID === "YOUR_PAGE_ID" || ACCESS_TOKEN === "YOUR_ACCESS_TOKEN") {
      console.error("❌ Error: Credentials not set in route.ts");
      return NextResponse.json(
        { error: "Please set PAGE_ID and ACCESS_TOKEN in the code." },
        { status: 500 },
      );
    }

    const url = `https://graph.facebook.com/v18.0/${PAGE_ID}/posts?fields=message,full_picture,permalink_url,created_time&access_token=${ACCESS_TOKEN}&limit=6`;

    const res = await fetch(url);
    const data = await res.json();

    // Log the raw response for debugging
    console.log("🔍 Facebook Response:", JSON.stringify(data, null, 2));

    if (data.error) {
      console.error("🚫 Facebook API Error Object:", data.error);
      // Handle cases where message might be null
      const errorMessage = data.error.message || JSON.stringify(data.error);
      return NextResponse.json(
        { error: `Facebook API Error: ${errorMessage}` },
        { status: 400 },
      );
    }

    if (!data.data) {
      console.error("🚫 Data property missing in response:", data);
      return NextResponse.json(
        { error: "No data property in response." },
        { status: 404 },
      );
    }

    console.log("✅ Success: Fetched posts");
    return NextResponse.json(data.data);
  } catch (error) {
    console.error("💥 Server Internal Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
