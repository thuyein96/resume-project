'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import ResumeForm from '@/components/ResumeForm';
import { Resume } from '@/types';
import ResumePreview from '@/components/ResumePreview';

export default function CreateResumePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [liveData, setLiveData] = useState<Omit<Resume, '_id' | 'user' | 'createdAt' | 'updatedAt'>>({
    title: '',
    personalInfo: { fullName: '', email: '', phone: '', address: '' },
    education: [{ school: '', degree: '', startDate: '', endDate: '' }],
    experience: [{ company: '', position: '', startDate: '', endDate: '', description: '' }],
    skills: [''],
    projects: [{ name: '', description: '' }],
  });
  const router = useRouter();

  const handleSubmit = async (data: Omit<Resume, '_id' | 'user' | 'createdAt' | 'updatedAt'>) => {
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/resumes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create resume');
      }

      setSuccess('Resume created successfully!');
      setTimeout(() => {
        router.push(`/resumes`);
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Failed to create resume');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Create New Resume</h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {success}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Edit Resume</h2>
              <ResumeForm
                onSubmit={handleSubmit}
                isLoading={isLoading}
                onChange={(data) => setLiveData(data)}
              />
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
              <h2 className="text-2xl font-semibold mb-4">Live Preview</h2>
              {/* Convert liveData to full Resume shape for ResumePreview */}
              <ResumePreview resume={{
                _id: '',
                user: '',
                createdAt: new Date(),
                updatedAt: new Date(),
                title: liveData.title,
                personalInfo: liveData.personalInfo,
                education: liveData.education,
                experience: liveData.experience,
                skills: liveData.skills,
                projects: liveData.projects,
              }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}