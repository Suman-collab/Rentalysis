import logo from '../../assets/logo.png'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../services/api'

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await api.post('/auth/login', formData)
      const data = response.data;

      if (data.access_token) {
        localStorage.setItem('vendorToken', data.access_token)
      } else if (data.token) {
        localStorage.setItem('vendorToken', data.token)
      }

      if (data.vendor) {
        localStorage.setItem('vendor', JSON.stringify(data.vendor))
      }

      navigate('/dashboard')
    } catch (err) {
      console.error('Login error:', err)
      const errorMessage = err.response?.data?.message || err.response?.data?.detail || 'An error occurred during login'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-white">
      <div className="flex items-center justify-center p-8 sm:p-12 lg:p-16">
        <div className="w-full max-w-sm space-y-8 animate-in fade-in slide-in-from-left-4 duration-700">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Vendor Portal</h1>
            <p className="text-neutral-500">
              Sign in to manage your products and rentals
            </p>
          </div>
          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-md border border-red-100">
              {error}
            </div>
          )}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                placeholder="vendor@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="password">
                  Password
                </label>
                <a href="#" className="text-sm font-medium text-blue-600 hover:underline">
                  Forgot password?
                </a>
              </div>
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center justify-center w-full h-10 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transition-colors"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>

            <button type="button" className="inline-flex items-center justify-center w-full h-10 rounded-md border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-colors">
              <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
              Continue with Google
            </button>
          </form>

          <div className="text-center text-sm text-neutral-500">
            Don't have a vendor account?{' '}
            <Link to="/signup" className="font-semibold text-blue-600 hover:underline">
              Register now
            </Link>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex flex-col items-center justify-center bg-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="relative z-10 p-12 text-white max-w-lg text-center">
          <img src={logo} alt="Rentalysis" className="h-24 w-auto mb-8 mx-auto drop-shadow-lg" />
          <h2 className="text-3xl font-bold mb-6">"Grow your rental business with Rentalysis"</h2>
          <p className="text-blue-100 text-lg leading-relaxed">
            Join our platform to reach thousands of customers and manage your inventory efficiently.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
