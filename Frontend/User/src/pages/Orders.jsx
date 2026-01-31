
import React from 'react'
import { Link } from 'react-router-dom'
import { Package, Calendar, MapPin, ChevronRight, FileText, ArrowRight } from 'lucide-react'
import { orders } from '../mock/data'

const Orders = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">My Rental History</h1>
          <p className="text-neutral-500 mt-1">Track current rentals and review past orders.</p>
        </div>
        <div className="bg-white border border-neutral-200 rounded-lg p-1 flex">
          <button className="px-4 py-1.5 bg-neutral-900 text-white text-sm font-medium rounded-md shadow-sm">All</button>
          <button className="px-4 py-1.5 text-neutral-600 hover:text-neutral-900 text-sm font-medium">Active</button>
          <button className="px-4 py-1.5 text-neutral-600 hover:text-neutral-900 text-sm font-medium">Completed</button>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-xl border border-neutral-200 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col md:flex-row gap-6 items-start md:items-center">

            {/* Image & Basic Info */}
            <div className="flex items-center gap-4 flex-1">
              <div className="w-20 h-20 bg-neutral-100 rounded-xl border border-neutral-200 overflow-hidden flex-shrink-0">
                <img src={order.items[0].image} alt="" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-neutral-900 text-lg">{order.items[0].name}</h3>
                  {order.items.length > 1 && (
                    <span className="text-xs font-semibold bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-full">
                      +{order.items.length - 1} more
                    </span>
                  )}
                </div>
                <p className="text-sm text-neutral-500 font-mono mb-2">Order {order.id}</p>
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <span className={`px-2.5 py-0.5 rounded text-xs uppercase tracking-wide border ${order.status === 'Active'
                    ? 'bg-blue-50 text-blue-700 border-blue-100'
                    : 'bg-green-50 text-green-700 border-green-100'
                    }`}>
                    {order.status}
                  </span>
                  <span className="text-neutral-300">|</span>
                  <span className="text-neutral-900 font-bold">₹{order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Dates & Status Info */}
            <div className="flex flex-col sm:flex-row gap-8 md:w-1/3 border-l border-neutral-100 md:pl-8">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-neutral-400 uppercase mb-1">
                  <Calendar className="w-3 h-3" /> Due Date
                </div>
                <p className="font-semibold text-neutral-900">{order.endDate}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-neutral-400 uppercase mb-1">
                  <MapPin className="w-3 h-3" /> Status
                </div>
                <p className="font-semibold text-neutral-900 truncate">
                  {order.status === 'Active' ? 'In Possession' : 'Returned'}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex md:flex-col gap-2 w-full md:w-auto mt-2 md:mt-0">
              <Link
                to={`/orders/${order.id}`}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-neutral-900 text-white text-sm font-bold rounded-lg hover:bg-neutral-800 transition-colors"
              >
                Track Order
              </Link>
              <Link
                to={`/invoices/INV-${order.id.split('-')[1]}`}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-neutral-200 text-neutral-700 text-sm font-bold rounded-lg hover:bg-neutral-50 transition-colors"
              >
                View Invoice
              </Link>
            </div>

          </div>
        ))}
      </div>

      {orders.length === 0 && (
        <div className="text-center py-20 bg-white rounded-xl border border-neutral-200 border-dashed">
          <Package className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-neutral-900 mb-2">No orders found</h3>
          <p className="text-neutral-500 mb-6">Looks like you haven't rented anything yet.</p>
          <Link to="/products" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
            Start Browsing <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  )
}

export default Orders
