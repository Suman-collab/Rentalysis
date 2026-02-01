import React from 'react'


const Invoices = () => {
  const stats = [
    { label: 'Total Invoices', value: '6', color: 'text-gray-900' },
    { label: 'Paid', value: '5', color: 'text-green-600' },
    { label: 'Pending', value: '1', color: 'text-orange-600' },
    { label: 'Total Revenue', value: '$5,516.50', color: 'text-gray-900' },
    { label: 'Pending Amount', value: '$462', color: 'text-orange-600' },
  ];

  const invoiceList = [
    { id: 'INV-2026-001', orderId: 'ORD-001', customer: 'John Smith', email: 'john@example.com', issueDate: '2026-01-28', dueDate: '2026-02-04', amount: 1050, tax: 105 },
    { id: 'INV-2026-002', orderId: 'ORD-002', customer: 'Sarah Johnson', email: 'sarah@example.com', issueDate: '2026-01-29', dueDate: '2026-02-05', amount: 320, tax: 32 },
    { id: 'INV-2026-003', orderId: 'ORD-003', customer: 'Mike Wilson', email: 'mike@example.com', issueDate: '2026-01-25', dueDate: '2026-02-08', amount: 2800, tax: 280 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Invoices</h1>
          <p className="text-gray-500 mt-1">Manage billing and invoices</p>
        </div>

      </div>

      {/* Stats */}
      <div className="flex gap-4 overflow-x-auto pb-2">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm min-w-[150px] flex-1">
            <p className="text-sm font-medium text-gray-500">{stat.label}</p>
            <p className={`text-3xl font-bold mt-2 ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <input type="text" placeholder="Search invoices by customer, invoice ID, or order ID..." className="w-full bg-white border border-gray-100 rounded-lg pl-4 pr-10 py-3 text-sm focus:ring-2 focus:ring-blue-100 outline-none shadow-sm" />
        </div>
        <select className="px-4 py-2 bg-white border border-gray-100 rounded-lg text-gray-600 outline-none">
          <option>All Status</option>
          <option>Paid</option>
          <option>Pending</option>
          <option>Overdue</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50/50">
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-900 uppercase">Invoice ID</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-900 uppercase">Order ID</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-900 uppercase">Customer</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-900 uppercase">Issue Date</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-900 uppercase">Due Date</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-900 uppercase">Amount</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-900 uppercase">Tax</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {invoiceList.map((inv) => (
              <tr key={inv.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{inv.id}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{inv.orderId}</td>
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{inv.customer}</p>
                    <p className="text-xs text-gray-500">{inv.email}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 font-mono">{inv.issueDate}</td>
                <td className="px-6 py-4 text-sm text-gray-900 font-mono">{inv.dueDate}</td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">${inv.amount.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm text-gray-900">${inv.tax}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Invoices
