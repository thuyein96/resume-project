import { NextResponse } from "next/server";
import { login } from "@/models/user";

export async function POST(request: Request) {
  const body = await request.json();
  const response = await login(body);
  console.log('Login response:', response);

  // save token in cookie for server side reading
  const res = NextResponse.json(response);
  if (response.token) {
    res.cookies.set("token", response.token, { httpOnly: true, path: '/' });
    console.log('Set token cookie:', response.token);
  }

  return res;
}