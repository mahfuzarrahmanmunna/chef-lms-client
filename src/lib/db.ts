// lib/mongodb.ts
import { MongoClient, ObjectId, Db, Collection } from "mongodb";

const uri = process.env.MONGODB_URI as string;

if (!uri) {
  throw new Error("Please add your Mongo URI to .env.local");
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

// User Type
export interface User {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'student';
  createdAt: Date;
  updatedAt: Date;
}

// Course Type
export interface Course {
  _id: ObjectId;
  title: string;
  description: string;
  price: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  thumbnail?: string;
  reviews: [];
  createdAt: Date;
  updatedAt: Date;
}

export async function initDB(): Promise<{ db: Db; users: Collection<User>; courses: Collection<Course> }> {
  const client = await clientPromise;
  const db = client.db();
  
  const users = db.collection<User>('users');
  await users.createIndex({ email: 1 }, { unique: true });
  await users.createIndex({ role: 1 });
  await users.createIndex({ createdAt: -1 });
  
  // Create default admin if not exists
  const adminExists = await users.findOne({ role: 'admin' });
  if (!adminExists) {
    const bcrypt = await import('bcryptjs');
    const hashedPassword = await bcrypt.hash('admin123', 12);
    
    await users.insertOne({
      name: 'Super Admin',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    } as User);
    console.log('✅ Default admin user created (email: admin@example.com, password: admin123)');
  }
  
  const courses = db.collection<Course>('courses');
  await courses.createIndex({ title: 'text', description: 'text' });
  await courses.createIndex({ level: 1 });
  await courses.createIndex({ price: 1 });
  await courses.createIndex({ createdAt: -1 });
  
  console.log('✅ Database indexes created successfully');
  
  return { db, users, courses };
}

export { ObjectId };
export default clientPromise;