import { NextResponse } from 'next/server';
import { getResume, updateResume } from '@/models/resume';
import type { ResumeData } from '@/types/resume';

export async function GET() {
  try {
    const resume = await getResume();
    return NextResponse.json(resume);
  } catch (error) {
    console.error('Failed to get resume:', error);
    return NextResponse.json({ message: 'Failed to get resume' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body: ResumeData = await request.json();
    // Don't save the _id field back to the database.
    const { _id, ...resumeData } = body;
    await updateResume(resumeData);
    return NextResponse.json({ message: 'Resume updated successfully' });
  } catch (error) {
    console.error('Failed to update resume:', error);
    return NextResponse.json({ message: 'Failed to update resume' }, { status: 500 });
  }
}
