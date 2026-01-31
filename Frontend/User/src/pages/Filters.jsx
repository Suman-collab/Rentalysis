import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Check, ChevronDown, Search } from 'lucide-react'

const Filters = () => {
  const navigate = useNavigate()
  const [brandSearch, setBrandSearch] = useState('')
  const [selectedBrands, setSelectedBrands] = useState([])
  const [selectedColor, setSelectedColor] = useState(null)
  const [selectedDuration, setSelectedDuration] = useState('All Durations')
  const [priceRange, setPriceRange] = useState([10, 1000])

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

  const handleApply = () => {
    // In a real app, this would pass params back to Products
    navigate('/products')
  }

  return (
    <div className="max-w-xl mx-auto bg-white min-h-screen md:min-h-0 md:rounded-2xl shadow-sm border border-neutral-200">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-neutral-100 sticky top-0 bg-white z-10">
        <Link to="/products" className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-neutral-600" />
        </Link>
        <h1 className="text-lg font-bold text-neutral-900">Filters</h1>
        <button
          onClick={() => {
            setSelectedBrands([])
            setSelectedColor(null)
            setSelectedDuration('All Durations')
          }}
          className="ml-auto text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          Reset
        </button>
      </div>

      <div className="p-6 space-y-8 pb-24">
        {/* Brand Filter */}
        <div className="space-y-4">
          <h3 className="font-bold text-neutral-900 flex justify-between items-center">
            Brand
            <span className="text-xs font-normal text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full">{brands.length}</span>
          </h3>
          <div className="relative">
            <input
              type="text"
              placeholder="Search Brand"
              className="w-full text-sm bg-neutral-50 border border-neutral-200 rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
              value={brandSearch}
              onChange={(e) => setBrandSearch(e.target.value)}
            />
            <Search className="absolute left-3 top-3 w-4 h-4 text-neutral-400" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {brands.filter(b => b.toLowerCase().includes(brandSearch.toLowerCase())).map(brand => (
              <label key={brand} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${selectedBrands.includes(brand) ? 'border-neutral-900 bg-neutral-900 text-white' : 'border-neutral-100 bg-white hover:border-neutral-300'}`}>
                <input
                  type="checkbox"
                  className="hidden"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => toggleBrand(brand)}
                />
                <span className="text-sm font-medium">{brand}</span>
                {selectedBrands.includes(brand) && <Check className="w-4 h-4 ml-auto" />}
              </label>
            ))}
          </div>
        </div>

        {/* Color Filter */}
        <div className="space-y-4">
          <h3 className="font-bold text-neutral-900">Color</h3>
          <div className="flex flex-wrap gap-4">
            {colors.map((color) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(selectedColor === color.name ? null : color.name)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform hover:scale-105 ${selectedColor === color.name ? 'ring-2 ring-offset-2 ring-neutral-900' : ''}`}
                style={{ backgroundColor: color.hex, border: color.border ? '1px solid #E5E5E5' : 'none' }}
              >
                {selectedColor === color.name && <Check className={`w-5 h-5 ${color.name === 'White' ? 'text-black' : 'text-white'}`} />}
              </button>
            ))}
          </div>
        </div>

        {/* Duration Filter */}
        <div className="space-y-4">
          <h3 className="font-bold text-neutral-900">Duration</h3>
          <div className="flex flex-wrap gap-2">
            {durations.map((duration) => (
              <button
                key={duration}
                onClick={() => setSelectedDuration(duration)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedDuration === duration
                    ? 'bg-neutral-900 text-white shadow-md'
                    : 'bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                  }`}
              >
                {duration}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-neutral-900">Price Range</h3>
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
          <div className="flex justify-between text-xs text-neutral-400 font-medium uppercase tracking-wide">
            <span>Min: ₹10</span>
            <span>Max: ₹10,000+</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-neutral-100 sticky bottom-0 bg-white">
        <button
          onClick={handleApply}
          className="w-full h-12 bg-neutral-900 text-white font-bold rounded-xl hover:bg-black transition-colors shadow-lg shadow-neutral-200"
        >
          Apply Filters
        </button>
      </div>
    </div>
  )
}

export default Filters
