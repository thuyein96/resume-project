// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // NOTE: When using basePath, Next.js automatically strips it from pathname
  // So pathname will be '/login', not '/api/resume/login'
  const publicRoutes = ['/login', '/register', '/'];
  const isPublicRoute = publicRoutes.includes(pathname);

  // If no token and trying to access protected route
  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL(`/app/resume/login`, request.url));
  }

  // If has token, verify it
  if (token) {
    const decoded = await verifyToken(token);
    
    // Invalid token, redirect to login
    if (!decoded && !isPublicRoute) {
      const response = NextResponse.redirect(new URL(`/app/resume/login`, request.url));
      response.cookies.delete('token');
      return response;
    }

    // Valid token but on login/register, redirect to dashboard
    if (decoded && (pathname === '/login' || pathname === '/register')) {
      return NextResponse.redirect(new URL('/app/resume/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/resumes/:path*',
    '/login',
    '/register',
  ],
};