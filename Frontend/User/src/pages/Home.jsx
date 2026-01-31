// FILE: src/pages/Home.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { Search, ArrowRight, Star } from 'lucide-react'
import { products } from '../mock/data'

const Home = () => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative rounded-2xl overflow-hidden bg-neutral-900 text-white min-h-[400px] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=2000"
            alt="Hero Background"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 p-8 md:p-16 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Rent Products Easily.<br />
            <span className="text-blue-400">Save Money & Space.</span>
          </h1>
          <p className="text-lg text-neutral-300 mb-8 max-w-lg">
            Affordable rentals for electronics, tools, furniture, and more.
            Get what you need, only when you need it.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-lg">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3.5 h-5 w-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search cameras, drills, sofas..."
                className="w-full h-12 pl-10 pr-4 rounded-lg bg-white text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold bg-white px-0 rounded-md inline-block text-neutral-900">Browse Categories</h2>
          <Link to="/products" className="text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {['Electronics', 'Furniture', 'Tools', 'Audio', 'Camping', 'Fitness'].map((cat) => (
            <Link
              key={cat}
              to={`/products?category=${cat}`}
              className="group bg-white border border-neutral-200 rounded-xl p-6 text-center hover:border-blue-500 hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 bg-neutral-100 rounded-full mx-auto mb-3 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                <span className="text-xl font-bold text-neutral-400 group-hover:text-blue-600">
                  {cat[0]}
                </span>
              </div>
              <span className="font-semibold text-neutral-900">{cat}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-neutral-900">Featured Rentals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="bg-white border border-neutral-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow group flex flex-col"
            >
              <div className="aspect-[4/3] relative bg-neutral-100 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-neutral-900 shadow-sm flex items-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  {product.rating}
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <p className="text-xs text-blue-600 font-semibold mb-1 uppercase tracking-wide">{product.category}</p>
                <h3 className="font-bold text-neutral-900 mb-2 line-clamp-2">{product.name}</h3>
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-neutral-100">
                  <div className="flex flex-col">
                    <span className="text-xs text-neutral-500">from</span>
                    <div>
                      <span className="text-lg font-bold text-neutral-900">${product.price}</span>
                      <span className="text-sm text-neutral-500">/day</span>
                    </div>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded ${product.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                    {product.status === 'Available' ? 'Rent Now' : 'Waitlist'}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Value Prop Banner */}
      <section className="bg-blue-600 rounded-2xl p-8 md:p-12 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Why Buy When You Can Rent?</h2>
        <p className="text-blue-100 max-w-2xl mx-auto mb-8 text-lg">
          Join thousands of smart users who save money and reduce waste by renting high-quality equipment.
        </p>
        <Link to="/products" className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-neutral-100 transition-colors">
          Start Exploring <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  )
}

export default Home
