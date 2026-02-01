
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Clock, CheckCircle, Package, TrendingUp, AlertCircle } from 'lucide-react'
import api from '../services/api'
import { normalizeProductList } from '../utils/dataMapper'

const Dashboard = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/product/')
        const normalizedProducts = normalizeProductList(response.data)
        setProducts(normalizedProducts)
      } catch (error) {
        console.error('Failed to fetch products:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const orders = []
  const activeRentals = orders.filter(o => o.status === 'Active').length
  const completedRentals = orders.filter(o => o.status === 'Completed').length
  const totalSpent = orders.reduce((acc, curr) => acc + curr.total, 0)
  const recentOrders = orders.slice(0, 3)
  const recommendedProducts = products.slice(0, 4)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">Dashboard</h1>
          <p className="text-neutral-500 mt-1">Welcome back, Johnathan</p>
        </div>
        <Link
          to="/products"
          className="inline-flex items-center justify-center px-4 py-2 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors"
        >
          Browse Catalog <ArrowRight className="ml-2 w-4 h-4" />
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-neutral-500 mb-1">Active Rentals</p>
            <p className="text-3xl font-bold text-neutral-900">{activeRentals}</p>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-neutral-500 mb-1">Total Orders</p>
            <p className="text-3xl font-bold text-neutral-900">{orders.length}</p>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
            <Package className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-neutral-500 mb-1">Total Spent</p>
            <p className="text-3xl font-bold text-neutral-900">${totalSpent.toFixed(2)}</p>
          </div>
          <div className="p-3 bg-green-50 text-green-600 rounded-lg">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50">
              <h2 className="text-lg font-bold text-neutral-900">Recent Rentals</h2>
              <Link to="/orders" className="text-sm font-medium text-blue-600 hover:text-blue-700">View All</Link>
            </div>

            <div className="divide-y divide-neutral-100">
              {recentOrders.map((order) => (
                <div key={order.id} className="p-6 flex items-center justify-between hover:bg-neutral-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-neutral-100 rounded-lg border border-neutral-200 overflow-hidden flex-shrink-0">
                      <img src={order.items[0].image} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="font-bold text-neutral-900 text-sm">{order.items[0].name}</h3>
                      <p className="text-xs text-neutral-500 mt-0.5">Order {order.id} • {order.items.length} Item{order.items.length > 1 ? 's' : ''}</p>
                    </div>
                  </div>

                  <div className="text-right flex flex-col items-end gap-1">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide ${order.status === 'Active' ? 'bg-blue-100 text-blue-700' :
                      order.status === 'Completed' ? 'bg-green-100 text-green-700' :
                        'bg-neutral-100 text-neutral-600'
                      }`}>
                      {order.status}
                    </span>
                    <span className="text-xs text-neutral-400 font-medium">Due {order.endDate}</span>
                  </div>
                </div>
              ))}

              {recentOrders.length === 0 && (
                <div className="p-8 text-center text-neutral-500">
                  No rentals yet. Start browsing to place your first order!
                </div>
              )}
            </div>
          </div>

          {/* Notifications / Alerts */}
          <div className="bg-amber-50 rounded-xl border border-amber-100 p-6 flex items-start gap-4">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-amber-800">Rental Ending Soon</h3>
              <p className="text-sm text-amber-700 mt-1">
                Your rental for <span className="font-semibold">Professional DSLR Kit</span> ends on Oct 20, 2023.
                Please ensure it is ready for pickup by 10 AM.
              </p>
              <div className="mt-3 flex gap-3">
                <Link to="/orders" className="text-xs font-bold text-amber-800 bg-white border border-amber-200 px-3 py-1.5 rounded-md hover:bg-amber-100">
                  View Details
                </Link>
                <button className="text-xs font-bold text-amber-800 hover:underline">
                  Extend Rental
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended For You */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden sticky top-6">
            <div className="px-6 py-4 border-b border-neutral-100 bg-neutral-50/50">
              <h2 className="text-lg font-bold text-neutral-900">Recommended</h2>
            </div>

            <div className="p-6 space-y-6">
              {recommendedProducts.map((product) => (
                <Link key={product.id} to={`/products/${product.id}`} className="group flex gap-4 items-start">
                  <div className="w-16 h-16 bg-neutral-100 rounded-lg overflow-hidden border border-neutral-200 flex-shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-neutral-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-semibold text-neutral-900">${product.price}/day</span>
                      <span className="text-xs text-neutral-400 capitalize">{product.category}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="p-4 border-t border-neutral-100 bg-neutral-50">
              <Link to="/products" className="block w-full text-center text-sm font-bold text-blue-600 hover:text-blue-700">
                View All Categories
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
