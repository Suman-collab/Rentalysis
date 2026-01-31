// FILE: src/components/layout/Topbar.jsx
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, ShoppingCart, Bell, User, Menu, LogOut, Package, MapPin } from 'lucide-react'
import { cartItems } from '../../mock/data'

const Topbar = () => {
  const navigate = useNavigate()
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-neutral-200 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto h-full px-4 md:px-8 flex items-center justify-between gap-4">

        {/* Left: Logo */}
        <Link to="/home" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">R</div>
          <span className="text-xl font-bold tracking-tight text-neutral-900 hidden sm:block">Rentalysis</span>
        </Link>

        {/* Center: Search */}
        <div className="flex-1 max-w-2xl px-4 hidden md:block">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for products, brands and more..."
              className="w-full h-10 pl-4 pr-10 rounded-lg bg-neutral-100 border-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm"
            />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-neutral-400" />
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-6 flex-shrink-0">

          <Link to="/products" className="hidden lg:flex items-center gap-2 text-sm font-medium text-neutral-700 hover:text-blue-600 transition-colors">
            Browse
          </Link>

          {/* Cart */}
          <Link to="/cart" className="relative p-2 text-neutral-600 hover:bg-neutral-100 rounded-full transition-colors group">
            <ShoppingCart className="w-5 h-5 group-hover:text-blue-600" />
            {cartItems.length > 0 && (
              <span className="absolute top-1 right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border border-white">
                {cartItems.length}
              </span>
            )}
            <span className="hidden">Cart</span>
          </Link>

          {/* Notifications */}
          <button className="relative p-2 text-neutral-600 hover:bg-neutral-100 rounded-full transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-2 w-2 h-2 bg-blue-500 rounded-full border border-white"></span>
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 p-1 pl-2 pr-3 rounded-full hover:bg-neutral-100 border border-transparent hover:border-neutral-200 transition-all"
            >
              <div className="w-8 h-8 bg-neutral-200 rounded-full overflow-hidden border border-neutral-300">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-xs font-bold text-neutral-900">John Doe</p>
                <p className="text-[10px] text-neutral-500">Customer</p>
              </div>
              {/* Mobile Menu Icon fallback */}
              <Menu className="w-4 h-4 text-neutral-400 sm:hidden" />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-neutral-100 py-2 animate-in fade-in slide-in-from-top-2">
                <div className="px-4 py-3 border-b border-neutral-100 mb-1">
                  <p className="text-sm font-bold text-neutral-900">Johnathan Smith</p>
                  <p className="text-xs text-neutral-500">j.smith@rentals.com</p>
                </div>

                <Link
                  to="/profile"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-blue-600"
                >
                  <User className="w-4 h-4" /> My Profile
                </Link>
                <Link
                  to="/profile"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-blue-600"
                >
                  <Package className="w-4 h-4" /> My Orders
                </Link>
                <Link
                  to="/profile"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-blue-600"
                >
                  <MapPin className="w-4 h-4" /> Saved Addresses
                </Link>

                <div className="border-t border-neutral-100 mt-1 pt-1">
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 text-left">
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Topbar
