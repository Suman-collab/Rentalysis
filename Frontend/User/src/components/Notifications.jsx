import React, { useState } from 'react'
import { Bell } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Notifications = () => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Order #ORD-2023-8821 confirmed', time: '2 hours ago', unread: true },
    { id: 2, title: 'Rental period ending for Drill Set', time: '5 hours ago', unread: false },
    { id: 3, title: 'New Category: Camping Gear added', time: '1 day ago', unread: false }
  ])

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })))
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-neutral-600 hover:bg-neutral-100 rounded-full transition-colors"
      >
        <Bell className="w-5 h-5" />
        {notifications.some(n => n.unread) && (
          <span className="absolute top-1.5 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-xl border border-neutral-100 py-2 animate-in fade-in slide-in-from-top-2 z-50">
          <div className="px-4 py-3 border-b border-neutral-100 flex justify-between items-center">
            <h3 className="font-bold text-neutral-900 text-sm">Notifications</h3>
            <button onClick={handleMarkAllRead} className="text-xs text-blue-600 hover:underline">Mark all read</button>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {notifications.map(n => (
              <div key={n.id} className={`px-4 py-3 hover:bg-neutral-50 border-b border-neutral-50 last:border-0 ${n.unread ? 'bg-blue-50/50' : ''}`}>
                <p className="text-sm font-medium text-neutral-900 mb-0.5">{n.title}</p>
                <p className="text-xs text-neutral-500">{n.time}</p>
              </div>
            ))}
          </div>
          <div className="px-4 py-2 border-t border-neutral-100 text-center">
            <button onClick={() => { setIsOpen(false); navigate('/profile'); }} className="text-xs font-medium text-neutral-500 hover:text-neutral-900 text-center w-full">View all notifications</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Notifications
