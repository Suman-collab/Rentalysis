import React, { useState, useEffect } from 'react'
import { Plus, Download, Filter, Search, MoreHorizontal, Camera, Film, Monitor } from 'lucide-react'

const Inventory = () => {
  // Initial dummy data expanded for demonstration
  const [products, setProducts] = useState([
    { id: 1, name: 'Sony Alpha a7 IV Mirrorless', sku: 'CAM-SY-0042', category: 'Photography', status: 'Available', rate: 85.00, stock: 12 },
    { id: 2, name: 'DJI Mavic 3 Pro Cine', sku: 'DRN-DJ-0019', category: 'Drones', status: 'Rented Out', rate: 240.00, stock: 4 },
    { id: 3, name: 'Aputure LS 600d Pro', sku: 'LGT-AP-0105', category: 'Lighting', status: 'Maintenance', rate: 120.00, stock: 8 },
    { id: 4, name: 'Rodecaster Pro II Console', sku: 'AUD-RO-0552', category: 'Audio', status: 'Available', rate: 45.00, stock: 15 },
    { id: 5, name: 'Canon EOS R5', sku: 'CAM-CN-0089', category: 'Photography', status: 'Available', rate: 110.00, stock: 5 },
    { id: 6, name: 'Blackmagic Pocket 6K', sku: 'CAM-BM-0021', category: 'Photography', status: 'Available', rate: 150.00, stock: 3 },
    { id: 7, name: 'Sennheiser MKH 416', sku: 'AUD-SN-0101', category: 'Audio', status: 'Rented Out', rate: 55.00, stock: 2 },
    { id: 8, name: 'Godox VL150 LED Light', sku: 'LGT-GD-0033', category: 'Lighting', status: 'Available', rate: 35.00, stock: 20 },
    { id: 9, name: 'Ronin RS 3 Pro Gimbal', sku: 'ACC-DJ-0055', category: 'Photography', status: 'Maintenance', rate: 75.00, stock: 6 },
    { id: 10, name: 'GoPro Hero 11 Black', sku: 'CAM-GP-0011', category: 'Photography', status: 'Available', rate: 25.00, stock: 30 },
    { id: 11, name: 'Zoom H6 Recorder', sku: 'AUD-ZM-0006', category: 'Audio', status: 'Available', rate: 30.00, stock: 10 },
  ])

  // State Management
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('All Products')
  const [selectedItems, setSelectedItems] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Filter Logic
  const filteredProducts = products.filter(product => {
    // 1. Filter by Tab
    if (activeTab !== 'All Products' && product.status !== activeTab) {
      if (activeTab === 'Under Maintenance' && product.status !== 'Maintenance') return false
      if (activeTab !== 'Under Maintenance' && activeTab !== 'All Products' && product.status !== activeTab) return false
    }

    // 2. Filter by Search
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      return (
        product.name.toLowerCase().includes(term) ||
        product.sku.toLowerCase().includes(term)
      )
    }
    return true
  })

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  // Selection Logic
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const currentIds = currentProducts.map(p => p.id)
      const newSelected = [...new Set([...selectedItems, ...currentIds])]
      setSelectedItems(newSelected)
    } else {
      const currentIds = currentProducts.map(p => p.id)
      setSelectedItems(selectedItems.filter(id => !currentIds.includes(id)))
    }
  }

  const handleSelectItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(itemId => itemId !== id))
    } else {
      setSelectedItems([...selectedItems, id])
    }
  }

  // Handlers
  const handleAddProduct = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const newProduct = {
      id: products.length + 1,
      name: formData.get('name'),
      sku: formData.get('sku'),
      category: formData.get('category'),
      status: 'Available', // Default status
      rate: parseFloat(formData.get('rate')),
      stock: parseInt(formData.get('stock')),
    }
    setProducts([newProduct, ...products]) // Add to top
    setIsAddModalOpen(false)
    // Optional: Switch tab to 'All Products' or reset filters to see new item
    setActiveTab('All Products')
    setSearchTerm('')
    setCurrentPage(1)
  }

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
      ...filteredProducts.map(product => [ // Export filtered list
        product.id,
        `"${product.name}"`,
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
          <p className="text-gray-500 text-sm mt-1">Manage and track {products.length} rental assets across your global fleet.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Download size={16} />
            Export CSV
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Plus size={16} />
            Add Product
          </button>
        </div>
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-900">Add New Product</h2>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                &times;
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Sony Alpha a7 III"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                  <input
                    type="text"
                    name="sku"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. CAM-SONY-01"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    name="category"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Photography">Photography</option>
                    <option value="Drones">Drones</option>
                    <option value="Lighting">Lighting</option>
                    <option value="Audio">Audio</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Daily Rate ($)</label>
                  <input
                    type="number"
                    name="rate"
                    step="0.01"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                  <input
                    type="number"
                    name="stock"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="1"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-sm font-medium text-gray-500 border-b border-gray-100 w-full sm:w-auto overflow-x-auto">
            {['All Products', 'Available', 'Rented Out', 'Under Maintenance'].map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
                className={`${activeTab === tab
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-900'
                  } pb-2 px-1 whitespace-nowrap transition-colors relative`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search products, SKUs..."
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              />
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
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    onChange={handleSelectAll}
                    checked={currentProducts.length > 0 && currentProducts.every(p => selectedItems.includes(p.id))}
                  />
                </th>
                <th className="px-6 py-4 font-medium text-gray-500">Item</th>
                <th className="px-6 py-4 font-medium text-gray-500">Category</th>
                <th className="px-6 py-4 font-medium text-gray-500">Status</th>
                <th className="px-6 py-4 font-medium text-gray-500">Daily Rate</th>
                <th className="px-6 py-4 font-medium text-gray-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentProducts.length > 0 ? (
                currentProducts.map((product) => (
                  <tr key={product.id} className={`hover:bg-gray-50/50 transition-colors group ${selectedItems.includes(product.id) ? 'bg-blue-50/10' : ''}`}>
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={selectedItems.includes(product.id)}
                        onChange={() => handleSelectItem(product.id)}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400">
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
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    No products found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
          <div className="text-sm text-gray-500">
            Showing {filteredProducts.length > 0 ? indexOfFirstItem + 1 : 0}-{Math.min(indexOfLastItem, filteredProducts.length)} of {filteredProducts.length} products
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
              className="px-3 py-1.5 bg-blue-600 border border-blue-600 rounded-lg text-sm text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Inventory
