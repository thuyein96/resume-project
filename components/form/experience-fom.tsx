'use client';

import { useResume } from '@/context/resume-context';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Trash2, Plus } from 'lucide-react';
import { nanoid } from 'nanoid';

export function ExperienceForm() {
  const { resumeData, setResumeData } = useResume();
  const { experience } = resumeData;

  const handleAddExperience = () => {
    const newExperience = {
      id: nanoid(),
      company: '',
      role: '',
      startDate: '',
      endDate: '',
      description: '',
    };
    setResumeData({
      ...resumeData,
      experience: [...resumeData.experience, newExperience],
    });
  };

  const handleRemoveExperience = (index: number) => {
    const newExperience = [...resumeData.experience];
    newExperience.splice(index, 1);
    setResumeData({ ...resumeData, experience: newExperience });
  };

  const handleExperienceChange = (index: number, field: string, value: string) => {
    const newExperience = [...resumeData.experience];
    newExperience[index] = { ...newExperience[index], [field]: value };
    setResumeData({ ...resumeData, experience: newExperience });
  };

  return (
    <div className="space-y-4 p-1">
      {experience.map((exp, index) => (
        <Card key={exp.id}>
          <CardHeader className="flex flex-row items-center justify-between p-4">
            <h4 className="font-semibold truncate">{exp.role || 'New Role'}</h4>
            <Button variant="ghost" size="icon" onClick={() => handleRemoveExperience(index)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="p-4 pt-0 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`role-${exp.id}`}>Role</Label>
                <Input id={`role-${exp.id}`} value={exp.role} onChange={(e) => handleExperienceChange(index, 'role', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`company-${exp.id}`}>Company</Label>
                <Input id={`company-${exp.id}`} value={exp.company} onChange={(e) => handleExperienceChange(index, 'company', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`start-date-${exp.id}`}>Start Date</Label>
                <Input id={`start-date-${exp.id}`} value={exp.startDate} onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`end-date-${exp.id}`}>End Date</Label>
                <Input id={`end-date-${exp.id}`} value={exp.endDate} onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)} />
              </div>
            </div>
            <div className="space-y-2 relative">
               <div className="flex justify-between items-center">
                <Label htmlFor={`description-${exp.id}`}>Description</Label>
              </div>
              <Textarea
                id={`description-${exp.id}`}
                value={exp.description}
                onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                rows={4}
                placeholder="Describe your responsibilities and achievements..."
              />
            </div>
          </CardContent>
        </Card>
      ))}
      <Button onClick={handleAddExperience} variant="outline" className="w-full justify-center">
        <Plus className="h-4 w-4 mr-2" /> Add Experience
      </Button>
    </div>
  );
}
