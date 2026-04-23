// app/api/auth/me/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const auth = await requireAuth(req);
  
  if ('error' in auth) {
    return NextResponse.json(
      { error: auth.error },
      { status: auth.status }
    );
  }
  
  const { user } = auth;
  
  return NextResponse.json({
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    }
  });
}