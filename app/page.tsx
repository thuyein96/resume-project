import Link from 'next/link';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 w-full max-w-screen-lg mx-auto p-6 md:p-12">
        <section className="text-center space-y-6 py-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Welcome to Resume Builder</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Create, edit, and manage your resumes with a clean, modern editor. Get started by creating a new resume or view your saved resumes.
          </p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <Link href="/resumes/new">
              <Button>Create New Resume</Button>
            </Link>
            <Link href="/resumes">
              <Button variant="outline">View My Resumes</Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
