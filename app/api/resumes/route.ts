import { NextResponse } from 'next/server';
import { listResumes, createResume } from '@/models/resume';

export async function GET() {
  const items = await listResumes();
  return NextResponse.json(items);
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const created = await createResume(body || {});
  return NextResponse.json(created, { status: 201 });
}
