// FILE: src/pages/Products.jsx
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Filter, Search, ChevronDown, Heart, MapPin, SlidersHorizontal } from 'lucide-react'
import { products } from '../mock/data'

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = ['All', 'Electronics', 'Furniture', 'Tools', 'Audio', 'Camping', 'Fitness']

  // Filter logic
  const filteredProducts = products.filter(p =>
    (selectedCategory === 'All' || p.category === selectedCategory) &&
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header & Search */}
      <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">Explore Rental Listings</h1>
            <p className="text-neutral-500 mt-1">Find the perfect equipment for your needs.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg text-sm font-medium transition-colors">
              <MapPin className="w-4 h-4" /> New York, NY
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-5 w-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search cameras, laptops, furniture..."
              className="w-full h-11 pl-10 pr-4 rounded-lg bg-neutral-50 border border-neutral-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-5 h-11 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors text-neutral-700 font-medium">
            <SlidersHorizontal className="w-4 h-4" /> Filters
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto mt-6 pb-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${selectedCategory === cat
                  ? 'bg-neutral-900 text-white shadow-md'
                  : 'bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50 hover:border-neutral-300'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="group bg-white rounded-xl border border-neutral-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
          >
            <div className="aspect-[4/3] bg-neutral-100 relative overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <button className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm text-neutral-500 hover:text-red-500 transition-colors">
                <Heart className="w-4 h-4" />
              </button>
              <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-md text-xs font-bold text-neutral-900 shadow-sm flex items-center gap-1">
                <span className={`w-2 h-2 rounded-full ${product.status === 'Available' ? 'bg-green-500' : 'bg-red-500'}`} />
                {product.status}
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col">
              <div className="mb-3">
                <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">{product.category}</p>
                <h3 className="font-bold text-neutral-900 leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>
              </div>

              <div className="mt-auto pt-4 border-t border-neutral-100 flex items-end justify-between">
                <div>
                  <p className="text-xs text-neutral-500 mb-0.5">Rent from</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-bold text-neutral-900">${product.price}</span>
                    <span className="text-sm font-medium text-neutral-500">/{product.unit}</span>
                  </div>
                </div>
                <button className="px-4 py-2 bg-neutral-900 text-white text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  View Details
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Products
