import React from 'react'
import { Link } from 'react-router-dom'
import { Check, Printer, User } from 'lucide-react'

const OrderSuccess = () => {

  const order = {
    id: 'SO00010',
    productName: 'Sony Alpha a7S III',
    price: '₹3,200.00/day',
    subTotal: 3200,
    delivery: 0,
    total: 3200,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=300',
    customerName: 'Johnathan Smith',
    address: '4521 Silicon Valley Rd, San Jose, CA 95134'
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

          {/* Left Column */}
          <div className="lg:col-span-7 space-y-12">

            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-4xl md:text-5xl font-light tracking-wide text-white mb-4">
                  Thank you for your order
                </h1>
                <p className="text-neutral-500 text-lg uppercase tracking-widest">Order {order.id}</p>
              </div>
              <button onClick={() => window.print()} className="px-6 py-2 border border-neutral-700 rounded-full text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors flex items-center gap-2">
                <Printer className="w-4 h-4" /> Print
              </button>
            </div>

            <div className="bg-emerald-900/30 border border-emerald-900/50 p-8 rounded-2xl flex items-center gap-4">
              {/* <Check className="w-8 h-8 text-emerald-500" /> */}
              <span className="text-2xl font-light text-emerald-400 tracking-wide">Your Payment has been processed.</span>
            </div>

            <div className="p-8 rounded-3xl border border-neutral-800 bg-neutral-900">
              <span className="inline-block px-4 py-1 rounded-full border border-neutral-700 text-xs font-bold uppercase tracking-widest text-neutral-400 mb-6">Delivery & Billing</span>
              <h3 className="text-2xl text-white font-medium mb-2">{order.customerName}</h3>
              <p className="text-neutral-400 text-lg">{order.address}</p>
            </div>

          </div>

          {/* Right Column: Summary */}
          <div className="lg:col-span-5">
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8">
              <div className="flex gap-6 mb-8 pb-8 border-b border-neutral-800">
                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-neutral-800 border border-neutral-700 flex-shrink-0">
                  <img src={order.image} alt="Product" className="w-full h-full object-cover opacity-80" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-white mb-2">{order.productName}</h3>
                  <p className="text-emerald-400 font-mono">{order.price}</p>
                </div>
              </div>

              <div className="space-y-6 mb-8 pb-8 border-b border-neutral-800 text-sm">
                <div>
                  <h4 className="text-neutral-500 uppercase tracking-widest text-xs mb-2">Rental Period</h4>
                  <p className="text-neutral-200 text-base">Jan 12, 2024 - Jan 14, 2024</p>
                </div>
                <div className="flex justify-between items-center text-neutral-400">
                  <span>Delivery Charges</span>
                  <span className="text-white font-mono">-</span>
                </div>
                <div className="flex justify-between items-center text-neutral-400">
                  <span>Sub Total</span>
                  <span className="text-white font-mono">₹{order.subTotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex justify-between items-end">
                <span className="text-neutral-400 text-lg">Total</span>
                <span className="text-3xl font-bold text-white tracking-tight">₹{order.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default OrderSuccess
