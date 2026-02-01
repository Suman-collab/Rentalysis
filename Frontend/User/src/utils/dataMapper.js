export const normalizeProduct = (data) => {
  if (!data) return null;

  // Handle images - backend sends array of image URLs
  let imageUrl = 'https://via.placeholder.com/400';
  if (data.images && Array.isArray(data.images) && data.images.length > 0) {
    // Get first image from array
    imageUrl = data.images[0];
  } else if (data.image) {
    imageUrl = data.image;
  } else if (data.image_url || data.img_url || data.thumbnail) {
    imageUrl = data.image_url || data.img_url || data.thumbnail;
  }

  // Handle prices - backend has daily_price, weekly_price, monthly_price
  const dailyPrice = Number(data.daily_price || data.dailyPrice || data.price) || 0;
  const weeklyPrice = Number(data.weekly_price || data.weeklyPrice || dailyPrice * 6) || 0;
  const monthlyPrice = Number(data.monthly_price || data.monthlyPrice || dailyPrice * 25) || 0;

  return {
    id: data.id || data._id,
    name: data.name || data.title || 'Untitled Product',
    brand: data.brand || 'Unknown',
    category: data.category || 'Uncategorized',
    image: imageUrl,
    images: data.images || (imageUrl ? [imageUrl] : []),
    price: dailyPrice, // Default to daily price for display
    daily_price: dailyPrice,
    weekly_price: weeklyPrice,
    monthly_price: monthlyPrice,
    quantity: Number(data.quantity || data.stock) || 0,
    rating: Number(data.rating) || 0,
    reviews: Number(data.reviews || data.review_count) || 0,
    description: data.description || '',
    availablePlans: data.available_plans || data.availablePlans || ['day', 'week', 'month'],
    specs: data.specs || {},
    vendorId: data.vendor_id || data.vendorId,
    status: data.status === 'Available' ? 'Available' : (data.quantity > 0 ? 'Available' : 'Unavailable')
  };
};

export const normalizeProductList = (list) => {
  if (!Array.isArray(list)) return [];
  return list.map(normalizeProduct);
};
