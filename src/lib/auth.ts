// lib/auth.ts
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import { NextRequest, NextResponse } from 'next/server';
import clientPromise, { ObjectId, User } from './db';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this';
const TOKEN_NAME = 'auth_token';
const TOKEN_MAX_AGE = 7 * 24 * 60 * 60; // 7 days

// JWT Token Payload
export interface TokenPayload {
  id: string;
  email: string;
  role: string;
  name: string;
  iat?: number;
  exp?: number;
}

// Login Response
export interface LoginResponse {
  success: boolean;
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  error?: string;
}

// Register Response
export interface RegisterResponse {
  success: boolean;
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  error?: string;
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 12);
}

// Verify password
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

// Create JWT token
export function createToken(user: User): string {
  return jwt.sign(
    { 
      id: user._id.toString(), 
      email: user.email, 
      role: user.role,
      name: user.name 
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

// Verify JWT token
export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (error) {
    return null;
  }
}

// Set cookie in NextResponse
export function setTokenCookie(response: NextResponse, token: string): void {
  const cookie = serialize(TOKEN_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: TOKEN_MAX_AGE,
    path: '/',
  });
  response.headers.set('Set-Cookie', cookie);
}

// Remove cookie from NextResponse
export function removeTokenCookie(response: NextResponse): void {
  const cookie = serialize(TOKEN_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: -1,
    path: '/',
  });
  response.headers.set('Set-Cookie', cookie);
}

// Get user from token
export async function getUserFromToken(token: string): Promise<User | null> {
  const decoded = verifyToken(token);
  if (!decoded) return null;
  
  const client = await clientPromise;
  const db = client.db();
  const users = db.collection<User>('users');
  
  const user = await users.findOne({ 
    _id: new ObjectId(decoded.id),
    email: decoded.email 
  });
  
  return user;
}

// Get user from request (for API routes)
export async function getAuthUser(req: NextRequest): Promise<User | null> {
  const token = req.cookies.get(TOKEN_NAME)?.value;
  if (!token) return null;
  return await getUserFromToken(token);
}

// Middleware to check authentication for API routes
export async function requireAuth(req: NextRequest, allowedRoles?: ('admin' | 'student')[]): Promise<{ user: User } | { error: string; status: number }> {
  const token = req.cookies.get(TOKEN_NAME)?.value;
  
  if (!token) {
    return { error: 'Authentication required', status: 401 };
  }
  
  const user = await getUserFromToken(token);
  
  if (!user) {
    return { error: 'Invalid or expired token', status: 401 };
  }
  
  // Check role if specified
  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return { error: 'Access denied. Insufficient permissions.', status: 403 };
  }
  
  return { user };
}

// For client-side use
export function isAuthenticated(): boolean {
  return !!document.cookie.includes(TOKEN_NAME);
}