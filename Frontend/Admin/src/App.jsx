import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Placeholder for Admin Dashboard */}
        <Route path="/" element={<div className="p-10 font-bold text-center">Admin Dashboard Placeholder - <Link to="/login" className="text-blue-600">Login</Link></div>} />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App