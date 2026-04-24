import clientPromise
 from "../../../lib/db";


 export async function GET() {
  const client = await clientPromise;
  const db = client.db("chef-lms");

  return Response.json({
    message: "Hello from MongoDB!",
  });
 }