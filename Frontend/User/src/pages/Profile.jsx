// FILE: src/pages/Profile.jsx
import React from 'react'
import { User, Shield, Key, Bell, CreditCard, LogOut, Upload, Plus } from 'lucide-react'

const Profile = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-neutral-900 mb-8">Profile & Settings</h1>

      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden mb-8">
        <div className="p-8 flex flex-col items-center border-b border-neutral-100 bg-neutral-50/50">
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full bg-neutral-200 overflow-hidden border-4 border-white shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute bottom-1 right-1 bg-blue-600 text-white rounded-full p-1.5 border-2 border-white hover:bg-blue-700 transition-colors">
              <Upload className="w-3 h-3" />
            </button>
          </div>
          <h2 className="text-xl font-bold text-neutral-900">Johnathan Smith</h2>
          <p className="text-sm text-neutral-500">j.smith@rentals.com</p>
        </div>

        <div className="p-8 space-y-8">
          {/* Business Info */}
          <div>
            <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wide mb-4">Business Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Company Name</label>
                <input
                  type="text"
                  defaultValue="Smith Electronics Ltd."
                  className="w-full h-10 px-3 rounded-lg border border-neutral-200 focus:outline-none focus:border-blue-500 text-sm font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">GSTIN / Tax ID</label>
                <input
                  type="text"
                  defaultValue="22AAAAA0000A1Z5"
                  className="w-full h-10 px-3 rounded-lg border border-neutral-200 focus:outline-none focus:border-blue-500 text-sm font-medium font-mono"
                />
              </div>
            </div>
          </div>

          {/* Security */}
          <div>
            <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wide mb-4">Security</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center justify-between p-4 rounded-lg border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-neutral-100 rounded-lg group-hover:bg-white text-neutral-500">
                    <Key className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-neutral-900">Change Password</span>
                </div>
                <span className="text-neutral-400">›</span>
              </button>

              <div className="flex items-center justify-between p-4 rounded-lg border border-neutral-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-medium text-neutral-900">Biometric Authentication</span>
                    <span className="block text-xs text-neutral-500">Use FaceID to login</span>
                  </div>
                </div>
                <div className="relative inline-block w-11 h-6 transition duration-200 ease-in-out rounded-full bg-blue-600 cursor-pointer">
                  <span className="translate-x-6 inline-block w-5 h-5 transform bg-white rounded-full transition duration-200 ease-in-out mt-0.5 ml-0.5 shadow"></span>
                </div>
              </div>
            </div>
          </div>

          {/* Saved Addresses */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wide">Saved Addresses</h3>
              <button className="text-xs font-bold text-blue-600 flex items-center gap-1 hover:underline">
                <Plus className="w-3 h-3" /> Add New
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-4 border border-blue-200 bg-blue-50/50 rounded-lg flex items-start gap-3 relative">
                <div className="mt-1">
                  <User className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-neutral-900">Home Office</h4>
                  <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                    4521 Silicon Valley Rd, Suite 100, San Jose, CA 95134
                  </p>
                </div>
                <span className="absolute top-4 right-4 h-2 w-2 rounded-full bg-blue-600"></span>
              </div>

              <div className="p-4 border border-neutral-200 rounded-lg flex items-start gap-3 hover:border-neutral-300 hover:bg-neutral-50 transition-colors">
                <div className="mt-1">
                  <CreditCard className="w-4 h-4 text-neutral-400" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-neutral-900">Warehouse A</h4>
                  <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                    89 Industrial Blvd, Dock 4, Oakland, CA 94601
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 mb-12">
        <button className="w-full h-12 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
          Save Changes
        </button>
        <button className="w-full h-12 bg-white border border-neutral-200 text-red-600 font-bold rounded-lg hover:bg-neutral-50 transition-colors flex items-center justify-center gap-2">
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>
    </div>
  )
}

export default Profile
