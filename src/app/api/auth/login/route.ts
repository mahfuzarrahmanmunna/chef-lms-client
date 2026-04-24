// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import clientPromise, { User } from '@/lib/db';
import { verifyPassword, createToken, setTokenCookie } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }
    
    const client = await clientPromise;
    const db = client.db();
    const users = db.collection<User>('users');
    
    // Find user
    const user = await users.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    // Verify password
    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    // Create token
    const token = createToken(user);
    
    // Create response with user data
    const response = NextResponse.json(
      { 
        message: 'Login successful', 
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        }
      },
      { status: 200 }
    );
    
    // Set cookie
    setTokenCookie(response, token);
    
    return response;
    
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}