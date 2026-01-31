import React from 'react'
import { ShoppingCart, Package, IndianRupee, Users, Calendar, Clock } from 'lucide-react'

const Dashboard = () => {
  const stats = [
    { label: 'Total Orders', value: '234', change: '+12%', icon: ShoppingCart, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Active Rentals', value: '156', change: '+8%', icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Total Revenue', value: '₹45,670', change: '+23%', icon: IndianRupee, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Total Users', value: '89', change: '+5%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
  ];

  const recentOrders = [
    { customer: 'John Smith', product: 'Camera Kit', price: '₹450', status: 'Active', statusColor: 'bg-green-50 text-green-600' },
    { customer: 'Sarah Johnson', product: 'Lighting Setup', price: '₹320', status: 'Pickup', statusColor: 'bg-blue-50 text-blue-600' },
    { customer: 'Mike Wilson', product: 'Drone Package', price: '₹890', status: 'Active', statusColor: 'bg-green-50 text-green-600' },
    { customer: 'Emily Brown', product: 'Audio Equipment', price: '₹275', status: 'Return', statusColor: 'bg-orange-50 text-orange-600' },
  ];

  const upcomingPickups = [
    { customer: 'David Lee', product: 'Video Camera', time: '10:00 AM', date: '2026-02-01' },
    { customer: 'Lisa Chen', product: 'Projector', time: '2:00 PM', date: '2026-02-01' },
    { customer: 'Tom Anderson', product: 'Sound System', time: '4:30 PM', date: '2026-02-02' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Overview of your rental business</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between h-32">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                <p className="text-3xl font-bold mt-2 text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-2.5 rounded-lg ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <span className="text-xs font-semibold text-green-600">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-bold text-blue-600 mb-6">Recent Orders</h2>
          <div className="space-y-4">
            {recentOrders.map((order, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-gray-50/50 rounded-lg hover:bg-gray-50 transition-colors">
                <div>
                  <h3 className="font-semibold text-gray-900">{order.customer}</h3>
                  <p className="text-sm text-blue-500">{order.product}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{order.price}</p>
                  <span className={`inline-block mt-1 px-2.5 py-0.5 rounded text-xs font-semibold ${order.statusColor}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Pickups */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-bold text-blue-600 mb-6">Upcoming Pickups</h2>
          <div className="space-y-4">
            {upcomingPickups.map((pickup, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 bg-blue-50/30 rounded-lg border border-blue-50 hover:bg-blue-50/50 transition-colors">
                <div className="p-2 bg-white rounded-lg text-blue-600 shadow-sm">
                  <Calendar className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{pickup.customer}</h3>
                  <p className="text-sm text-gray-500">{pickup.product}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-blue-600">{pickup.time}</p>
                  <p className="text-xs text-blue-400">{pickup.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
