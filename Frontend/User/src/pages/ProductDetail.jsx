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
  const [duration, setDuration] = useState('day')

  // Calculate prices logic
  const pricing = {
    day: product.price,
    week: Math.round(product.price * 5.5),
    month: Math.round(product.price * 22)
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
              {/* Pricing Tabs */}
              <div>
                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wide mb-3">Select Pricing Plan</label>
                <div className="grid grid-cols-3 gap-3">
                  {['day', 'week', 'month'].map((p) => (
                    <button
                      key={p}
                      onClick={() => setDuration(p)}
                      className={`relative p-3 rounded-xl border text-center transition-all ${duration === p
                        ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600 pb-4'
                        : 'border-neutral-200 hover:border-neutral-300'
                        }`}
                    >
                      <span className="block text-xl font-bold text-neutral-900">₹{pricing[p]}</span>
                      <span className="text-xs font-medium text-neutral-500 capitalize">/ {p}</span>
                      {duration === p && (
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-blue-600 rotate-45 transform translate-y-1/2 rounded-[2px]" />
                      )}
                    </button>
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
                        className="w-full h-10 pl-9 pr-3 rounded-lg border border-neutral-200 bg-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm pt-2">
                  <span className="text-neutral-500">Duration</span>
                  <span className="font-bold text-neutral-900">0 Days</span>
                </div>
              </div>

              {/* Total & Action */}
              <div className="pt-6 border-t border-neutral-100">
                <div className="flex items-end justify-between mb-6">
                  <div>
                    <span className="block text-sm text-neutral-500 mb-1">Total Estimated Cost</span>
                    <span className="text-3xl font-bold text-neutral-900 leading-none">₹0.00</span>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => navigate('/cart')}
                    className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-lg shadow-lg shadow-blue-200 flex items-center justify-center gap-2 transition-transform active:scale-95"
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
