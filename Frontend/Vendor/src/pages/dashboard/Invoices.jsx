import React from 'react'
import { Plus, Search, Filter, MoreHorizontal, Printer, FileText } from 'lucide-react'

const Invoices = () => {
  const invoices = [
    { id: 'INV-001', orderId: 'ORD-001', customer: 'John Doe', date: '2026-01-28', status: 'Paid', amount: 850.00 },
    { id: 'INV-002', orderId: 'ORD-002', customer: 'Jane Smith', date: '2026-01-29', status: 'Pending', amount: 240.00 },
    { id: 'INV-003', orderId: 'ORD-003', customer: 'Mike Johnson', date: '2026-01-30', status: 'Paid', amount: 135.00 },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-700'
      case 'Pending': return 'bg-amber-100 text-amber-700'
      case 'Overdue': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Invoices & Payments</h1>
          <p className="text-gray-500 mt-1">Manage billing and payments</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700 transition-colors shadow-sm">
          <Plus size={16} />
          Create Invoice
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex justify-between items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input type="text" placeholder="Search invoices..." className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
        </div>
        <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-500">
          <Filter size={18} />
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-200">
              <th className="px-6 py-4 font-medium text-gray-500">Invoice ID</th>
              <th className="px-6 py-4 font-medium text-gray-500">Order ID</th>
              <th className="px-6 py-4 font-medium text-gray-500">Customer</th>
              <th className="px-6 py-4 font-medium text-gray-500">Date</th>
              <th className="px-6 py-4 font-medium text-gray-500">Status</th>
              <th className="px-6 py-4 font-medium text-gray-500">Amount</th>
              <th className="px-6 py-4 font-medium text-gray-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {invoices.map((inv) => (
              <tr key={inv.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 font-medium text-blue-600 flex items-center gap-2">
                  <FileText size={16} />
                  {inv.id}
                </td>
                <td className="px-6 py-4 text-gray-500">{inv.orderId}</td>
                <td className="px-6 py-4 text-gray-900">{inv.customer}</td>
                <td className="px-6 py-4 text-gray-500">{inv.date}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(inv.status)}`}>
                    {inv.status}
                  </span>
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">${inv.amount.toFixed(2)}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors" title="Print Invoice">
                      <Printer size={16} />
                    </button>
                    <button className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default Invoices
