import React from 'react'
import { Save, Building, CreditCard, Shield, Bell, Check } from 'lucide-react'

const Settings = () => {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
          <p className="text-gray-500 mt-1">Manage your professional vendor profile and payout information.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">Discard Changes</button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm">
            <Save size={16} />
            Save Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="md:col-span-1 space-y-1">
          {[
            { label: 'Business Info', icon: Building, active: true },
            { label: 'Bank Details', icon: CreditCard, verified: true },
            { label: 'Security', icon: Shield },
            { label: 'Preferences', icon: Bell },
          ].map((item, i) => (
            <button
              key={i}
              className={`w-full flex items-center justify-between p-3 rounded-lg text-sm font-medium transition-all ${item.active
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={18} />
                {item.label}
              </div>
              {item.verified && (
                <span className="text-[10px] font-bold bg-green-100 text-green-700 px-1.5 py-0.5 rounded uppercase tracking-wide">Verified</span>
              )}
            </button>
          ))}

          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
              <p className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-2">Pro Vendor Status</p>
              <p className="text-xs text-blue-600 mb-3 leading-relaxed">Your account is in good standing. You have 24/7 priority support enabled.</p>
              <button className="text-xs font-semibold text-blue-700 hover:underline">View Benefits &rarr;</button>
            </div>
          </div>
        </div>

        {/* Main Form */}
        <div className="md:col-span-3 space-y-8">
          {/* Legal Entity Details */}
          <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <Check size={14} strokeWidth={3} />
              </div>
              <h2 className="text-lg font-bold text-gray-900">Legal Entity Details</h2>
            </div>
            <p className="text-sm text-gray-500 mb-6 -mt-4 ml-8">Verify your legal identity to enable payouts and listing management.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Legal Company Name</label>
                <input type="text" defaultValue="North Star Equipment Rentals LLC" className="w-full h-10 px-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Tax ID / EIN</label>
                <div className="relative">
                  <input type="text" defaultValue="XX-XXX4920" className="w-full h-10 px-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-500 text-sm" readOnly />
                  <Shield className="absolute right-3 top-2.5 text-gray-400" size={16} />
                </div>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-medium text-gray-700">Registered Business Address</label>
                <textarea rows={3} defaultValue="1248 Innovation Drive, Suite 400\nAustin, TX 78701\nUnited States" className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-sans" />
              </div>
            </div>
          </section>

          {/* Public Profile */}
          <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <Building size={14} strokeWidth={3} />
              </div>
              <h2 className="text-lg font-bold text-gray-900">Public Profile</h2>
            </div>
            <p className="text-sm text-gray-500 mb-6 -mt-4 ml-8">This information will be visible to customers on your storefront.</p>

            <div className="flex items-start gap-6 mb-6">
              <div className="w-20 h-20 rounded-lg bg-gray-900 flex items-center justify-center text-white shrink-0">
                <span className="text-xs">LOGO</span>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">Vendor Logo</h3>
                <p className="text-xs text-gray-500 mt-1 mb-3">Square PNG or JPG. Max size 2MB.</p>
                <button className="text-xs font-semibold text-blue-600 hover:text-blue-700">Remove logo</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Display Name</label>
                <input type="text" defaultValue="North Star Rentals" className="w-full h-10 px-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Support Email</label>
                <input type="email" defaultValue="support@northstar-rentals.com" className="w-full h-10 px-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm" />
              </div>
            </div>
          </section>

          {/* Business Hours */}
          <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <Bell size={14} strokeWidth={3} />
              </div>
              <h2 className="text-lg font-bold text-gray-900">Business Hours</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                  <span className="text-sm font-medium text-gray-900">Monday - Friday</span>
                </div>
                <div className="flex items-center gap-2">
                  <select className="h-8 text-xs border border-gray-200 rounded px-2 bg-white"><option>08:00 AM</option></select>
                  <span className="text-xs text-gray-500">to</span>
                  <select className="h-8 text-xs border border-gray-200 rounded px-2 bg-white"><option>06:00 PM</option></select>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100 opacity-60">
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                  <span className="text-sm font-medium text-gray-900">Sat - Sun</span>
                </div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Closed</span>
              </div>
            </div>
          </section>

          {/* Danger Zone */}
          <div className="bg-red-50 p-6 rounded-xl border border-red-100 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-red-700">Deactivate Account</h3>
              <p className="text-xs text-red-600 mt-1">Temporarily hide your listings and stop taking new orders.</p>
            </div>
            <button className="px-4 py-2 bg-white border border-red-200 text-red-600 text-sm font-medium rounded-lg hover:bg-red-50">Deactivate</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
