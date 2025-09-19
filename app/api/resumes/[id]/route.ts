import { NextResponse, type NextRequest } from 'next/server';
import { deleteResumeById, getResumeById, updateResumeById } from '@/models/resume';

type Context = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, ctx: Context) {
  const { id } = await ctx.params;
  const item = await getResumeById(id);
  if (!item) return NextResponse.json({ message: 'Not found' }, { status: 404 });
  return NextResponse.json(item);
}

export async function PUT(req: NextRequest, ctx: Context) {
  const { id } = await ctx.params;
  const body = await req.json();
  const { _id, ...data } = body || {};
  const updated = await updateResumeById(id, data);
  return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, ctx: Context) {
  const { id } = await ctx.params;
  await deleteResumeById(id);
  return NextResponse.json({ ok: true });
}
