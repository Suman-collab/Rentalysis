import React from 'react'
import { Calendar, Package, AlertCircle, CheckCircle } from 'lucide-react'

const Pickups = () => {
  const stats = [
    { label: "Today's Pickups", value: '3', icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Expected Returns', value: '3', icon: Package, color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'Overdue Returns', value: '1', icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50' },
    { label: 'Completed Today', value: '2', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
  ];

  const scheduledPickups = [
    { customer: 'Sarah Johnson', product: 'Studio Lighting Setup', orderId: 'ORD-002', date: '2026-02-01', time: '10:00 AM', location: 'Main Office', status: 'Scheduled', note: 'Customer will arrive between 10-11 AM' },
    { customer: 'David Lee', product: 'Portable Projector', orderId: 'ORD-005', date: '2026-02-05', time: '2:00 PM', location: 'Warehouse A', status: 'Scheduled', note: 'Prepare HDMI cables with unit' },
  ];

  const expectedReturns = [
    { customer: 'John Smith', product: 'Professional Camera Kit', orderId: 'ORD-001', date: '2026-02-04', time: '11:00 AM', location: 'Warehouse A', status: 'Expected' },
    { customer: 'Mike Wilson', product: 'Drone with 4K Camera', orderId: 'ORD-003', date: '2026-02-08', time: '1:00 PM', location: 'Main Office', status: 'Expected' }
  ];

  const completedToday = [
    { customer: 'Lisa Chen', product: 'Green Screen Kit', orderId: 'ORD-006' },
    { customer: 'John Smith', product: 'Professional Camera Kit', orderId: 'ORD-001' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Pickups & Returns</h1>
        <p className="text-gray-500 mt-1">Manage equipment pickups and returns</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className={`p-3 rounded-lg ${stat.bg}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Scheduled Pickups */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Scheduled Pickups</h2>
        <div className="space-y-4">
          {scheduledPickups.map((pickup, idx) => (
            <div key={idx} className="border border-gray-100 rounded-xl p-6 hover:shadow-sm transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-900 text-lg">{pickup.customer}</h3>
                    <span className="bg-blue-50 text-blue-600 px-2.5 py-0.5 rounded text-xs font-semibold">{pickup.status}</span>
                  </div>
                  <p className="text-gray-600">{pickup.product}</p>
                  <p className="text-xs text-gray-400 mt-0.5">Order: {pickup.orderId}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end gap-2 text-gray-700 font-medium">
                    <Calendar className="w-4 h-4" /> {pickup.date}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">{pickup.time}</div>
                </div>
              </div>

              <hr className="my-4 border-gray-100" />

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600 flex items-center gap-2">
                  <MapPinIcon className="w-4 h-4" /> {pickup.location}
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  Process Pickup
                </button>
              </div>
              {pickup.note && (
                <p className="text-sm text-gray-500 italic mt-3">Note: {pickup.note}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Returns Section (Implicitly shown in screenshot, adding structure for completeness based on context) */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Expected Returns</h2>
        <div className="space-y-4">
          {expectedReturns.map((ret, idx) => (
            <div key={idx} className="border border-gray-100 rounded-xl p-6 hover:shadow-sm transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-900 text-lg">{ret.customer}</h3>
                    <span className="bg-orange-50 text-orange-600 px-2.5 py-0.5 rounded text-xs font-semibold">{ret.status}</span>
                  </div>
                  <p className="text-gray-600">{ret.product}</p>
                  <p className="text-xs text-gray-400 mt-0.5">Order: {ret.orderId}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end gap-2 text-gray-700 font-medium">
                    <Calendar className="w-4 h-4" /> {ret.date}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">{ret.time}</div>
                </div>
              </div>
              <hr className="my-4 border-gray-100" />
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600 flex items-center gap-2">
                  <MapPinIcon className="w-4 h-4" /> {ret.location}
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  Process Return
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Completed Today */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Completed Today</h2>
        <div className="space-y-2">
          {completedToday.map((comp, idx) => (
            <div key={idx} className="bg-green-50/50 p-4 rounded-lg flex justify-between items-center border border-green-100">
              <div className="flex gap-3 items-center">
                <div className="bg-green-100 p-1.5 rounded-full text-green-600">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{comp.customer}</h4>
                  <p className="text-sm text-gray-500">{comp.product}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-gray-900">{comp.orderId}</p>
                <p className="text-xs text-green-600 font-medium">Completed</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function MapPinIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

export default Pickups
