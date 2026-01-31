// FILE: src/pages/Products.jsx
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, ChevronDown, Heart, Check, Filter } from 'lucide-react'
import { products } from '../mock/data'

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  // Filter States
  const [brandSearch, setBrandSearch] = useState('')
  const [selectedBrands, setSelectedBrands] = useState([])
  const [selectedColor, setSelectedColor] = useState(null)
  const [selectedDuration, setSelectedDuration] = useState('All Durations')
  const [priceRange, setPriceRange] = useState([10, 10000])

  const categories = ['All', 'Electronics', 'Furniture', 'Tools', 'Audio', 'Camping', 'Fitness']

  const brands = ['Sony', 'Canon', 'Nikon', 'DJI', 'Apple', 'Samsung', 'Bose', 'Makita']
  const colors = [
    { name: 'Black', hex: '#1F2937' },
    { name: 'Purple', hex: '#A855F7' },
    { name: 'Brown', hex: '#78350F' },
    { name: 'Orange', hex: '#F97316' },
    { name: 'White', hex: '#FFFFFF', border: true },
    { name: 'Blue', hex: '#3B82F6' },
    { name: 'Red', hex: '#EF4444' },
    { name: 'Green', hex: '#22C55E' },
  ]
  const durations = ['1 Month', '6 Months', '1 Year', '2 Years', '3 Years']

  const toggleBrand = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter(b => b !== brand))
    } else {
      setSelectedBrands([...selectedBrands, brand])
    }
  }

  // Filter Logic
  const filteredProducts = products.filter(p =>
    (selectedCategory === 'All' || p.category === selectedCategory) &&
    (selectedBrands.length === 0 || (p.brand && selectedBrands.includes(p.brand))) &&
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
    // Add price/color/duration filtering logic here if mock data supported it
  )

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="container mx-auto px-4 py-8">

        {/* Top Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 tracking-tight mb-2">Explore Rental Listings</h1>
          <p className="text-neutral-500">Find the perfect equipment for your needs.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* Sidebar Filters */}
          <div className="w-full lg:w-72 flex-shrink-0 space-y-6">

            {/* Mobile Search (visible only on small screens if needed, otherwise rely on main search) */}
            <div className="lg:hidden mb-4 relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full h-10 pl-10 pr-4 rounded-xl bg-white border border-neutral-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-neutral-400" />
            </div>

            {/* Price Range Filter */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-neutral-200">
              <h3 className="font-bold text-neutral-900 mb-4 flex items-center gap-2">
                Price Range
              </h3>
              <div className="mb-4">
                <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">₹{priceRange[0]} - ₹{priceRange[1]}</span>
              </div>
              <input
                type="range"
                min="10"
                max="10000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-neutral-900"
              />
              <div className="flex justify-between text-xs text-neutral-400 font-medium uppercase tracking-wide mt-2">
                <span>Min</span>
                <span>Max</span>
              </div>
            </div>

            {/* Brand Filter */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-neutral-200">
              <h3 className="font-bold text-neutral-900 mb-4 flex justify-between items-center">
                Brand
                <span className="bg-neutral-100 text-neutral-600 text-xs font-bold px-2 py-1 rounded">
                  {brands.length}
                </span>
              </h3>
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full text-sm bg-neutral-50 border border-neutral-200 rounded-lg py-2 pl-3 pr-8 focus:outline-none focus:border-blue-500 text-neutral-900 placeholder-neutral-400"
                  value={brandSearch}
                  onChange={(e) => setBrandSearch(e.target.value)}
                />
                <Search className="absolute right-2.5 top-2.5 w-3.5 h-3.5 text-neutral-400" />
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {brands.filter(b => b.toLowerCase().includes(brandSearch.toLowerCase())).map(brand => (
                  <label key={brand} className="flex items-center gap-3 cursor-pointer group hover:bg-neutral-50 p-1.5 rounded transition-colors">
                    <div
                      onClick={() => toggleBrand(brand)}
                      className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedBrands.includes(brand) ? 'bg-neutral-900 border-neutral-900' : 'bg-white border-neutral-300 group-hover:border-neutral-400'}`}
                    >
                      {selectedBrands.includes(brand) && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <span className={`text-sm font-medium tracking-wide ${selectedBrands.includes(brand) ? 'text-neutral-900' : 'text-neutral-600'}`}>{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Color Filter */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-neutral-200">
              <h3 className="font-bold text-neutral-900 mb-4">Color</h3>
              <div className="flex flex-wrap gap-3">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(selectedColor === color.name ? null : color.name)}
                    className={`w-8 h-8 rounded-full transition-transform hover:scale-110 flex items-center justify-center relative ${selectedColor === color.name ? 'ring-2 ring-offset-2 ring-neutral-900' : ''}`}
                    style={{ backgroundColor: color.hex, border: color.border ? '1px solid #E5E5E5' : 'none' }}
                    title={color.name}
                  >
                    {selectedColor === color.name && <Check className={`w-4 h-4 ${color.name === 'White' ? 'text-black' : 'text-white'}`} />}
                  </button>
                ))}
              </div>
            </div>

            {/* Duration Filter */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-neutral-200">
              <h3 className="font-bold text-neutral-900 mb-4">Duration</h3>
              <div className="space-y-2">
                {durations.map((duration) => (
                  <label key={duration} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="duration"
                      checked={selectedDuration === duration}
                      onChange={() => setSelectedDuration(duration)}
                      className="w-4 h-4 text-neutral-900 border-gray-300 focus:ring-neutral-900"
                    />
                    <span className="text-sm text-neutral-600 group-hover:text-neutral-900">{duration}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Desktop Search & Categories */}
            <div className="mb-6 space-y-4">
              <div className="relative hidden lg:block">
                <Search className="absolute left-3 top-3 h-5 w-5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search for cameras, drones, furniture..."
                  className="w-full h-11 pl-10 pr-4 rounded-xl bg-white border border-neutral-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none shadow-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Category Cloud */}
              <div className="flex flex-wrap gap-2">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                          <span className="text-xl font-bold text-neutral-900">₹{product.price}</span>
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
            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <p className="text-neutral-500 text-lg">No products found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products
