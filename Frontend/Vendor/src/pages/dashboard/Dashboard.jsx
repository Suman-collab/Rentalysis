import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts'

const Dashboard = () => {

  const revenueData = [
    { name: '1', revenue: 4000 }, { name: '2', revenue: 3000 }, { name: '3', revenue: 2000 }, { name: '4', revenue: 2780 }, { name: '5', revenue: 1890 }, { name: '6', revenue: 2390 },
    { name: '7', revenue: 3490 }, { name: '8', revenue: 4200 }, { name: '9', revenue: 3800 }, { name: '10', revenue: 3000 }, { name: '11', revenue: 2500 }, { name: '12', revenue: 2900 },
    { name: '13', revenue: 3300 }, { name: '14', revenue: 3800 }, { name: '15', revenue: 4100 }, { name: '16', revenue: 4600 }, { name: '17', revenue: 3900 }, { name: '18', revenue: 3200 },
    { name: '19', revenue: 3500 }, { name: '20', revenue: 4000 }, { name: '21', revenue: 4200 }, { name: '22', revenue: 4500 }, { name: '23', revenue: 4800 }, { name: '24', revenue: 4100 },
    { name: '25', revenue: 3900 }, { name: '26', revenue: 3800 }, { name: '27', revenue: 4200 }, { name: '28', revenue: 4400 }, { name: '29', revenue: 4300 }, { name: '30', revenue: 4800 }
  ]

  const categoryData = [
    { name: 'Cameras', count: 45 },
    { name: 'Lenses', count: 32 },
    { name: 'Lighting', count: 28 },
    { name: 'Audio', count: 15 },
    { name: 'Drones', count: 10 },
  ]

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
          <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-sm font-medium text-gray-500">{stat.label}</p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${stat.trend === 'up' ? 'text-green-700 bg-green-50' : 'text-red-700 bg-red-50'}`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Revenue Trend</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#4f46e5' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Categories Chart */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Rentals by Category</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <Tooltip cursor={{ fill: '#f3f4f6' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="count" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
