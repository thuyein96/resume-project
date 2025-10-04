"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Navbar from "@/components/Navbar"
import ResumeForm from "@/components/ResumeForm"
import { Resume } from "@/types"
import Link from "next/link"
import ResumePreview from "@/components/ResumePreview"

export default function EditResumePage() {
  const params = useParams()
  const router = useRouter()
  const [resume, setResume] = useState<Resume | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [liveData, setLiveData] =
    useState<Omit<Resume, "_id" | "user" | "createdAt" | "updatedAt">>({
      title: "",
      personalInfo: { fullName: "", email: "", phone: "", address: "" },
      education: [{ school: "", degree: "", startDate: "", endDate: "" }],
      experience: [{ company: "", position: "", startDate: "", endDate: "", description: "" }],
      skills: [""],
      projects: [{ name: "", description: "" }],
    })

  useEffect(() => {
    fetchResume()
  }, [])

  useEffect(() => {
    if (resume) {
      setLiveData({
        title: resume.title,
        personalInfo: resume.personalInfo,
        education: resume.education,
        experience: resume.experience,
        skills: resume.skills,
        projects: resume.projects,
      })
    }
  }, [resume])

  const fetchResume = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/resumes/${params.id}`
      )
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error)
      }

      setResume(data.resume)
    } catch (err) {
      setError("Failed to load resume")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (
    data: Omit<Resume, "_id" | "user" | "createdAt" | "updatedAt">
  ) => {
    setIsSaving(true)
    setError("")
    setSuccess("")

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/resumes/${params.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      )

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to update resume")
      }

      setSuccess("Resume updated successfully!")
      setTimeout(() => {
        router.push("/resumes")
      }, 1500)
    } catch (err: any) {
      setError(err.message || "Failed to update resume")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto">
          <div className="mb-4">
            <Link href="/resumes" className="text-blue-600 hover:underline">
              ← Back to Resumes
            </Link>
          </div>

          <h1 className="text-3xl font-bold mb-8">Edit Resume</h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {success}
            </div>
          )}

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Loading resume...</p>
            </div>
          ) : resume ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Edit Resume</h2>
                <ResumeForm
                  initialData={resume}
                  onSubmit={handleSubmit}
                  isLoading={isLoading}
                  onChange={(data) => setLiveData(data)}
                />
              </div>

              <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
                <h2 className="text-2xl font-semibold mb-4">Live Preview</h2>
                {/* Convert liveData to full Resume shape for ResumePreview */}
                <ResumePreview
                  resume={{
                    _id: "",
                    user: "",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    title: liveData.title,
                    personalInfo: liveData.personalInfo,
                    education: liveData.education,
                    experience: liveData.experience,
                    skills: liveData.skills,
                    projects: liveData.projects,
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              Resume not found
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
