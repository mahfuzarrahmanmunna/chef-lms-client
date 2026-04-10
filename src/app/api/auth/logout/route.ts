// app/api/auth/logout/route.ts
import { NextResponse } from 'next/server';
import { removeTokenCookie } from '@/lib/auth';

export async function POST() {
  const response = NextResponse.json(
    { message: 'Logout successful' },
    { status: 200 }
  );
  
  removeTokenCookie(response);
  
  return response;
}