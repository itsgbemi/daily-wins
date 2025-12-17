'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Mail, Lock, Loader } from 'lucide-react'

export default function AuthForm({ type }) {
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [loading, setLoading] = useState(false)
const [error, setError] = useState('')
const router = useRouter()

const isLogin = type === 'login'

async function handleSubmit(e) {
e.preventDefault()
setLoading(true)
setError('')

try {
if (isLogin) {
const { error } = await supabase.auth.signInWithPassword({
email,
password
})
if (error) throw error
router.push('/dashboard')
} else {
const { error } = await supabase.auth.signUp({
email,
password,
})
if (error) throw error
alert('Check your email for confirmation link!')
router.push('/login')
}
} catch (error) {
setError(error.message)
} finally {
setLoading(false)
}
}

return (
<form onSubmit={handleSubmit} className="space-y-6">
{error && (
<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
{error}
</div>
)}

<div>
<label className="block text-sm font-medium text-gray-700 mb-2">
Email
</label>
<div className="relative">
<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
<input
type="email"
value={email}
onChange={(e) => setEmail(e.target.value)}
className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
placeholder="you@example.com"
required
/>
</div>
</div>

<div>
<label className="block text-sm font-medium text-gray-700 mb-2">
Password
</label>
<div className="relative">
<Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
<input
type="password"
value={password}
onChange={(e) => setPassword(e.target.value)}
className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
placeholder="••••••••"
minLength="6"
required
/>
</div>
</div>

<button
type="submit"
disabled={loading}
className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
>
{loading && <Loader className="w-5 h-5 animate-spin" />}
{isLogin ? 'Login' : 'Sign Up'}
</button>

<div className="text-center text-sm text-gray-600">
{isLogin ? (
<>
Don't have an account?{' '}
<a href="/signup" className="text-blue-500 hover:underline">
Sign up
</a>
</>
) : (
<>
Already have an account?{' '}
<a href="/login" className="text-blue-500 hover:underline">
Login
</a>
</>
)}
</div>
</form>
)
}
