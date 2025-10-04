import Link from "next/link";

export default function Home() {
  
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      <div className="text-center max-w-xl">
        <h1 className="text-6xl font-extrabold text-black mb-4">
          Resume Creator
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Create professional resumes effortlessly. Build, edit, and download your resume in minutes.
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            href="/login"
            className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="bg-white text-black px-8 py-3 rounded-lg font-semibold border-2 border-black hover:bg-gray-100 transition"
          >
            Register
          </Link>
        </div>
      </div>

      <div className="mt-20 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Created by a team of computer science students. <br />
        Sai Zin Min Khant, Thuy Ein, Su Yee Mon
      </div>
    </div>
  );
}