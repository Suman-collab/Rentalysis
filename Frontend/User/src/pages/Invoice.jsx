// FILE: src/pages/Invoice.jsx
import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { Printer, Share2, ArrowLeft, Download } from 'lucide-react'
import { invoices } from '../mock/data'

const Invoice = () => {
  const { id } = useParams()
  // Finding invoice or fallback
  const invoice = invoices[0]

  return (
    <div className="max-w-2xl mx-auto mb-12">
      <Link to="/orders" className="inline-flex items-center text-sm text-neutral-500 hover:text-neutral-900 mb-6">
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Orders
      </Link>

      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden print:shadow-none print:border-none">
        {/* Header */}
        <div className="p-8 border-b border-neutral-100 flex justify-between items-start">
          <div className="space-y-4">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">R</div>
            <div>
              <h1 className="font-bold text-neutral-900 text-lg">TechRentals Inc.</h1>
              <p className="text-sm text-neutral-500 mt-1">
                301 N 22AAAAACCCX00<br />
                123 Business Park, Silicon Valley
              </p>
            </div>
          </div>

          <div className="text-right">
            <h2 className="text-xl font-bold text-neutral-900 mb-1">Invoice</h2>
            <p className="text-sm text-neutral-500 font-mono mb-4">{invoice.id}</p>
            <div className="space-y-1">
              <div className="flex justify-between gap-8 text-sm">
                <span className="text-neutral-500">Invoice Date</span>
                <span className="font-semibold text-neutral-900">{invoice.date}</span>
              </div>
              <div className="flex justify-between gap-8 text-sm">
                <span className="text-neutral-500">Billing Cycle</span>
                <span className="font-semibold text-neutral-900">Oct 24 - Nov 25</span>
              </div>
              <div className="flex justify-between gap-8 text-sm">
                <span className="text-neutral-500">Due Date</span>
                <span className="font-semibold text-neutral-900">{invoice.dueDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Billed To */}
        <div className="px-8 py-6 border-b border-neutral-100 bg-neutral-50/50">
          <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wide mb-2">Billed To</h3>
          <div className="text-sm text-neutral-900 font-medium">
            <p className="font-bold">{invoice.customer.name}</p>
            <p>{invoice.customer.email}</p>
            <p>{invoice.customer.address}</p>
          </div>
          <div className="mt-4 flex gap-8">
            <div>
              <span className="block text-xs text-neutral-500">Payment Method</span>
              <span className="block text-sm font-semibold text-neutral-900">Visa **** 4242</span>
            </div>
            <div>
              <span className="block text-xs text-neutral-500">Payment Status</span>
              <span className="inline-block mt-0.5 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded uppercase tracking-wide">{invoice.status}</span>
            </div>
          </div>
        </div>

        {/* Line Items */}
        <div className="p-8">
          <h3 className="text-sm font-bold text-neutral-900 mb-4">Itemized Rental Charges</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-neutral-500 border-b border-neutral-200">
                <th className="text-left py-3 font-medium w-3/4">Description</th>
                <th className="text-right py-3 font-medium">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {invoice.items.map((item, i) => (
                <tr key={i}>
                  <td className="py-4 text-neutral-900">
                    <span className="font-medium block">{item.description.split(' - ')[0]}</span>
                    <span className="text-xs text-neutral-500">{item.description.split(' - ')[1]}</span>
                  </td>
                  <td className="py-4 text-right text-neutral-900 font-medium">${item.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-8 border-t border-neutral-200 pt-6 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-neutral-500">Subtotal</span>
              <span className="text-neutral-900 font-medium">${invoice.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-neutral-500">CGST (6%)</span>
              <span className="text-neutral-900 font-medium">${(invoice.tax / 2).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-neutral-500">SGST (6%)</span>
              <span className="text-neutral-900 font-medium">${(invoice.tax / 2).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-neutral-500">Insurance Fee</span>
              <span className="text-neutral-900 font-medium">${invoice.insurance.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-neutral-200 flex justify-between items-center">
            <span className="text-lg font-bold text-neutral-900">GRAND TOTAL</span>
            <span className="text-2xl font-bold text-blue-600">${invoice.amount.toFixed(2)}</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-neutral-50 p-6 flex gap-4 border-t border-neutral-200 print:hidden">
          <button className="flex-1 bg-blue-600 text-white font-bold h-10 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm shadow-sm">
            <Printer className="w-4 h-4" /> Print Invoice
          </button>
          <button className="flex-1 bg-white border border-neutral-200 text-neutral-700 font-medium h-10 rounded-lg hover:bg-neutral-50 transition-colors flex items-center justify-center gap-2 text-sm shadow-sm">
            <Share2 className="w-4 h-4" /> Share
          </button>
          <button className="w-10 h-10 flex items-center justify-center bg-white border border-neutral-200 text-neutral-700 rounded-lg hover:bg-neutral-50 shadow-sm">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Invoice
