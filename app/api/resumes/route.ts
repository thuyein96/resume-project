import { NextRequest, NextResponse } from 'next/server';
import {dbConnect} from '@/lib/mongodb';
import Resume from '@/lib/models/Resume';
import { getUserIdFromCookie } from '@/lib/auth';

// GET - List all user's resumes
export async function GET() {
  try {
    await dbConnect();
    
    const userId = await getUserIdFromCookie();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const resumes = await Resume.find({ user: userId }).sort({ updatedAt: -1 });
    
    return NextResponse.json({ resumes }, { status: 200 });
  } catch (error) {
    console.error('Get resumes error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create new resume
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const userId = await getUserIdFromCookie();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    const resume = await Resume.create({
      ...data,
      user: userId,
    });

    return NextResponse.json({ resume }, { status: 201 });
  } catch (error) {
    console.error('Create resume error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}