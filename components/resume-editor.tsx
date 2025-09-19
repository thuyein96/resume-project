'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { PersonalInfoForm } from './form/personal-info-form';
import { ExperienceForm } from './form/experience-fom';
import { EducationForm } from './form/education-form';
import { SkillsForm } from './form/skills-form';
import { ProjectsForm } from './form/projects-form';
import { useResume } from '@/context/resume-context';
import { Button } from './ui/button';
import { useState } from 'react';
import { LoaderCircle } from 'lucide-react';

export function ResumeEditor() {
  const { resumeData, isDirty } = useResume();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resumeData),
      });

      if (!response.ok) {
        throw new Error('Failed to save resume');
      }

      // Revalidation and toast notification can be wired here if available
    } catch (error) {
      console.error(error);
      // handle UI error notification here if a toast system is added
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end sticky top-16 bg-background/80 backdrop-blur-sm p-2 z-10 -mx-4 px-4 border-b">
         <Button onClick={handleSave} disabled={!isDirty || isSaving}>
          {isSaving && <LoaderCircle className="animate-spin mr-2" />}
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={['personal-info']} className="w-full">
        <AccordionItem value="personal-info">
          <AccordionTrigger className="text-lg font-semibold">Personal Information</AccordionTrigger>
          <AccordionContent>
            <PersonalInfoForm />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="experience">
          <AccordionTrigger className="text-lg font-semibold">Work Experience</AccordionTrigger>
          <AccordionContent>
            <ExperienceForm />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="education">
          <AccordionTrigger className="text-lg font-semibold">Education</AccordionTrigger>
          <AccordionContent>
            <EducationForm />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="skills">
          <AccordionTrigger className="text-lg font-semibold">Skills</AccordionTrigger>
          <AccordionContent>
            <SkillsForm />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="projects">
          <AccordionTrigger className="text-lg font-semibold">Projects</AccordionTrigger>
          <AccordionContent>
            <ProjectsForm />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
