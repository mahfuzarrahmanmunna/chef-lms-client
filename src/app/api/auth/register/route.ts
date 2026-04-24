// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from 'next/server';
import clientPromise, { User } from '@/lib/db';
import { hashPassword } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, role = 'student' } = await req.json();
    
    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }
    
    // Validate role
    if (!['student', 'admin'].includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role' },
        { status: 400 }
      );
    }
    
    const client = await clientPromise;
    const db = client.db();
    const users = db.collection<User>('users');
    
    // Check if user exists
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }
    
    // Hash password and create user
    const hashedPassword = await hashPassword(password);
    const newUser: Omit<User, '_id'> = {
      name,
      email,
      password: hashedPassword,
      role: role as 'admin' | 'student',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const result = await users.insertOne(newUser as User);
    
    // Don't send password back
    const { password: _, ...userWithoutPassword } = newUser;
    
    return NextResponse.json(
      { 
        message: 'User created successfully', 
        user: { ...userWithoutPassword, id: result.insertedId } 
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}