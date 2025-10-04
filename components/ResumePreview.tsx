'use client';

import { Resume } from '@/types';

interface ResumePreviewProps {
  resume: Resume;
}

export default function ResumePreview({ resume }: ResumePreviewProps) {
  const handleDownloadPDF = () => {
    window.print();
  };
  console.log(resume, "resume in preview")

  return (
    <div>
      <div className="mb-6 no-print">
        <button
          onClick={handleDownloadPDF}
          className="bg-blue-600 text-white px-6 py-3 rounded font-semibold hover:bg-blue-700"
        >
          Download as PDF
        </button>
      </div>

      <div className="bg-white p-8 shadow-lg max-w-4xl mx-auto" id="resume-content">
        {/* Header */}
        <div className="border-b-2 border-gray-800 pb-4 mb-6">
          <h1 className="text-4xl font-bold mb-2">{resume.personalInfo.fullName}</h1>
          <div className="text-gray-700">
            <p>{resume.personalInfo.email} | {resume.personalInfo.phone}</p>
            <p>{resume.personalInfo.address}</p>
          </div>
        </div>

        {/* Education */}
        {resume.education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-3 text-gray-800">Education</h2>
            {resume.education.map((edu, index) => (
              <div key={index} className="mb-3">
                <div className="flex justify-between">
                  <h3 className="font-semibold text-lg">{edu.school}</h3>
                  <span className="text-gray-600">{edu.startDate} - {edu.endDate}</span>
                </div>
                <p className="text-gray-700">{edu.degree}</p>
              </div>
            ))}
          </div>
        )}

        {/* Experience */}
        {resume.experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-3 text-gray-800">Experience</h2>
            {resume.experience.map((exp, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between">
                  <h3 className="font-semibold text-lg">{exp.position}</h3>
                  <span className="text-gray-600">{exp.startDate} - {exp.endDate}</span>
                </div>
                <p className="text-gray-700 font-medium">{exp.company}</p>
                <p className="text-gray-600 mt-1">{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {resume.skills.length > 0 && resume.skills[0] !== '' && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-3 text-gray-800">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {resume.skills.filter(s => s).map((skill, index) => (
                <span key={index} className="bg-gray-200 px-3 py-1 rounded">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {resume.projects.length > 0 && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-3 text-gray-800">Projects</h2>
            {resume.projects.map((project, index) => (
              <div key={index} className="mb-3">
                <h3 className="font-semibold text-lg">{project.name}</h3>
                <p className="text-gray-600">{project.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx global>{`
        @media print {
          .no-print {
            display: none !important;
          }
          body * {
            visibility: hidden;
          }
          #resume-content, #resume-content * {
            visibility: visible;
          }
          #resume-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
