import mongoose, { Schema } from 'mongoose';
import { initialData } from '@/lib/initial-data';
import type { PersonalInfo, Experience, Education, Skill, Project, ResumeData } from '@/types/resume';
import { connectDB } from '@/lib/db';

// Mongoose Schemas
const PersonalInfoSchema = new Schema<PersonalInfo>({
  name: String,
  email: String,
  phone: String,
  address: String,
  website: String,
  summary: String,
}, { _id: false });

const ExperienceSchema = new Schema<Experience>({
  id: String,
  company: String,
  role: String,
  startDate: String,
  endDate: String,
  description: String,
}, { _id: false });

const EducationSchema = new Schema<Education>({
  id: String,
  school: String,
  degree: String,
  startDate: String,
  endDate: String,
}, { _id: false });

const SkillSchema = new Schema<Skill>({
  id: String,
  name: String,
  level: String,
}, { _id: false });

const ProjectSchema = new Schema<Project>({
  id: String,
  title: String,
  link: String,
  description: String,
}, { _id: false });

const ResumeSchema = new Schema<ResumeData>({
  personalInfo: PersonalInfoSchema,
  experience: [ExperienceSchema],
  education: [EducationSchema],
  skills: [SkillSchema],
  projects: [ProjectSchema],
});

const ResumeModel = mongoose.models.Resume || mongoose.model<ResumeData>('Resume', ResumeSchema, 'resumes');

export async function getResume() {
  await connectDB();
  let resume = await ResumeModel.create(initialData);
  // Convert to plain JS object to avoid serialization issues
  return resume.toObject();
}

export async function updateResume(resumeData: Omit<ResumeData, '_id'>) {
  await connectDB();
  // There's only one resume document, so we can find it without a specific query.
  // Using upsert: true will create the document if it doesn't exist.
  const result = await ResumeModel.updateOne({}, { $set: resumeData }, { upsert: true });
  return result;
}

// Multi-resume operations
// Multi-resume helpers
export async function listResumes() {
  await connectDB();
  const docs = await ResumeModel.find({}).sort({ _id: -1 }).lean();
  return docs;
}

export async function createResume(data?: Partial<ResumeData>) {
  await connectDB();
  const doc = await ResumeModel.create(data);
  return doc.toObject();
}

export async function getResumeById(id: string) {
  await connectDB();
  const doc = await ResumeModel.findById(id).lean();
  return doc;
}

export async function updateResumeById(id: string, data: Partial<ResumeData>) {
  await connectDB();
  const doc = await ResumeModel.findByIdAndUpdate(id, { $set: data }, { new: true, lean: true });
  return doc;
}

export async function deleteResumeById(id: string) {
  await connectDB();
  await ResumeModel.findByIdAndDelete(id);
  return { ok: true } as const;
}
