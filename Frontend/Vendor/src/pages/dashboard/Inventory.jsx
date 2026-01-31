import React from 'react'
import { Plus, Download, Filter, Search, MoreHorizontal, Camera, Film, Monitor } from 'lucide-react'

const Inventory = () => {
  const products = [
    { id: 1, name: 'Sony Alpha a7 IV Mirrorless', sku: 'CAM-SY-0042', category: 'Photography', status: 'Available', rate: 85.00, stock: 12 },
    { id: 2, name: 'DJI Mavic 3 Pro Cine', sku: 'DRN-DJ-0019', category: 'Drones', status: 'Rented Out', rate: 240.00, stock: 4 },
    { id: 3, name: 'Aputure LS 600d Pro', sku: 'LGT-AP-0105', category: 'Lighting', status: 'Maintenance', rate: 120.00, stock: 8 },
    { id: 4, name: 'Rodecaster Pro II Console', sku: 'AUD-RO-0552', category: 'Audio', status: 'Available', rate: 45.00, stock: 15 },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-700'
      case 'Rented Out': return 'bg-red-100 text-red-700'
      case 'Maintenance': return 'bg-amber-100 text-amber-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getCategoryBadge = (category) => {
    switch (category) {
      case 'Photography': return <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100"><Camera size={10} /> Photography</span>
      case 'Drones': return <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-100"><Film size={10} /> Drones</span>
      case 'Lighting': return <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-100"><Monitor size={10} /> Lighting</span>
      case 'Audio': return <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100"><Monitor size={10} /> Audio</span>
      default: return category
    }
  }

  const handleExportCSV = () => {
    const headers = ['ID', 'Name', 'SKU', 'Category', 'Status', 'Daily Rate', 'Stock']
    const csvContent = [
      headers.join(','),
      ...products.map(product => [
        product.id,
        `"${product.name}"`, // Quote name to handle commas
        product.sku,
        product.category,
        product.status,
        product.rate.toFixed(2),
        product.stock
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)

    link.setAttribute('href', url)
    link.setAttribute('download', 'inventory_export.csv')
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            <span>Home</span> / <span className="text-gray-900 font-medium">Inventory Management</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Product Catalog</h1>
          <p className="text-gray-500 text-sm mt-1">Manage and track 1,248 rental assets across your global fleet.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Download size={16} />
            Export CSV
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700 transition-colors shadow-sm">
            <Plus size={16} />
            Add Product
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-sm font-medium text-gray-500 border-b border-gray-100 w-full sm:w-auto overflow-x-auto">
            <button className="border-b-2 border-blue-600 text-blue-600 pb-2 px-1 whitespace-nowrap">All Products</button>
            <button className="hover:text-gray-900 pb-2 px-1 whitespace-nowrap">Available</button>
            <button className="hover:text-gray-900 pb-2 px-1 whitespace-nowrap">Rented Out</button>
            <button className="hover:text-gray-900 pb-2 px-1 whitespace-nowrap">Under Maintenance</button>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type="text" placeholder="Search products, SKUs..." className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
            </div>
            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-500">
              <Filter size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-200">
                <th className="px-6 py-4 font-medium text-gray-500 w-10">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                </th>
                <th className="px-6 py-4 font-medium text-gray-500">Item</th>
                <th className="px-6 py-4 font-medium text-gray-500">Category</th>
                <th className="px-6 py-4 font-medium text-gray-500">Status</th>
                <th className="px-6 py-4 font-medium text-gray-500">Daily Rate</th>
                <th className="px-6 py-4 font-medium text-gray-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400">
                        {/* Placeholder Img */}
                        <Camera size={20} />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{product.name}</div>
                        <div className="text-xs text-gray-500">SKU: {product.sku}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getCategoryBadge(product.category)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    ${product.rate.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
          <div className="text-sm text-gray-500">Showing 1-10 of 1,248 products</div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50">Previous</button>
            <button className="px-3 py-1.5 bg-blue-600 border border-blue-600 rounded-lg text-sm text-white hover:bg-blue-700">Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Inventory
