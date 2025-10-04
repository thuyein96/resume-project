import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET!;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}

// Convert string secret to Uint8Array for jose
const secret = new TextEncoder().encode(JWT_SECRET);

export async function signToken(userId: string): Promise<string> {
  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(secret);
  
  console.log('Token signed for userId:', userId);
  return token;
}

export async function verifyToken(token: string): Promise<{ userId: string } | null> {
  try {
    console.log('Verifying token...');
    
    const { payload } = await jwtVerify(token, secret);
    console.log('Token verified successfully:', payload);
    
    return { userId: payload.userId as string };
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

export async function getUserIdFromCookie(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  
  console.log('Getting userId from cookie, token exists:', !!token);
  
  if (!token) return null;
  
  const decoded = await verifyToken(token);
  return decoded?.userId || null;
}

export async function isAuthenticated(): Promise<boolean> {
  const userId = await getUserIdFromCookie();
  return !!userId;
}