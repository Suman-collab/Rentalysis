// FILE: src/pages/Home.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { Search, ArrowRight, ShieldCheck, Clock, CreditCard, RotateCcw, Monitor, Camera, Hammer, Armchair, Laptop } from 'lucide-react'
import { products } from '../mock/data'

const Home = () => {
  // Select products for hero grid
  const heroProducts = products.slice(0, 4)

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <section className="bg-white pt-8 pb-4 md:pt-12 md:pb-8 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

        {/* Left: Text & Actions */}
        <div className="flex-1 max-w-2xl space-y-8">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-neutral-900 tracking-tight leading-[1.1] mb-6">
              Rent Equipment.<br />
              Save Money.<br />
              Return Easily.
            </h1>
            <p className="text-lg text-neutral-600 leading-relaxed max-w-lg">
              Rent cameras, tools, and equipment from verified vendors for short or long durations.
              No commitment, just convenient access to what you need.
            </p>
          </div>

          <div className="relative max-w-md">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search cameras, tools, drones..."
              className="w-full h-12 pl-12 pr-4 rounded-xl bg-neutral-100 border-transparent focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-base shadow-sm"
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <Link to="/products" className="px-6 py-3 bg-neutral-900 text-white font-bold rounded-xl hover:bg-black transition-colors shadow-lg shadow-neutral-200">
              Browse Categories
            </Link>
            <button className="px-6 py-3 bg-white border border-neutral-200 text-neutral-700 font-bold rounded-xl hover:bg-neutral-50 transition-colors">
              View Popular Rentals
            </button>
          </div>
        </div>

        {/* Right: Product Grid Visual */}
        <div className="flex-1 w-full max-w-xl">
          <div className="grid grid-cols-2 gap-4 relative">
            {/* Decorative background blob */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 to-indigo-50 rounded-full blur-3xl -z-10 transform scale-110" />

            {heroProducts.map((product) => (
              <Link to={`/products/${product.id}`} key={product.id} className="bg-white p-3 rounded-2xl border border-neutral-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="aspect-[4/3] bg-neutral-50 rounded-xl mb-3 overflow-hidden relative">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-2 right-2 bg-white/95 backdrop-blur-sm px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide text-green-700 shadow-sm">
                    Available
                  </span>
                </div>
                <div className="flex items-start justify-between gap-3 px-1">
                  <div>
                    <h3 className="font-bold text-neutral-900 text-sm line-clamp-1 group-hover:text-blue-600 transition-colors">{product.name}</h3>
                    <p className="text-xs text-neutral-500 capitalize mt-0.5">{product.category}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="block font-bold text-neutral-900 text-sm">${product.price}</span>
                    <span className="block text-[10px] text-neutral-400">/day</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="bg-white rounded-2xl border border-neutral-100 p-8 shadow-sm">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-neutral-900 text-sm">Verified Vendors</h4>
              <p className="text-xs text-neutral-500 mt-0.5">Quality checked partners</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-neutral-900 text-sm">Flexible Duration</h4>
              <p className="text-xs text-neutral-500 mt-0.5">Rent for days or months</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-neutral-900 text-sm">Secure Payments</h4>
              <p className="text-xs text-neutral-500 mt-0.5">100% safe transactions</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-neutral-900 text-sm">Easy Returns</h4>
              <p className="text-xs text-neutral-500 mt-0.5">Hassle-free process</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-neutral-900">Browse Categories</h2>
          <Link to="/products" className="text-blue-600 font-bold hover:underline flex items-center gap-1 text-sm">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { name: 'Electronics', icon: Monitor },
            { name: 'Photography', icon: Camera },
            { name: 'Tools', icon: Hammer },
            { name: 'Furniture', icon: Armchair },
            { name: 'Computers', icon: Laptop },
          ].map((cat) => (
            <Link
              key={cat.name}
              to={`/products?category=${cat.name}`}
              className="group bg-white p-6 rounded-2xl border border-neutral-200 hover:border-blue-500 hover:shadow-md transition-all flex flex-col items-center justify-center gap-4 text-center"
            >
              <div className="w-12 h-12 bg-neutral-50 rounded-full flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors text-neutral-600">
                <cat.icon className="w-6 h-6" />
              </div>
              <span className="font-bold text-neutral-900 text-sm">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Rentals */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-neutral-900">Featured Rentals</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="aspect-[4/3] relative bg-neutral-100 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-neutral-900">
                  ${product.price}/{product.unit}
                </div>
              </div>
              <div className="p-5">
                <p className="text-xs text-blue-600 font-bold uppercase mb-1">{product.category}</p>
                <h3 className="font-bold text-neutral-900 mb-4 line-clamp-2">{product.name}</h3>
                <button className="w-full py-2.5 rounded-lg border border-neutral-200 font-bold text-sm text-neutral-700 group-hover:bg-neutral-900 group-hover:text-white group-hover:border-transparent transition-all">
                  View Details
                </button>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200 pt-16 pb-8 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <h4 className="text-xl font-bold text-neutral-900 mb-4 flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center text-white text-xs">R</div>
              Rentalysis.
            </h4>
            <p className="text-neutral-500 text-sm leading-relaxed">
              The modern way to rent equipment. Secure, fast, and reliable.
            </p>
          </div>
          <div>
            <h5 className="font-bold text-neutral-900 mb-4">Platform</h5>
            <ul className="space-y-2 text-sm text-neutral-500">
              <li><Link to="/products" className="hover:text-blue-600">Browse All</Link></li>
              <li><Link to="/categories" className="hover:text-blue-600">Categories</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-neutral-900 mb-4">Support</h5>
            <ul className="space-y-2 text-sm text-neutral-500">
              <li><Link to="/help" className="hover:text-blue-600">Help Center</Link></li>
              <li><Link to="/terms" className="hover:text-blue-600">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-neutral-900 mb-4">Contact</h5>
            <p className="text-sm text-neutral-500 mb-2">support@rentalysis.com</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
