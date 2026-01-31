import React from 'react'
import { Plus, Edit2, Trash2 } from 'lucide-react'

const Products = () => {
  const categories = ['All', 'Cameras', 'Lighting', 'Audio', 'Drones', 'Display', 'Studio'];
  const [products, setProducts] = React.useState([
    { id: 'PRD-001', name: 'Professional Camera Kit', category: 'Cameras', dailyRate: 150, weeklyRate: 900, available: 3, total: 5, vendor: 'Tech Supplies Co.', status: 'Available' },
    { id: 'PRD-002', name: 'Studio Lighting Setup', category: 'Lighting', dailyRate: 80, weeklyRate: 480, available: 8, total: 8, vendor: 'Pro Equipment Ltd.', status: 'Available' },
    { id: 'PRD-003', name: 'Drone with 4K Camera', category: 'Drones', dailyRate: 200, weeklyRate: 1200, available: 0, total: 3, vendor: 'Tech Supplies Co.', status: 'Rented Out' },
    { id: 'PRD-004', name: 'Wireless Microphone System', category: 'Audio', dailyRate: 45, weeklyRate: 180, available: 4, total: 4, vendor: 'Audio Visual Systems', status: 'Available' },
    { id: 'PRD-005', name: 'Projector 4K', category: 'Display', dailyRate: 120, weeklyRate: 800, available: 2, total: 2, vendor: 'Pro Equipment Ltd.', status: 'Maintenance' },
  ]);

  const handleAddProduct = () => {
    const newProduct = {
      id: `PRD-00${products.length + 1}`,
      name: 'New Rental Item',
      category: 'Cameras',
      dailyRate: 100,
      weeklyRate: 600,
      available: 1,
      total: 1,
      vendor: 'New Vendor Inc.',
      status: 'Available'
    };
    setProducts([...products, newProduct]);
  };

  const handleDeleteProduct = (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleEditProduct = (id) => {
    // Placeholder for edit functionality
    const product = products.find(p => p.id === id);
    const newName = prompt('Edit Product Name:', product.name);
    if (newName) {
      setProducts(products.map(p => p.id === id ? { ...p, name: newName } : p));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-500 mt-1">Manage your rental inventory items</p>
        </div>
        <button
          onClick={handleAddProduct}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <input type="text" placeholder="Search products..." className="w-full bg-white border border-gray-100 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-100 outline-none shadow-sm" />
          {/* Icon placeholder could go here */}
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0">
          {categories.map(cat => (
            <button key={cat} className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${cat === 'All' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-100'}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 font-bold text-xl">
                ₹
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${product.status === 'Available' ? 'bg-green-50 text-green-600' :
                product.status === 'Rented Out' ? 'bg-orange-50 text-orange-600' :
                  'bg-red-50 text-red-600'
                }`}>
                {product.status}
              </span>
            </div>

            <div className="mb-4">
              <h3 className="font-bold text-gray-900 text-lg">{product.name}</h3>
              <p className="text-xs font-medium text-blue-600 mt-1">{product.id}</p>
              <p className="text-sm text-gray-500 mt-1">{product.category}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-xs text-gray-400">Daily Rate</p>
                <p className="font-semibold text-gray-900">₹{product.dailyRate}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">Weekly Rate</p>
                <p className="font-semibold text-gray-900">₹{product.weeklyRate}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Available</p>
                <p className="font-semibold text-gray-900">{product.available} / {product.total}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">Vendor</p>
                <p className="text-xs font-medium text-gray-700 truncate max-w-[100px]">{product.vendor}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEditProduct(product.id)}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-50 text-blue-600 py-2 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
              >
                <Edit2 className="w-4 h-4" /> Edit
              </button>
              <button
                onClick={() => handleDeleteProduct(product.id)}
                className="flex-none p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Products
