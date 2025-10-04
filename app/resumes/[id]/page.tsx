'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import ResumePreview from '@/components/ResumePreview';
import { Resume } from '@/types';
import Link from 'next/link';

export default function ResumeViewPage() {
  const params = useParams();
  const [resume, setResume] = useState<Resume | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/resumes/${params.id}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      setResume(data.resume);
    } catch (err) {
      setError('Failed to load resume');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading resume...</p>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        ) : resume ? (
          <>
            <div className="mb-4">
              <Link href="/resumes" className="text-blue-600 hover:underline">
                ← Back to Resumes
              </Link>
            </div>
            <ResumePreview resume={resume} />
          </>
        ) : null}
      </div>
    </div>
  );
}