import React from 'react'
import { Edit2, Mail, Phone, Building2, MapPin } from 'lucide-react'

const Profile = () => {
  return (
    <div className="max-w-5xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
        <p className="text-gray-500 mt-1">Manage your account settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 text-center h-full">
            <div className="w-32 h-32 mx-auto bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-4">
              <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900">Admin User</h2>
            <p className="text-sm text-gray-500 mb-6">Administrator</p>

            <button className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Change Photo
            </button>

            <div className="mt-8 text-left space-y-4 border-t border-gray-100 pt-6">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Member Since</p>
                <p className="text-gray-900 font-medium">January 2025</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Last Login</p>
                <p className="text-gray-900 font-medium">January 31, 2026</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Account Status</p>
                <span className="inline-block mt-1 bg-green-50 text-green-600 px-2.5 py-0.5 rounded text-xs font-semibold">Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Details Forms */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-900">Personal Information</h3>
              <button className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 bg-gray-50 px-3 py-1.5 rounded-lg transition-colors">
                <Edit2 className="w-4 h-4" /> Edit
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">First Name</label>
                <div className="bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 font-medium">Admin</div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Last Name</label>
                <div className="bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 font-medium">User</div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
                <div className="bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gray-400" />
                  admin@rentalmanage
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Phone Number</label>
                <div className="bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gray-400" />
                  +1 (555) 000-0000
                </div>
              </div>
            </div>
          </div>

          {/* Business Information */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-900">Business Information</h3>
              <button className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 bg-gray-50 px-3 py-1.5 rounded-lg transition-colors">
                <Edit2 className="w-4 h-4" /> Edit
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Company Name</label>
                <div className="bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 flex items-center gap-3">
                  <Building2 className="w-4 h-4 text-gray-400" />
                  Rental Management Co.
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Business Address</label>
                <div className="bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 flex items-start gap-3 h-24">
                  <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                  <span className="leading-relaxed">
                    123 Business Street, Suite 100, San Francisco, CA
                    <br />
                    94105
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
