import { ResumeProvider } from '@/context/resume-context';
import type { ResumeData } from '@/types/resume';
import { Header } from '@/components/header';
import { ResumeEditor } from '@/components/resume-editor';
import { ResumePreview } from '@/components/resume-preview';
import { getResumeById } from '@/models/resume';

export default async function ResumePage({ params }: { params: { id: string } }) {
  const data = await getResumeById(params.id);

  // Convert to JSON-serializable object
  const plainResumeData = data ? (JSON.parse(JSON.stringify(data)) as ResumeData) : null;

  return (
    <ResumeProvider initialServerData={plainResumeData}>
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-1 w-full max-w-screen-2xl mx-auto p-4 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="no-print lg:sticky lg:top-[132px]">
              <ResumeEditor mode="edit" />
            </div>
            <div className="lg:sticky lg:top-8">
              <ResumePreview />
            </div>
          </div>
        </main>
      </div>
    </ResumeProvider>
  );
}