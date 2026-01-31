// FILE: src/pages/Dashboard.jsx
import React from 'react'
import { ArrowRight, Clock, CheckCircle, Package } from 'lucide-react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <Link to="/products" className="text-sm font-medium text-blue-600 hover:text-blue-500">
          Browse Catalog &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border border-neutral-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-500">Active Rentals</p>
              <p className="text-2xl font-bold mt-1">2</p>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
              <Clock className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-neutral-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-500">Pending Orders</p>
              <p className="text-2xl font-bold mt-1">1</p>
            </div>
            <div className="p-3 bg-amber-50 text-amber-600 rounded-full">
              <Package className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-neutral-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-500">Completed</p>
              <p className="text-2xl font-bold mt-1">12</p>
            </div>
            <div className="p-3 bg-green-50 text-green-600 rounded-full">
              <CheckCircle className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-neutral-200 shadow-sm">
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Active Rentals</h2>
          <Link to="/orders" className="text-sm text-neutral-500 hover:text-neutral-900">View all</Link>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-neutral-200 rounded-md" />
                  <div>
                    <p className="font-medium text-neutral-900">Industrial Excavator X200</p>
                    <p className="text-sm text-neutral-500">Due: Oct 24, 2023</p>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Active
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
