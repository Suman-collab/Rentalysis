// FILE: src/mock/data.js
export const products = [
  {
    id: '1',
    name: 'Sony Alpha A7 IV Mirrorless Camera',
    category: 'Electronics',
    price: 45,
    unit: 'day',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=1000',
    rating: 4.8,
    reviews: 124,
    description: 'Professional-grade mirrorless camera with 33MP sensor, advanced autofocus, and 4K 60p video recording. Ideal for weddings, events, and high-end content creation.'
  },

  {
    id: '3',
    name: 'Herman Miller Aeron Chair',
    category: 'Furniture',
    price: 12,
    unit: 'day',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&q=80&w=1000',
    rating: 4.7,
    reviews: 342,
    description: 'The benchmark for ergonomic seating. Fully adjustable and breathable mesh.'
  },
  {
    id: '4',
    name: 'Makita Power Drill Set',
    category: 'Tools',
    price: 15,
    unit: 'day',
    status: 'Rented',
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=1000',
    rating: 4.6,
    reviews: 56,
    description: 'Complete cordless drill kit with two batteries and charger.'
  },
  {
    id: '5',
    name: 'DJI Mavic 3 Pro Drone',
    category: 'Electronics',
    price: 120,
    unit: 'day',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&q=80&w=1000',
    rating: 4.9,
    reviews: 78,
    description: 'Triple-camera system drone with Hasselblad main camera for cinematic footage.'
  },
  {
    id: '6',
    name: 'Bose QuietComfort Ultra',
    category: 'Audio',
    price: 18,
    unit: 'day',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=1000',
    rating: 4.7,
    reviews: 210,
    description: 'World-class noise cancellation and spatial audio.'
  }
]

export const orders = [
  {
    id: 'ORD-2023-8821',
    date: 'Oct 12, 2023',
    endDate: 'Oct 20, 2023',
    total: 425.00,
    status: 'Active',
    paymentStatus: 'Paid',
    items: [
      { productId: '1', name: 'Professional DSLR Kit', image: products[0].image, quantity: 1, duration: 8 }
    ],
    timeline: [
      { status: 'Quotation', date: 'Oct 10, 09:45 AM', active: true, completed: true },
      { status: 'Confirmed', date: 'Oct 11, 02:15 PM', active: true, completed: true },
      { status: 'Picked Up', date: 'Oct 12, 11:00 AM', active: true, completed: true },
      { status: 'Active', date: 'In Progress', active: true, completed: false },
      { status: 'Returned', date: 'Scheduled Oct 20', active: false, completed: false }
    ]
  },
  {
    id: 'ORD-2023-8805',
    date: 'Sep 28, 2023',
    endDate: 'Oct 05, 2023',
    total: 120.50,
    status: 'Completed',
    paymentStatus: 'Paid',
    items: [
      { productId: '4', name: 'Makita Power Drill', image: products[3].image, quantity: 1, duration: 7 }
    ],
    timeline: [
      { status: 'Quotation', date: 'Sep 25, 10:00 AM', active: true, completed: true },
      { status: 'Confirmed', date: 'Sep 26, 01:00 PM', active: true, completed: true },
      { status: 'Picked Up', date: 'Sep 28, 09:00 AM', active: true, completed: true },
      { status: 'Active', date: 'Sep 28 - Oct 05', active: true, completed: true },
      { status: 'Returned', date: 'Oct 05, 05:00 PM', active: true, completed: true }
    ]
  },
  {
    id: 'ORD-2023-7500',
    date: 'Aug 15, 2023',
    endDate: 'Aug 22, 2023',
    total: 350.00,
    status: 'Past',
    paymentStatus: 'Paid',
    items: [
      { productId: '5', name: 'DJI Mavic 3 Pro Drone', image: products[4].image, quantity: 1, duration: 7 }
    ],
    timeline: [
      { status: 'Quotation', date: 'Aug 10, 09:00 AM', active: true, completed: true },
      { status: 'Confirmed', date: 'Aug 11, 10:00 AM', active: true, completed: true },
      { status: 'Picked Up', date: 'Aug 15, 11:00 AM', active: true, completed: true },
      { status: 'Active', date: 'Aug 15 - Aug 22', active: true, completed: true },
      { status: 'Returned', date: 'Aug 22, 04:00 PM', active: true, completed: true }
    ]
  },
  {
    id: 'ORD-2023-9900',
    date: 'Nov 01, 2023',
    endDate: 'Nov 05, 2023',
    total: 85.00,
    status: 'Cancelled',
    paymentStatus: 'Refunded',
    items: [
      { productId: '3', name: 'Herman Miller Aeron Chair', image: products[1].image, quantity: 1, duration: 4 }
    ],
    timeline: [
      { status: 'Quotation', date: 'Oct 30, 02:00 PM', active: true, completed: true },
      { status: 'Cancelled', date: 'Nov 01, 09:00 AM', active: true, completed: true }
    ]
  }
]

export const invoices = [
  {
    id: 'INV-2023-0891',
    date: 'Oct 14, 2023',
    dueDate: 'Oct 14, 2023',
    amount: 286.40,
    status: 'Paid',
    items: [
      { description: 'MacBook Pro 16" (M2 Max) - 2 days', amount: 158.00 },
      { description: 'Herman Miller Aeron Chair - 2 days', amount: 44.00 },
      { description: 'Dell 32" 4K Monitor - 2 days', amount: 35.00 }
    ],
    subtotal: 200.00,
    tax: 20.70,
    serviceFee: 15.00,
    insurance: 15.00,
    customer: {
      name: 'Johnathan Smith',
      email: 'j.smith@rentals.com',
      address: '123 Business Park, Silicon Valley'
    }
  }
]

export const cartItems = [

  {
    id: 'c2',
    product: products[3],
    quantity: 2,
    duration: 3,
    price: 30.00,
    startDate: 'Oct 17, 2023',
    endDate: 'Oct 20, 2023'
  }
]
