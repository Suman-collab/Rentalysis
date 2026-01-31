// FILE: src/pages/Cart.jsx
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Trash2, ArrowRight, Calendar, Edit2, FileText } from 'lucide-react'
import { cartItems } from '../mock/data'

const Cart = () => {
  const navigate = useNavigate()
  const [items, setItems] = React.useState(cartItems)

  // Handle remove item
  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id))
  }

  // Handle quantity change
  const updateQuantity = (id, change) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + change)
        return { ...item, quantity: newQuantity }
      }
      return item
    }))
  }

  // Date State
  const [dates, setDates] = React.useState({ start: '2023-10-17', end: '2023-10-19' })
  const [isEditingDates, setIsEditingDates] = React.useState(false)

  const handleDateChange = (e) => {
    setDates({ ...dates, [e.target.name]: e.target.value })
  }

  const saveDates = () => {
    setIsEditingDates(false)
  }

  // Calculate totals
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0)
  const securityDeposit = items.length > 0 ? 100.00 : 0
  const serviceTax = subtotal * 0.08
  const total = subtotal + securityDeposit + serviceTax

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Rental Quotation</h1>
          <p className="text-sm text-neutral-500 mt-1">Quotation ID: #Q-2023-TEMP (Not confirmed yet)</p>
        </div>
        <button className="text-blue-600 text-sm font-medium hover:underline">
          Download PDF Quote
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left: Cart Items */}
        <div className="flex-1 space-y-6">
          <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm">
            <div className="p-4 border-b border-neutral-100 bg-neutral-50 flex justify-between items-center">
              <h3 className="font-semibold text-neutral-900">Selected Items ({items.length})</h3>
              <Link to="/products" className="text-sm text-blue-600 font-medium hover:underline">
                + Add more items
              </Link>
            </div>

            <div className="divide-y divide-neutral-100">
              {items.length === 0 ? (
                <div className="p-12 text-center text-neutral-500">
                  <p>Your cart is empty.</p>
                  <Link to="/products" className="text-blue-600 font-bold mt-2 inline-block">Start Browsing</Link>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="p-6 flex flex-col sm:flex-row gap-6 items-start">
                    <div className="w-24 h-24 bg-neutral-100 rounded-lg overflow-hidden flex-shrink-0 border border-neutral-200">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-neutral-900 text-lg leading-tight">{item.product.name}</h4>
                        <p className="font-bold text-neutral-900 text-lg">₹{(item.price * item.quantity).toFixed(2)}</p>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500 mb-4">
                        <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs font-semibold">
                          {item.duration} {item.duration > 1 ? 'Days' : 'Day'}
                        </span>
                        <span className="flex items-center gap-1">
                          ₹{item.product.price} / day
                        </span>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-neutral-200 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="px-3 py-1 hover:bg-neutral-50 text-neutral-600"
                          >-</button>
                          <span className="px-2 font-medium text-sm w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="px-3 py-1 hover:bg-neutral-50 text-neutral-600"
                          >+</button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-neutral-400 hover:text-red-500 p-2 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-neutral-900 text-sm">Global Rental Duration</h4>
                {isEditingDates ? (
                  <div className="flex gap-2 mt-1">
                    <input
                      type="date"
                      name="start"
                      value={dates.start}
                      onChange={handleDateChange}
                      className="text-xs border rounded px-1 py-0.5"
                    />
                    <span className="text-neutral-400">-</span>
                    <input
                      type="date"
                      name="end"
                      value={dates.end}
                      onChange={handleDateChange}
                      className="text-xs border rounded px-1 py-0.5"
                    />
                  </div>
                ) : (
                  <p className="text-sm text-neutral-500">{new Date(dates.start).toLocaleDateString()} - {new Date(dates.end).toLocaleDateString()}</p>
                )}
              </div>
            </div>
            <button
              onClick={() => isEditingDates ? saveDates() : setIsEditingDates(true)}
              className="text-sm font-semibold text-blue-600 border border-blue-200 px-4 py-2 rounded-lg hover:bg-blue-50"
            >
              {isEditingDates ? 'Save Dates' : 'Change Dates'}
            </button>
          </div>
        </div>

        {/* Right: Summary */}
        <div className="w-full lg:w-96 flex-shrink-0">
          <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm sticky top-24">
            <h3 className="font-bold text-neutral-900 mb-6 text-lg">Quotation Summary</h3>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Subtotal</span>
                <span className="font-medium text-neutral-900">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Security Deposit (Refundable)</span>
                <span className="font-medium text-neutral-900">₹{securityDeposit.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Service Tax (8%)</span>
                <span className="font-medium text-neutral-900">₹{serviceTax.toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t border-neutral-200 py-4 mb-4">
              <div className="flex justify-between items-end">
                <span className="text-base font-bold text-neutral-900">Total Quote</span>
                <span className="text-2xl font-bold text-blue-600">₹{total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-md shadow-blue-200"
            >
              Confirm Quotation <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-xs text-neutral-400 text-center mt-4 leading-relaxed">
              By clicking confirming, you agree to our Terms of Service and Privacy Policy. Security deposits are released after successful item return.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
