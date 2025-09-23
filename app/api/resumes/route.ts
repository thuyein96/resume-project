import { NextRequest, NextResponse } from 'next/server';
import { listResumes, createResume } from '@/models/resume';
import jwt from 'jsonwebtoken';

export async function GET(req: NextRequest) {
  const items = await listResumes();
  const token = req.cookies.get("token")?.value;
  if(!token) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const token = req.cookies.get("token")?.value;
  if(!token) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  // decrypt and verify token here if needed
  let decoded: {
    id: string;
    email: string;
  };
  try {
    decoded = jwt.verify(token, "default_secret") as { id: string; email: string };
  } catch (err) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  const created = await createResume({ ...body, userId: decoded.id, email: decoded.email });
  return NextResponse.json(created, { status: 201 });
}