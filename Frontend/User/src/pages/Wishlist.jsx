import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Trash2, ShoppingCart, AlertCircle, Heart } from 'lucide-react'
import { useWishlist } from '../context/WishlistContext'

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist()
  const navigate = useNavigate()

  if (wishlist.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mb-6">
          <Heart className="w-10 h-10 text-neutral-300 fill-neutral-300" />
        </div>
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">Your wishlist is empty</h2>
        <p className="text-neutral-500 mb-8 max-w-md">
          Explore our wide range of premium rental products and save your favorites here.
        </p>
        <Link
          to="/products"
          className="px-8 py-3 bg-neutral-900 text-white font-bold rounded-xl hover:bg-black transition-colors"
        >
          Explore Products
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-neutral-900 mb-8 flex items-center gap-3">
        My Wishlist
        <span className="text-lg font-medium text-neutral-500 bg-neutral-100 px-3 py-1 rounded-full">
          {wishlist.length} items
        </span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
            {/* Image */}
            <div className="relative h-64 overflow-hidden bg-neutral-100">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <button
                onClick={() => removeFromWishlist(item.id)}
                className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full text-neutral-500 hover:text-red-500 hover:bg-white transition-colors"
                title="Remove"
              >
                <Trash2 className="w-5 h-5" />
              </button>

              {/* Status Badge */}
              <div className="absolute top-4 left-4">
                {item.status === 'Rented' ? (
                  <span className="bg-neutral-900/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
                    Rented Out
                  </span>
                ) : (
                  <span className="bg-green-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
                    Available
                  </span>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              <div className="mb-4">
                <p className="text-xs font-bold text-blue-600 mb-1">{item.category}</p>
                <Link to={`/products/${item.id}`} className="block">
                  <h3 className="font-bold text-lg text-neutral-900 mb-1 hover:text-blue-600 transition-colors line-clamp-1">{item.name}</h3>
                </Link>
                <p className="text-neutral-500 text-sm">₹{item.price}/{item.unit}</p>
              </div>

              {/* Action */}
              <div>
                {item.status === 'Rented' ? (
                  <button className="w-full py-3 bg-neutral-100 text-neutral-500 font-bold rounded-xl text-sm flex items-center justify-center gap-2 cursor-not-allowed">
                    <AlertCircle className="w-4 h-4" /> Notify Me When Available
                  </button>
                ) : (
                  <button
                    onClick={() => navigate('/cart')}
                    className="w-full py-3 bg-neutral-900 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-black transition-colors"
                  >
                    <ShoppingCart className="w-4 h-4" /> Add to Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Wishlist
