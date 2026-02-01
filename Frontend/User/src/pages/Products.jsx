

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, ChevronDown, Heart, Check, Filter } from 'lucide-react'
import api from '../services/api'
import { normalizeProductList } from '../utils/dataMapper'

const Products = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const [brandSearch, setBrandSearch] = useState('')
  const [selectedBrands, setSelectedBrands] = useState([])
  const [selectedDuration, setSelectedDuration] = useState('All Durations')
  const [priceRange, setPriceRange] = useState([10, 1000])

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(12) // 12 products per page
  const [totalProducts, setTotalProducts] = useState(0)

  // Fetch products from API with pagination and filters
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const offset = (currentPage - 1) * itemsPerPage

        // Build query parameters
        const params = new URLSearchParams({
          limit: itemsPerPage.toString(),
          offset: offset.toString()
        })

        // Add filter parameters
        if (selectedCategory && selectedCategory !== 'All') {
          params.append('category', selectedCategory)
        }
        if (selectedBrands.length > 0) {
          params.append('brands', selectedBrands.join(','))
        }
        if (selectedDuration && selectedDuration !== 'All Durations') {
          params.append('duration', selectedDuration.toLowerCase())
        }
        if (searchTerm) {
          params.append('search', searchTerm)
        }
        params.append('minPrice', priceRange[0].toString())
        params.append('maxPrice', priceRange[1].toString())

        const response = await api.get(`/product/?${params.toString()}`)

        // Backend should return { products: [...], total: number }
        const productsData = Array.isArray(response.data) ? response.data : response.data.products || []
        const total = response.data.total || productsData.length

        const normalizedProducts = normalizeProductList(productsData)
        setProducts(normalizedProducts)
        setTotalProducts(total)
      } catch (error) {
        console.error('Failed to fetch products:', error)
        // Fallback to empty array on error
        setProducts([])
        setTotalProducts(0)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [currentPage, itemsPerPage, selectedCategory, selectedBrands, selectedDuration, searchTerm, priceRange])

  const categories = ['All', 'Electronics', 'Furniture', 'Tools', 'Audio', 'Camping', 'Fitness']

  const brands = ['Sony', 'Canon', 'Nikon', 'DJI', 'Apple', 'Samsung', 'Bose', 'Makita']

  const durations = ['All Durations', 'Day', 'Week', 'Month']

  const toggleBrand = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter(b => b !== brand))
    } else {
      setSelectedBrands([...selectedBrands, brand])
    }
    // Reset to page 1 when filter changes
    setCurrentPage(1)
  }

  // Update other filter handlers to reset page
  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat)
    setCurrentPage(1)
  }

  const handleDurationChange = (dur) => {
    setSelectedDuration(dur)
    setCurrentPage(1)
  }

  // Remove client-side filtering since API handles it
  const filteredProducts = products

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-200 border-t-neutral-900"></div>
      </div>
    )
  }

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
              <div className="relative h-2 bg-neutral-200 rounded-lg mt-4 mb-2">
                <div
                  className="absolute h-full bg-neutral-900 rounded-lg"
                  style={{
                    left: `${(priceRange[0] / 1000) * 100}%`,
                    right: `${100 - (priceRange[1] / 1000) * 100}%`
                  }}
                />
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange[0]}
                  onChange={(e) => {
                    const val = Math.min(parseInt(e.target.value), priceRange[1] - 50);
                    setPriceRange([val, priceRange[1]]);
                  }}
                  className="absolute top-0 left-0 w-full h-full bg-transparent appearance-none pointer-events-none"
                  style={{ zIndex: 30 }}
                />
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange[1]}
                  onChange={(e) => {
                    const val = Math.max(parseInt(e.target.value), priceRange[0] + 50);
                    setPriceRange([priceRange[0], val]);
                  }}
                  className="absolute top-0 left-0 w-full h-full bg-transparent appearance-none pointer-events-none"
                  style={{ zIndex: 40 }}
                />
                <style dangerouslySetInnerHTML={{
                  __html: `
                  input[type=range]::-webkit-slider-thumb {
                    pointer-events: auto;
                    -webkit-appearance: none;
                    height: 16px;
                    width: 16px;
                    border-radius: 50%;
                    background: #171717;
                    cursor: pointer;
                    margin-top: 0px; 
                    position: relative;
                    z-index: 50;
                    box-shadow: 0 0 0 2px white;
                  }
                  input[type=range]::-moz-range-thumb {
                    pointer-events: auto;
                    height: 16px;
                    width: 16px;
                    border-radius: 50%;
                    background: #171717;
                    cursor: pointer;
                    border: none;
                    position: relative;
                    z-index: 50;
                    box-shadow: 0 0 0 2px white;
                  }
                `}} />
              </div>
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
                  <div
                    key={brand}
                    onClick={() => toggleBrand(brand)}
                    className="flex items-center gap-3 cursor-pointer group hover:bg-neutral-50 p-1.5 rounded transition-colors w-full"
                  >
                    <div
                      className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedBrands.includes(brand) ? 'bg-neutral-900 border-neutral-900' : 'bg-white border-neutral-300 group-hover:border-neutral-400'}`}
                    >
                      {selectedBrands.includes(brand) && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <span className={`text-sm font-medium tracking-wide ${selectedBrands.includes(brand) ? 'text-neutral-900' : 'text-neutral-600'}`}>{brand}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Color Filter Removed */}

            {/* Duration Filter */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-neutral-200">
              <h3 className="font-bold text-neutral-900 mb-4">Duration</h3>
              <div className="space-y-2">
                {durations.map((duration) => (
                  <label key={duration} className="flex items-center gap-3 cursor-pointer group w-full hover:bg-neutral-50 p-1 rounded">
                    <input
                      type="radio"
                      name="duration"
                      checked={selectedDuration === duration}
                      onChange={() => handleDurationChange(duration)}
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
                    onClick={() => handleCategoryChange(cat)}
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
                        {(() => {
                          const plan = product.availablePlans ? product.availablePlans[0] : 'day'
                          let displayPrice = product.price
                          if (plan === 'week') displayPrice = Math.round(product.price * 5.5)
                          if (plan === 'month') displayPrice = Math.round(product.price * 22)

                          return (
                            <div className="flex items-baseline gap-1">
                              <span className="text-xl font-bold text-neutral-900">₹{displayPrice}</span>
                              <span className="text-sm font-medium text-neutral-500">/{plan}</span>
                            </div>
                          )
                        })()}
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

          {/* Pagination Controls */}
          {totalProducts > itemsPerPage && (
            <div className="mt-8 flex justify-center items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg border border-neutral-200 text-sm font-medium text-neutral-700 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              <div className="flex gap-1">
                {Array.from({ length: Math.ceil(totalProducts / itemsPerPage) }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${currentPage === page
                      ? 'bg-neutral-900 text-white'
                      : 'border border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                      }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(totalProducts / itemsPerPage)))}
                disabled={currentPage === Math.ceil(totalProducts / itemsPerPage)}
                className="px-4 py-2 rounded-lg border border-neutral-200 text-sm font-medium text-neutral-700 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Products
