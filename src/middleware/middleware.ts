// middleware.ts (in root folder)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';

interface TokenPayload {
  id: string;
  email: string;
  role: string;
  name: string;
}

export function middleware(request: NextRequest): NextResponse {
  const token = request.cookies.get('auth_token')?.value;
  
  // Admin only paths
  const adminPaths: string[] = ['/admin', '/courses/addcourses', '/courses/managecourses'];
  const isAdminPath: boolean = adminPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  );
  
  // Protected routes (require authentication)
  const protectedPaths: string[] = ['/dashboard', '/profile', '/courses/addcourses', '/courses/managecourses'];
  const isProtectedPath: boolean = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  );
  
  // Check if route requires authentication
  if (!token && (isProtectedPath || isAdminPath)) {
    // Redirect to login if not authenticated
    const loginUrl = new URL("/signin", request.url);
    loginUrl.searchParams.set('from', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }
  
  // Check admin access for admin routes
  if (token && isAdminPath) {
    try {
      const decoded: TokenPayload | null = verifyToken(token);
      if (decoded?.role !== 'admin') {
        // Redirect non-admin users to home page
        return NextResponse.redirect(new URL('/', request.url));
      }
    } catch {
      // Invalid token, redirect to login
      const loginUrl = new URL("/signin", request.url);
      loginUrl.searchParams.set('from', request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }
  
  // Redirect to home if authenticated user tries to access login/register
  if (
    token &&
    (request.nextUrl.pathname === "/signin" ||
      request.nextUrl.pathname === "/register")
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/courses/addcourses/:path*",
    "/courses/managecourses/:path*",
    "/signin",
    "/register",
  ],
};