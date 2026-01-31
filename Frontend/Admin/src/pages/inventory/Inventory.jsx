import React from 'react'
import { Filter, Download } from 'lucide-react'

const Inventory = () => {
  const stats = [
    { label: 'Total Items', value: '127', color: 'text-blue-600' },
    { label: 'Available', value: '89', color: 'text-green-600' },
    { label: 'Rented Out', value: '32', color: 'text-orange-600' },
    { label: 'In Maintenance', value: '6', color: 'text-red-600' },
  ];

  const inventoryItems = [
    { id: 'INV-001', product: 'Professional Camera Kit', serial: 'CAM-2024-001', category: 'Cameras', status: 'Available', condition: 'Excellent', location: 'Warehouse A' },
    { id: 'INV-002', product: 'Professional Camera Kit', serial: 'CAM-2024-002', category: 'Cameras', status: 'Rented', condition: 'Good', location: 'Out (ORD-001)' },
    { id: 'INV-003', product: 'Studio Lighting Setup', serial: 'LGT-2024-001', category: 'Lighting', status: 'Available', condition: 'Excellent', location: 'Warehouse B' },
    { id: 'INV-004', product: 'Drone with 4K Camera', serial: 'DRN-2024-105', category: 'Drones', status: 'Maintenance', condition: 'Fair', location: 'Service Center' },
    { id: 'INV-005', product: 'Wireless Mic System', serial: 'AUD-2024-055', category: 'Audio', status: 'Available', condition: 'Good', location: 'Warehouse A' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventory</h1>
          <p className="text-gray-500 mt-1">Track all your rental equipment</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <p className="text-sm font-medium text-gray-500">{stat.label}</p>
            <p className={`text-3xl font-bold mt-2 ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <input type="text" placeholder="Search by product, serial number, or location..." className="w-full bg-white border border-gray-100 rounded-lg pl-4 pr-10 py-3 text-sm focus:ring-2 focus:ring-blue-100 outline-none shadow-sm" />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-lg text-gray-600 hover:bg-gray-50">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-blue-50/50">
              <th className="text-left px-6 py-4 text-xs font-semibold text-blue-600 uppercase">ID</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-blue-600 uppercase">Product</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-blue-600 uppercase">Serial Number</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-blue-600 uppercase">Category</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-blue-600 uppercase">Status</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-blue-600 uppercase">Condition</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-blue-600 uppercase">Location</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {inventoryItems.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-blue-600">{item.id}</td>
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">{item.product}</td>
                <td className="px-6 py-4 text-sm text-gray-600 font-mono">{item.serial}</td>
                <td className="px-6 py-4 text-sm text-blue-600">{item.category}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${item.status === 'Available' ? 'bg-green-50 text-green-700' :
                      item.status === 'Rented' ? 'bg-orange-50 text-orange-700' :
                        'bg-red-50 text-red-700'
                    }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${item.status === 'Available' ? 'bg-green-600' :
                        item.status === 'Rented' ? 'bg-orange-600' :
                          'bg-red-600'
                      }`}></span>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${item.condition === 'Excellent' ? 'bg-green-100 text-green-800' :
                      item.condition === 'Good' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                    }`}>
                    {item.condition}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-blue-600 font-medium">{item.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Inventory
