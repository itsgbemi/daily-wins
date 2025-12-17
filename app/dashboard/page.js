'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import AddWin from '@/components/AddWin'
import WinList from '@/components/WinList'
import { Trophy } from 'lucide-react'

export default function DashboardPage() {
const [user, setUser] = useState(null)
const [wins, setWins] = useState([])
const [loading, setLoading] = useState(true)
const router = useRouter()

useEffect(() => {
checkUser()
fetchWins()
}, [])

async function checkUser() {
const { data: { user } } = await supabase.auth.getUser()
if (!user) {
router.push('/login')
} else {
setUser(user)
}
}

async function fetchWins() {
const { data: { user } } = await supabase.auth.getUser()
if (!user) return

const { data, error } = await supabase
.from('wins')
.select('*')
.eq('user_id', user.id)
.order('created_at', { ascending: false })

if (error) {
console.error('Error fetching wins:', error)
} else {
setWins(data || [])
}
setLoading(false)
}

async function handleAddWin(text) {
const { data: { user } } = await supabase.auth.getUser()
if (!user) return

const { data, error } = await supabase
.from('wins')
.insert([
{
user_id: user.id,
text: text
}
])
.select()

if (error) {
alert('Error adding win: ' + error.message)
} else {
setWins([data[0], ...wins])
}
}

async function handleDeleteWin(id) {
const { error } = await supabase
.from('wins')
.delete()
.eq('id', id)

if (error) {
alert('Error deleting win: ' + error.message)
} else {
setWins(wins.filter(win => win.id !== id))
}
}

if (loading) {
return (
<div className="flex justify-center items-center h-64">
<div className="text-gray-500">Loading...</div>
</div>
)
}

return (
<div className="max-w-2xl mx-auto">
<div className="flex items-center justify-between mb-8">
<div>
<h1 className="text-3xl font-bold">Your Daily Wins</h1>
<p className="text-gray-600">Welcome back, {user?.email}</p>
</div>
<Trophy className="w-12 h-12 text-blue-500" />
</div>

<AddWin onAdd={handleAddWin} />

{loading ? (
<div className="text-center py-8 text-gray-500">Loading your wins...</div>
) : wins.length === 0 ? (
<div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-xl">
<Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
<h3 className="text-xl font-semibold mb-2">No wins yet</h3>
<p className="text-gray-600">Add your first win above!</p>
</div>
) : (
<WinList wins={wins} onDelete={handleDeleteWin} />
)}
</div>
)
}
