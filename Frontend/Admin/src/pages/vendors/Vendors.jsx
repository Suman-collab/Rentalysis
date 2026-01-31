import React from 'react'
import { Plus } from 'lucide-react'

const Vendors = () => {
  // Dummy Data
  const [vendors, setVendors] = React.useState([
    { id: 'VND-001', name: 'Tech Supplies Co.', contact: 'James Miller', email: 'james@techsupplies.com', phone: '+1 (555) 123-4567', products: 45 },
    { id: 'VND-002', name: 'Pro Equipment Ltd.', contact: 'Maria Garcia', email: 'maria@proequipment.com', phone: '+1 (555) 234-5678', products: 32 },
    { id: 'VND-003', name: 'Audio Visual Systems', contact: 'Robert Chen', email: 'robert@avsystems.com', phone: '+1 (555) 345-6789', products: 28 },
    { id: 'VND-004', name: 'Camera World Inc.', contact: 'Anna Martinez', email: 'anna@cameraworld.com', phone: '+1 (555) 456-7890', products: 56 },
  ]);

  const handleAddVendor = () => {
    const newVendor = {
      id: `VND-00${vendors.length + 1}`,
      name: 'New Vendor LLC',
      contact: 'New Contact',
      email: 'contact@newvendor.com',
      phone: '+1 (555) 000-0000',
      products: 0
    };
    setVendors([...vendors, newVendor]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Vendors</h1>
          <p className="text-gray-500 mt-1">Manage your supplier relationships</p>
        </div>
        <button
          onClick={handleAddVendor}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Vendor
        </button>
      </div>

      {/* Search Filter */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <input type="text" placeholder="Search vendors..." className="w-full bg-gray-50 border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-100 outline-none" />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100/50">
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Vendor ID</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Products</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {vendors.map((vendor) => (
              <tr key={vendor.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-blue-600">{vendor.id}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{vendor.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{vendor.contact}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{vendor.email}</td>
                <td className="px-6 py-4 text-sm text-gray-600 font-mono">{vendor.phone}</td>
                <td className="px-6 py-4 text-sm font-semibold text-blue-600 text-right">{vendor.products}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination Placeholders if needed */}
      </div>
    </div>
  )
}

export default Vendors
