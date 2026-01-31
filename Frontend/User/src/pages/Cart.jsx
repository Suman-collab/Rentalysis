// FILE: src/pages/Cart.jsx
import React, { useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Trash2, ArrowRight, Calendar, FileText, ShoppingCart } from 'lucide-react'

const Cart = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [items, setItems] = React.useState(() => {
    // Load from local storage
    const savedItems = localStorage.getItem('cartItems')
    let currentItems = savedItems ? JSON.parse(savedItems) : []

    const incomingProduct = location.state?.product

    if (incomingProduct) {
      const newItem = {
        id: `cart-${Date.now()}`,
        product: incomingProduct,
        quantity: 1,
        duration: incomingProduct.duration || 1,
        price: incomingProduct.price,
        startDate: incomingProduct.start || new Date().toISOString().split('T')[0],
        endDate: incomingProduct.end || new Date(Date.now() + 86400000).toISOString().split('T')[0]
      }
      currentItems.push(newItem)
    }
    return currentItems
  })

  // Save items to local storage
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(items))
  }, [items])

  useEffect(() => {
    if (location.state?.product) {
      window.history.replaceState({}, document.title)
    }
  }, [location])

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id))
  }

  const updateQuantity = (id, change) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + change)
        return { ...item, quantity: newQuantity }
      }
      return item
    }))
  }

  const [dates, setDates] = React.useState(() => {
    // Load from local storage
    const savedDates = localStorage.getItem('cartDates')
    if (savedDates) return JSON.parse(savedDates)

    const incoming = location.state?.product
    if (incoming?.start && incoming?.end) {
      return { start: incoming.start, end: incoming.end }
    }
    return {
      start: new Date().toISOString().split('T')[0],
      end: new Date(Date.now() + 172800000).toISOString().split('T')[0]
    }
  })

  // Save dates to local storage
  useEffect(() => {
    localStorage.setItem('cartDates', JSON.stringify(dates))
  }, [dates])

  const [isEditingDates, setIsEditingDates] = React.useState(false)

  const handleDateChange = (e) => {
    setDates({ ...dates, [e.target.name]: e.target.value })
  }

  const saveDates = () => {
    setIsEditingDates(false)
  }

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity * item.duration), 0)
  const securityDeposit = items.length > 0 ? 100.00 : 0
  const serviceTax = subtotal * 0.08
  const total = subtotal + securityDeposit + serviceTax

  useEffect(() => {
    if (!dates.start || !dates.end) return

    const start = new Date(dates.start)
    const end = new Date(dates.end)
    const diffTime = Math.abs(end - start)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1

    setItems(prevItems => prevItems.map(item => ({ ...item, duration: diffDays })))
  }, [dates])

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Rental Quotation</h1>
          <p className="text-sm text-neutral-500 mt-1">Quotation ID: #Q-{new Date().getFullYear()}-{Math.floor(Math.random() * 10000)}</p>
        </div>
        <button className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1">
          <FileText className="w-4 h-4" /> Download PDF Quote
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
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
                <div className="p-12 text-center text-neutral-500 flex flex-col items-center">
                  <ShoppingCart className="w-12 h-12 text-neutral-300 mb-4" />
                  <p>Your cart is empty.</p>
                  <Link to="/products" className="text-blue-600 font-bold mt-2 inline-block hover:underline">Start Browsing</Link>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="p-6 flex flex-col sm:flex-row gap-6 items-start hover:bg-neutral-50/50 transition-colors">
                    <div className="w-24 h-24 bg-neutral-100 rounded-lg overflow-hidden flex-shrink-0 border border-neutral-200">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 w-full">
                      <div className="flex justify-between items-start mb-2">
                        <Link to={`/products/${item.product.id}`} className="font-bold text-neutral-900 text-lg leading-tight hover:text-blue-600 transition-colors line-clamp-2">
                          {item.product.name}
                        </Link>
                        <p className="font-bold text-neutral-900 text-lg whitespace-nowrap">₹{(item.price * item.quantity * item.duration).toFixed(2)}</p>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500 mb-4">
                        <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs font-semibold">
                          {item.duration} {item.duration > 1 ? 'Days' : 'Day'}
                        </span>
                        <span className="flex items-center gap-1">
                          Rate: ₹{item.product.planPrice || item.price} / {item.product.selectedPlan || 'day'}
                        </span>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-neutral-200 rounded-lg bg-white">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="px-3 py-1 hover:bg-neutral-50 text-neutral-600 border-r border-neutral-200"
                          >-</button>
                          <span className="px-3 font-medium text-sm w-10 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="px-3 py-1 hover:bg-neutral-50 text-neutral-600 border-l border-neutral-200"
                          >+</button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-neutral-400 hover:text-red-500 p-2 transition-colors flex items-center gap-1 group"
                        >
                          <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                          <span className="text-xs group-hover:text-red-500 hidden sm:inline">Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-lg flex-shrink-0">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-neutral-900 text-sm">Global Rental Duration</h4>
                {isEditingDates ? (
                  <div className="flex flex-wrap gap-2 mt-1">
                    <input
                      type="date"
                      name="start"
                      value={dates.start}
                      onChange={handleDateChange}
                      className="text-xs border rounded px-2 py-1 bg-white"
                    />
                    <span className="text-neutral-400 self-center">-</span>
                    <input
                      type="date"
                      name="end"
                      value={dates.end}
                      onChange={handleDateChange}
                      className="text-xs border rounded px-2 py-1 bg-white"
                    />
                  </div>
                ) : (
                  <p className="text-sm text-neutral-500 mt-0.5">
                    {new Date(dates.start).toLocaleDateString(undefined, { medium: 'short' })} - {new Date(dates.end).toLocaleDateString(undefined, { medium: 'short' })}
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={() => isEditingDates ? saveDates() : setIsEditingDates(true)}
              className="text-sm font-semibold text-blue-600 border border-blue-200 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors w-full sm:w-auto"
            >
              {isEditingDates ? 'Save Dates' : 'Change Dates'}
            </button>
          </div>
        </div>

        <div className="w-full lg:w-96 flex-shrink-0">
          <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm sticky top-24">
            <h3 className="font-bold text-neutral-900 mb-6 text-lg">Quotation Summary</h3>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Subtotal (for {items[0]?.duration || 1} days)</span>
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
              disabled={items.length === 0}
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-200 ${items.length === 0 ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'}`}
            >
              Confirm Quotation <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-xs text-neutral-400 text-center mt-4 leading-relaxed">
              By confirming, you agree to our Terms of Service and Privacy Policy. Security deposits are released after successful item return.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
