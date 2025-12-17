'use client'
import { useState } from 'react'
import { Plus } from 'lucide-react'

export default function AddWin({ onAdd }) {
const [text, setText] = useState('')
const [loading, setLoading] = useState(false)

async function handleSubmit(e) {
e.preventDefault()
if (!text.trim()) return

setLoading(true)
try {
await onAdd(text.trim())
setText('')
} catch (error) {
console.error('Error adding win:', error)
} finally {
setLoading(false)
}
}

return (
<form onSubmit={handleSubmit} className="mb-8">
<div className="flex gap-2">
<input
type="text"
value={text}
onChange={(e) => setText(e.target.value)}
placeholder="What's your win for today?"
className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
disabled={loading}
/>
<button
type="submit"
disabled={loading || !text.trim()}
className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
>
<Plus className="w-5 h-5" />
Add Win
</button>
</div>
</form>
)
}
