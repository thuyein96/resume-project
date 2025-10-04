import { NextRequest, NextResponse } from "next/server"
import { dbConnect } from "@/lib/mongodb"
import Resume from "@/lib/models/Resume"
import { getUserIdFromCookie } from "@/lib/auth"

// GET - Fetch single resume
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect()

    const resolvedParams = await params
    const userId = await getUserIdFromCookie()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const resume = await Resume.findOne({ _id: resolvedParams.id, user: userId })

    if (!resume) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 })
    }

    return NextResponse.json({ resume }, { status: 200 })
  } catch (error) {
    console.error("Get resume error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// PUT - Update resume
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect()

    const resolvedParams = await params
    const userId = await getUserIdFromCookie()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()

    const resume = await Resume.findOneAndUpdate({ _id: resolvedParams.id, user: userId }, data, {
      new: true,
    })

    if (!resume) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 })
    }

    return NextResponse.json({ resume }, { status: 200 })
  } catch (error) {
    console.error("Update resume error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// DELETE - Delete resume
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect()

    const resolvedParams = await params
    const userId = await getUserIdFromCookie()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const resume = await Resume.findOneAndDelete({ _id: resolvedParams.id, user: userId })

    if (!resume) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Resume deleted" }, { status: 200 })
  } catch (error) {
    console.error("Delete resume error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
