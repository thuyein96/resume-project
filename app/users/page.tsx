"use client"

import { useEffect, useState } from "react"
import { Button } from "components/ui/button"
import { useRouter } from "next/navigation"

type User = { _id: string; name?: string; email?: string }

export default function UsersPage() {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const loadUsers = async () => {
    setLoading(true)
    const res = await fetch(`${API_BASE}/users`, { cache: "no-store" })
    const data = await res.json()
    setUsers(data || [])
    console.log(data, 'users')
    setLoading(false)
  }

  useEffect(() => {
    loadUsers()
  }, [])

  return (
    <main className="container mx-auto p-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Users</h1>
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ul className="divide-y">
            {users.map((user) => (
              <li key={user._id} className="py-3 flex items-center justify-between">
                <div className="truncate">
                  <div className="font-medium">{user.name || "Unnamed User"}</div>
                  <div className="text-sm text-muted-foreground">
                    {user.email || "No Email"}
                  </div>
                </div>
              </li>
            ))}
            {users.length === 0 && <div>No users found.</div>}
          </ul>
        )}
      </div>
    </main>
  )
}
