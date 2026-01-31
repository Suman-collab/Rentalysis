import React from 'react'

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <div className="flex gap-3">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">Last 30 Days</button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">Export Report</button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Revenue', value: '$12,450.00', change: '+12.5%', trend: 'up' },
          { label: 'Active Rentals', value: '128', change: '-2.4%', trend: 'down' },
          { label: 'Utilization Rate', value: '84%', change: '+5.1%', trend: 'up' },
          { label: 'New Orders', value: '32', change: '+8.0%', trend: 'up' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-sm font-medium text-gray-500">{stat.label}</p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
              <span className={`text-xs padding-1 rounded-full ${stat.trend === 'up' ? 'text-green-600 bg-green-50 px-2 py-0.5' : 'text-red-600 bg-red-50 px-2 py-0.5'}`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
