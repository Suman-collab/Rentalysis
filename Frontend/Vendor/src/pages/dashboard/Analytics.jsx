import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'
import { ArrowUpRight, ArrowDownRight, DollarSign, ShoppingCart, Users, Activity } from 'lucide-react'

const Analytics = () => {
  const data = [
    { name: 'Jan', revenue: 4000, orders: 24 },
    { name: 'Feb', revenue: 3000, orders: 18 },
    { name: 'Mar', revenue: 2000, orders: 12 },
    { name: 'Apr', revenue: 2780, orders: 20 },
    { name: 'May', revenue: 1890, orders: 15 },
    { name: 'Jun', revenue: 2390, orders: 19 },
    { name: 'Jul', revenue: 3490, orders: 28 },
  ]

  const stats = [
    { title: 'Total Revenue', value: '$24,560', change: '+12.5%', icon: DollarSign, trend: 'up' },
    { title: 'Total Orders', value: '452', change: '+8.2%', icon: ShoppingCart, trend: 'up' },
    { title: 'New Customers', value: '89', change: '-2.4%', icon: Users, trend: 'down' },
    { title: 'Avg. Order Value', value: '$54.30', change: '+4.1%', icon: Activity, trend: 'up' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Advanced Analytics</h1>
        <p className="text-gray-500 mt-1">Detailed business performance metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</h3>
              </div>
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                <stat.icon size={20} />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4 text-sm font-medium">
              {stat.trend === 'up' ? (
                <ArrowUpRight className="text-green-600" size={16} />
              ) : (
                <ArrowDownRight className="text-red-600" size={16} />
              )}
              <span className={stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}>{stat.change}</span>
              <span className="text-gray-400 font-normal">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Revenue Growth</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Line type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={3} dot={{ r: 4, fill: '#4f46e5' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Orders Overview</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="orders" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Analytics
