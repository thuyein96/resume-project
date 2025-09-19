'use client';

import { useResume } from '@/context/resume-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Plus } from 'lucide-react';
import { nanoid } from 'nanoid';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Skill } from '@/types/resume';

export function SkillsForm() {
  const { resumeData, setResumeData } = useResume();
  const { skills } = resumeData;

  const handleAddSkill = () => {
    const newSkill = {
      id: nanoid(),
      name: '',
      level: 'Intermediate' as Skill['level'],
    };
    setResumeData({
      ...resumeData,
      skills: [...resumeData.skills, newSkill],
    });
  };

  const handleRemoveSkill = (index: number) => {
    const newSkills = [...resumeData.skills];
    newSkills.splice(index, 1);
    setResumeData({ ...resumeData, skills: newSkills });
  };

  const handleSkillChange = (index: number, field: string, value: string) => {
    const newSkills = [...resumeData.skills];
    const skill = newSkills[index];

    if (field === 'level') {
      newSkills[index] = { ...skill, level: value as Skill['level'] };
    } else {
      newSkills[index] = { ...skill, [field]: value };
    }
    
    setResumeData({ ...resumeData, skills: newSkills });
  };

  return (
    <div className="space-y-4 p-1">
      <div className="space-y-2">
        {skills.map((skill, index) => (
          <div key={skill.id} className="flex items-center gap-2">
            <Input
              placeholder="Skill (e.g. React)"
              value={skill.name}
              onChange={(e) => handleSkillChange(index, 'name', e.target.value)}
            />
            <Select
              value={skill.level}
              onValueChange={(value: Skill['level']) => handleSkillChange(index, 'level', value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
                <SelectItem value="Expert">Expert</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="ghost" size="icon" onClick={() => handleRemoveSkill(index)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      <Button onClick={handleAddSkill} variant="outline" className="w-full">
        <Plus className="h-4 w-4 mr-2" /> Add Skill
      </Button>
    </div>
  );
}
