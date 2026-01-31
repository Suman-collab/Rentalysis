import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { Printer, Share2, ArrowLeft, Download } from 'lucide-react'
import { invoices } from '../mock/data'
import logo from '../assets/logo.png'

const Invoice = () => {
  const { id } = useParams()

  const baseInvoice = invoices[0]
  const invoice = {
    ...baseInvoice,
    orderId: 'ORD-2023-8821',
    invoiceId: 'INV-2023-0891',
    date: 'Oct 14, 2023',
    dueDate: 'Oct 14, 2023',
    billingPeriod: 'Oct 12, 2023 - Oct 14, 2023',
    status: 'Paid',
    paymentMethod: 'Credit Card (Visa ending 4242)',
    transactionId: 'TXN_1234567890',
    vendor: {
      name: 'TechRentals Inc.',
      address: '123 Tech Park, Innovation Way, CA 94043',
      contact: 'support@techrentals.com | +1 (555) 123-4567',
      gstin: '22AAAAA0000A1Z5'
    },
    items: [
      {
        id: 1,
        name: 'MacBook Pro 16" (M2 Max)',
        duration: '2 days',
        rate: 79.00,
        quantity: 1,
        total: 158.00
      },
      {
        id: 2,
        name: 'Herman Miller Aeron Chair',
        duration: '2 days',
        rate: 22.00,
        quantity: 1,
        total: 44.00
      },
      {
        id: 3,
        name: 'Dell 32" 4K Monitor',
        duration: '2 days',
        rate: 17.50,
        quantity: 2,
        total: 35.00
      }
    ],
    breakdown: {
      subtotal: 237.00,
      deposit: 0.00,
      tax: 20.70,
      discount: 0.00,
      insurance: 15.00,
      total: 272.70
    }

  }

  const handlePrint = () => {
    window.print()
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Invoice ${invoice.invoiceId}`,
          text: `Invoice ${invoice.invoiceId} from ${invoice.vendor.name}`,
          url: window.location.href,
        })
      } catch (err) {
        console.error('Error sharing:', err)
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Invoice link copied to clipboard')
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6">
      <div className="max-w-[800px] mx-auto">
        <div className="mb-6 flex justify-between items-center print:hidden">
          <Link to="/orders" className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Orders
          </Link>
          <div className="flex gap-3">
            <button
              onClick={handleShare}
              className="bg-white border border-gray-300 text-gray-700 font-medium px-4 py-2 rounded-md hover:bg-gray-50 flex items-center gap-2 text-sm transition-all"
            >
              <Share2 className="w-4 h-4" /> Share
            </button>
            <button
              onClick={handlePrint}
              className="bg-blue-600 text-white font-medium px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2 text-sm transition-all shadow-sm"
            >
              <Printer className="w-4 h-4" /> Print
            </button>
            <button className="bg-white border border-gray-300 text-gray-700 font-medium px-4 py-2 rounded-md hover:bg-gray-50 flex items-center gap-2 text-sm transition-all">
              <Download className="w-4 h-4" /> Download
            </button>
          </div>
        </div>

        {/* Invoice Container */}
        <div className="bg-white shadow-lg rounded-sm border border-gray-200 overflow-hidden print:shadow-none print:border-none print:m-0 print:w-full">

          {/* Header */}
          <div className="p-8 border-b border-gray-200">
            <div className="flex justify-between items-start">
              <img src={logo} alt="Company Logo" className="h-16 w-auto object-contain" />
              <div className="text-right">
                <h1 className="text-xl font-bold text-gray-800">tax invoice</h1>
                <p className="text-sm font-medium text-gray-600 mt-1"># {invoice.invoiceId}</p>
              </div>
            </div>
            <div className="mt-6 flex justify-between items-end text-sm">
              <div>
                <p className="text-gray-500">Order ID: <span className="font-semibold text-gray-900">{invoice.orderId}</span></p>
                <p className="text-gray-500 mt-0.5">Invoice Date: <span className="font-semibold text-gray-900">{invoice.date}</span></p>
              </div>
            </div>
          </div>

          {/* Addresses */}
          <div className="p-8 grid grid-cols-2 gap-12 text-sm">
            <div>
              <h3 className="font-bold text-gray-800 uppercase tracking-wider text-xs mb-3">Billed To</h3>
              <div className="text-gray-600 space-y-1">
                <p className="font-bold text-gray-900 text-base">{invoice.customer.name}</p>
                <p>{invoice.customer.address}</p>
                <p>{invoice.customer.email}</p>
              </div>
            </div>
            <div className="text-right">
              <h3 className="font-bold text-gray-800 uppercase tracking-wider text-xs mb-3">Sold By</h3>
              <div className="text-gray-600 space-y-1">
                <p className="font-bold text-gray-900 text-base">{invoice.vendor.name}</p>
                <p>{invoice.vendor.address}</p>
                <p>GSTIN: {invoice.vendor.gstin}</p>
              </div>
            </div>
          </div>

          {/* Order Details Banner */}
          <div className="bg-gray-50 px-8 py-4 border-y border-gray-200 flex justify-between text-sm">
            <div>
              <span className="text-gray-500 block text-xs uppercase font-medium">Rental Period</span>
              <span className="text-gray-900 font-semibold">{invoice.billingPeriod}</span>
            </div>
            <div>
              <span className="text-gray-500 block text-xs uppercase font-medium text-right">Order Status</span>
              <span className="text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded text-xs border border-green-100 uppercase tracking-wide">
                {invoice.status}
              </span>
            </div>
          </div>

          {/* Items Table */}
          <div className="p-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-100">
                  <th className="text-left py-3 font-semibold text-gray-600 w-[45%]">Item Description</th>
                  <th className="text-center py-3 font-semibold text-gray-600">Duration</th>
                  <th className="text-right py-3 font-semibold text-gray-600">Rate/Day</th>
                  <th className="text-center py-3 font-semibold text-gray-600">Qty</th>
                  <th className="text-right py-3 font-semibold text-gray-600">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {invoice.items.map((item) => (
                  <tr key={item.id}>
                    <td className="py-4 text-gray-900 font-medium align-top">
                      {item.name}
                    </td>
                    <td className="py-4 text-center text-gray-600 align-top">{item.duration}</td>
                    <td className="py-4 text-right text-gray-600 align-top">₹{item.rate.toFixed(2)}</td>
                    <td className="py-4 text-center text-gray-600 align-top">{item.quantity}</td>
                    <td className="py-4 text-right text-gray-900 font-medium align-top">₹{item.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Total & Breakdown */}
          <div className="px-8 pb-8 flex justify-end">
            <div className="w-1/2 md:w-1/3 space-y-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{invoice.breakdown.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Insurance Fee</span>
                <span>₹{invoice.breakdown.insurance.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Taxes (CGST + SGST)</span>
                <span>₹{invoice.breakdown.tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-dashed border-gray-300 my-2"></div>
              <div className="flex justify-between text-base font-bold text-gray-900">
                <span>Grand Total</span>
                <span className="text-blue-600">₹{invoice.breakdown.total.toFixed(2)}</span>
              </div>
              <p className="text-xs text-right text-gray-500 mt-1">(Inclusive of all taxes)</p>
            </div>
          </div>

          {/* Footer Info */}
          <div className="bg-gray-50 border-t border-gray-200 p-8 grid grid-cols-2 gap-8 text-sm">
            <div>
              <h4 className="font-bold text-gray-800 text-xs uppercase mb-2">Payment Information</h4>
              <p className="text-gray-600"><span className="text-gray-500">Method:</span> {invoice.paymentMethod}</p>
              <p className="text-gray-600"><span className="text-gray-500">Transaction ID:</span> {invoice.transactionId}</p>
            </div>
            <div className="text-right">
              <h4 className="font-bold text-gray-800 text-xs uppercase mb-2">Support</h4>
              <p className="text-gray-600">{invoice.vendor.contact}</p>
              <p className="text-gray-500 text-xs mt-2">This is a system generated invoice.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Invoice
