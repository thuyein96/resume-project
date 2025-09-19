'use client';

import { useResume } from '@/context/resume-context';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Mail, Phone, Globe, MapPin, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function ResumePreview() {
  const { resumeData } = useResume();
  const { personalInfo, experience, education, skills, projects } = resumeData;

  const getSkillBadgeVariant = (level: string) => {
    switch (level) {
      case 'Expert':
        return 'default';
      case 'Advanced':
        return 'secondary';
      default:
        return 'outline';
    }
  }

  return (
    <Card className="w-full max-w-[8.5in] mx-auto shadow-lg printable-area">
      <CardContent className="p-8 md:p-12 space-y-8 bg-card text-card-foreground">
        {/* Header */}
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-primary">{personalInfo.name}</h1>
          <div className="flex items-center justify-center flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 hover:text-primary"><Mail size={14} />{personalInfo.email}</a>
            <a href={`tel:${personalInfo.phone}`} className="flex items-center gap-2 hover:text-primary"><Phone size={14} />{personalInfo.phone}</a>
            <div className="flex items-center gap-2"><MapPin size={14} />{personalInfo.address}</div>
            <a href={personalInfo.website} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-primary"><Globe size={14} />{personalInfo.website}</a>
          </div>
        </header>

        <Separator />

        {/* Summary */}
        <section>
          <h2 className="text-xl font-bold text-primary mb-2">Summary</h2>
          <p className="text-sm text-muted-foreground whitespace-pre-wrap">{personalInfo.summary}</p>
        </section>

        {/* Experience */}
        <section>
          <h2 className="text-xl font-bold text-primary mb-4">Work Experience</h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id} className="grid grid-cols-[1fr_auto] gap-x-4">
                <div>
                  <h3 className="font-semibold">{exp.role}</h3>
                  <p className="text-sm text-muted-foreground">{exp.company}</p>
                  <div className="mt-2 text-sm text-muted-foreground whitespace-pre-wrap">{exp.description}</div>
                </div>
                <p className="text-sm text-muted-foreground justify-self-end">{exp.startDate} - {exp.endDate}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section>
          <h2 className="text-xl font-bold text-primary mb-4">Education</h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="grid grid-cols-[1fr_auto] gap-x-4">
                <div>
                  <h3 className="font-semibold">{edu.school}</h3>
                  <p className="text-sm text-muted-foreground">{edu.degree}</p>
                </div>
                <p className="text-sm text-muted-foreground justify-self-end">{edu.startDate} - {edu.endDate}</p>
              </div>
            ))}
          </div>
        </section>
        
        {/* Skills */}
        <section>
          <h2 className="text-xl font-bold text-primary mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge key={skill.id} variant={getSkillBadgeVariant(skill.level)}>{skill.name}</Badge>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section>
          <h2 className="text-xl font-bold text-primary mb-4">Projects</h2>
          <div className="space-y-4">
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{proj.title}</h3>
                  {proj.link && (
                    <a href={proj.link} target="_blank" rel="noreferrer" className="text-primary hover:underline">
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>

      </CardContent>
    </Card>
  );
}
