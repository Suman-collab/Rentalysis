import React from 'react'
import { Plus, X, Building2, User, Mail, Phone } from 'lucide-react'

const Vendors = () => {
  // Dummy Data
  const [vendors, setVendors] = React.useState([
    { id: 'VND-001', name: 'Tech Supplies Co.', contact: 'James Miller', email: 'james@techsupplies.com', phone: '+1 (555) 123-4567', products: 45 },
    { id: 'VND-002', name: 'Pro Equipment Ltd.', contact: 'Maria Garcia', email: 'maria@proequipment.com', phone: '+1 (555) 234-5678', products: 32 },
    { id: 'VND-003', name: 'Audio Visual Systems', contact: 'Robert Chen', email: 'robert@avsystems.com', phone: '+1 (555) 345-6789', products: 28 },
    { id: 'VND-004', name: 'Camera World Inc.', contact: 'Anna Martinez', email: 'anna@cameraworld.com', phone: '+1 (555) 456-7890', products: 56 },
  ]);

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: '',
    contact: '',
    email: '',
    phone: ''
  });
  const [errors, setErrors] = React.useState({});
  const [searchTerm, setSearchTerm] = React.useState('');

  // Filter vendors based on search
  const filteredVendors = vendors.filter(vendor =>
    vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.phone.includes(searchTerm)
  );

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Vendor name is required';
    if (!formData.contact.trim()) newErrors.contact = 'Contact person is required';

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const newVendor = {
      id: `VND-${String(vendors.length + 1).padStart(3, '0')}`,
      name: formData.name,
      contact: formData.contact,
      email: formData.email,
      phone: formData.phone,
      products: 0
    };

    setVendors([...vendors, newVendor]);
    setIsModalOpen(false);
    setFormData({ name: '', contact: '', email: '', phone: '' });
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ name: '', contact: '', email: '', phone: '' });
    setErrors({});
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Vendors</h1>
          <p className="text-gray-500 mt-1">Manage your supplier relationships</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Vendor
        </button>
      </div>

      {/* Search Filter */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search vendors by name, contact, email, or phone..."
          className="w-full bg-gray-50 border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-100 outline-none"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100/50">
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Vendor ID</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Products</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredVendors.map((vendor) => (
              <tr key={vendor.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-blue-600">{vendor.id}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{vendor.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{vendor.contact}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{vendor.email}</td>
                <td className="px-6 py-4 text-sm text-gray-600 font-mono">{vendor.phone}</td>
                <td className="px-6 py-4 text-sm font-semibold text-blue-600 text-right">{vendor.products}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Vendor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg transform animate-in zoom-in-95 duration-200">
            {/* Modal Header with Gradient */}
            <div className="relative px-8 pt-8 pb-6">
              <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 rounded-t-3xl opacity-10"></div>
              <div className="relative flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                      <Building2 className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Add New Vendor</h2>
                  </div>
                  <p className="text-sm text-gray-500 ml-[52px]">Fill in vendor details to add them to your system</p>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-all hover:rotate-90 duration-300"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-5">
              {/* Vendor Name */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2.5">
                  Vendor Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g., Tech Supplies Co."
                    className={`w-full pl-12 pr-4 py-3.5 rounded-xl border-2 ${errors.name
                      ? 'border-red-300 bg-red-50/50 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                      : 'border-gray-200 bg-gray-50/50 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:bg-white'
                      } outline-none transition-all font-medium text-gray-900 placeholder:text-gray-400`}
                  />
                </div>
                {errors.name && (
                  <p className="text-xs text-red-600 mt-2 ml-1 flex items-center gap-1.5">
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Contact Person */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2.5">
                  Contact Person <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  <input
                    type="text"
                    name="contact"
                    value={formData.contact}
                    onChange={handleInputChange}
                    placeholder="e.g., John Smith"
                    className={`w-full pl-12 pr-4 py-3.5 rounded-xl border-2 ${errors.contact
                      ? 'border-red-300 bg-red-50/50 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                      : 'border-gray-200 bg-gray-50/50 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:bg-white'
                      } outline-none transition-all font-medium text-gray-900 placeholder:text-gray-400`}
                  />
                </div>
                {errors.contact && (
                  <p className="text-xs text-red-600 mt-2 ml-1 flex items-center gap-1.5">
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                    {errors.contact}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2.5">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="contact@vendor.com"
                    className={`w-full pl-12 pr-4 py-3.5 rounded-xl border-2 ${errors.email
                      ? 'border-red-300 bg-red-50/50 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                      : 'border-gray-200 bg-gray-50/50 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:bg-white'
                      } outline-none transition-all font-medium text-gray-900 placeholder:text-gray-400`}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-red-600 mt-2 ml-1 flex items-center gap-1.5">
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2.5">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 123-4567"
                    className={`w-full pl-12 pr-4 py-3.5 rounded-xl border-2 ${errors.phone
                      ? 'border-red-300 bg-red-50/50 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                      : 'border-gray-200 bg-gray-50/50 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:bg-white'
                      } outline-none transition-all font-medium text-gray-900 placeholder:text-gray-400`}
                  />
                </div>
                {errors.phone && (
                  <p className="text-xs text-red-600 mt-2 ml-1 flex items-center gap-1.5">
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Form Actions */}
              <div className="flex gap-3 pt-6">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-6 py-3.5 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-300 font-semibold transition-all active:scale-95"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 font-semibold transition-all shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 active:scale-95"
                >
                  Add Vendor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Vendors

