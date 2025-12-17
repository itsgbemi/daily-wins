'use client'
import { Trash2, Calendar } from 'lucide-react'

export default function WinList({ wins, onDelete }) {
function formatDate(dateString) {
const date = new Date(dateString)
return date.toLocaleDateString('en-US', {
month: 'short',
day: 'numeric',
hour: '2-digit',
minute: '2-digit'
})
}

return (
<div className="space-y-4">
{wins.map((win) => (
<div key={win.id} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
<div className="flex justify-between items-start">
<div className="flex-1">
<p className="text-lg text-gray-800 mb-2">{win.text}</p>
<div className="flex items-center text-gray-500 text-sm">
<Calendar className="w-4 h-4 mr-2" />
{formatDate(win.created_at)}
</div>
</div>
<button
onClick={() => onDelete(win.id)}
className="text-gray-400 hover:text-red-500 p-2 hover:bg-red-50 rounded-lg transition"
title="Delete win"
>
<Trash2 className="w-5 h-5" />
</button>
</div>
</div>
))}
</div>
)
}
