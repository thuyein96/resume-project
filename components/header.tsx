import { FileText } from 'lucide-react';
import Link from 'next/link';

export function Header() {
  return (
    <header className="sticky top-0 z-10 w-full bg-background/80 backdrop-blur-sm border-b no-print">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold text-primary">ResumeCraft</h1>
        </div>
        <div className='flex items-center gap-4'>
          <Link href="/resumes" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            My Resumes
          </Link>
          <Link href="/users" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Users
          </Link>
          {/* login or signup */}
          <Link href="/auth" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Login
          </Link>
          <Link href="/api/auth/logout" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Logout
          </Link>
        </div>
      </div>
    </header>
  );
}
