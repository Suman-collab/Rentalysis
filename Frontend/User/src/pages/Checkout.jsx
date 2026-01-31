// FILE: src/pages/Checkout.jsx
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShieldCheck, CreditCard, Wallet, User, MapPin, ArrowLeft } from 'lucide-react'

const Checkout = () => {
  const navigate = useNavigate()
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [selectedCardId, setSelectedCardId] = useState('')

  // Mock saved cards (in a real app, strict sync with profile data)
  const savedCards = [
    { id: 1, type: 'Visa', last4: '4242', expiry: '12/28' },
    { id: 2, type: 'Mastercard', last4: '8899', expiry: '09/25' }
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <Link to="/cart" className="inline-flex items-center text-sm text-neutral-500 hover:text-neutral-900 mb-6">
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Cart
      </Link>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left: Forms */}
        <div className="flex-1 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm">
            <h2 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" /> Delivery Address
            </h2>

            <div className="p-4 border border-blue-100 bg-blue-50/50 rounded-lg mb-4 flex justify-between items-center">
              <div>
                <span className="block text-sm font-bold text-neutral-900">Home</span>
                <span className="text-sm text-neutral-600">123 Rental Ave, Tech City, 90210</span>
              </div>
              <button className="text-sm font-medium text-blue-600 hover:underline">Change</button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-neutral-700 mb-1">Street Address</label>
                <input type="text" className="w-full h-10 px-3 border border-neutral-200 rounded-lg focus:outline-none focus:border-blue-500" placeholder="123 Main St" />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">City</label>
                <input type="text" className="w-full h-10 px-3 border border-neutral-200 rounded-lg focus:outline-none focus:border-blue-500" placeholder="New York" />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Postal Code</label>
                <input type="text" className="w-full h-10 px-3 border border-neutral-200 rounded-lg focus:outline-none focus:border-blue-500" placeholder="10001" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm">
            <h2 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-emerald-600" /> Payment Method
            </h2>

            <div className="space-y-3">
              <label className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-emerald-600 bg-emerald-50/50 ring-1 ring-emerald-600' : 'border-neutral-200 hover:border-neutral-300'}`}>
                <div className="flex items-center gap-3">
                  <input type="radio" name="payment" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="text-emerald-600 focus:ring-emerald-500" />
                  <span className="font-medium text-neutral-900">Credit Card</span>
                </div>
                <div className="flex gap-2">
                  <div className="w-8 h-5 bg-neutral-200 rounded"></div>
                  <div className="w-8 h-5 bg-neutral-200 rounded"></div>
                </div>
              </label>

              {/* Saved Card Option */}
              <label className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'saved-card' ? 'border-emerald-600 bg-emerald-50/50 ring-1 ring-emerald-600' : 'border-neutral-200 hover:border-neutral-300'}`}>
                <div className="flex items-center gap-3">
                  <input type="radio" name="payment" checked={paymentMethod === 'saved-card'} onChange={() => setPaymentMethod('saved-card')} className="text-emerald-600 focus:ring-emerald-500" />
                  <span className="font-medium text-neutral-900">Pay with Saved Card</span>
                </div>
                <CreditCard className="w-5 h-5 text-neutral-400" />
              </label>

              {paymentMethod === 'saved-card' && (
                <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200 space-y-3 animate-in fade-in slide-in-from-top-2">
                  <p className="text-sm font-medium text-neutral-900 mb-2">Select a card</p>
                  <div className="space-y-2">
                    {savedCards.map(card => (
                      <label key={card.id} className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer bg-white hover:border-emerald-500 transition-colors ${selectedCardId === card.id ? 'border-emerald-500 ring-1 ring-emerald-500' : 'border-neutral-200'}`}>
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="savedCard"
                            checked={selectedCardId === card.id}
                            onChange={() => setSelectedCardId(card.id)}
                            className="text-emerald-600 focus:ring-emerald-500"
                          />
                          <div>
                            <p className="text-sm font-bold text-neutral-900">{card.type} ending in {card.last4}</p>
                            <p className="text-xs text-neutral-500">Expires {card.expiry}</p>
                          </div>
                        </div>
                        <div className="text-sm font-mono font-bold text-neutral-400">
                          **** {card.last4}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200 space-y-3 animate-in fade-in slide-in-from-top-2">
                  <input type="text" placeholder="Card number" className="w-full h-10 px-3 border border-neutral-200 rounded-lg bg-white focus:outline-none focus:border-emerald-500" />
                  <div className="grid grid-cols-2 gap-3">
                    <input type="text" placeholder="MM/YY" className="w-full h-10 px-3 border border-neutral-200 rounded-lg bg-white focus:outline-none focus:border-emerald-500" />
                    <input type="text" placeholder="CVC" className="w-full h-10 px-3 border border-neutral-200 rounded-lg bg-white focus:outline-none focus:border-emerald-500" />
                  </div>
                </div>
              )}

              <label className={`flex items-start p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'upi' ? 'border-emerald-600 bg-emerald-50/50 ring-1 ring-emerald-600' : 'border-neutral-200 hover:border-neutral-300'}`}>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <input type="radio" name="payment" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} className="text-emerald-600 focus:ring-emerald-500" />
                    <span className="font-medium text-neutral-900">UPI</span>
                    <span className="text-xs bg-green-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold">Fastest</span>
                  </div>

                  {paymentMethod === 'upi' && (
                    <div className="pl-7 space-y-3 animate-in fade-in slide-in-from-top-2">
                      <p className="text-xs text-neutral-500">Choose your preferred UPI app:</p>
                      <div className="grid grid-cols-3 gap-2">
                        {['Google Pay', 'PhonePe', 'Paytm', 'BHIM', 'Cred'].map((app) => (
                          <button key={app} type="button" className="border border-neutral-200 bg-white rounded-lg py-2 px-1 text-xs font-medium hover:border-emerald-400 hover:text-emerald-600 transition-colors">
                            {app}
                          </button>
                        ))}
                      </div>
                      <div className="relative">
                        <input type="text" placeholder="Enter UPI ID (e.g. name@okhdfcbank)" className="w-full h-9 px-3 border border-neutral-300 rounded-lg text-sm bg-white focus:outline-none focus:border-emerald-500" />
                      </div>
                      <button className="w-full h-9 bg-neutral-900 text-white rounded-lg text-xs font-bold hover:bg-black">Verify & Pay</button>
                    </div>
                  )}
                </div>
              </label>



              <label className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'paypal' ? 'border-emerald-600 bg-emerald-50/50 ring-1 ring-emerald-600' : 'border-neutral-200 hover:border-neutral-300'}`}>
                <div className="flex items-center gap-3">
                  <input type="radio" name="payment" checked={paymentMethod === 'paypal'} onChange={() => setPaymentMethod('paypal')} className="text-emerald-600 focus:ring-emerald-500" />
                  <span className="font-medium text-neutral-900">PayPal</span>
                </div>
              </label>
            </div>

            <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-100 flex gap-3 items-start">
              <ShieldCheck className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-amber-800">Security Deposit Information</h4>
                <p className="text-xs text-amber-700 mt-1">A temporary hold of ₹100.00 will be placed on your card. It will be released automatically 24 hours after item return.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="w-full md:w-80">
          <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm sticky top-24">
            <h2 className="font-bold text-neutral-900 mb-4">Order Summary</h2>

            <div className="space-y-3 mb-6 pb-6 border-b border-neutral-200">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Monthly Rental</span>
                <span className="font-medium text-neutral-900">₹89.80</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Delivery & Setup</span>
                <span className="font-medium text-neutral-900">₹25.80</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Insurance Coverage</span>
                <span className="font-medium text-neutral-900">₹10.90</span>
              </div>
            </div>

            {/* Coupon Code Section */}
            <div className="mb-6 pb-6 border-b border-neutral-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Coupon Code"
                  className="flex-1 h-10 px-3 rounded-lg border border-neutral-200 bg-neutral-50 text-sm focus:outline-none focus:border-blue-500 transition-colors uppercase"
                />
                <button className="px-4 h-10 bg-neutral-900 text-white text-sm font-bold rounded-lg hover:bg-black transition-colors">
                  Apply
                </button>
              </div>
            </div>

            <div className="flex justify-between items-end mb-6">
              <span className="font-bold text-neutral-900">Total Due Today</span>
              <span className="font-bold text-xl text-emerald-600">₹126.50</span>
            </div>

            <p className="text-xs text-neutral-400 mb-4">
              By placing "Place Order", you agree to our Rental Agreement and Terms of Service.
            </p>

            <button
              onClick={() => navigate('/orders/ORD-2023-8821')}
              className="w-full bg-emerald-600 text-white font-bold py-3.5 rounded-xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200"
            >
              Place Order & Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
