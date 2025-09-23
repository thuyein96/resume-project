import { NextResponse, type NextRequest } from 'next/server';
import { getUserById } from '@/models/user';
import jwt from 'jsonwebtoken';
;

export async function GET(_req: NextRequest) {

  const token = _req.cookies.get("token")?.value;
  if(!token) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  // decrypt and verify token here if needed
  let decoded: any;
  try {
    decoded = jwt.verify(token, "default_secret");
  } catch (err) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  const id = decoded.id;
  const item = await getUserById(id);
  if (!item) return NextResponse.json({ message: 'Not found' }, { status: 404 });
  return NextResponse.json(item);
}