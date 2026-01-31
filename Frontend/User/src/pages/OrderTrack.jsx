
import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { CheckCircle2, Circle, Clock, MapPin, Phone, MessageSquare, Calendar, ChevronRight, FileText, ArrowLeft } from 'lucide-react'
import { orders } from '../mock/data'

const OrderTrack = () => {
  const { id } = useParams()

  const order = orders.find(o => o.id === id) || orders[0]

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link to="/orders" className="inline-flex items-center text-sm text-neutral-500 hover:text-neutral-900">
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to My Orders
      </Link>

      <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm">
        {/* Header */}
        <div className="p-6 border-b border-neutral-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-xl font-bold text-neutral-900">Order Details</h1>
              <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide">
                {order.status}
              </span>
            </div>
            <p className="text-sm text-neutral-500">Order ID: <span className="font-mono text-neutral-700">{order.id}</span></p>
          </div>
          <Link to={`/invoices/INV-${order.id.split('-')[1]}`} className="flex items-center gap-1.5 text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors">
            <FileText className="w-4 h-4" /> Invoice
          </Link>
        </div>

        {/* Product Snippet */}
        <div className="p-6 bg-neutral-50 border-b border-neutral-100">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex gap-4 items-center">
              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg bg-white border border-neutral-200" />
              <div>
                <h3 className="font-bold text-neutral-900">{item.name}</h3>
                <div className="flex items-center gap-2 text-sm text-neutral-500">
                  <span>Qty: {item.quantity}</span>
                  <span>•</span>
                  <span>{item.duration} Days Rental</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="p-8">
          <h3 className="font-bold text-neutral-900 mb-6 text-sm uppercase tracking-wide">Tracking Status</h3>
          <div className="relative space-y-8 pl-2">

            {/* Connecting Line */}
            <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-neutral-200" />

            {order.timeline.map((step, index) => (
              <div key={index} className="relative pl-8">
                {/* Dot */}
                <div className={`absolute left-0 top-1 w-6 h-6 rounded-full border-2 flex items-center justify-center bg-white z-10 ${step.completed ? 'border-blue-600' : 'border-neutral-300'
                  }`}>
                  {step.completed ? (
                    <div className="w-2.5 h-2.5 bg-blue-600 rounded-full" />
                  ) : (
                    <div className="w-2.5 h-2.5 bg-neutral-200 rounded-full" />
                  )}
                </div>

                <div className={`${step.completed ? 'opacity-100' : 'opacity-50'}`}>
                  <h4 className={`font-bold text-sm ${step.active ? 'text-blue-600' : 'text-neutral-900'}`}>
                    {step.status}
                  </h4>
                  <p className="text-xs text-neutral-500 font-medium mt-1">{step.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Details Grid */}
        <div className="p-6 bg-neutral-50 border-t border-neutral-100 grid grid-cols-2 gap-y-6 gap-x-4">
          <div>
            <span className="block text-xs font-bold text-neutral-500 uppercase mb-1">Rental Period</span>
            <span className="block text-sm font-semibold text-neutral-900">{order.items[0].duration} Days</span>
          </div>
          <div>
            <span className="block text-xs font-bold text-neutral-500 uppercase mb-1">Pickup Date</span>
            <span className="block text-sm font-semibold text-neutral-900">{order.date}</span>
          </div>
          <div>
            <span className="block text-xs font-bold text-neutral-500 uppercase mb-1">Return Date</span>
            <span className="block text-sm font-semibold text-neutral-900">{order.endDate}</span>
          </div>
          <div>
            <span className="block text-xs font-bold text-neutral-500 uppercase mb-1">Security Deposit</span>
            <span className="block text-sm font-semibold text-neutral-900">₹100.00</span>
          </div>
          <div className="col-span-2 pt-4 border-t border-neutral-200 flex justify-between items-center">
            <span className="font-bold text-neutral-900">Total Amount</span>
            <span className="font-bold text-xl text-blue-600">₹{order.total.toFixed(2)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 flex flex-col gap-3">
          <button className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
            <MessageSquare className="w-4 h-4" /> Contact Support
          </button>
          <button className="w-full py-3 bg-white border border-neutral-200 text-neutral-700 font-bold rounded-xl hover:bg-neutral-50 transition-colors flex items-center justify-center gap-2">
            <Calendar className="w-4 h-4" /> Extend Rental
          </button>
        </div>
      </div>
    </div>
  )
}

export default OrderTrack
