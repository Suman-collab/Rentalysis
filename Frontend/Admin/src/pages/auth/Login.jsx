import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.jpg'

const Login = () => {
  const navigate = useNavigate()

  // Use env variables for default login ease
  const [formData, setFormData] = React.useState({
    email: import.meta.env.VITE_ADMIN_EMAIL || '',
    password: import.meta.env.VITE_ADMIN_PASSWORD || ''
  })

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const handleLogin = (e) => {
    e.preventDefault()
    // Redirect to admin dashboard
    navigate('/')
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-white">
      {/* Left: Login Form */}
      <div className="flex items-center justify-center p-8 sm:p-12 lg:p-16">
        <div className="w-full max-w-sm space-y-8 animate-in fade-in slide-in-from-left-4 duration-700">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Admin Portal</h1>
            <p className="text-neutral-500">
              Enter credentials to access the administration panel
            </p>
          </div>

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
                className="flex h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                placeholder="admin@rentalysis.com"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="password">
                  Password
                </label>
              </div>
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            <button className="inline-flex items-center justify-center w-full h-10 rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transition-colors">
              Access Dashboard
            </button>
          </form>

          <div className="text-center text-sm text-neutral-500">
            Need access?{' '}
            <Link to="/signup" className="font-semibold text-neutral-900 hover:underline">
              Request Access
            </Link>
          </div>
        </div>
      </div>

      {/* Right: Feature Image */}
      <div className="hidden lg:flex flex-col items-center justify-center bg-neutral-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406140926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
        <div className="relative z-10 p-12 text-white max-w-lg text-center">
          <img src={logo} alt="Rentalysis" className="h-24 w-auto mb-8 mx-auto drop-shadow-lg" />
          <h2 className="text-3xl font-bold mb-6">"Control, Monitor, Scale."</h2>
          <p className="text-neutral-300 text-lg leading-relaxed">
            Centralized management for the entire Rentalysis ecosystem.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
