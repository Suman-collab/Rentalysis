// FILE: src/components/layout/Sidebar.jsx
import React from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, ShoppingBag, ShoppingCart, Package } from 'lucide-react'

const Sidebar = () => {
  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Browse Products', path: '/products', icon: ShoppingBag },
    { label: 'My Cart', path: '/cart', icon: ShoppingCart },
    { label: 'My Orders', path: '/orders', icon: Package },
  ]

  return (
    <aside className="w-64 border-r border-neutral-200 bg-white flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-neutral-200">
        <span className="text-xl font-bold tracking-tight text-neutral-900">Rentalysis</span>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive
                ? 'bg-neutral-900 text-white'
                : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
              }`
            }
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-neutral-200">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-neutral-200 flex items-center justify-center text-xs font-bold">
            JD
          </div>
          <div className="text-sm">
            <p className="font-medium text-neutral-900">John Doe</p>
            <p className="text-xs text-neutral-500">Customer</p>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
