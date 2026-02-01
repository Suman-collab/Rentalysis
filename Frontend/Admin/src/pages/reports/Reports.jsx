import React, { useState, useMemo } from 'react'
import { Download, Calendar, PieChart, ChevronDown } from 'lucide-react'
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
  const [dateRange, setDateRange] = useState('Last 30 Days')
  const [showDateDropdown, setShowDateDropdown] = useState(false)

  const dateRangeOptions = [
    'Last 7 Days',
    'Last 30 Days',
    'Last 90 Days',
    'This Month',
    'Last Month',
    'This Year',
    'All Time'
  ]

  // Compute data based on selected date range
  const { stats, revenueData, productData } = useMemo(() => {
    switch (dateRange) {
      case 'Last 7 Days':
        return {
          stats: {
            totalRevenue: '$12,450',
            totalOrders: '28',
            activeCustomers: '24',
            utilizationRate: '72%'
          },
          revenueData: [
            { name: 'Mon', revenue: 1580 },
            { name: 'Tue', revenue: 1820 },
            { name: 'Wed', revenue: 1650 },
            { name: 'Thu', revenue: 2100 },
            { name: 'Fri', revenue: 1890 },
            { name: 'Sat', revenue: 2210 },
            { name: 'Sun', revenue: 1200 },
          ],
          productData: [
            { name: 'Cameras', value: 35, color: '#3b82f6' },
            { name: 'Lighting', value: 22, color: '#60a5fa' },
            { name: 'Audio', value: 20, color: '#93c5fd' },
            { name: 'Others', value: 23, color: '#bfdbfe' },
          ]
        }

      case 'Last 30 Days':
        return {
          stats: {
            totalRevenue: '$125,450',
            totalOrders: '456',
            activeCustomers: '234',
            utilizationRate: '78%'
          },
          revenueData: [
            { name: 'Week 1', revenue: 28450 },
            { name: 'Week 2', revenue: 32130 },
            { name: 'Week 3', revenue: 29870 },
            { name: 'Week 4', revenue: 35000 },
          ],
          productData: [
            { name: 'Cameras', value: 32, color: '#3b82f6' },
            { name: 'Lighting', value: 24, color: '#60a5fa' },
            { name: 'Audio', value: 18, color: '#93c5fd' },
            { name: 'Others', value: 26, color: '#bfdbfe' },
          ]
        }

      case 'Last 90 Days':
        return {
          stats: {
            totalRevenue: '$385,650',
            totalOrders: '1,234',
            activeCustomers: '567',
            utilizationRate: '82%'
          },
          revenueData: [
            { name: 'Month 1', revenue: 125450 },
            { name: 'Month 2', revenue: 138200 },
            { name: 'Month 3', revenue: 122000 },
          ],
          productData: [
            { name: 'Cameras', value: 30, color: '#3b82f6' },
            { name: 'Lighting', value: 26, color: '#60a5fa' },
            { name: 'Audio', value: 16, color: '#93c5fd' },
            { name: 'Others', value: 28, color: '#bfdbfe' },
          ]
        }

      case 'This Month':
        return {
          stats: {
            totalRevenue: '$98,320',
            totalOrders: '342',
            activeCustomers: '198',
            utilizationRate: '76%'
          },
          revenueData: [
            { name: 'Week 1', revenue: 22320 },
            { name: 'Week 2', revenue: 28450 },
            { name: 'Week 3', revenue: 25550 },
            { name: 'Week 4', revenue: 22000 },
          ],
          productData: [
            { name: 'Cameras', value: 29, color: '#3b82f6' },
            { name: 'Lighting', value: 25, color: '#60a5fa' },
            { name: 'Audio', value: 19, color: '#93c5fd' },
            { name: 'Others', value: 27, color: '#bfdbfe' },
          ]
        }

      case 'Last Month':
        return {
          stats: {
            totalRevenue: '$142,890',
            totalOrders: '523',
            activeCustomers: '278',
            utilizationRate: '81%'
          },
          revenueData: [
            { name: 'Week 1', revenue: 32890 },
            { name: 'Week 2', revenue: 38200 },
            { name: 'Week 3', revenue: 35800 },
            { name: 'Week 4', revenue: 36000 },
          ],
          productData: [
            { name: 'Cameras', value: 33, color: '#3b82f6' },
            { name: 'Lighting', value: 23, color: '#60a5fa' },
            { name: 'Audio', value: 17, color: '#93c5fd' },
            { name: 'Others', value: 27, color: '#bfdbfe' },
          ]
        }

      case 'This Year':
        return {
          stats: {
            totalRevenue: '$1,456,780',
            totalOrders: '5,678',
            activeCustomers: '1,234',
            utilizationRate: '85%'
          },
          revenueData: [
            { name: 'Jan', revenue: 128210 },
            { name: 'Feb', revenue: 115890 },
            { name: 'Mar', revenue: 132450 },
            { name: 'Apr', revenue: 118320 },
            { name: 'May', revenue: 125600 },
            { name: 'Jun', revenue: 138900 },
            { name: 'Jul', revenue: 142310 },
            { name: 'Aug', revenue: 135200 },
            { name: 'Sep', revenue: 129870 },
            { name: 'Oct', revenue: 134560 },
            { name: 'Nov', revenue: 131340 },
            { name: 'Dec', revenue: 124130 },
          ],
          productData: [
            { name: 'Cameras', value: 31, color: '#3b82f6' },
            { name: 'Lighting', value: 25, color: '#60a5fa' },
            { name: 'Audio', value: 17, color: '#93c5fd' },
            { name: 'Others', value: 27, color: '#bfdbfe' },
          ]
        }

      case 'All Time':
        return {
          stats: {
            totalRevenue: '$4,567,890',
            totalOrders: '18,234',
            activeCustomers: '3,456',
            utilizationRate: '88%'
          },
          revenueData: [
            { name: '2023', revenue: 856780 },
            { name: '2024', revenue: 1254320 },
            { name: '2025', revenue: 1456780 },
            { name: '2026', revenue: 1000010 },
          ],
          productData: [
            { name: 'Cameras', value: 32, color: '#3b82f6' },
            { name: 'Lighting', value: 24, color: '#60a5fa' },
            { name: 'Audio', value: 18, color: '#93c5fd' },
            { name: 'Others', value: 26, color: '#bfdbfe' },
          ]
        }

      default:
        return {
          stats: {
            totalRevenue: '$125,450',
            totalOrders: '456',
            activeCustomers: '234',
            utilizationRate: '78%'
          },
          revenueData: [
            { name: 'Week 1', revenue: 28450 },
            { name: 'Week 2', revenue: 32130 },
            { name: 'Week 3', revenue: 29870 },
            { name: 'Week 4', revenue: 35000 },
          ],
          productData: [
            { name: 'Cameras', value: 32, color: '#3b82f6' },
            { name: 'Lighting', value: 24, color: '#60a5fa' },
            { name: 'Audio', value: 18, color: '#93c5fd' },
            { name: 'Others', value: 26, color: '#bfdbfe' },
          ]
        }
    }
  }, [dateRange])

  const handleExportCSV = () => {
    // Prepare CSV data
    const csvData = [
      ['Report Type', 'Value'],
      ['Total Revenue', '$125,450'],
      ['Total Orders', '456'],
      ['Active Customers', '234'],
      ['Utilization Rate', '78%'],
      [''],
      ['Monthly Revenue'],
      ['Month', 'Revenue'],
      ...revenueData.map(item => [item.name, `$${item.revenue}`]),
      [''],
      ['Product Distribution'],
      ['Category', 'Percentage'],
      ...productData.map(item => [item.name, `${item.value}%`])
    ]

    // Convert to CSV string
    const csvContent = csvData.map(row => row.join(',')).join('\n')

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)

    link.setAttribute('href', url)
    link.setAttribute('download', `rentalysis-report-${dateRange.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-500 mt-1">Analytics and business insights</p>
        </div>
        <div className="flex gap-2">
          {/* Date Range Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDateDropdown(!showDateDropdown)}
              className="flex items-center gap-2 bg-white text-gray-600 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
            >
              <Calendar className="w-4 h-4" />
              {dateRange}
              <ChevronDown className="w-4 h-4" />
            </button>

            {showDateDropdown && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                {dateRangeOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setDateRange(option)
                      setShowDateDropdown(false)
                    }}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${dateRange === option
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                      }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Export Button */}
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
          >
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
              <p className="text-3xl font-bold mt-1 text-gray-900">{stats.totalRevenue}</p>
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
              <p className="text-3xl font-bold mt-1 text-gray-900">{stats.totalOrders}</p>
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
              <p className="text-3xl font-bold mt-1 text-gray-900">{stats.activeCustomers}</p>
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
              <p className="text-3xl font-bold mt-1 text-gray-900">{stats.utilizationRate}</p>
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
