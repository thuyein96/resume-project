import Link from "next/link"
import Navbar from "@/components/Navbar"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      <main className="container mx-auto px-6 py-12">
        {/* Welcome / Hero */}
        <section className="mb-12 text-center">
          <h2 className="text-3xl font-semibold mb-4">Welcome Back!</h2>
          <p className="text-gray-700 max-w-xl mx-auto">
            Quickly create professional resumes that get noticed. Start a new one or view
            your previous creations.
          </p>
        </section>

        {/* Action Buttons */}
        <section className="mb-12 flex justify-center gap-6">
          <Link
            href="/resumes"
            className="px-6 py-4 border border-black rounded-md text-black font-medium hover:bg-black hover:text-white transition"
          >
            See My Resumes
          </Link>
          <Link
            href="/resumes/create"
            className="px-6 py-4 border border-black rounded-md text-black font-medium hover:bg-black hover:text-white transition"
          >
            Create New Resume
          </Link>
        </section>

        <section className="mb-12 max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold mb-6 text-center">
            Quick Tips for a Better Resume
          </h3>
          <div className="space-y-4">
            {[
              "Keep your resume concise and tailored to the role.",
              "Use action verbs to describe achievements.",
              "Highlight measurable results, not just responsibilities.",
              "Ensure formatting is clean and consistent.",
            ].map((tip, index) => (
              <div
                key={index}
                className="flex items-start gap-4 border-l-4 border-black pl-4 hover:bg-gray-50 transition rounded-md p-2"
              >
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-black text-white rounded-full font-semibold">
                  {index + 1}
                </div>
                <p className="text-gray-800">{tip}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-300 py-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Resume Creator. All rights reserved.
      </footer>
    </div>
  )
}
