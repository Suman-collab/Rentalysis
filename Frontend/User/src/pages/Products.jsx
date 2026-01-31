// FILE: src/pages/Products.jsx
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Filter, Search, ChevronDown, CheckSquare, Square } from 'lucide-react'
import { products } from '../mock/data'

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategories, setSelectedCategories] = useState([])
  const [priceRange, setPriceRange] = useState(200)

  const categories = ['Electronics', 'Furniture', 'Tools', 'Audio', 'Camping', 'Fitness']

  const toggleCategory = (cat) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter(c => c !== cat))
    } else {
      setSelectedCategories([...selectedCategories, cat])
    }
  }

  const filteredProducts = products.filter(p =>
    (selectedCategories.length === 0 || selectedCategories.includes(p.category)) &&
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    p.price <= priceRange
  )

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      {/* Filters Sidebar */}
      <aside className="w-full lg:w-64 flex-shrink-0 space-y-8 bg-white p-6 rounded-xl border border-neutral-200 sticky top-24">
        <div>
          <h3 className="font-bold text-neutral-900 mb-4 flex items-center gap-2">
            <Filter className="w-4 h-4" /> Filters
          </h3>

          <div className="mb-6">
            <h4 className="text-sm font-semibold text-neutral-900 mb-3">Categories</h4>
            <div className="space-y-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className="flex items-center gap-2 text-sm text-neutral-600 hover:text-blue-600 w-full text-left"
                >
                  {selectedCategories.includes(cat) ? (
                    <CheckSquare className="w-4 h-4 text-blue-600" />
                  ) : (
                    <Square className="w-4 h-4 text-neutral-300" />
                  )}
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-semibold text-neutral-900">Max Price/Day</h4>
              <span className="text-sm font-medium text-blue-600">${priceRange}</span>
            </div>
            <input
              type="range"
              min="0"
              max="200"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 w-full">
        {/* Search Bar */}
        <div className="bg-white p-4 rounded-xl border border-neutral-200 mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search specific items..."
              className="w-full h-10 pl-9 pr-4 rounded-lg border border-neutral-200 text-sm focus:outline-none focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-neutral-500 whitespace-nowrap">Sort by:</span>
            <button className="flex items-center gap-1 text-sm font-medium text-neutral-900 bg-neutral-50 px-3 py-2 rounded-lg border border-neutral-200 hover:bg-neutral-100">
              Recommended <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="bg-white border border-neutral-200 rounded-xl overflow-hidden hover:shadow-lg transition-all hover:border-blue-300 group flex flex-col h-full"
            >
              <div className="aspect-[4/3] bg-neutral-100 relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-neutral-900/80 backdrop-blur-sm text-white px-2 py-0.5 rounded text-xs font-semibold">
                  {product.category}
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col">
                <div className="mb-2">
                  <h3 className="font-bold text-neutral-900 line-clamp-1">{product.name}</h3>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-xs font-medium bg-green-100 text-green-700 px-1.5 py-0.5 rounded">
                      {product.status}
                    </span>
                    <span className="text-xs text-neutral-400">• {product.reviews} reviews</span>
                  </div>
                </div>

                <div className="mt-auto flex items-center justify-between border-t border-neutral-100 pt-4">
                  <div>
                    <span className="text-lg font-bold text-neutral-900">${product.price}</span>
                    <span className="text-xs text-neutral-500"> / {product.unit}</span>
                  </div>
                  <button className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20 bg-white rounded-xl border border-neutral-200 border-dashed">
            <p className="text-neutral-500">No products found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Products
