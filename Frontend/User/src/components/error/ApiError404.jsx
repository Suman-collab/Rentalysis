
import React from 'react'
import { Link2Off, RotateCw, Home, AlertCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const ApiError404 = () => {
  const navigate = useNavigate()

  const handleRetry = () => {
    window.location.reload()
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4 animate-in fade-in zoom-in duration-500">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-neutral-200 p-8 text-center relative overflow-hidden">

        {/* Decorative Background Element */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-neutral-300 to-blue-500" />

        {/* Floating Icon */}
        <div className="mx-auto w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6 relative group">
          <div className="absolute inset-0 bg-red-100 rounded-full animate-ping opacity-20 duration-1000" />
          <Link2Off className="w-10 h-10 text-red-500 relative z-10 transition-transform duration-700 ease-in-out group-hover:rotate-12" />
          <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 border border-neutral-100 shadow-sm">
            <AlertCircle className="w-4 h-4 text-red-600 fill-white" />
          </div>
        </div>

        {/* Content */}
        <h1 className="text-4xl font-bold text-neutral-900 mb-2 tracking-tight">404</h1>
        <h2 className="text-xl font-semibold text-neutral-800 mb-4">Invalid API Endpoint</h2>

        <p className="text-sm text-neutral-500 mb-8 leading-relaxed">
          The requested resource could not be found. The link might be broken or the resource moved.
          Please check your URL syntax or refer to our documentation.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
          <button
            onClick={handleRetry}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 active:scale-95 transition-all shadow-sm shadow-blue-200"
          >
            <RotateCw className="w-4 h-4" />
            Retry
          </button>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-neutral-100 text-neutral-700 text-sm font-medium rounded-lg hover:bg-neutral-200 active:scale-95 transition-all border border-neutral-200"
          >
            <Home className="w-4 h-4" />
            Return to Home
          </button>
        </div>

        {/* Footer Info */}
        <div className="pt-6 border-t border-neutral-50 flex items-center justify-between text-xs font-mono text-neutral-400">
          <span>ERROR ID: ERR_404_API_MISSING</span>
          <span>V2.4.1</span>
        </div>
      </div>
    </div>
  )
}

export default ApiError404
