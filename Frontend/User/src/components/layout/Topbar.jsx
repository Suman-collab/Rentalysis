// FILE: src/components/layout/Topbar.jsx
import React from 'react'
import { Bell, Search, LogOut } from 'lucide-react'

const Topbar = () => {
  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-neutral-200 bg-white">
      <div className="flex items-center gap-4 w-96">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full h-9 pl-9 pr-4 rounded-md border border-neutral-200 text-sm focus:outline-none focus:border-neutral-400 font-normal"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-neutral-100 text-neutral-600">
          <Bell className="h-5 w-5" />
        </button>
        <div className="h-6 w-px bg-neutral-200" />
        <button className="flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-neutral-900">
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </button>
      </div>
    </header>
  )
}

export default Topbar
