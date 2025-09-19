'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';

type Item = { _id: string; personalInfo?: { name?: string } };

export default function ResumeList() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const res = await fetch('/api/resumes', { cache: 'no-store' });
    const data = await res.json();
    setItems(data || []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: string) => {
    await fetch(`/api/resumes/${id}`, { method: 'DELETE' });
    await load();
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Resumes</h1>
  <Link href="/resumes/new" className="underline">New Resume</Link>
      </div>
      <ul className="divide-y">
        {items.map((it) => (
          <li key={it._id} className="py-3 flex items-center justify-between">
            <div className="truncate">
              <div className="font-medium">{it.personalInfo?.name || 'Untitled Resume'}</div>
              <div className="text-sm text-muted-foreground">{it._id}</div>
            </div>
            <div className="flex gap-2">
              <Link href={`/resumes/${it._id}`} className="underline">Edit</Link>
              <Button variant="outline" onClick={() => handleDelete(it._id)}>Delete</Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
