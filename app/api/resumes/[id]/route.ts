import { NextResponse } from 'next/server';
import { deleteResumeById, getResumeById, updateResumeById } from '@/models/resume';

type Ctx = { params: { id: string } };

export async function GET(_req: Request, ctx: Ctx) {
  const { id } = ctx.params;
  const item = await getResumeById(id);
  if (!item) return NextResponse.json({ message: 'Not found' }, { status: 404 });
  return NextResponse.json(item);
}

export async function PUT(req: Request, ctx: Ctx) {
  const { id } = ctx.params;
  const body = await req.json();
  const { _id, ...data } = body || {};
  const updated = await updateResumeById(id, data);
  return NextResponse.json(updated);
}

export async function DELETE(_req: Request, ctx: Ctx) {
  const { id } = ctx.params;
  await deleteResumeById(id);
  return NextResponse.json({ ok: true });
}
