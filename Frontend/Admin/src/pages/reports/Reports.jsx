import React from 'react'
import { Download, Calendar, PieChart } from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

const Reports = () => {
  const revenueData = [
    { name: 'July', revenue: 18450 },
    { name: 'August', revenue: 22130 },
    { name: 'September', revenue: 19870 },
    { name: 'October', revenue: 24560 },
    { name: 'November', revenue: 21340 },
    { name: 'December', revenue: 25890 },
    { name: 'January', revenue: 28210 },
  ];

  const productData = [
    { name: 'Cameras', value: 32, color: '#3b82f6' },
    { name: 'Lighting', value: 24, color: '#60a5fa' },
    { name: 'Audio', value: 18, color: '#93c5fd' },
    { name: 'Others', value: 26, color: '#bfdbfe' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-500 mt-1">Analytics and business insights</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-white text-gray-600 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm">
            <Calendar className="w-4 h-4" />
            Last 30 Days
          </button>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
              <p className="text-3xl font-bold mt-1 text-gray-900">$125,450</p>
              <p className="text-xs font-semibold text-green-600 mt-2">+23%</p>
            </div>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <span className="font-bold text-xl">$</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Orders</p>
              <p className="text-3xl font-bold mt-1 text-gray-900">456</p>
              <p className="text-xs font-semibold text-green-600 mt-2">+12%</p>
            </div>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <span className="font-bold text-xl">📦</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Customers</p>
              <p className="text-3xl font-bold mt-1 text-gray-900">234</p>
              <p className="text-xs font-semibold text-green-600 mt-2">+8%</p>
            </div>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <span className="font-bold text-xl">👥</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Utilization Rate</p>
              <p className="text-3xl font-bold mt-1 text-gray-900">78%</p>
              <p className="text-xs font-semibold text-green-600 mt-2">+5%</p>
            </div>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <span className="font-bold text-xl">📈</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue Bar Chart */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Monthly Revenue</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={revenueData}
                margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
              >
                {/* <CartesianGrid strokeDasharray="3 3" horizontal={false} /> */}
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={80} tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="revenue" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={32} background={{ fill: '#f1f5f9', radius: [0, 4, 4, 0] }} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Product Distribution Pie Chart */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">Product Distribution</h3>
            <PieChart className="w-5 h-5 text-blue-500" />
          </div>

          <div className="flex-1 flex items-center justify-center relative">
            <div className="w-64 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RePieChart>
                  <Pie
                    data={productData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {productData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip />
                </RePieChart>
              </ResponsiveContainer>
              {/* Center Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <div className="text-gray-300">
                  <PieChart className="w-10 h-10 opacity-20" />
                </div>
                <p className="text-xs text-gray-500 mt-1">Chart visualization</p>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            {productData.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm text-gray-600">{item.name} ({item.value}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reports
