import React from 'react'
import { Plus } from 'lucide-react'

const Orders = () => {
  const orders = [
    { id: 'ORD-001', customer: 'John Smith', email: 'john@example.com', product: 'Professional Camera Kit', start: '2026-01-28', end: '2026-02-04', duration: '7 days', amount: 1050 },
    { id: 'ORD-002', customer: 'Sarah Johnson', email: 'sarah@example.com', product: 'Studio Lighting Setup', start: '2026-02-01', end: '2026-02-05', duration: '4 days', amount: 320 },
    { id: 'ORD-003', customer: 'Mike Wilson', email: 'mike@example.com', product: 'Drone with 4K Camera', start: '2026-01-25', end: '2026-02-08', duration: '14 days', amount: 2800 },
    { id: 'ORD-004', customer: 'Emily Brown', email: 'emily@example.com', product: 'Wireless Microphone System', start: '2026-01-30', end: '2026-02-03', duration: '4 days', amount: 180 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-500 mt-1">Manage all rental orders</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          New Order
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <input type="text" placeholder="Search orders by customer, product, or order ID..." className="w-full bg-white border border-gray-100 rounded-lg pl-4 pr-10 py-3 text-sm focus:ring-2 focus:ring-blue-100 outline-none shadow-sm" />
        </div>
        <select className="px-4 py-2 bg-white border border-gray-100 rounded-lg text-gray-600 outline-none">
          <option>All Orders</option>
          <option>Active</option>
          <option>Completed</option>
          <option>Cancelled</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50/50">
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-900 uppercase">Order ID</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-900 uppercase">Customer</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-900 uppercase">Product</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-900 uppercase">Start Date</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-900 uppercase">End Date</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-900 uppercase">Duration</th>
              <th className="text-right px-6 py-4 text-xs font-semibold text-gray-900 uppercase">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{order.customer}</p>
                    <p className="text-xs text-gray-500">{order.email}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{order.product}</td>
                <td className="px-6 py-4 text-sm text-gray-900 font-mono">{order.start}</td>
                <td className="px-6 py-4 text-sm text-gray-900 font-mono">{order.end}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{order.duration}</td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900 text-right">${order.amount.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Orders
