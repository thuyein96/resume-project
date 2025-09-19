import { Header } from '@/components/header';
import { ResumeEditor } from '@/components/resume-editor';
import { ResumePreview } from '@/components/resume-preview';
import { ResumeProvider } from '@/context/resume-context';
import { getResume } from '@/models/resume';
import type { ResumeData } from '@/types/resume';

export default async function Home() {
  const resumeData = await getResume();

  // The MongoDB document has an _id field which is an ObjectId.
  // It's not serializable, so we convert it to a string.
  const plainResumeData = resumeData
    ? (JSON.parse(JSON.stringify(resumeData)) as ResumeData)
    : null;

  return (
    <ResumeProvider initialServerData={plainResumeData}>
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-1 w-full max-w-screen-2xl mx-auto p-4 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="no-print lg:sticky lg:top-[132px]">
              <ResumeEditor />
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
