'use client';

import { useState } from 'react';
import { Resume, Education, Experience, Project, PersonalInfo } from '@/types';

interface ResumeFormProps {
  initialData?: Resume;
  onSubmit: (data: Omit<Resume, '_id' | 'user' | 'createdAt' | 'updatedAt'>) => void;
  isLoading: boolean;
  onChange?: (data: Omit<Resume, '_id' | 'user' | 'createdAt' | 'updatedAt'>) => void;
}

export default function ResumeForm({ initialData, onSubmit, isLoading, onChange }: ResumeFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    personalInfo: {
      fullName: initialData?.personalInfo.fullName || '',
      email: initialData?.personalInfo.email || '',
      phone: initialData?.personalInfo.phone || '',
      address: initialData?.personalInfo.address || '',
    },
    education: initialData?.education || [{ school: '', degree: '', startDate: '', endDate: '' }],
    experience: initialData?.experience || [{ company: '', position: '', startDate: '', endDate: '', description: '' }],
    skills: initialData?.skills || [''],
    projects: initialData?.projects || [{ name: '', description: '' }],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const updatePersonalInfo = (field: keyof PersonalInfo, value: string) => {
    const updated = { ...formData.personalInfo, [field]: value };
    setFormData({ ...formData, personalInfo: updated });
    onChange?.({
      title: formData.title,
      personalInfo: updated,
      education: formData.education,
      experience: formData.experience,
      skills: formData.skills,
      projects: formData.projects,
    });
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [...formData.education, { school: '', degree: '', startDate: '', endDate: '' }],
    });
    onChange?.( {
      title: formData.title,
      personalInfo: formData.personalInfo,
      education: [...formData.education, { school: '', degree: '', startDate: '', endDate: '' }],
      experience: formData.experience,
      skills: formData.skills,
      projects: formData.projects,
    });
  };

  const removeEducation = (index: number) => {
    setFormData({
      ...formData,
      education: formData.education.filter((_, i) => i !== index),
    });
    onChange?.({
      title: formData.title,
      personalInfo: formData.personalInfo,
      education: formData.education.filter((_, i) => i !== index),
      experience: formData.experience,
      skills: formData.skills,
      projects: formData.projects,
    });
  };

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    const updated = [...formData.education];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, education: updated });
    onChange?.({
      title: formData.title,
      personalInfo: formData.personalInfo,
      education: updated,
      experience: formData.experience,
      skills: formData.skills,
      projects: formData.projects,
    });
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [...formData.experience, { company: '', position: '', startDate: '', endDate: '', description: '' }],
    });
    onChange?.({
      title: formData.title,
      personalInfo: formData.personalInfo,
      education: formData.education,
      experience: [...formData.experience, { company: '', position: '', startDate: '', endDate: '', description: '' }],
      skills: formData.skills,
      projects: formData.projects,
    });
  };

  const removeExperience = (index: number) => {
    setFormData({
      ...formData,
      experience: formData.experience.filter((_, i) => i !== index),
    });
    onChange?.({
      title: formData.title,
      personalInfo: formData.personalInfo,
      education: formData.education,
      experience: formData.experience.filter((_, i) => i !== index),
      skills: formData.skills,
      projects: formData.projects,
    });
  };

  const updateExperience = (index: number, field: keyof Experience, value: string) => {
    const updated = [...formData.experience];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, experience: updated });
    onChange?.({
      title: formData.title,
      personalInfo: formData.personalInfo,
      education: formData.education,
      experience: updated,
      skills: formData.skills,
      projects: formData.projects,
    });
  };

  const addSkill = () => {
    setFormData({ ...formData, skills: [...formData.skills, ''] });
    onChange?.({
      title: formData.title,
      personalInfo: formData.personalInfo,
      education: formData.education,
      experience: formData.experience,
      skills: [...formData.skills, ''],
      projects: formData.projects,
    });
  };

  const removeSkill = (index: number) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((_, i) => i !== index),
    });
    onChange?.({
      title: formData.title,
      personalInfo: formData.personalInfo,
      education: formData.education,
      experience: formData.experience,
      skills: formData.skills.filter((_, i) => i !== index),
      projects: formData.projects,
    });
  };

  const updateSkill = (index: number, value: string) => {
    const updated = [...formData.skills];
    updated[index] = value;
    setFormData({ ...formData, skills: updated });
    onChange?.({
      title: formData.title,
      personalInfo: formData.personalInfo,
      education: formData.education,
      experience: formData.experience,
      skills: updated,
      projects: formData.projects,
    });
  };

  const addProject = () => {
    setFormData({
      ...formData,
      projects: [...formData.projects, { name: '', description: '' }],
    });
    onChange?.({
      title: formData.title,
      personalInfo: formData.personalInfo,
      education: formData.education,
      experience: formData.experience,
      skills: formData.skills,
      projects: [...formData.projects, { name: '', description: '' }],
    });
  };

  const removeProject = (index: number) => {
    setFormData({
      ...formData,
      projects: formData.projects.filter((_, i) => i !== index),
    });
    onChange?.({
      title: formData.title,
      personalInfo: formData.personalInfo,
      education: formData.education,
      experience: formData.experience,
      skills: formData.skills,
      projects: formData.projects.filter((_, i) => i !== index),
    });
  };

  const updateProject = (index: number, field: keyof Project, value: string) => {
    const updated = [...formData.projects];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, projects: updated });
    onChange?.({
      title: formData.title,
      personalInfo: formData.personalInfo,
      education: formData.education,
      experience: formData.experience,
      skills: formData.skills,
      projects: updated,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium mb-2">Resume Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      {/* Personal Info */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Personal Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              value={formData.personalInfo.fullName}
              onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={formData.personalInfo.email}
              onChange={(e) => updatePersonalInfo('email', e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="tel"
              value={formData.personalInfo.phone}
              onChange={(e) => updatePersonalInfo('phone', e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <input
              type="text"
              value={formData.personalInfo.address}
              onChange={(e) => updatePersonalInfo('address', e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>
      </div>

      {/* Education */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Education</h2>
          <button type="button" onClick={addEducation} className="bg-green-500 text-white px-4 py-2 rounded">
            Add Education
          </button>
        </div>
        {formData.education.map((edu, index) => (
          <div key={index} className="border p-4 rounded space-y-2">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="School"
                value={edu.school}
                onChange={(e) => updateEducation(index, 'school', e.target.value)}
                className="p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                className="p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Start Date (e.g., 2018-09)"
                value={edu.startDate}
                onChange={(e) => updateEducation(index, 'startDate', e.target.value)}
                className="p-2 border rounded"
              />
              <input
                type="text"
                placeholder="End Date (e.g., 2022-05)"
                value={edu.endDate}
                onChange={(e) => updateEducation(index, 'endDate', e.target.value)}
                className="p-2 border rounded"
              />
            </div>
            <button
              type="button"
              onClick={() => removeEducation(index)}
              className="bg-red-500 text-white px-3 py-1 rounded text-sm"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Experience */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Experience</h2>
          <button type="button" onClick={addExperience} className="bg-green-500 text-white px-4 py-2 rounded">
            Add Experience
          </button>
        </div>
        {formData.experience.map((exp, index) => (
          <div key={index} className="border p-4 rounded space-y-2">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Company"
                value={exp.company}
                onChange={(e) => updateExperience(index, 'company', e.target.value)}
                className="p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Position"
                value={exp.position}
                onChange={(e) => updateExperience(index, 'position', e.target.value)}
                className="p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Start Date"
                value={exp.startDate}
                onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                className="p-2 border rounded"
              />
              <input
                type="text"
                placeholder="End Date"
                value={exp.endDate}
                onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                className="p-2 border rounded"
              />
            </div>
            <textarea
              placeholder="Description"
              value={exp.description}
              onChange={(e) => updateExperience(index, 'description', e.target.value)}
              className="w-full p-2 border rounded"
              rows={3}
            />
            <button
              type="button"
              onClick={() => removeExperience(index)}
              className="bg-red-500 text-white px-3 py-1 rounded text-sm"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Skills</h2>
          <button type="button" onClick={addSkill} className="bg-green-500 text-white px-4 py-2 rounded">
            Add Skill
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {formData.skills.map((skill, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                placeholder="Skill"
                value={skill}
                onChange={(e) => updateSkill(index, e.target.value)}
                className="flex-1 p-2 border rounded"
              />
              <button
                type="button"
                onClick={() => removeSkill(index)}
                className="bg-red-500 text-white px-3 rounded text-sm"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Projects */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Projects</h2>
          <button type="button" onClick={addProject} className="bg-green-500 text-white px-4 py-2 rounded">
            Add Project
          </button>
        </div>
        {formData.projects.map((project, index) => (
          <div key={index} className="border p-4 rounded space-y-2">
            <input
              type="text"
              placeholder="Project Name"
              value={project.name}
              onChange={(e) => updateProject(index, 'name', e.target.value)}
              className="w-full p-2 border rounded"
            />
            <textarea
              placeholder="Project Description"
              value={project.description}
              onChange={(e) => updateProject(index, 'description', e.target.value)}
              className="w-full p-2 border rounded"
              rows={3}
            />
            <button
              type="button"
              onClick={() => removeProject(index)}
              className="bg-red-500 text-white px-3 py-1 rounded text-sm"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isLoading ? 'Saving...' : 'Save Resume'}
      </button>
    </form>
  );
}