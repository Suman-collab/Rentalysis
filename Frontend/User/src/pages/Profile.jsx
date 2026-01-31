// FILE: src/pages/Profile.jsx
import React, { useState, useEffect } from 'react'
import { User, Package, MapPin, CreditCard, LogOut, Edit2, Download, ChevronRight, Filter, Search, RotateCcw, Calendar, Clock, FileText, Trash2 } from 'lucide-react'
import { orders } from '../mock/data'
import { Link, useNavigate } from 'react-router-dom'

const Profile = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [activeOrderTab, setActiveOrderTab] = useState('Active')
  const [selectedOrder, setSelectedOrder] = useState(null)
  // State for list of addresses
  const [savedAddresses, setSavedAddresses] = useState([
    {
      id: 1,
      name: 'Home Office',
      fullName: import.meta.env.VITE_USER_NAME,
      street: '4521 Silicon Valley Rd, Suite 100',
      city: 'San Jose',
      state: 'CA',
      zip: '95134',
      country: 'United States',
    }
  ])

  // State for saved cards
  const [savedCards, setSavedCards] = useState(() => {
    const saved = localStorage.getItem('user_cards')
    return saved ? JSON.parse(saved) : [
      { id: 1, type: 'Visa', last4: '4242', expiry: '12/28', holder: 'John Doe' },
      { id: 2, type: 'Mastercard', last4: '8899', expiry: '09/25', holder: 'John Doe' }
    ]
  })

  useEffect(() => {
    localStorage.setItem('user_cards', JSON.stringify(savedCards))
  }, [savedCards])
  const [isAddingCard, setIsAddingCard] = useState(false)
  const [cardForm, setCardForm] = useState({ number: '', expiry: '', cvc: '', holder: '' })

  const handleAddCard = () => {
    // Mock validation and add
    const last4 = cardForm.number.slice(-4) || '0000'
    const type = cardForm.number.startsWith('4') ? 'Visa' : 'Mastercard'
    setSavedCards([...savedCards, { id: Date.now(), type, last4, expiry: cardForm.expiry, holder: cardForm.holder }])
    setIsAddingCard(false)
    setCardForm({ number: '', expiry: '', cvc: '', holder: '' })
  }

  const handleDeleteCard = (id) => {
    if (window.confirm('Are you sure you want to remove this card?')) {
      setSavedCards(prev => prev.filter(c => c.id !== id))
    }
  }

  const [isAddingAddress, setIsAddingAddress] = useState(false)
  const [editingId, setEditingId] = useState(null) // Track which address is being edited

  // Form state for adding/editing
  const [addressForm, setAddressForm] = useState({
    id: null,
    name: '',
    fullName: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: ''
  })

  // Initialize form when adding new address
  const startAddAddress = () => {
    setAddressForm({
      id: null,
      name: '',
      fullName: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      country: ''
    })
    setIsAddingAddress(true)
    setEditingId(null)
  }

  // Initialize form when editing
  const startEditAddress = (address) => {
    setAddressForm(address)
    setEditingId(address.id)
    setIsAddingAddress(false)
  }

  const handleAddressChange = (e) => {
    setAddressForm({ ...addressForm, [e.target.name]: e.target.value })
  }

  const handleSaveAddress = () => {
    if (editingId) {
      // Update existing
      setSavedAddresses(prev => prev.map(addr => addr.id === editingId ? { ...addressForm, id: editingId } : addr))
      setEditingId(null)
    } else {
      // Add new
      const newId = Date.now()
      setSavedAddresses(prev => [...prev, { ...addressForm, id: newId, isDefault: prev.length === 0 }])
      setIsAddingAddress(false)
    }
    handleCancel() // Reset form after save
  }

  const handleDeleteAddress = (id) => {
    if (confirm('Are you sure you want to delete this address?')) {
      setSavedAddresses(prev => prev.filter(addr => addr.id !== id))
    }
  }

  const handleCancel = () => {
    setIsAddingAddress(false)
    setEditingId(null)
    setAddressForm({
      id: null,
      name: '',
      fullName: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      country: ''
    })
  }

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: User },
    { id: 'orders', label: 'My Orders', icon: Package },
    { id: 'payments', label: 'Cards & Payments', icon: CreditCard },
    { id: 'transactions', label: 'Transactions', icon: FileText },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
  ]

  const handleLogout = () => {
    navigate('/login')
  }

  const defaultAddress = savedAddresses.find(addr => addr.isDefault) || savedAddresses[0];

  const handlePrintInvoice = (order) => {
    const invoiceWindow = window.open('', '_blank');
    const userName = import.meta.env.VITE_USER_NAME || 'Valued Customer';
    const userEmail = import.meta.env.VITE_USER_EMAIL || 'customer@example.com';
    const item = order.items[0];
    const duration = item.duration || 1;
    const rate = (order.total / duration).toFixed(2);

    invoiceWindow.document.write(`
      <html>
        <head>
          <title>Invoice #${order.id}</title>
          <style>
            @page { size: A4; margin: 0; }
            body { font-family: 'Inter', system-ui, sans-serif; color: #1f2937; line-height: 1.5; padding: 40px; max-width: 800px; margin: 0 auto; }
            .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; padding-bottom: 20px; border-bottom: 2px solid #f3f4f6; }
            .logo { font-size: 24px; font-weight: 800; letter-spacing: -0.5px; color: #111; }
            .logo span { color: #10b981; }
            .invoice-meta { text-align: right; }
            .invoice-meta h1 { font-size: 32px; font-weight: 800; color: #111; margin: 0 0 10px 0; letter-spacing: -1px; }
            .meta-item { font-size: 14px; margin-bottom: 4px; color: #6b7280; }
            .meta-item strong { color: #374151; font-weight: 600; }
            
            .addresses { display: flex; justify-content: space-between; margin-bottom: 50px; }
            .addr-box h3 { font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #9ca3af; margin-bottom: 10px; font-weight: 700; }
            .addr-box p { font-size: 14px; margin: 0; color: #374151; font-weight: 500; }
            .addr-box p.sub { font-size: 14px; color: #6b7280; font-weight: 400; margin-top: 4px; }

            table { width: 100%; border-collapse: collapse; margin-bottom: 40px; }
            th { text-align: left; padding: 15px; background: #f9fafb; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; color: #6b7280; font-weight: 700; border-radius: 8px 8px 0 0; }
            td { padding: 20px 15px; border-bottom: 1px solid #f3f4f6; font-size: 14px; color: #1f2937; }
            tr:last-child td { border-bottom: none; }
            
            .total-container { display: flex; justify-content: flex-end; }
            .total-box { width: 300px; background: #f9fafb; padding: 20px; border-radius: 12px; }
            .total-row { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 14px; color: #4b5563; }
            .total-row.final { border-top: 2px solid #e5e7eb; margin-top: 15px; padding-top: 15px; font-weight: 800; font-size: 18px; color: #111; margin-bottom: 0; }
            
            .footer { margin-top: 60px; text-align: center; border-top: 1px solid #f3f4f6; padding-top: 30px; }
            .footer p { font-size: 13px; color: #9ca3af; margin-bottom: 5px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">Rentalysis<span>.</span></div>
            <div class="invoice-meta">
              <h1>INVOICE</h1>
              <div class="meta-item"><strong>Invoice No:</strong> ${order.id}</div>
              <div class="meta-item"><strong>Date:</strong> ${order.date}</div>
              <div class="meta-item"><strong>Status:</strong> ${order.paymentStatus}</div>
            </div>
          </div>
          
          <div class="addresses">
            <div class="addr-box">
              <h3>Billed To</h3>
              <p>${userName}</p>
              <p class="sub">${userEmail}</p>
              <p class="sub">Registered Customer</p>
            </div>
            <div class="addr-box" style="text-align: right;">
              <h3>From</h3>
              <p>Rentalysis Inc.</p>
              <p class="sub">123 Tech Avenue, Silicon Valley</p>
              <p class="sub">contact@rentalysis.com</p>
            </div>
          </div>
          
          <table>
            <thead>
              <tr>
                <th width="50%">Item Description</th>
                <th width="15%" style="text-align: center">Duration</th>
                <th width="15%" style="text-align: right">Rate</th>
                <th width="20%" style="text-align: right">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div style="font-weight: 600;">${item.name}</div>
                  <div style="font-size: 12px; color: #9ca3af; margin-top: 4px;">Rental Period: ${order.date} - ${order.endDate}</div>
                </td>
                <td style="text-align: center">${duration} Days</td>
                <td style="text-align: right">₹${rate}</td>
                <td style="text-align: right; font-weight: 600;">₹${order.total.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
          
          <div class="total-container">
            <div class="total-box">
              <div class="total-row">
                <span>Subtotal</span>
                <span>₹${order.total.toFixed(2)}</span>
              </div>
              <div class="total-row">
                <span>Platform Fee (0%)</span>
                <span>₹0.00</span>
              </div>
              <div class="total-row final">
                <span>Total Due</span>
                <span>₹${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <div class="footer">
            <p>Thank you for using Rentalysis Platform.</p>
            <p>For questions about this invoice, please contact support@rentalysis.com</p>
          </div>
          
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `);
    invoiceWindow.document.close();
  }


  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start min-h-screen bg-gray-50/50">

      {/* Left Column: Navigation */}
      <div className="w-full lg:w-72 flex-shrink-0 space-y-6 sticky top-24">
        {/* Profile Summary */}
        <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full p-1 mb-4 relative">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
            <div className="absolute bottom-0 right-0 w-5 h-5 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
          <h2 className="text-lg font-bold text-neutral-900">{import.meta.env.VITE_USER_NAME}</h2>
          <p className="text-xs text-neutral-500 mb-3">{import.meta.env.VITE_USER_EMAIL}</p>
          <button className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full hover:bg-emerald-100 transition-colors">
            Edit Profile
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden py-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-6 py-3.5 text-sm font-medium transition-all ${activeTab === tab.id
                ? 'bg-emerald-50 text-emerald-600 border-l-4 border-emerald-500'
                : 'text-neutral-600 hover:bg-neutral-50 border-l-4 border-transparent'
                }`}
            >
              <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-emerald-500' : 'text-neutral-400'}`} />
              {tab.label}
            </button>
          ))}
          <div className="border-t border-neutral-100 mt-2 pt-2">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-6 py-3.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors border-l-4 border-transparent"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Right Column: Dynamic Content */}
      <div className="flex-1 w-full min-w-0">

        {/* SECTION: DASHBOARD OVERVIEW */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-neutral-900">User Profile Dashboard</h1>
                <p className="text-sm text-neutral-500">Welcome back, {import.meta.env.VITE_USER_NAME}!</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-neutral-400 hover:bg-neutral-100 rounded-full"><span className="sr-only">Settings</span>⚙️</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex flex-col justify-between h-32">
                <div className="flex justify-between items-start">
                  <span className="text-blue-600 font-bold text-xs uppercase tracking-wider">Active Rentals</span>
                  <Package className="w-5 h-5 text-blue-500" />
                </div>
                <span className="text-4xl font-bold text-neutral-900">04</span>
              </div>
              <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 flex flex-col justify-between h-32">
                <div className="flex justify-between items-start">
                  <span className="text-emerald-600 font-bold text-xs uppercase tracking-wider">Points</span>
                  <div className="w-5 h-5 bg-emerald-200 rounded-full"></div>
                </div>
                <span className="text-4xl font-bold text-neutral-900">1,240</span>
              </div>
              <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100 flex flex-col justify-between h-32">
                <div className="flex justify-between items-start">
                  <span className="text-purple-600 font-bold text-xs uppercase tracking-wider">Saved</span>
                  <div className="w-5 h-5 bg-purple-200 rounded-full"></div>
                </div>
                <span className="text-4xl font-bold text-neutral-900">12</span>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Recent Orders Mini */}
              <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-neutral-900 flex items-center gap-2"><Package className="w-4 h-4 text-emerald-500" /> Recent Orders</h3>
                  <button onClick={() => setActiveTab('orders')} className="text-xs font-bold text-emerald-600 hover:underline">View All</button>
                </div>
                <div className="space-y-4">
                  {orders.slice(0, 2).map(order => (
                    <div key={order.id} className="flex gap-4 p-3 rounded-xl bg-neutral-50 border border-neutral-100">
                      <div className="w-16 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0">
                        <img src={order.items[0].image} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-neutral-900 line-clamp-1">{order.items[0].name}</h4>
                        <p className="text-xs text-neutral-500">{order.id}</p>
                        <div className="flex justify-between items-end mt-2">
                          <span className="text-xs font-bold text-emerald-600">₹{order.total}</span>
                          <span className="text-[10px] px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-bold uppercase">{order.status}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Default Address Mini */}
              <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-neutral-900 flex items-center gap-2"><MapPin className="w-4 h-4 text-emerald-500" /> Saved Addresses</h3>
                  <button onClick={() => setActiveTab('addresses')} className="text-xs font-bold text-emerald-600 hover:underline">+ Add New</button>
                </div>
                {defaultAddress ? (
                  <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-100">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-neutral-200 text-neutral-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase">{defaultAddress.name}</span>
                    </div>
                    <p className="text-sm font-bold text-neutral-900">{defaultAddress.fullName}</p>
                    <p className="text-xs text-neutral-500 mt-1">
                      {defaultAddress.street}<br />
                      {defaultAddress.city}, {defaultAddress.state} {defaultAddress.zip}<br />
                      {defaultAddress.country}
                    </p>
                    <button onClick={() => setActiveTab('addresses')} className="text-xs font-bold text-emerald-600 mt-3">VIEW ALL ADDRESSES</button>
                  </div>
                ) : (
                  <div className="text-center py-4 text-neutral-500 text-sm">No default address set.</div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* SECTION: MY ORDERS */}
        {activeTab === 'orders' && (
          <div className="space-y-6 animate-in fade-in duration-500 relative">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h2 className="text-2xl font-bold text-neutral-900">My Rental Orders History</h2>
              <div className="flex bg-white rounded-lg p-1 border border-neutral-200 shadow-sm">
                {['Active', 'Past', 'Cancelled'].map(status => (
                  <button
                    key={status}
                    onClick={() => setActiveOrderTab(status)}
                    className={`px-4 py-1.5 text-xs font-bold rounded-md transition-colors ${activeOrderTab === status
                      ? 'bg-emerald-50 text-emerald-600 shadow-sm'
                      : 'text-neutral-500 hover:bg-neutral-50'
                      }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {(() => {
                const filteredOrders = orders.filter(o => {
                  if (activeOrderTab === 'Active') return o.status === 'Active'
                  if (activeOrderTab === 'Past') return ['Completed', 'Past'].includes(o.status)
                  if (activeOrderTab === 'Cancelled') return o.status === 'Cancelled'
                  return true
                })

                if (filteredOrders.length === 0) {
                  return (
                    <div className="text-center py-20 bg-white rounded-2xl border border-neutral-200 dashed">
                      <Package className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
                      <p className="text-neutral-500">No {activeOrderTab.toLowerCase()} orders found.</p>
                    </div>
                  )
                }

                return filteredOrders.map((order) => (
                  <div key={order.id} className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden hover:shadow-md transition-all p-5">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div
                        onClick={() => navigate(`/products/${order.items[0].productId}`)}
                        className="w-full md:w-32 h-32 bg-neutral-100 rounded-xl flex-shrink-0 overflow-hidden relative group cursor-pointer">
                        <img src={order.items[0].image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase rounded leading-none">{order.status}</span>
                              <span className="text-[10px] text-neutral-400 font-mono">{order.id}</span>
                            </div>
                            <h3
                              onClick={() => navigate(`/products/${order.items[0].productId}`)}
                              className="text-lg font-bold text-neutral-900 leading-tight mb-1 cursor-pointer hover:text-emerald-600 transition-colors">
                              {order.items[0].name}
                            </h3>
                            <p className="text-xs text-neutral-500">Vendor: TechRental Solutions</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-neutral-400 uppercase font-bold tracking-wider mb-1">Total Rental</p>
                            <p className="text-xl font-bold text-emerald-900">₹{order.total.toFixed(2)}</p>
                          </div>
                        </div>

                        <div className="border-t border-neutral-100 mt-4 pt-4 flex flex-wrap items-center justify-between gap-4">
                          <div className="flex items-center gap-4 text-xs font-medium text-neutral-600">
                            <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {order.date} - {order.endDate}</span>
                            {/* Keep static status for now or map duration */}
                            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> 14 Days left</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handlePrintInvoice(order)}
                              className="flex items-center gap-1.5 px-3 py-1.5 border border-neutral-200 rounded-lg text-xs font-bold text-neutral-600 hover:bg-neutral-50 transition-colors"
                            >
                              <FileText className="w-3.5 h-3.5" /> Print Invoice
                            </button>
                            <button
                              onClick={() => setSelectedOrder(order)}
                              className="px-4 py-1.5 bg-sky-500 text-white rounded-lg text-xs font-bold hover:bg-sky-600 transition-colors shadow-sm shadow-sky-200">
                              View Details
                            </button>
                            {order.status === 'Active' && (
                              <button
                                onClick={() => setSelectedOrder(order)}
                                className="px-4 py-1.5 bg-amber-500 text-white rounded-lg text-xs font-bold hover:bg-amber-600 transition-colors shadow-sm shadow-amber-200">
                                Track Return
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              })()}
            </div>

            {/* Modal */}
            {selectedOrder && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
                <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-neutral-900">Order Details</h3>
                    <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-neutral-100 rounded-full">✕</button>
                  </div>

                  <div className="flex gap-4 mb-6">
                    <img src={selectedOrder.items[0].image} className="w-20 h-20 rounded-lg object-cover bg-neutral-100" />
                    <div>
                      <h4 className="font-bold text-lg">{selectedOrder.items[0].name}</h4>
                      <p className="text-sm text-neutral-500">{selectedOrder.id}</p>
                      <span className="inline-block mt-2 px-2 py-0.5 bg-neutral-100 text-neutral-600 font-bold text-xs rounded uppercase">{selectedOrder.status}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-bold text-sm text-neutral-900 mb-4">Timeline</h4>
                    <div className="space-y-4 pl-2 relative border-l-2 border-neutral-100 ml-2">
                      {(selectedOrder.timeline || []).map((event, idx) => (
                        <div key={idx} className="relative pl-6">
                          <div className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 border-white ${event.completed ? 'bg-emerald-500 ' : 'bg-neutral-200'} `}></div>
                          <p className={`text-sm font-bold ${event.completed ? 'text-neutral-900' : 'text-neutral-400'}`}>{event.status}</p>
                          <p className="text-xs text-neutral-500">{event.date}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-neutral-100 pt-4 flex justify-end">
                    <button onClick={() => setSelectedOrder(null)} className="px-5 py-2 bg-neutral-900 text-white font-bold text-sm rounded-lg hover:bg-neutral-800">Close</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* SECTION: TRANSACTIONS & INVOICES */}
        {activeTab === 'transactions' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <h2 className="text-2xl font-bold text-neutral-900">Transactions & Invoices</h2>
            <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
              {/* Keep existing table logic but styled cleanly */}
              <table className="w-full text-sm text-left">
                <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
                  <tr>
                    <th className="px-6 py-4 font-medium">Date</th>
                    <th className="px-6 py-4 font-medium">Description</th>
                    <th className="px-6 py-4 font-medium text-right">Amount</th>
                    <th className="px-6 py-4 font-medium text-center">Status</th>
                    <th className="px-6 py-4 font-medium text-center">Invoice</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-neutral-50">
                      <td className="px-6 py-4 text-neutral-500">{order.date}</td>
                      <td className="px-6 py-4 font-medium text-neutral-900">
                        Rental Payment <span className="text-neutral-400 font-normal">for {order.id}</span>
                      </td>
                      <td className="px-6 py-4 text-right font-bold text-neutral-900">₹{order.total.toFixed(2)}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-bold bg-green-50 text-emerald-600 border border-green-100">
                          Paid
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button onClick={() => handlePrintInvoice(order)} className="text-neutral-400 hover:text-neutral-900 transition-colors inline-block" title="Download Invoice">
                          <Download className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SECTION: ADDRESSES */}
        {activeTab === 'addresses' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-neutral-900">Saved Addresses</h2>
              <button
                onClick={startAddAddress}
                className="px-4 py-2 bg-emerald-600 text-white text-sm font-bold rounded-lg hover:bg-emerald-700 shadow-lg shadow-emerald-200"
              >
                + Add New Address
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Existing Addresses */}
              {savedAddresses.map((addr) => (
                <div key={addr.id} className={`bg-white p-6 rounded-2xl border ${addr.isDefault ? 'border-emerald-200 ring-1 ring-emerald-50' : 'border-neutral-200'} shadow-sm relative`}>
                  {addr.isDefault && (
                    <div className="absolute top-4 right-4 bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide">Primary</div>
                  )}

                  {editingId === addr.id ? (
                    <div className="space-y-3">
                      <input type="text" name="name" value={addressForm.name} onChange={handleAddressChange} placeholder="Label (e.g. Home)" className="w-full text-sm font-bold border rounded px-2 py-1 mb-2" />
                      <input type="text" name="fullName" value={addressForm.fullName} onChange={handleAddressChange} placeholder="Full Name" className="w-full text-sm border rounded px-2 py-1" />
                      <input type="text" name="street" value={addressForm.street} onChange={handleAddressChange} placeholder="Street" className="w-full text-sm border rounded px-2 py-1" />
                      <div className="flex gap-2">
                        <input type="text" name="city" value={addressForm.city} onChange={handleAddressChange} placeholder="City" className="w-full text-sm border rounded px-2 py-1" />
                        <input type="text" name="state" value={addressForm.state} onChange={handleAddressChange} placeholder="State" className="w-20 text-sm border rounded px-2 py-1" />
                      </div>
                      <div className="flex gap-2">
                        <input type="text" name="zip" value={addressForm.zip} onChange={handleAddressChange} placeholder="Zip" className="w-24 text-sm border rounded px-2 py-1" />
                        <input type="text" name="country" value={addressForm.country} onChange={handleAddressChange} placeholder="Country" className="w-full text-sm border rounded px-2 py-1" />
                      </div>
                      <button onClick={handleSaveAddress} className="w-full bg-emerald-600 text-white text-sm font-bold py-1.5 rounded-lg hover:bg-emerald-700">Save</button>
                      <button onClick={handleCancel} className="w-full text-neutral-500 text-xs py-1">Cancel</button>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`p-2 rounded-lg ${addr.isDefault ? 'bg-emerald-50' : 'bg-neutral-100'}`}>
                          <MapPin className={`w-5 h-5 ${addr.isDefault ? 'text-emerald-600' : 'text-neutral-500'}`} />
                        </div>
                        <h3 className="font-bold text-neutral-900 uppercase tracking-wide text-xs">{addr.name}</h3>
                      </div>
                      <p className="text-sm text-neutral-600 mb-6 leading-relaxed font-medium">
                        {addr.street}<br />
                        {addr.city}, {addr.state} {addr.zip}<br />
                        {addr.country}
                      </p>
                      <div className="flex gap-3 text-xs font-bold uppercase tracking-wide">
                        <button onClick={() => startEditAddress(addr)} className="text-emerald-600 hover:underline">Edit</button>
                        <button onClick={() => handleDeleteAddress(addr.id)} className="text-red-500 hover:underline">Remove</button>
                      </div>
                    </>
                  )}
                </div>
              ))}

              {/* Add New Address Form Card */}
              {isAddingAddress && (
                <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm relative">
                  <h3 className="font-bold text-neutral-900 mb-4">Add New Address</h3>
                  <div className="space-y-3">
                    <input type="text" name="name" value={addressForm.name} onChange={handleAddressChange} placeholder="Address Label" className="w-full text-sm border rounded px-2 py-1" />
                    <input type="text" name="fullName" value={addressForm.fullName} onChange={handleAddressChange} placeholder="Full Name" className="w-full text-sm border rounded px-2 py-1" />
                    <input type="text" name="street" value={addressForm.street} onChange={handleAddressChange} placeholder="Street Address" className="w-full text-sm border rounded px-2 py-1" />
                    <div className="flex gap-2">
                      <input type="text" name="city" value={addressForm.city} onChange={handleAddressChange} placeholder="City" className="w-full text-sm border rounded px-2 py-1" />
                      <input type="text" name="state" value={addressForm.state} onChange={handleAddressChange} placeholder="State" className="w-20 text-sm border rounded px-2 py-1" />
                    </div>
                    <div className="flex gap-2">
                      <input type="text" name="zip" value={addressForm.zip} onChange={handleAddressChange} placeholder="Zip" className="w-24 text-sm border rounded px-2 py-1" />
                      <input type="text" name="country" value={addressForm.country} onChange={handleAddressChange} placeholder="Country" className="w-full text-sm border rounded px-2 py-1" />
                    </div>
                    <button onClick={handleSaveAddress} className="w-full bg-emerald-600 text-white text-sm font-bold py-1.5 rounded-lg hover:bg-emerald-700">Save</button>
                    <button onClick={handleCancel} className="w-full text-neutral-500 text-xs py-1">Cancel</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* SECTION: PAYMENTS & CARDS */}
        {activeTab === 'payments' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-neutral-900">Saved Cards</h2>
              <button
                onClick={() => setIsAddingCard(true)}
                className="px-4 py-2 bg-emerald-600 text-white text-sm font-bold rounded-lg hover:bg-emerald-700 shadow-lg shadow-emerald-200"
              >
                + Add New Card
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {savedCards.map(card => (
                <div key={card.id} className="bg-neutral-900 p-6 rounded-2xl shadow-lg relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-2xl"></div>

                  <div className="flex justify-between items-start mb-8 relative z-10">
                    <span className="font-mono text-white/50 text-xs tracking-widest uppercase">Debit/Credit</span>
                    <span className="font-bold text-white italic text-lg">{card.type}</span>
                  </div>

                  <div className="mb-6 relative z-10">
                    <p className="text-2xl text-white font-mono tracking-widest flex gap-4">
                      <span>****</span>
                      <span>****</span>
                      <span>****</span>
                      <span>{card.last4}</span>
                    </p>
                  </div>

                  <div className="flex justify-between items-end relative z-10">
                    <div>
                      <p className="text-[10px] text-white/50 uppercase tracking-wider mb-1">Card Holder</p>
                      <p className="text-sm font-bold text-white uppercase">{card.holder}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-white/50 uppercase tracking-wider mb-1">Expires</p>
                      <p className="text-sm font-bold text-white">{card.expiry}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteCard(card.id)}
                    className="absolute top-4 right-4 text-white/60 hover:text-red-500 transition-colors p-2 z-20 bg-black/20 rounded-full"
                    title="Remove Card"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              {isAddingCard && (
                <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
                  <h3 className="font-bold text-neutral-900 mb-4">Add New Card</h3>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Card Number"
                      className="w-full text-sm border rounded-lg px-3 py-2"
                      value={cardForm.number}
                      onChange={(e) => setCardForm({ ...cardForm, number: e.target.value })}
                    />
                    <div className="flex gap-3">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full text-sm border rounded-lg px-3 py-2"
                        value={cardForm.expiry}
                        onChange={(e) => setCardForm({ ...cardForm, expiry: e.target.value })}
                      />
                      <input
                        type="text"
                        placeholder="CVC"
                        className="w-full text-sm border rounded-lg px-3 py-2"
                        value={cardForm.cvc}
                        onChange={(e) => setCardForm({ ...cardForm, cvc: e.target.value })}
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Card Holder Name"
                      className="w-full text-sm border rounded-lg px-3 py-2"
                      value={cardForm.holder}
                      onChange={(e) => setCardForm({ ...cardForm, holder: e.target.value })}
                    />
                    <button onClick={handleAddCard} className="w-full bg-neutral-900 text-white text-sm font-bold py-2 rounded-lg hover:bg-black">Save Card</button>
                    <button onClick={() => setIsAddingCard(false)} className="w-full text-neutral-500 text-xs py-1">Cancel</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default Profile
