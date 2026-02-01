import React, { useState, useEffect } from 'react'
import { Plus, Download, Filter, Search, MoreHorizontal, Camera, Film, Monitor, Upload, X } from 'lucide-react'
import api from '../../services/api'

const Inventory = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('All Products')
  const [selectedItems, setSelectedItems] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [imageFiles, setImageFiles] = useState([])
  const [imagePreviews, setImagePreviews] = useState([])
  const itemsPerPage = 5

  // Fetch vendor's products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/product/all')
        // Assuming backend returns array of products, or response.data.products
        const productsData = Array.isArray(response.data) ? response.data : response.data.products || []
        setProducts(productsData)
      } catch (error) {
        console.error('Failed to fetch products:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const filteredProducts = products.filter(product => {
    if (activeTab !== 'All Products' && product.status !== activeTab) {
      if (activeTab === 'Under Maintenance' && product.status !== 'Maintenance') return false
      if (activeTab !== 'Under Maintenance' && activeTab !== 'All Products' && product.status !== activeTab) return false
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      return (
        product.name.toLowerCase().includes(term) ||
        product.sku.toLowerCase().includes(term)
      )
    }
    return true
  })

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const currentIds = currentProducts.map(p => p.id)
      const newSelected = [...new Set([...selectedItems, ...currentIds])]
      setSelectedItems(newSelected)
    } else {
      const currentIds = currentProducts.map(p => p.id)
      setSelectedItems(selectedItems.filter(id => !currentIds.includes(id)))
    }
  }

  const handleSelectItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(itemId => itemId !== id))
    } else {
      setSelectedItems([...selectedItems, id])
    }
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    console.log('📸 Images selected:', files.length, files)
    if (files.length > 0) {
      setImageFiles(prev => {
        const newFiles = [...prev, ...files]
        console.log('📦 Total images now:', newFiles.length)
        return newFiles
      })

      files.forEach(file => {
        const reader = new FileReader()
        reader.onloadend = () => {
          setImagePreviews(prev => [...prev, reader.result])
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const removeImage = (index) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index))
    setImagePreviews(prev => prev.filter((_, i) => i !== index))
  }

  const handleAddProduct = async (e) => {
    e.preventDefault()

    const formElement = e.target

    if (imageFiles.length === 0) {
      alert('Please upload at least one product image!')
      return
    }

    try {
      console.log('=== Starting Product Upload Process ===')

      // Step 1: Upload all images to Cloudinary first
      console.log('📸 Step 1: Uploading images to Cloudinary...')
      const imageUrls = []

      for (let i = 0; i < imageFiles.length; i++) {
        const file = imageFiles[i]
        console.log(`📤 Uploading image ${i + 1}/${imageFiles.length}: ${file.name}`)

        const imageFormData = new FormData()
        imageFormData.append('file', file)

        try {
          const imageResponse = await api.post('/product/image', imageFormData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })

          const cloudinaryUrl = imageResponse.data.url || imageResponse.data.image_url
          imageUrls.push(cloudinaryUrl)
          console.log(`✅ Image ${i + 1} uploaded: ${cloudinaryUrl}`)
        } catch (imageError) {
          console.error(`❌ Failed to upload image ${i + 1}:`, imageError)
          throw new Error(`Failed to upload image ${file.name}`)
        }
      }

      console.log('✅ All images uploaded successfully!')
      console.log('📎 Cloudinary URLs:', imageUrls)

      // Step 2: Create FormData with all product details including image URLs
      console.log('📦 Step 2: Creating product with image URLs...')

      const productData = new FormData()
      productData.append('name', formElement.name.value)
      productData.append('brand', formElement.brand.value)
      productData.append('category', formElement.category.value)
      productData.append('quantity', parseInt(formElement.quantity.value))
      productData.append('daily_price', parseInt(formElement.daily_price.value))
      productData.append('weekly_price', parseInt(formElement.weekly_price.value))
      productData.append('monthly_price', parseInt(formElement.monthly_price.value))

      // Add all image URLs to FormData
      imageUrls.forEach((url, index) => {
        productData.append('image_urls', url)
        console.log(`📎 Added image URL ${index + 1}: ${url}`)
      })

      console.log('=== Product Data ===')
      for (let pair of productData.entries()) {
        console.log(pair[0] + ':', pair[1])
      }

      // Step 3: Send product data to backend
      console.log('� Step 3: Sending product data to backend...')
      const response = await api.post('/product/add', productData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      console.log('✅ SUCCESS! Product created')
      console.log('Response:', response.data)

      // Update local state
      const newProduct = {
        id: response.data.id || products.length + 1,
        name: formElement.name.value,
        sku: response.data.sku || `PRD-${Date.now()}`,
        category: formElement.category.value,
        status: 'Available',
        rate: parseFloat(formElement.daily_price.value),
        stock: parseInt(formElement.quantity.value),
        images: imageUrls
      }

      setProducts([newProduct, ...products])
      setIsAddModalOpen(false)
      setImageFiles([])
      setImagePreviews([])
      setActiveTab('All Products')
      setSearchTerm('')
      setCurrentPage(1)

      alert('Product added successfully!')
    } catch (error) {
      console.log('❌ ERROR! Product upload failed')
      console.error('Error:', error)
      console.error('Error response:', error.response)

      let errorMessage = 'Failed to add product. Please try again.'
      if (error.message) {
        errorMessage = error.message
      } else if (error.response?.data?.detail) {
        const detail = error.response.data.detail
        if (Array.isArray(detail)) {
          errorMessage = detail.map(e => `${e.loc?.join('.')} - ${e.msg}`).join('\n')
        } else if (typeof detail === 'string') {
          errorMessage = detail
        }
      }
      alert(errorMessage)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-700'
      case 'Rented Out': return 'bg-red-100 text-red-700'
      case 'Maintenance': return 'bg-amber-100 text-amber-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getCategoryBadge = (category) => {
    switch (category) {
      case 'Photography': return <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100"><Camera size={10} /> Photography</span>
      case 'Drones': return <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-100"><Film size={10} /> Drones</span>
      case 'Lighting': return <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-100"><Monitor size={10} /> Lighting</span>
      case 'Audio': return <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100"><Monitor size={10} /> Audio</span>
      default: return category
    }
  }

  const handleExportCSV = () => {
    const headers = ['ID', 'Name', 'SKU', 'Category', 'Status', 'Daily Rate', 'Stock']
    const csvContent = [
      headers.join(','),
      ...filteredProducts.map(product => [
        product.id,
        `"${product.name}"`,
        product.sku || 'N/A',
        product.category,
        product.status,
        (product.daily_price || product.rate || 0).toFixed(2),
        product.quantity || product.stock || 0
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)

    link.setAttribute('href', url)
    link.setAttribute('download', 'inventory_export.csv')
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-200 border-t-neutral-900"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            <span>Home</span> / <span className="text-gray-900 font-medium">Inventory Management</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Product Catalog</h1>
          <p className="text-gray-500 text-sm mt-1">Manage and track {products.length} rental assets across your global fleet.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Download size={16} />
            Export CSV
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Plus size={16} />
            Add Product
          </button>
        </div>
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-900">Add New Product</h2>
              <button
                onClick={() => {
                  setIsAddModalOpen(false)
                  setImageFiles([])
                  setImagePreviews([])
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g. Sony Alpha a7 III"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Brand <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="brand"
                    required
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g. Sony"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    required
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  >
                    <option value="">Select Category</option>
                    <option value="Photography">Photography</option>
                    <option value="Drones">Drones</option>
                    <option value="Lighting">Lighting</option>
                    <option value="Audio">Audio</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="quantity"
                  min="1"
                  required
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter available quantity"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Daily Price ($) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="daily_price"
                    step="1"
                    min="0"
                    required
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Weekly Price ($) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="weekly_price"
                    step="1"
                    min="0"
                    required
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Monthly Price ($) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="monthly_price"
                  step="1"
                  min="0"
                  required
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Images <span className="text-red-500">*</span>
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                  <input
                    type="file"
                    id="product-images"
                    multiple
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <label htmlFor="product-images" className="cursor-pointer">
                    <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="text-blue-600 font-medium">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG, WebP up to 5MB</p>
                  </label>
                </div>

                {imagePreviews.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={14} />
                        </button>
                        {index === 0 && (
                          <span className="absolute bottom-1 left-1 bg-blue-600 text-white text-xs px-2 py-0.5 rounded">
                            Primary
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false)
                    setImageFiles([])
                    setImagePreviews([])
                  }}
                  className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-sm font-medium text-gray-500 border-b border-gray-100 w-full sm:w-auto overflow-x-auto">
            {['All Products', 'Available', 'Rented Out', 'Under Maintenance'].map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
                className={`${activeTab === tab
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-900'
                  } pb-2 px-1 whitespace-nowrap transition-colors relative`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search products, SKUs..."
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              />
            </div>
            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-500">
              <Filter size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-200">
                <th className="px-6 py-4 font-medium text-gray-500 w-10">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    onChange={handleSelectAll}
                    checked={currentProducts.length > 0 && currentProducts.every(p => selectedItems.includes(p.id))}
                  />
                </th>
                <th className="px-6 py-4 font-medium text-gray-500">Item</th>
                <th className="px-6 py-4 font-medium text-gray-500">Category</th>
                <th className="px-6 py-4 font-medium text-gray-500">Status</th>
                <th className="px-6 py-4 font-medium text-gray-500">Daily Rate</th>
                <th className="px-6 py-4 font-medium text-gray-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentProducts.length > 0 ? (
                currentProducts.map((product) => (
                  <tr key={product.id} className={`hover:bg-gray-50/50 transition-colors group ${selectedItems.includes(product.id) ? 'bg-blue-50/10' : ''}`}>
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={selectedItems.includes(product.id)}
                        onChange={() => handleSelectItem(product.id)}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 overflow-hidden">
                          {product.images && product.images[0] ? (
                            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                          ) : (
                            <Camera size={20} />
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{product.name}</div>
                          <div className="text-xs text-gray-500">
                            {product.sku ? `SKU: ${product.sku}` : `ID: ${product.id}`}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getCategoryBadge(product.category)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      ${(product.daily_price || product.rate || 0).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors">
                        <MoreHorizontal size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    No products found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
          <div className="text-sm text-gray-500">
            Showing {filteredProducts.length > 0 ? indexOfFirstItem + 1 : 0}-{Math.min(indexOfLastItem, filteredProducts.length)} of {filteredProducts.length} products
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
              className="px-3 py-1.5 bg-blue-600 border border-blue-600 rounded-lg text-sm text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Inventory
