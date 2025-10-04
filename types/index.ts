export interface User {
  _id: string;
  email: string;
  password: string;
  createdAt: Date;
}

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
}

export interface Education {
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
}

export interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Project {
  name: string;
  description: string;
}

export interface Resume {
  _id?: string;
  user: string;
  title: string;
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: string[];
  projects: Project[];
  createdAt?: Date;
  updatedAt?: Date;
}