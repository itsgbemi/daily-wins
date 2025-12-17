'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Trophy, LogOut, User } from 'lucide-react'

export default function Header() {
const [user, setUser] = useState(null)
const router = useRouter()

useEffect(() => {
checkUser()
const { data: authListener } = supabase.auth.onAuthStateChange(() => {
checkUser()
})
return () => {
authListener?.subscription.unsubscribe()
}
}, [])

async function checkUser() {
const { data: { user } } = await supabase.auth.getUser()
setUser(user)
}

async function handleLogout() {
await supabase.auth.signOut()
router.push('/')
}

return (
<header className="border-b">
<nav className="container mx-auto px-4 py-4 flex justify-between items-center">
<Link href="/" className="flex items-center gap-2 text-xl font-bold">
<Trophy className="w-6 h-6 text-blue-500" />
Daily Wins
</Link>

<div className="flex items-center gap-4">
{user ? (
<>
<span className="flex items-center gap-2 text-gray-600">
<User className="w-4 h-4" />
{user.email}
</span>
<button
onClick={handleLogout}
className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
>
<LogOut className="w-4 h-4" />
Logout
</button>
</>
) : (
<>
<Link href="/login" className="text-gray-600 hover:text-gray-900 px-4 py-2">
Login
</Link>
<Link href="/signup" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
Sign Up
</Link>
</>
)}
</div>
</nav>
</header>
)
}
