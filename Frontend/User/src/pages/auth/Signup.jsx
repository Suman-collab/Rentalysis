import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../services/api'

const Signup = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNo: '',
    password: '',
    confirmPassword: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSignup = async (e) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setIsLoading(true)
    setError('')


    const payload = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      mobile_no: formData.mobileNo,
      password: formData.password,
      confirm_password: formData.confirmPassword
    }

    try {
      const response = await api.post('/auth/customer/signup', payload)
      navigate('/login')
    } catch (err) {
      let errorMessage = 'Signup failed'
      if (err.response?.data?.detail) {
        const detail = err.response.data.detail
        if (Array.isArray(detail)) {
          errorMessage = detail.map(e => {
            const field = e.loc && e.loc.length > 1 ? e.loc[e.loc.length - 1] : 'Error'
            const fieldName = field.charAt(0).toUpperCase() + field.slice(1)
            return `${fieldName}: ${e.msg}`
          }).join('. ')
        } else {
          errorMessage = detail
        }
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message
      } else if (err.message) {
        errorMessage = err.message
      }
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg border border-neutral-200 shadow-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-neutral-900">Create an account</h1>
          <p className="text-neutral-500 mt-2">Start renting in minutes</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-md border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full h-10 px-3 rounded-md border border-neutral-200 focus:outline-none focus:border-neutral-900 transition-colors"
                placeholder="John"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full h-10 px-3 rounded-md border border-neutral-200 focus:outline-none focus:border-neutral-900 transition-colors"
                placeholder="Doe"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full h-10 px-3 rounded-md border border-neutral-200 focus:outline-none focus:border-neutral-900 transition-colors"
              placeholder="name@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Mobile Number</label>
            <input
              type="tel"
              name="mobileNo"
              value={formData.mobileNo}
              onChange={handleChange}
              required
              className="w-full h-10 px-3 rounded-md border border-neutral-200 focus:outline-none focus:border-neutral-900 transition-colors"
              placeholder="+1 234 567 8900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full h-10 pl-3 pr-10 rounded-md border border-neutral-200 focus:outline-none focus:border-neutral-900 transition-colors"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-neutral-400 hover:text-neutral-600 focus:outline-none"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Re-enter Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full h-10 pl-3 pr-10 rounded-md border border-neutral-200 focus:outline-none focus:border-neutral-900 transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-10 bg-neutral-900 text-white font-medium rounded-md hover:bg-neutral-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Creating Account' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-neutral-500">Already have an account? </span>
          <Link to="/login" className="font-medium text-neutral-900 hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Signup
