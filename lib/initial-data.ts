import type { ResumeData } from '@/types/resume';

export const initialData: ResumeData = {
  userId: '',
  personalInfo: {
    name: '',
    email: '',
    phone: '',
    address: '',
    website: '',
    summary: '',
  },
  experience: [],
  education: [],
  skills: [],
  projects: [],
};
