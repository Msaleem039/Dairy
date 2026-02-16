/**
 * Utility function to get normalized API base URL
 * Works correctly in both development and production environments
 * Handles SSR (Server-Side Rendering) safely
 */
export const getApiBaseUrl = () => {
  // Get base URL from environment variable
  let baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.dairydelightcheese.com';
  
  // Remove trailing /api if it exists (we'll append it in requests)
  if (baseUrl.endsWith('/api')) {
    baseUrl = baseUrl.slice(0, -4);
  }
  
  // Remove trailing slash
  baseUrl = baseUrl.replace(/\/$/, '');
  
  return baseUrl;
};

/**
 * Get full API URL for a specific endpoint
 * @param {string} endpoint - API endpoint (e.g., '/api/food/list')
 * @returns {string} Full API URL
 */
export const getApiUrl = (endpoint) => {
  const baseUrl = getApiBaseUrl();
  // Ensure endpoint starts with /
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${baseUrl}${normalizedEndpoint}`;
};

/**
 * Get full image URL from backend
 * Handles both full URLs and relative image paths
 * @param {string|object} image - Image path or object
 * @param {string} fallback - Fallback image path (default: '/upload_area.png')
 * @returns {string} Full image URL
 */
export const getImageUrl = (image, fallback = '/upload_area.png') => {
  // If no image provided, return fallback
  if (!image) return fallback;
  
  // If image is already a full URL (http:// or https://), return as-is
  if (typeof image === 'string' && (image.startsWith('http://') || image.startsWith('https://'))) {
    return image;
  }
  
  // If image is an object with src property, use that
  if (typeof image === 'object' && image?.src) {
    return getImageUrl(image.src, fallback);
  }
  
  // If image is a string (filename), construct full URL
  if (typeof image === 'string') {
    const baseUrl = getApiBaseUrl();
    // Remove leading slash if present to avoid double slashes
    const imagePath = image.startsWith('/') ? image.slice(1) : image;
    return `${baseUrl}/images/${imagePath}`;
  }
  
  // Fallback for any other case
  return fallback;
};


