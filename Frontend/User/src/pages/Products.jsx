// FILE: src/pages/Products.jsx
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Filter, Search } from 'lucide-react'
import { products } from '../mock/data'

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState('All')

  const filteredProducts = products.filter(p =>
    (category === 'All' || p.category === category) &&
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const categories = ['All', 'Heavy Machinery', 'Drilling', 'Construction', 'Power', 'Transport']

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Browse Products</h1>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full h-9 pl-9 pr-4 rounded-md border border-neutral-200 text-sm focus:outline-none focus:border-neutral-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="h-9 px-3 border border-neutral-200 rounded-md bg-white hover:bg-neutral-50 text-neutral-600 flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">Filter</span>
          </button>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${category === cat
                ? 'bg-neutral-900 text-white'
                : 'bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="group block bg-white rounded-lg border border-neutral-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="aspect-[4/3] bg-neutral-100 relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 right-2">
                <span className={`px-2 py-1 rounded text-xs font-semibold ${product.status === 'Available' ? 'bg-green-100 text-green-800' :
                    product.status === 'Rented' ? 'bg-amber-100 text-amber-800' :
                      'bg-red-100 text-red-800'
                  }`}>
                  {product.status}
                </span>
              </div>
            </div>
            <div className="p-4">
              <p className="text-xs text-neutral-500 font-medium mb-1">{product.category}</p>
              <h3 className="font-semibold text-neutral-900 mb-2 truncate">{product.name}</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-bold text-neutral-900">${product.price}</span>
                <span className="text-sm text-neutral-500">/{product.unit}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12 text-neutral-500">
          No products found matching your criteria.
        </div>
      )}
    </div>
  )
}

export default Products
