'use client'
import AuthForm from '@/components/AuthForm'

export default function SignupPage() {
return (
<div className="max-w-md mx-auto mt-12">
<h1 className="text-3xl font-bold mb-8 text-center">Create Account</h1>
<AuthForm type="signup" />
</div>
)
}
