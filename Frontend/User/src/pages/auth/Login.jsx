// FILE: src/pages/auth/Login.jsx
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg border border-neutral-200 shadow-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-neutral-900">Welcome back</h1>
          <p className="text-neutral-500 mt-2">Sign in to your account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full h-10 px-3 rounded-md border border-neutral-200 focus:outline-none focus:border-neutral-900 transition-colors"
              placeholder="name@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Password</label>
            <input
              type="password"
              className="w-full h-10 px-3 rounded-md border border-neutral-200 focus:outline-none focus:border-neutral-900 transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button className="w-full h-10 bg-neutral-900 text-white font-medium rounded-md hover:bg-neutral-800 transition-colors">
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-neutral-500">Don't have an account? </span>
          <Link to="/signup" className="font-medium text-neutral-900 hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
