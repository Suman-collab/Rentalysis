import React, { useState } from 'react'
import { Save, Building, CreditCard, Shield, Bell, Check, Upload, Trash2, Eye, EyeOff } from 'lucide-react'

const Settings = () => {
  const [activeTab, setActiveTab] = useState('Business Info')
  const [isLoading, setIsLoading] = useState(false)
  const [logo, setLogo] = useState(null)

  // Handlers
  const handleSave = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      alert('Settings saved successfully!')
    }, 1000)
  }

  const handleDiscard = () => {
    if (window.confirm('Are you sure you want to discard unsaved changes?')) {
      window.location.reload()
    }
  }

  const handleLogoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('File size exceeds 2MB')
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogo(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveLogo = () => {
    setLogo(null)
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'Business Info':
        return <BusinessInfoSection logo={logo} handleLogoChange={handleLogoChange} handleRemoveLogo={handleRemoveLogo} />
      case 'Bank Details':
        return <BankDetailsSection />
      case 'Security':
        return <SecuritySection />
      case 'Preferences':
        return <PreferencesSection />
      default:
        return <BusinessInfoSection logo={logo} handleLogoChange={handleLogoChange} handleRemoveLogo={handleRemoveLogo} />
    }
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
          <p className="text-gray-500 mt-1">Manage your professional vendor profile and payout information.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleDiscard}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Discard Changes
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm disabled:opacity-70"
          >
            <Save size={16} />
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="md:col-span-1 space-y-1">
          {[
            { label: 'Business Info', icon: Building },
            { label: 'Bank Details', icon: CreditCard, verified: true },
            { label: 'Security', icon: Shield },
            { label: 'Preferences', icon: Bell },
          ].map((item, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(item.label)}
              className={`w-full flex items-center justify-between p-3 rounded-lg text-sm font-medium transition-all ${activeTab === item.label
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={18} />
                {item.label}
              </div>
              {item.verified && (
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide ${activeTab === item.label ? 'bg-blue-500 text-white' : 'bg-green-100 text-green-700'}`}>
                  Verified
                </span>
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

        {/* Main Form Area */}
        <div className="md:col-span-3 space-y-8">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}

const BusinessInfoSection = ({ logo, handleLogoChange, handleRemoveLogo }) => (
  <>
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
          <textarea rows={3} defaultValue="1248 Innovation Drive, Suite 400&#13;&#10;Austin, TX 78701&#13;&#10;United States" className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-sans" />
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
        <div className="w-20 h-20 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden relative group">
          {logo ? (
            <img src={logo} alt="Logo Preview" className="w-full h-full object-cover" />
          ) : (
            <div className="text-gray-400 text-xs text-center px-1">NO LOGO</div>
          )}
          <label className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
            <Upload className="text-white mb-1" size={16} />
            <span className="text-[10px] text-white font-medium">Upload</span>
            <input type="file" accept="image/*" className="hidden" onChange={handleLogoChange} />
          </label>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-900">Vendor Logo</h3>
          <p className="text-xs text-gray-500 mt-1 mb-3">Square PNG or JPG. Max size 2MB.</p>
          {logo && (
            <button onClick={handleRemoveLogo} className="flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:text-red-700">
              <Trash2 size={12} />
              Remove logo
            </button>
          )}
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
  </>
)

const BankDetailsSection = () => (
  <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
    <div className="flex items-center gap-2 mb-6">
      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
        <CreditCard size={14} strokeWidth={3} />
      </div>
      <h2 className="text-lg font-bold text-gray-900">Bank Account Details</h2>
    </div>
    <p className="text-sm text-gray-500 mb-6 -mt-4 ml-8">Payouts are sent to this account every Wednesday.</p>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Account Holder Name</label>
        <input type="text" defaultValue="North Star Rentals LLC" className="w-full h-10 px-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm" />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Bank Name</label>
        <input type="text" defaultValue="Chase Bank" className="w-full h-10 px-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm" />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Routing Number</label>
        <input type="password" defaultValue="*********" className="w-full h-10 px-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm" />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Account Number</label>
        <input type="password" defaultValue="************4589" className="w-full h-10 px-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm" />
      </div>
    </div>
  </section>
)

const SecuritySection = () => (
  <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
    <div className="flex items-center gap-2 mb-6">
      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
        <Shield size={14} strokeWidth={3} />
      </div>
      <h2 className="text-lg font-bold text-gray-900">Login & Security</h2>
    </div>

    <div className="space-y-6">
      <div className="flex items-center justify-between py-4 border-b border-gray-100">
        <div>
          <h3 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h3>
          <p className="text-xs text-gray-500 mt-1">Add an extra layer of security to your account.</p>
        </div>
        <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
          <input type="checkbox" name="toggle" id="toggle" className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer" />
          <label htmlFor="toggle" className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"></label>
        </div>
        {/* Simple Toggle Fallback since no custom CSS for toggle is guaranteed */}
        <button className="text-sm text-blue-600 font-medium hover:underline">Enable</button>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-4">Change Password</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-700">Current Password</label>
            <input type="password" className="w-full h-9 px-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-700">New Password</label>
            <input type="password" className="w-full h-9 px-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm" />
          </div>
        </div>
      </div>
    </div>
  </section>
)

const PreferencesSection = () => (
  <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
    <div className="flex items-center gap-2 mb-6">
      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
        <Bell size={14} strokeWidth={3} />
      </div>
      <h2 className="text-lg font-bold text-gray-900">Notifications & Preferences</h2>
    </div>

    <div className="space-y-4">
      {['Order Confirmations', 'Delivery Updates', 'New Review Alerts', 'Promotional Emails'].map((pref, i) => (
        <div key={i} className="flex items-center justify-between">
          <span className="text-sm text-gray-700">{pref}</span>
          <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
        </div>
      ))}
    </div>
  </section>
)

export default Settings
