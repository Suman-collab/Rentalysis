
import React from 'react'
import { Mail, MapPin, Phone, Send } from 'lucide-react'

const ContactUs = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">Get in touch</h1>
          <p className="text-neutral-500 max-w-xl mx-auto">
            Have questions about renting? Need support with an order? We're here to help!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200 flex items-start gap-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-neutral-900">Email Us</h3>
                <p className="text-sm text-neutral-500 mb-1">Our team typically responds within 2 hours.</p>
                <a href="mailto:support@rentalysis.com" className="text-blue-600 font-medium hover:underline">support@rentalysis.com</a>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200 flex items-start gap-4">
              <div className="p-3 bg-green-50 text-green-600 rounded-lg">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-neutral-900">Call Us</h3>
                <p className="text-sm text-neutral-500 mb-1">Mon-Fri from 8am to 5pm.</p>
                <a href="tel:+15550000000" className="text-neutral-900 font-medium hover:underline">+1 (555) 000-0000</a>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200 flex items-start gap-4">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-neutral-900">Visit Us</h3>
                <p className="text-sm text-neutral-500 mb-1">Come say hello at our office headquarters.</p>
                <p className="text-neutral-900 font-medium">100 Rental Way, Tech City, CA</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-neutral-200 p-8">
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Message sent!'); }}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-neutral-700 mb-2">First Name</label>
                  <input type="text" className="w-full h-11 px-4 rounded-lg bg-neutral-50 border border-neutral-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all outline-none" placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-neutral-700 mb-2">Last Name</label>
                  <input type="text" className="w-full h-11 px-4 rounded-lg bg-neutral-50 border border-neutral-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all outline-none" placeholder="Doe" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-neutral-700 mb-2">Email Address</label>
                <input type="email" className="w-full h-11 px-4 rounded-lg bg-neutral-50 border border-neutral-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all outline-none" placeholder="john@example.com" />
              </div>

              <div>
                <label className="block text-sm font-bold text-neutral-700 mb-2">Message</label>
                <textarea className="w-full h-32 p-4 rounded-lg bg-neutral-50 border border-neutral-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all outline-none resize-none" placeholder="How can we help you?"></textarea>
              </div>

              <button type="button" className="w-full md:w-auto px-8 py-3 bg-neutral-900 text-white font-bold rounded-xl hover:bg-black transition-all flex items-center justify-center gap-2">
                <Send className="w-4 h-4" /> Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUs
