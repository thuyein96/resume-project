'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useResume } from '@/context/resume-context';
import type { PersonalInfo } from '@/types/resume';

export function PersonalInfoForm() {
  const { resumeData, setResumeData } = useResume();
  const { personalInfo } = resumeData;

  const handleInputChange = (field: keyof PersonalInfo, value: string) => {
    const newPersonalInfo = { ...personalInfo, [field]: value };
    setResumeData({ ...resumeData, personalInfo: newPersonalInfo });
  };

  return (
    <div className="space-y-4 p-1">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" value={personalInfo.name} onChange={(e) => handleInputChange('name', e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={personalInfo.email} onChange={(e) => handleInputChange('email', e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" value={personalInfo.phone} onChange={(e) => handleInputChange('phone', e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input id="address" value={personalInfo.address} onChange={(e) => handleInputChange('address', e.target.value)} />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="website">Website/Portfolio</Label>
          <Input id="website" value={personalInfo.website} onChange={(e) => handleInputChange('website', e.target.value)} />
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="summary">Summary</Label>
        </div>
        <Textarea
          id="summary"
          value={personalInfo.summary}
          onChange={(e) => handleInputChange('summary', e.target.value)}
          rows={5}
          placeholder="A brief summary of your professional background..."
        />
      </div>
    </div>
  );
}
