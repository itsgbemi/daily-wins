import { Trophy } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
return (
<div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
<Trophy className="w-24 h-24 text-blue-500 mb-6" />
<h1 className="text-4xl font-bold mb-4">Daily Wins</h1>
<p className="text-xl text-gray-600 mb-8 max-w-md">
Track your daily accomplishments and celebrate your progress
</p>
<div className="flex gap-4">
<Link href="/signup" className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition">
Get Started
</Link>
<Link href="/login" className="border border-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition">
Login
</Link>
</div>
<div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
<div className="p-6 bg-blue-50 rounded-xl">
<div className="text-2xl font-bold text-blue-600 mb-2">1</div>
<h3 className="font-semibold mb-2">Sign Up</h3>
<p className="text-gray-600">Create your free account</p>
</div>
<div className="p-6 bg-green-50 rounded-xl">
<div className="text-2xl font-bold text-green-600 mb-2">2</div>
<h3 className="font-semibold mb-2">Add Wins</h3>
<p className="text-gray-600">Record your daily accomplishments</p>
</div>
<div className="p-6 bg-purple-50 rounded-xl">
<div className="text-2xl font-bold text-purple-600 mb-2">3</div>
<h3 className="font-semibold mb-2">Track Progress</h3>
<p className="text-gray-600">See your growth over time</p>
</div>
</div>
</div>
)
}
