import { ResumeProvider } from '@/context/resume-context';
import { Header } from '@/components/header';
import { ResumeEditor } from '@/components/resume-editor';
import { ResumePreview } from '@/components/resume-preview';

export default async function NewResumePage() {
  return (
    <ResumeProvider>
          <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="flex-1 w-full max-w-screen-2xl mx-auto p-4 md:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="no-print lg:sticky lg:top-[132px]">
                  <ResumeEditor mode='create'/>
                </div>
                <div className="lg:sticky lg:top-8">
                  <ResumePreview />
                </div>
              </div>
            </main>
          </div>
        </ResumeProvider>
        
  )
}
