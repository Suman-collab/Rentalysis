// FILE: src/pages/Home.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { Search, ArrowRight, ShieldCheck, Clock, CreditCard, RotateCcw, Monitor, Camera, Hammer, Armchair, Laptop } from 'lucide-react'

import { products } from '../mock/data'
import logo from '../assets/logo.png'

const Home = () => {
  // Select products for hero grid
  const heroProducts = products.slice(0, 4)

  return (
    <div className="space-y-12 md:space-y-20 pb-12 animate-in fade-in duration-700 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative w-full">
        {/* Background gradient blur - Resized for mobile */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-blue-50/50 rounded-full blur-[60px] md:blur-[100px] -z-10" />

        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24 pt-4 md:pt-16 pb-8">

          {/* Left: Text & Actions */}
          <div className="flex-1 w-full space-y-6 md:space-y-8 lg:max-w-3xl text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold text-neutral-900 tracking-tight leading-[1.1] md:leading-[1.05]">
              Where Quality<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">meets Convenience</span>
            </h1>

            <p className="text-lg md:text-xl text-neutral-500 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium px-2 md:px-0">
              Access premium cameras, tools, and tech from verified vendors.
              The flexible, sustainable way to get what you need.
            </p>



            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 text-sm font-medium text-neutral-500 pt-2">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-neutral-200 overflow-hidden">
                    <img src={`https://randomuser.me/api/portraits/men/${i + 10}.jpg`} alt="" />
                  </div>
                ))}
                <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-50 flex items-center justify-center text-[10px] font-bold text-blue-600">+2k</div>
              </div>
              <p>Trusted by creators worldwide</p>
            </div>
          </div>

          {/* Right: Product Grid Visual */}
          <div className="flex-1 w-full max-w-md lg:max-w-full lg:px-0 px-4">
            <div className="grid grid-cols-2 gap-3 md:gap-4 lg:gap-6 relative isolate mb-8 lg:mb-12">
              {/* Decorative background shape */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-50/50 via-white to-purple-50/20 rounded-[2rem] -z-10 rotate-3 scale-105" />

              {heroProducts.map((product, idx) => (
                <Link
                  to={`/products/${product.id}`}
                  key={product.id}
                  className={`bg-white p-2 md:p-3 rounded-xl md:rounded-2xl border border-neutral-100 shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-2 hover:z-30 relative group`}
                >
                  <div className="aspect-[5/4] bg-neutral-50 rounded-lg md:rounded-xl mb-2 md:mb-3 overflow-hidden relative">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                    <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-[10px] md:text-xs font-bold shadow-sm">
                      ₹{product.price}/day
                    </div>
                  </div>
                  <div className="px-1">
                    <h3 className="font-bold text-neutral-900 text-xs md:text-sm line-clamp-1 group-hover:text-blue-600 transition-colors">{product.name}</h3>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-[10px] text-neutral-500 uppercase tracking-wide truncate">{product.category}</p>
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0 ml-1"></div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals (Full Width Strip) */}
      <section className="border-y border-neutral-100 bg-neutral-50/50 py-8 md:py-10 -mx-4 md:-mx-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:flex lg:justify-between gap-6 md:gap-8 lg:gap-12">
          {[
            { icon: ShieldCheck, title: "Verified Vendors", desc: "100% Vetted Partners" },
            { icon: Clock, title: "Flexible Duration", desc: "Rent for days or months" },
            { icon: CreditCard, title: "Secure Payments", desc: "Protected transactions" },
            { icon: RotateCcw, title: "Easy Returns", desc: "Doorstep pickup" }
          ].map((item, i) => (
            <div key={i} className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 md:gap-4 group cursor-default">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl md:rounded-2xl border border-neutral-200 flex items-center justify-center text-neutral-400 group-hover:text-blue-600 group-hover:border-blue-200 group-hover:scale-110 transition-all duration-300 shadow-sm">
                <item.icon className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div>
                <h4 className="font-bold text-neutral-900 text-sm group-hover:text-blue-900 transition-colors">{item.title}</h4>
                <p className="text-xs text-neutral-500 hidden sm:block">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="pt-4 md:pt-8">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-neutral-900">Browse Categories</h2>

        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
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
              className="group bg-white p-4 md:p-8 rounded-2xl md:rounded-3xl border border-neutral-200 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 flex flex-col items-center justify-center gap-3 md:gap-4 text-center aspect-square md:aspect-auto"
            >
              <div className="w-10 h-10 md:w-14 md:h-14 bg-neutral-50 rounded-xl md:rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 transform group-hover:-translate-y-1 text-neutral-600">
                <cat.icon className="w-5 h-5 md:w-7 md:h-7" />
              </div>
              <span className="font-bold text-neutral-900 text-xs md:text-sm">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Rentals */}
      <section>
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-neutral-900">Featured Rentals</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {heroProducts.map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="group block"
            >
              <div className="bg-white rounded-2xl md:rounded-3xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-neutral-200/50 transition-all duration-500 h-full flex flex-col">
                <div className="aspect-[4/3] relative bg-neutral-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-neutral-900 shadow-sm border border-white/50">
                    ₹{product.price} <span className="text-neutral-500 font-normal">/ day</span>
                  </div>
                </div>
                <div className="p-4 md:p-6 flex flex-col flex-1">
                  <p className="text-xs text-blue-600 font-bold uppercase tracking-wider mb-2">{product.category}</p>
                  <h3 className="font-bold text-base md:text-lg text-neutral-900 mb-2 md:mb-3 line-clamp-1 group-hover:text-blue-600 transition-colors">{product.name}</h3>
                  <div className="flex items-center gap-1 text-sm text-neutral-500 mt-auto">
                    <span className="text-yellow-400">★</span>
                    <span className="font-medium text-neutral-900">{product.rating}</span>
                    <span>({product.reviews})</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200 pt-12 md:pt-16 pb-8 mt-16 md:mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12 text-center md:text-left">
          <div className="col-span-1 md:col-span-1">
            <div className="mb-4">
              <img src={logo} alt="Rentalysis" className="h-10 w-auto mx-auto md:mx-0" />
            </div>
            <p className="text-neutral-500 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
              The modern way to rent equipment. Secure, fast, and reliable platform for verified rentals.
            </p>
          </div>
          <div>
            <h5 className="font-bold text-neutral-900 mb-4 text-sm uppercase tracking-wide">Platform</h5>
            <ul className="space-y-3 text-sm text-neutral-500">
              <li><Link to="/products" className="hover:text-black transition-colors">Browse All</Link></li>
              <li><Link to="/categories" className="hover:text-black transition-colors">Categories</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-neutral-900 mb-4 text-sm uppercase tracking-wide">Support</h5>
            <ul className="space-y-3 text-sm text-neutral-500">
              <li><Link to="/help" className="hover:text-black transition-colors">Help Center</Link></li>
              <li><Link to="/terms" className="hover:text-black transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-neutral-900 mb-4 text-sm uppercase tracking-wide">Contact</h5>
            <p className="text-sm text-neutral-500 mb-2">support@rentalysis.com</p>
          </div>
        </div>
        <div className="text-center text-xs text-neutral-400 border-t border-neutral-100 pt-8">
          &copy; 2024 Rentalysis Inc. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default Home
