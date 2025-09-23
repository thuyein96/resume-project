import { NextResponse } from "next/server";

export async function GET() {
  // clear the cookie
  const res = NextResponse.redirect(new URL("/app/resume/auth", process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"));
  res.cookies.set("token", "", { httpOnly: true, path: "/", expires: new Date(0) });
  return res;
}