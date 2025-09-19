import type { ResumeData } from '@/types/resume';
import { nanoid } from 'nanoid';

export const initialData: ResumeData = {
  personalInfo: {
    name: 'Alex Doe',
    email: 'alex.doe@example.com',
    phone: '123-456-7890',
    address: 'Metropolis, USA',
    website: 'alexdoe.dev',
    summary:
      'Innovative Full-Stack Developer with 5+ years of experience in building and maintaining responsive web applications. Proficient in JavaScript, React, Node.js, and cloud technologies. Passionate about creating seamless user experiences and solving complex problems.',
  },
  experience: [
    {
      id: nanoid(),
      company: 'Tech Solutions Inc.',
      role: 'Senior Software Engineer',
      startDate: '2020',
      endDate: 'Present',
      description:
        '- Led a team of 5 engineers in developing a new e-commerce platform, resulting in a 20% increase in sales.\n- Optimized application performance, reducing page load times by 30%.\n- Mentored junior developers and conducted code reviews to maintain code quality.',
    },
    {
      id: nanoid(),
      company: 'Innovate Corp.',
      role: 'Software Engineer',
      startDate: '2018',
      endDate: '2020',
      description:
        '- Developed and maintained features for a SaaS product using React and Ruby on Rails.\n- Collaborated with product managers and designers to translate requirements into technical specifications.\n- Wrote unit and integration tests to ensure software reliability.',
    },
  ],
  education: [
    {
      id: nanoid(),
      school: 'University of Technology',
      degree: 'B.S. in Computer Science',
      startDate: '2014',
      endDate: '2018',
    },
  ],
  skills: [
    { id: nanoid(), name: 'JavaScript', level: 'Expert' },
    { id: nanoid(), name: 'React', level: 'Expert' },
    { id: nanoid(), name: 'Node.js', level: 'Advanced' },
    { id: nanoid(), name: 'TypeScript', level: 'Advanced' },
    { id: nanoid(), name: 'SQL', level: 'Intermediate' },
  ],
  projects: [
    {
      id: nanoid(),
      title: 'Portfolio Website',
      link: 'alexdoe.dev',
      description:
        'A personal portfolio website to showcase my projects and skills, built with Next.js and Tailwind CSS.',
    },
    {
      id: nanoid(),
      title: 'Task Management App',
      link: 'github.com/alexdoe/task-app',
      description:
        'A full-stack task management application with user authentication and real-time updates using Firebase.',
    },
  ],
};
