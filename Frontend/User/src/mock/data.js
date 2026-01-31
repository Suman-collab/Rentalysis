// FILE: src/mock/data.js
export const products = [
  {
    id: '1',
    name: 'Industrial Excavator X200',
    category: 'Heavy Machinery',
    price: 4500,
    unit: 'day',
    status: 'Available',
    image: 'https://placehold.co/600x400',
    description: 'High-performance excavator suitable for large construction sites.'
  },
  {
    id: '2',
    name: 'Professional Drilling Rig',
    category: 'Drilling',
    price: 2800,
    unit: 'day',
    status: 'Rented',
    image: 'https://placehold.co/600x400',
    description: 'Reliable drilling rig for deep foundation work.'
  },
  {
    id: '3',
    name: 'Scaffolding Set (Large)',
    category: 'Construction',
    price: 150,
    unit: 'day',
    status: 'Available',
    image: 'https://placehold.co/600x400',
    description: 'Complete scaffolding set for multi-story buildings.'
  },
  {
    id: '4',
    name: 'Diesel Generator 50kVA',
    category: 'Power',
    price: 300,
    unit: 'day',
    status: 'Maintenance',
    image: 'https://placehold.co/600x400',
    description: 'Silent diesel generator for backup power supply.'
  },
  {
    id: '5',
    name: 'Concrete Mixer Truck',
    category: 'Transport',
    price: 1200,
    unit: 'day',
    status: 'Available',
    image: 'https://placehold.co/600x400',
    description: 'Heavy-duty mixer truck for transporting concrete.'
  }
]

export const orders = [
  {
    id: 'ORD-2023-001',
    date: '2023-10-15',
    total: 9000,
    status: 'Completed',
    paymentStatus: 'Paid',
    items: [
      { productId: '1', name: 'Industrial Excavator X200', quantity: 1, duration: 2 }
    ]
  },
  {
    id: 'ORD-2023-002',
    date: '2023-11-02',
    total: 2800,
    status: 'Active',
    paymentStatus: 'Pending',
    items: [
      { productId: '2', name: 'Professional Drilling Rig', quantity: 1, duration: 1 }
    ]
  },
  {
    id: 'quotation-001',
    date: '2023-11-20',
    total: 1200,
    status: 'Quotation',
    paymentStatus: 'Unpaid',
    items: [
      { productId: '5', name: 'Concrete Mixer Truck', quantity: 1, duration: 1 }
    ]
  }
]

export const cartItems = [
  {
    id: 'c1',
    product: products[0],
    quantity: 1,
    duration: 3,
    startDate: '2023-12-01',
    endDate: '2023-12-03'
  }
]
