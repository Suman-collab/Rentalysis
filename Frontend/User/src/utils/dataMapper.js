export const normalizeProduct = (data) => {
  if (!data) return null;

  return {
    id: data.id || data._id,
    name: data.name || data.title || 'Untitled Product',
    category: data.category || 'Uncategorized',
    image: data.image || data.image_url || data.img_url || data.thumbnail || 'https://via.placeholder.com/400',
    price: Number(data.price) || 0,
    rating: Number(data.rating) || 0,
    reviews: Number(data.reviews || data.review_count) || 0,
    description: data.description || '',
    availablePlans: data.available_plans || data.availablePlans || ['day', 'week', 'month'],
    specs: data.specs || {},
    vendorId: data.vendor_id || data.vendorId,
    status: data.status || 'available'
  };
};

export const normalizeProductList = (list) => {
  if (!Array.isArray(list)) return [];
  return list.map(normalizeProduct);
};
