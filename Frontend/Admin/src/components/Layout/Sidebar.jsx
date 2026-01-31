import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Store,
  ShoppingBag,
  Warehouse,
  ShoppingCart,
  CalendarClock,
  FileText,
  BarChart3,
  Users,
  UserCircle,
  MapPin,
  LogOut
} from 'lucide-react';
import clsx from 'clsx';

import logo from '../../assets/logo.png';

const Sidebar = () => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Vendors', href: '/vendors', icon: Store },
    { name: 'Products', href: '/products', icon: ShoppingBag },
    { name: 'Orders', href: '/orders', icon: ShoppingCart },
    { name: 'Invoices', href: '/invoices', icon: FileText },
    { name: 'Reports', href: '/reports', icon: BarChart3 },
    { name: 'Users', href: '/users', icon: Users },
    { name: 'Profile', href: '/profile', icon: UserCircle },
  ];

  return (
    <div className="flex flex-col w-64 h-screen bg-white border-r border-gray-100 fixed left-0 top-0 overflow-y-auto">
      {/* Logo */}
      <div className="px-6 py-8 flex justify-center">
        <img src={logo} alt="Rental Manager" className="h-[120px] w-auto object-contain" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1">
        {navigation.map((item) => {
          const isActive = location.pathname.startsWith(item.href);
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive: active }) =>
                clsx(
                  'flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200',
                  active
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-blue-600'
                )
              }
            >
              <item.icon className={clsx('w-5 h-5', isActive ? 'text-white' : 'text-current')} />
              {item.name}
            </NavLink>
          );
        })}
      </nav>

      {/* User / Logout Section (Optional bottom section) */}
      <div className="p-4 mt-auto border-t border-gray-100">
        <button className="flex items-center gap-3 px-4 py-3 w-full text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors">
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
