import React from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Package, ShoppingCart, FileText, BarChart2, Settings, LogOut, Bell, Search } from 'lucide-react'
import logo from '../assets/logo.jpg'

const DashboardLayout = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const isActive = (path) => location.pathname === path

  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/inventory', label: 'Inventory', icon: Package },
    { path: '/orders', label: 'Orders', icon: ShoppingCart },
    { path: '/invoices', label: 'Invoices', icon: FileText },
    { path: '/analytics', label: 'Analytics', icon: BarChart2 },
    { path: '/settings', label: 'Settings', icon: Settings },
  ]

  const handleSignOut = () => {
    // In a real app, you would clear auth tokens here
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col fixed h-full z-10">
        <div className="p-6 flex flex-col gap-1">
          <div className="flex items-center gap-2 font-bold text-xl text-indigo-600">
            <img src={logo} alt="Rentalysis" className="h-12 w-auto" />

          </div>
          <span className="text-xs font-semibold text-gray-400 tracking-wider ml-10">VENDOR</span>
        </div>

        <nav className="flex-1 px-4 space-y-1 mt-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive(item.path)
                ? 'bg-indigo-50 text-indigo-700'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
            >
              <item.icon size={20} />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 md:ml-64">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 lg:px-8 sticky top-0 z-20">
          {/* Search */}
          <div className="relative w-96 hidden lg:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search orders, items..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 border-none rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-gray-900 placeholder:text-gray-500"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg relative transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-gray-200 mx-1"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900">North Star Rentals</p>
                <p className="text-xs text-gray-500">Vendor Admin</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border border-gray-200">
                {/* Placeholder Avatar */}
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop" alt="Profile" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
