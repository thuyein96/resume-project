'use client';

import Link from 'next/link';
import { Resume } from '@/types';

interface ResumeListProps {
  resumes: Resume[];
  onDelete: (id: string) => void;
}

export default function ResumeList({ resumes, onDelete }: ResumeListProps) {
  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      onDelete(id);
    }
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (resumes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg mb-4">No resumes yet</p>
        <Link
          href="/resumes/create"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded font-semibold hover:bg-blue-700"
        >
          Create Your First Resume
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {resumes.map((resume) => (
        <div key={resume._id} className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-xl font-bold mb-2">{resume.title}</h3>
          <p className="text-gray-600 mb-1">{resume.personalInfo.fullName}</p>
          <p className="text-sm text-gray-500 mb-4">
            Last updated: {formatDate(resume.updatedAt)}
          </p>
          <div className="flex gap-2">
            <Link
              href={`/resumes/${resume._id}`}
              className="flex-1 text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              View
            </Link>
            <Link
              href={`/resumes/${resume._id}/edit`}
              className="flex-1 text-center bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              Edit
            </Link>
            <button
              onClick={() => handleDelete(resume._id!, resume.title)}
              className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}