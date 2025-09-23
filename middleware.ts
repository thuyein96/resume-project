// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  // Match with basePath included
  if (request.nextUrl.pathname.startsWith("/resumes")) {
    if (!token) {
      console.log("No token found, redirecting to /app/resume/auth");
      return NextResponse.redirect(new URL("/app/resume/auth", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  // must include basePath in matcher!
  matcher: [
    "/resumes",
    "/api/resumes/new"
  ],
};