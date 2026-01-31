// FILE: src/pages/Profile.jsx
import React, { useState } from 'react'
import { User, Package, MapPin, CreditCard, LogOut, Edit2, Download, ChevronRight, Filter, Search, RotateCcw } from 'lucide-react'
import { orders } from '../mock/data'
import { Link } from 'react-router-dom'

const Profile = () => {
  const [activeTab, setActiveTab] = useState('orders')

  const tabs = [
    { id: 'orders', label: 'My Orders', icon: Package },
    { id: 'transactions', label: 'Invoices & Payments', icon: CreditCard },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
  ]

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">

      {/* Left Column: Persistent Profile Summary & Tabs */}
      <div className="w-full lg:w-80 flex-shrink-0 space-y-6 sticky top-24">
        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
          <div className="h-24 bg-gradient-to-r from-blue-600 to-indigo-600 relative">
            <button className="absolute top-4 right-4 p-1.5 bg-white/20 hover:bg-white/30 rounded-full text-white backdrop-blur-sm transition-colors">
              <Edit2 className="w-4 h-4" />
            </button>
          </div>
          <div className="px-6 pb-6 text-center -mt-12">
            <div className="w-24 h-24 mx-auto bg-white rounded-full p-1 shadow-md mb-3">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <h2 className="text-xl font-bold text-neutral-900">Johnathan Smith</h2>
            <p className="text-sm text-neutral-500 mb-2">j.smith@rentals.com</p>
            <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded-full uppercase tracking-wide">
              Gold Member
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-6 py-4 text-sm font-medium transition-colors border-l-4 ${activeTab === tab.id
                  ? 'bg-blue-50 text-blue-600 border-blue-600'
                  : 'text-neutral-600 hover:bg-neutral-50 border-transparent'
                }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
          <div className="border-t border-neutral-100 mt-2">
            <button className="w-full flex items-center gap-3 px-6 py-4 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors border-l-4 border-transparent">
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Right Column: Dynamic Content */}
      <div className="flex-1 w-full min-w-0">

        {/* SECTION: MY ORDERS */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-neutral-900">My Orders</h2>
              <div className="flex gap-2">
                <div className="relative">
                  <input type="text" placeholder="Search orders..." className="pl-9 pr-4 py-2 border border-neutral-200 rounded-lg text-sm w-64 focus:ring-2 focus:ring-blue-500 outline-none" />
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-neutral-400" />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border border-neutral-200 rounded-lg text-sm font-medium hover:bg-neutral-50">
                  <Filter className="w-4 h-4" /> Filters
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {orders.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-xl border border-neutral-200">
                  <Package className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
                  <p className="text-neutral-500">No orders found.</p>
                </div>
              ) : (
                orders.map((order) => (
                  <div key={order.id} className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-4 bg-neutral-50 border-b border-neutral-100 flex flex-wrap gap-4 justify-between items-center text-sm">
                      <div className="flex gap-6 text-neutral-500">
                        <div>
                          <span className="block text-xs uppercase font-bold text-neutral-400">Order Placed</span>
                          <span className="text-neutral-900 font-medium">{order.date}</span>
                        </div>
                        <div>
                          <span className="block text-xs uppercase font-bold text-neutral-400">Total</span>
                          <span className="text-neutral-900 font-medium">${order.total.toFixed(2)}</span>
                        </div>
                        <div>
                          <span className="block text-xs uppercase font-bold text-neutral-400">Order #</span>
                          <span className="text-neutral-900 font-medium">{order.id}</span>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Link
                          to={`/orders/${order.id}`}
                          className="text-blue-600 font-medium hover:underline text-sm"
                        >
                          View Details
                        </Link>
                        <span className="text-neutral-300">|</span>
                        <Link
                          to={`/invoices/INV-${order.id.split('-')[1]}`}
                          className="text-blue-600 font-medium hover:underline text-sm"
                        >
                          Invoice
                        </Link>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="w-24 h-24 bg-neutral-100 rounded-lg flex-shrink-0 border border-neutral-200 overflow-hidden">
                          <img src={order.items[0].image} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-neutral-900 mb-1">{order.items[0].name}</h3>
                          <p className="text-sm text-neutral-500 mb-4">Vendor: Rentalysis Official • Duration: {order.items[0].duration} Days</p>
                          <div className="flex items-center gap-3">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${order.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-neutral-100 text-neutral-600'
                              }`}>
                              <span className={`w-2 h-2 rounded-full ${order.status === 'Active' ? 'bg-green-600' : 'bg-neutral-500'}`}></span>
                              {order.status}
                            </span>
                            {order.status === 'Active' && (
                              <span className="text-xs text-orange-600 font-medium bg-orange-50 px-2 py-1 rounded">
                                Return by {order.endDate}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex md:flex-col gap-3 justify-center">
                          <button className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors whitespace-nowrap">
                            Track Return
                          </button>
                          <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors whitespace-nowrap shadow-sm">
                            Buy Again
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* SECTION: TRANSACTIONS & INVOICES */}
        {activeTab === 'transactions' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-neutral-900">Invoices & Payments</h2>
            <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
                  <tr>
                    <th className="px-6 py-4 font-medium">Date</th>
                    <th className="px-6 py-4 font-medium">Description</th>
                    <th className="px-6 py-4 font-medium">Order ID</th>
                    <th className="px-6 py-4 font-medium text-right">Amount</th>
                    <th className="px-6 py-4 font-medium text-center">Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-neutral-50">
                      <td className="px-6 py-4">{order.date}</td>
                      <td className="px-6 py-4 font-medium text-neutral-900">Rental Payment</td>
                      <td className="px-6 py-4 font-mono text-neutral-500">{order.id}</td>
                      <td className="px-6 py-4 text-right font-bold text-neutral-900">${order.total.toFixed(2)}</td>
                      <td className="px-6 py-4 text-center">
                        <button className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  <tr className="hover:bg-neutral-50 bg-green-50/50">
                    <td className="px-6 py-5 text-neutral-500">Oct 10, 2023</td>
                    <td className="px-6 py-5 font-medium text-neutral-900 flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      Security Deposit Refund
                    </td>
                    <td className="px-6 py-5 font-mono text-neutral-500">REF-99281</td>
                    <td className="px-6 py-5 text-right font-bold text-green-700">+$100.00</td>
                    <td className="px-6 py-5 text-center">
                      <button className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SECTION: ADDRESSES */}
        {activeTab === 'addresses' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-neutral-900">Saved Addresses</h2>
              <button className="px-4 py-2 bg-neutral-900 text-white text-sm font-bold rounded-lg hover:bg-neutral-800">
                + Add New Address
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl border border-blue-200 shadow-sm relative ring-1 ring-blue-100">
                <div className="absolute top-4 right-4 bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide">Default</div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-neutral-100 rounded-lg">
                    <MapPin className="w-5 h-5 text-neutral-600" />
                  </div>
                  <h3 className="font-bold text-neutral-900">Home Office</h3>
                </div>
                <p className="text-sm text-neutral-600 mb-4 leading-relaxed">
                  Johnathan Smith<br />
                  4521 Silicon Valley Rd, Suite 100<br />
                  San Jose, CA 95134<br />
                  United States
                </p>
                <div className="flex gap-3 text-sm font-medium">
                  <button className="text-blue-600 hover:underline">Edit</button>
                  <span className="text-neutral-300">|</span>
                  <button className="text-red-600 hover:underline">Remove</button>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm border-dashed flex flex-col items-center justify-center text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all group min-h-[200px]">
                <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-white group-hover:scale-110 transition-transform">
                  <span className="text-2xl text-neutral-400 group-hover:text-blue-600 font-light">+</span>
                </div>
                <p className="font-bold text-neutral-900 group-hover:text-blue-700">Add New Address</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default Profile
