// FILE: src/pages/ProductDetail.jsx
import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Calendar, ShoppingCart, Star, Shield, ArrowLeft, Heart, Share2, Info } from 'lucide-react'
import { products } from '../mock/data'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = products.find(p => p.id === id) || products[0]
  const [activeImage, setActiveImage] = useState(0)
  const availablePlans = product.availablePlans || ['day', 'week', 'month']

  // Date State
  const [dates, setDates] = useState({
    start: '',
    end: ''
  })

  // Calculate prices logic
  const pricing = {
    day: product.price,
    week: Math.round(product.price * 5.5),
    month: Math.round(product.price * 22)
  }

  // Calculate duration in days
  // Validate dates
  const isInvalidDate = dates.start && dates.end && new Date(dates.start) > new Date(dates.end)

  // Calculate duration in days
  const calculateDuration = () => {
    if (!dates.start || !dates.end || isInvalidDate) return 0
    const start = new Date(dates.start)
    const end = new Date(dates.end)
    const diffTime = Math.abs(end - start)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 0
  }

  const days = calculateDuration()

  // 1. Smart Cost Calculation (Hybrid Pricing)
  const totalCost = (() => {
    if (days === 0) return 0

    const months = Math.floor(days / 30)
    const remainingAfterMonths = days % 30

    const weeks = Math.floor(remainingAfterMonths / 7)
    const extraDays = remainingAfterMonths % 7

    return (months * pricing.month) + (weeks * pricing.week) + (extraDays * pricing.day)
  })()

  // 2. Breakdown String
  const priceBreakdown = (() => {
    if (days === 0) return ''
    const months = Math.floor(days / 30)
    const remMonth = days % 30
    const weeks = Math.floor(remMonth / 7)
    const remWeek = remMonth % 7

    const parts = []
    if (months > 0) parts.push(`${months} Month${months > 1 ? 's' : ''}`)
    if (weeks > 0) parts.push(`${weeks} Week${weeks > 1 ? 's' : ''}`)
    if (remWeek > 0) parts.push(`${remWeek} Day${remWeek > 1 ? 's' : ''}`)

    return parts.join(' + ')
  })()

  // 3. Suggestion Logic (Upsell)
  let suggestion = ''
  if (days > 0) {
    const remainingDaysToWeek = 7 - (days % 30) // Approximate check for weekly upsell
    // Simple checks:
    if (days < 7 && days >= 4) {
      suggestion = 'Extend to 7 days for best Weekly Value!'
    } else if (days < 30 && days >= 21) {
      suggestion = 'Extend to 30 days for best Monthly Value!'
    }
  }

  const handleDateChange = (e) => {
    setDates({ ...dates, [e.target.name]: e.target.value })
  }

  return (
    <div className="max-w-6xl mx-auto pb-12">
      {/* Breadcrumb / Nav */}
      <nav className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Listings
        </button>
        <div className="flex items-center gap-3">
          <button className="p-2 text-neutral-500 hover:bg-neutral-100 rounded-full transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
          <button className="p-2 text-neutral-500 hover:bg-neutral-100 rounded-full transition-colors">
            <Heart className="w-4 h-4" />
          </button>
        </div>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Images */}
        <div className="lg:col-span-7 space-y-4">
          <div className="aspect-[4/3] bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain p-8"
            />
            <div className="absolute top-4 left-4">
              <span className="bg-neutral-900/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold">
                High Demand
              </span>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                onClick={() => setActiveImage(i)}
                className={`aspect-square rounded-xl border-2 cursor-pointer overflow-hidden bg-white transition-all ${activeImage === i
                  ? 'border-neutral-900 ring-2 ring-neutral-900/10'
                  : 'border-neutral-200 hover:border-neutral-300'
                  }`}
              >
                <img src={product.image} className="w-full h-full object-cover p-2" />
              </div>
            ))}
          </div>

          <div className="pt-8">
            <h3 className="font-bold text-lg text-neutral-900 mb-4">Product Description</h3>
            <p className="text-neutral-600 leading-relaxed text-sm lg:text-base">
              {product.description} Experience top-tier performance with this professional-grade equipment.
              Perfect for short-term projects or trying before you buy. Maintained to the highest standards
              and thoroughly cleaned before every rental.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-100 flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-neutral-900">Damage Protection</h4>
                  <p className="text-xs text-neutral-500 mt-1">Full coverage options available.</p>
                </div>
              </div>
              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-100 flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-neutral-900">Expert Support</h4>
                  <p className="text-xs text-neutral-500 mt-1">24/7 technical assistance included.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Booking Card */}
        <div className="lg:col-span-5">
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-neutral-200 shadow-xl shadow-neutral-100/50 sticky top-24">
            <div className="mb-6">
              <p className="text-sm font-bold text-blue-600 mb-2">{product.category}</p>
              <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-2 leading-tight">{product.name}</h1>
              <div className="flex items-center gap-2 text-sm text-neutral-500">
                <div className="flex text-yellow-400">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <span>{product.rating} ({product.reviews} reviews)</span>
              </div>
            </div>

            <div className="space-y-6">
              {/* Pricing Cards (Read-Only) */}
              <div>
                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wide mb-3">Pricing Plans</label>
                <div className={`grid gap-3 ${availablePlans.length === 3 ? 'grid-cols-3' : availablePlans.length === 2 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                  {availablePlans.map((p) => (
                    <div
                      key={p}
                      className="relative p-3 rounded-xl border border-neutral-200 bg-neutral-50/50 text-center"
                    >
                      <span className="block text-xl font-bold text-neutral-900">₹{pricing[p]}</span>
                      <span className="text-xs font-medium text-neutral-500 capitalize">/ {p}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Date Input */}
              <div className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/50 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-500 mb-1.5">Start Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-neutral-400 pointer-events-none" />
                      <input
                        type="date"
                        name="start"
                        min={new Date().toISOString().split('T')[0]}
                        value={dates.start}
                        onChange={handleDateChange}
                        className="w-full h-10 pl-9 pr-3 rounded-lg border border-neutral-200 bg-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-500 mb-1.5">End Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-neutral-400 pointer-events-none" />
                      <input
                        type="date"
                        name="end"
                        min={dates.start || new Date().toISOString().split('T')[0]}
                        value={dates.end}
                        onChange={handleDateChange}
                        className="w-full h-10 pl-9 pr-3 rounded-lg border border-neutral-200 bg-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm pt-2">
                  <span className="text-neutral-500">Duration</span>
                  <span className="font-bold text-neutral-900">{days} Days</span>
                </div>
                {/* Validations & Suggestions */}
                {isInvalidDate && (
                  <p className="text-xs text-red-500 mt-2 font-medium">
                    Start date cannot be after end date.
                  </p>
                )}

                {suggestion && (
                  <div className="mt-3 bg-blue-50 border border-blue-100 rounded-lg p-3">
                    <p className="text-xs text-blue-700 font-medium mb-1">💡 Smart Tip</p>
                    <p className="text-sm text-blue-800 font-bold">{suggestion}</p>
                  </div>
                )}
              </div>

              {/* Total & Action */}
              <div className="pt-6 border-t border-neutral-100">
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <span className="block text-sm text-neutral-500 mb-1">Total Estimated Cost</span>
                    <span className="text-3xl font-bold text-neutral-900 leading-none">₹{totalCost.toFixed(2)}</span>
                  </div>
                </div>

                {days > 0 && (
                  <div className="mb-6 p-3 bg-neutral-50 rounded-lg border border-neutral-100 text-xs">
                    <span className="font-bold text-neutral-700">Price Calculation:</span>
                    <p className="text-neutral-500 mt-1">
                      {priceBreakdown}
                    </p>
                  </div>
                )}

                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => navigate('/cart', {
                      state: {
                        product: {
                          ...product,
                          duration: days,
                          start: dates.start,
                          end: dates.end,
                          selectedPlan: days >= 30 ? 'month' : (days >= 7 ? 'week' : 'day'),
                          planPrice: pricing[days >= 30 ? 'month' : (days >= 7 ? 'week' : 'day')],
                          // Pass effective daily price from smart calculation for Cart compatibility
                          price: days > 0 ? (totalCost / days) : pricing.day
                        }
                      }
                    })}
                    disabled={days <= 0 || isInvalidDate}
                    className={`w-full h-14 bg-blue-600 text-white font-bold rounded-xl text-lg shadow-lg shadow-blue-200 flex items-center justify-center gap-2 transition-transform active:scale-95 ${days <= 0 || isInvalidDate ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                  <p className="text-xs text-center text-neutral-400">
                    You won't be charged yet. Availability verified at checkout.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
