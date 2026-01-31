import React from 'react'
import { Plus, Search, User, Mail, Phone } from 'lucide-react'

const Users = () => {
  const stats = [
    { label: 'Total Users', value: '8' },
    { label: 'Active Customers', value: '5' },
    { label: 'Admin/Staff', value: '2' },
  ];

  const users = [
    { id: 'USR-001', name: 'John Smith', email: 'john@example.com', joined: '2025-03-15', phone: '+1 (555) 123-4567', role: 'Customer' },
    { id: 'USR-002', name: 'Sarah Johnson', email: 'sarah@example.com', joined: '2025-05-22', phone: '+1 (555) 234-5678', role: 'Customer' },
    { id: 'USR-003', name: 'Mike Wilson', email: 'mike@example.com', joined: '2026-06-10', phone: '+1 (555) 345-6789', role: 'Customer' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-500 mt-1">Manage customers and staff</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          Add User
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <p className="text-sm font-medium text-gray-500">{stat.label}</p>
            <p className="text-3xl font-bold mt-2 text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input type="text" placeholder="Search users by name, email, or phone..." className="w-full bg-white border border-gray-100 rounded-lg pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-blue-100 outline-none shadow-sm" />
        </div>
        <div className="flex gap-2">
          <select className="px-4 py-2 bg-white border border-gray-100 rounded-lg text-gray-600 outline-none">
            <option>All Roles</option>
            <option>Customer</option>
            <option>Admin</option>
          </select>
          <select className="px-4 py-2 bg-white border border-gray-100 rounded-lg text-gray-600 outline-none">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50/50">
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-900 uppercase">User ID</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-900 uppercase">Name</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-900 uppercase">Email</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-900 uppercase">Phone</th>
              <th className="text-center px-6 py-4 text-xs font-semibold text-gray-900 uppercase">Role</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {user.id}
                  <div className="md:hidden mt-1 text-xs text-gray-500">{user.email}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">Joined {user.joined}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" /> {user.email}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <div className="flex flex-col">
                      <span>{user.phone.split(' ')[0]} {user.phone.split(' ')[1]}</span>
                      <span>{user.phone.split(' ')[2]}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-xs font-medium">
                    {user.role}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Users
