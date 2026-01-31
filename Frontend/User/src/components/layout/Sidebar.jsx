// FILE: src/components/layout/Sidebar.jsx
import React from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, ShoppingBag, ShoppingCart, Package, MoreHorizontal, Settings, LogOut, HelpCircle, ChevronRight } from 'lucide-react'

const Sidebar = () => {
  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Browse Products', path: '/products', icon: ShoppingBag },
    { label: 'My Cart', path: '/cart', icon: ShoppingCart },
    { label: 'My Orders', path: '/orders', icon: Package },
  ]

  return (
    <aside className="w-64 border-r border-neutral-200 bg-white flex flex-col h-full font-sans transition-all duration-300">
      {/* Brand Header */}
      <div className="h-16 flex items-center px-5 border-b border-neutral-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-neutral-900 rounded-lg flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-lg">R</span>
          </div>
          <span className="text-lg font-bold tracking-tight text-neutral-900">Rentalysis</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider px-3 mb-2">Menu</p>

        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${isActive
                ? 'bg-neutral-50 text-neutral-900 border border-neutral-100 shadow-sm'
                : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900'
              }`
            }
          >
            <div className="flex items-center gap-3">
              <item.icon className="w-4 h-4 opacity-75 group-hover:opacity-100" />
              <span>{item.label}</span>
            </div>
            {/* Active Indicator Dot */}
            <NavLink
              to={item.path}
              className={({ isActive }) => isActive ? "w-1.5 h-1.5 rounded-full bg-blue-600 block" : "hidden"}
            />
          </NavLink>
        ))}
      </nav>

      {/* Footer Profile Section */}
      <div className="p-4 border-t border-neutral-100 space-y-2">
        {/* Secondary Links */}
        <div className="mb-4 space-y-1">
          <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg transition-colors">
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg transition-colors">
            <HelpCircle className="w-4 h-4" />
            <span>Help & Support</span>
          </button>
        </div>

        {/* Profile Card */}
        <div className="relative group">
          <button className="flex items-center gap-3 w-full p-2.5 rounded-xl border border-transparent hover:border-neutral-200 hover:bg-neutral-50 transition-all text-left">
            <div className="relative">
              <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-neutral-200 to-neutral-100 flex items-center justify-center text-xs font-bold text-neutral-700 shadow-inner">
                JD
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-neutral-900 truncate">John Doe</p>
              <p className="text-xs text-neutral-500 truncate">Free Plan</p>
            </div>

            <MoreHorizontal className="w-4 h-4 text-neutral-400 group-hover:text-neutral-600 transition-colors" />
          </button>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
