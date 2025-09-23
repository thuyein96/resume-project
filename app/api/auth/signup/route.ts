import { NextResponse } from "next/server";
import { createUser } from "@/models/user";

export async function POST(request: Request) {
  const body = await request.json();
  const response = await createUser(body);
  console.log('Created user:', response);
  return NextResponse.json(response);
}