import type { Types } from 'mongoose';

export type PersonalInfo = {
  name: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  summary: string;
};

export type Education = {
  id: string;
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
};

export type Experience = {
  id: string;
  company: string;
  role: string;
  description: string;
  startDate: string;
  endDate: string;
};

export type Skill = {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
};

export type Project = {
  id: string;
  title: string;
  description: string;
  link: string;
};

export type ResumeData = {
  _id?: Types.ObjectId | string;
  userId: Types.ObjectId | string;
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  projects: Project[];
};
