'use client';

import { useResume } from '@/context/resume-context';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Trash2, Plus } from 'lucide-react';
import { nanoid } from 'nanoid';

export function ProjectsForm() {
  const { resumeData, setResumeData } = useResume();
  const { projects } = resumeData;

  const handleAddProject = () => {
    const newProject = {
      id: nanoid(),
      title: '',
      description: '',
      link: '',
    };
    setResumeData({
      ...resumeData,
      projects: [...resumeData.projects, newProject],
    });
  };

  const handleRemoveProject = (index: number) => {
    const newProjects = [...resumeData.projects];
    newProjects.splice(index, 1);
    setResumeData({ ...resumeData, projects: newProjects });
  };

  const handleProjectChange = (index: number, field: string, value: string) => {
    const newProjects = [...resumeData.projects];
    newProjects[index] = { ...newProjects[index], [field]: value };
    setResumeData({ ...resumeData, projects: newProjects });
  };

  return (
    <div className="space-y-4 p-1">
      {projects.map((proj, index) => (
        <Card key={proj.id}>
          <CardHeader className="flex flex-row items-center justify-between p-4">
            <h4 className="font-semibold truncate">{proj.title || 'New Project'}</h4>
            <Button variant="ghost" size="icon" onClick={() => handleRemoveProject(index)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="p-4 pt-0 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`project-title-${proj.id}`}>Title</Label>
                <Input id={`project-title-${proj.id}`} value={proj.title} onChange={(e) => handleProjectChange(index, 'title', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`project-link-${proj.id}`}>Link</Label>
                <Input id={`project-link-${proj.id}`} value={proj.link} onChange={(e) => handleProjectChange(index, 'link', e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`project-description-${proj.id}`}>Description</Label>
              <Textarea
                id={`project-description-${proj.id}`}
                value={proj.description}
                onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      ))}
      <Button onClick={handleAddProject} variant="outline" className="w-full">
        <Plus className="h-4 w-4 mr-2" /> Add Project
      </Button>
    </div>
  );
}
