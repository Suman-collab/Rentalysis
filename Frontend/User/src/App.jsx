// FILE: src/App.jsx
import React from 'react'
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Topbar from './components/layout/Topbar'
import Home from './pages/Home'
import Products from './pages/Products'
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderTrack from './pages/OrderTrack'
import Invoice from './pages/Invoice'
import Profile from './pages/Profile'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import Error404 from './pages/Error404'

// New Layout without Sidebar
const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-neutral-900 font-sans">
      <Topbar />
      <main className="pt-20 pb-12 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <Outlet />
      </main>
    </div>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<Layout />}>
          {/* Redirect root to Profile as per request, or Home if preferred. User asked for Profile after login. */}
          <Route path="/" element={<Navigate to="/profile" replace />} />

          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders/:id" element={<OrderTrack />} />
          <Route path="/invoices/:id" element={<Invoice />} />
          <Route path="/profile" element={<Profile />} />

          {/* Dashboard route removed/redirected as requested */}
          <Route path="/dashboard" element={<Navigate to="/profile" replace />} />

          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App