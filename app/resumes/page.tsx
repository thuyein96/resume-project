'use client';

import { useEffect, useState } from 'react';
import { Button } from 'components/ui/button';
import { useRouter } from 'next/navigation';

type Item = { _id: string; personalInfo?: { name?: string } };

export default function Home() {
    const API_BASE = process.env.NEXT_PUBLIC_API_URL;
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const load = async () => {
        setLoading(true);
        const res = await fetch(`${API_BASE}/api/resumes`, { cache: 'no-store' });
        const data = await res.json();
        setItems(data || []);
        setLoading(false);
    };

    useEffect(() => {
        load();
    }, []);

    const handleNew = async () => {
        router.push('/resumes/new');
    };

    const handleEdit = async (id: string) => {
        router.push(`/resumes/${id}`);
    };
    const handleDelete = async (id: string) => {
        await fetch(`${API_BASE}/api/resumes/${id}`, { method: 'DELETE' });
        await load();
    };

  if (loading) return <div>Loading...</div>;
  return (
    <main className="container mx-auto p-6">
      <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Resumes</h1>
        <Button onClick={handleNew}>New Resume</Button>
      </div>
      <ul className="divide-y">
        {items.map((it) => (
          <li key={it._id} className="py-3 flex items-center justify-between">
            <div className="truncate">
              <div className="font-medium">{it.personalInfo?.name || 'Untitled Resume'}</div>
              <div className="text-sm text-muted-foreground">{it._id}</div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => handleEdit(it._id)}>
                Edit
              </Button>
              <Button onClick={() => handleDelete(it._id)}>Delete</Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </main>
  );
}
