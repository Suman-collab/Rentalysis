import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.png'

const Login = () => {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true)

  // Login Form State
  const [loginData, setLoginData] = useState({
    email: import.meta.env.VITE_VENDOR_EMAIL || '',
    password: import.meta.env.VITE_VENDOR_PASSWORD || ''
  })

  // Signup Form State
  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    businessName: '',
    password: ''
  })

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.id]: e.target.value })
  }

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.id]: e.target.value })
  }

  const handleLogin = (e) => {
    e.preventDefault()
    navigate('/')
  }

  const handleSignup = (e) => {
    e.preventDefault()
    // Signup logic here
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-neutral-100 flex items-center justify-center p-4 lg:p-8">
      <div className="bg-white rounded-2xl shadow-2xl relative overflow-hidden w-full max-w-[1000px] min-h-[600px] flex">

        {/* Login Section (Left Side) */}
        <div className={`absolute top-0 left-0 w-full lg:w-1/2 h-full flex flex-col justify-center px-8 sm:px-12 transition-all duration-700 ease-in-out ${isLogin ? 'z-20 opacity-100' : 'z-10 opacity-0 lg:opacity-100'}`}>
          <div className="w-full max-w-md mx-auto space-y-6">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl font-bold text-neutral-900">Welcome back</h1>
              <p className="text-neutral-500 mt-2">Enter your email to sign in</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  className="flex h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-all"
                  placeholder="vendor@example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium" htmlFor="password">Password</label>
                  <a href="#" className="text-sm font-medium text-neutral-900 hover:underline">Forgot password?</a>
                </div>
                <input
                  id="password"
                  type="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  className="flex h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
              <button className="w-full h-10 rounded-md bg-neutral-900 text-white text-sm font-bold hover:bg-neutral-800 transition-colors">
                Sign In
              </button>
            </form>

            <div className="text-center text-sm text-neutral-500 lg:hidden">
              Don't have an account?{' '}
              <button onClick={() => setIsLogin(false)} className="font-bold text-neutral-900 hover:underline">
                Become a Vendor
              </button>
            </div>
            {/* Desktop toggle link inside form area if needed, but the overlay does the job usually. 
                However, usually the overlay HAS the button. 
                Wait, user said "while login page is showing whenver i am trying to click on apply as vendor then a swap".
                So the link MUST be here. 
            */}
            <div className="text-center text-sm text-neutral-500 hidden lg:block">
              Don't have an account?{' '}
              <button type="button" onClick={() => setIsLogin(false)} className="font-bold text-neutral-900 hover:underline">
                Become a Vendor
              </button>
            </div>
          </div>
        </div>

        {/* Signup Section (Right Side) */}
        <div className={`absolute top-0 right-0 w-full lg:w-1/2 h-full flex flex-col justify-center px-8 sm:px-12 transition-all duration-700 ease-in-out ${!isLogin ? 'z-20 opacity-100' : 'z-10 opacity-0 lg:opacity-100'}`}>
          <div className="w-full max-w-md mx-auto space-y-6">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl font-bold text-neutral-900">Become a Vendor</h1>
              <p className="text-neutral-500 mt-2">Start your business journey with Rentalysis</p>
            </div>

            <form onSubmit={handleSignup} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="firstName">First Name</label>
                  <input
                    id="firstName"
                    type="text"
                    value={signupData.firstName}
                    onChange={handleSignupChange}
                    className="flex h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-all"
                    placeholder="John"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="lastName">Last Name</label>
                  <input
                    id="lastName"
                    type="text"
                    value={signupData.lastName}
                    onChange={handleSignupChange}
                    className="flex h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="email">Business Email</label>
                <input
                  id="email"
                  type="email"
                  value={signupData.email}
                  onChange={handleSignupChange}
                  className="flex h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-all"
                  placeholder="business@example.com"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="businessName">Business Name</label>
                <input
                  id="businessName"
                  type="text"
                  value={signupData.businessName}
                  onChange={handleSignupChange}
                  className="flex h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-all"
                  placeholder="My Rental Business"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  value={signupData.password}
                  onChange={handleSignupChange}
                  className="flex h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-all"
                  placeholder="••••••••"
                />
              </div>
              <button className="w-full h-10 rounded-md bg-neutral-900 text-white text-sm font-bold hover:bg-neutral-800 transition-colors">
                Register Business
              </button>
            </form>

            <div className="text-center text-sm text-neutral-500 lg:hidden">
              Already have an account?{' '}
              <button onClick={() => setIsLogin(true)} className="font-bold text-neutral-900 hover:underline">
                Sign in
              </button>
            </div>
            <div className="text-center text-sm text-neutral-500 hidden lg:block">
              Already have an account?{' '}
              <button type="button" onClick={() => setIsLogin(true)} className="font-bold text-neutral-900 hover:underline">
                Sign in
              </button>
            </div>
          </div>
        </div>

        {/* Sliding Overlay (The "Design") */}
        <div className={`hidden lg:block absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-700 ease-in-out z-30 ${!isLogin ? '-translate-x-full' : ''}`}>
          <div className="relative h-full w-full bg-neutral-900 text-white">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2632&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
            {/* Content Layout that shifts for parallax effect optionally, keeping simple for now */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center p-12 text-center">
              <img src={logo} alt="Rentalysis" className="h-24 w-auto mb-8 drop-shadow-lg" />
              <h2 className="text-3xl font-bold mb-6">"Scale your rental business with Rentalysis."</h2>
              <p className="text-neutral-300 text-lg leading-relaxed">
                Manage inventory, track orders, and grow your revenue with our professional vendor tools.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Login
