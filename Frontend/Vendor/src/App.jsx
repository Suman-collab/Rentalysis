import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import DashboardLayout from './layouts/DashboardLayout'
import Dashboard from './pages/dashboard/Dashboard'
import Inventory from './pages/dashboard/Inventory'
import Orders from './pages/dashboard/Orders'
import Invoices from './pages/dashboard/Invoices'
import Analytics from './pages/dashboard/Analytics'
import Settings from './pages/dashboard/Settings'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Dashboard Routes */}
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="orders" element={<Orders />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App