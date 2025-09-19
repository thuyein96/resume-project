'use client';

import { useResume } from '@/context/resume-context';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trash2, Plus } from 'lucide-react';
import { nanoid } from 'nanoid';

export function EducationForm() {
  const { resumeData, setResumeData } = useResume();
  const { education } = resumeData;

  const handleAddEducation = () => {
    const newEducation = {
      id: nanoid(),
      school: '',
      degree: '',
      startDate: '',
      endDate: '',
    };
    setResumeData({
      ...resumeData,
      education: [...resumeData.education, newEducation],
    });
  };

  const handleRemoveEducation = (index: number) => {
    const newEducation = [...resumeData.education];
    newEducation.splice(index, 1);
    setResumeData({ ...resumeData, education: newEducation });
  };

  const handleEducationChange = (index: number, field: string, value: string) => {
    const newEducation = [...resumeData.education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    setResumeData({ ...resumeData, education: newEducation });
  };

  return (
    <div className="space-y-4 p-1">
      {education.map((edu, index) => (
        <Card key={edu.id}>
          <CardHeader className="flex flex-row items-center justify-between p-4">
            <h4 className="font-semibold truncate">{edu.school || 'New School'}</h4>
            <Button variant="ghost" size="icon" onClick={() => handleRemoveEducation(index)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="p-4 pt-0 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`school-${edu.id}`}>School</Label>
                <Input id={`school-${edu.id}`} value={edu.school} onChange={(e) => handleEducationChange(index, 'school', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`degree-${edu.id}`}>Degree</Label>
                <Input id={`degree-${edu.id}`} value={edu.degree} onChange={(e) => handleEducationChange(index, 'degree', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`start-date-${edu.id}`}>Start Date</Label>
                <Input id={`start-date-${edu.id}`} value={edu.startDate} onChange={(e) => handleEducationChange(index, 'startDate', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`end-date-${edu.id}`}>End Date</Label>
                <Input id={`end-date-${edu.id}`} value={edu.endDate} onChange={(e) => handleEducationChange(index, 'endDate', e.target.value)} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      <Button onClick={handleAddEducation} variant="outline" className="w-full">
        <Plus className="h-4 w-4 mr-2" /> Add Education
      </Button>
    </div>
  );
}
