// FILE: src/pages/ProductDetail.jsx
import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Calendar, ShoppingCart, Star, Shield, Truck, Clock } from 'lucide-react'
import { products } from '../mock/data'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = products.find(p => p.id === id) || products[0]
  const [activeImage, setActiveImage] = useState(0)
  const [duration, setDuration] = useState('day')

  const pricing = {
    day: product.price,
    week: product.price * 5, // Discount
    month: product.price * 20
  }

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left: Image Gallery */}
        <div className="p-6 bg-neutral-50 border-b lg:border-b-0 lg:border-r border-neutral-200 flex flex-col items-center justify-center">
          <div className="relative w-full aspect-square max-w-lg mb-4 rounded-xl overflow-hidden bg-white border border-neutral-200 shadow-sm">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain p-4"
            />
          </div>
          <div className="flex gap-4">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                onClick={() => setActiveImage(i)}
                className={`w-20 h-20 rounded-lg border-2 cursor-pointer overflow-hidden bg-white ${activeImage === i ? 'border-blue-600' : 'border-neutral-200 hover:border-neutral-400'
                  }`}
              >
                <img src={product.image} className="w-full h-full object-cover opacity-80" />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Info & Actions */}
        <div className="p-8 lg:p-10 flex flex-col h-full">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">{product.name}</h1>
            <div className="flex items-center gap-4 text-sm">
              <span className="bg-blue-100 text-blue-700 px-2.5 py-0.5 rounded font-semibold">{product.category}</span>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{product.rating}</span>
                <span className="text-neutral-500">({product.reviews} reviews)</span>
              </div>
            </div>
          </div>

          <p className="text-neutral-600 mb-8 leading-relaxed">
            {product.description}
          </p>

          <div className="mb-8">
            <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wide mb-3">Rental Pricing</h3>
            <div className="grid grid-cols-3 gap-4">
              {['day', 'week', 'month'].map((type) => (
                <button
                  key={type}
                  onClick={() => setDuration(type)}
                  className={`border rounded-xl p-4 text-center transition-all ${duration === type
                      ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600'
                      : 'border-neutral-200 hover:border-blue-300'
                    }`}
                >
                  <span className="block text-xl font-bold text-neutral-900">${pricing[type]}</span>
                  <span className="text-xs text-neutral-500 font-medium capitalize">Per {type}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8 p-4 bg-neutral-50 rounded-xl border border-neutral-100 space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="text-xs font-bold text-neutral-500 uppercase mb-1 block">Start Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-neutral-400" />
                  <input
                    type="date"
                    className="w-full h-10 pl-9 pr-3 rounded-lg border border-neutral-300 bg-white text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex-1">
                <label className="text-xs font-bold text-neutral-500 uppercase mb-1 block">End Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-neutral-400" />
                  <input
                    type="date"
                    className="w-full h-10 pl-9 pr-3 rounded-lg border border-neutral-300 bg-white text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-auto space-y-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="text-3xl font-bold text-neutral-900">${pricing[duration]}</span>
                <span className="text-neutral-500 text-sm"> Total for 1 {duration}</span>
              </div>
              <div className="flex items-center gap-3">
                <button className="w-10 h-10 rounded-lg border border-neutral-300 flex items-center justify-center hover:bg-neutral-50">-</button>
                <span className="text-lg font-bold w-4 text-center">1</span>
                <button className="w-10 h-10 rounded-lg border border-neutral-300 flex items-center justify-center hover:bg-neutral-50">+</button>
              </div>
            </div>

            <button
              onClick={() => navigate('/cart')}
              className="w-full h-14 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-3 shadow-lg shadow-blue-200"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Quote
            </button>
            <p className="text-xs text-center text-neutral-500">No payment required yet. Request a formal quote.</p>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="bg-neutral-50 border-t border-neutral-200 p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-white rounded-lg shadow-sm">
            <Shield className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h4 className="font-bold text-neutral-900 text-sm">Insurance Included</h4>
            <p className="text-xs text-neutral-500 mt-1">Every rental is covered against accidental damage.</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="p-2 bg-white rounded-lg shadow-sm">
            <Truck className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h4 className="font-bold text-neutral-900 text-sm">Same-Day Delivery</h4>
            <p className="text-xs text-neutral-500 mt-1">Available for metro areas if ordered by 2 PM.</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="p-2 bg-white rounded-lg shadow-sm">
            <Clock className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h4 className="font-bold text-neutral-900 text-sm">Flexible Extensions</h4>
            <p className="text-xs text-neutral-500 mt-1">Easily extend your rental period from the dashboard.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
