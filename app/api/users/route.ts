import { NextResponse } from "next/server";
import { listUsers } from "@/models/user";

export async function GET() {
  const users = await listUsers();
  return NextResponse.json(users);
}

export async function POST() {
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}