import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Get base URL from environment variable, with proper normalization
// This function normalizes the URL for both local and production environments
const getBaseUrl = () => {
  // NEXT_PUBLIC_ variables are available on both server and client
  let baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.dairydelightcheese.com';
  
  // Remove trailing /api if it exists (we'll add it in the endpoints)
  if (baseUrl.endsWith('/api')) {
    baseUrl = baseUrl.slice(0, -4);
  }
  
  // Remove trailing slash
  baseUrl = baseUrl.replace(/\/$/, '');
  
  return baseUrl;
};

// Create base query with proper error handling
const baseQuery = fetchBaseQuery({
  baseUrl: getBaseUrl(),
  prepareHeaders: (headers, { getState }) => {
    // Get token from localStorage (client-side only)
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('token', token);
      }
    }
    return headers;
  },
});

// Base query with reauth logic for better error handling
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  
  // Handle 401 errors (unauthorized) - could add token refresh logic here
  if (result.error && result.error.status === 401) {
    // Optionally clear token and redirect to login
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  }
  
  return result;
};

// Create API slice
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Food', 'Cart', 'Order', 'User'],
  endpoints: (builder) => ({
    // Food endpoints
    getFoodList: builder.query({
      query: () => '/api/food/list',
      transformResponse: (response) => {
        // Handle different response shapes
        if (response?.success && Array.isArray(response?.data)) {
          return response.data;
        } else if (Array.isArray(response?.data?.data)) {
          return response.data.data;
        }
        return [];
      },
      providesTags: ['Food'],
    }),
    
    // User endpoints
    login: builder.mutation({
      query: (credentials) => ({
        url: '/api/user/login',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (response) => {
        if (response?.success && response?.token) {
          // Store token in localStorage
          if (typeof window !== 'undefined') {
            localStorage.setItem('token', response.token);
          }
        }
        return response;
      },
      invalidatesTags: ['User'],
    }),
    
    // Cart endpoints
    getCart: builder.query({
      query: () => ({
        url: '/api/cart/get',
        method: 'POST',
        body: {},
      }),
      transformResponse: (response) => {
        return response?.cartData || {};
      },
      providesTags: ['Cart'],
    }),
    
    addToCart: builder.mutation({
      query: (itemId) => ({
        url: '/api/cart/add',
        method: 'POST',
        body: { itemId },
      }),
      invalidatesTags: ['Cart'],
    }),
    
    removeFromCart: builder.mutation({
      query: (itemId) => ({
        url: '/api/cart/remove',
        method: 'POST',
        body: { itemId },
      }),
      invalidatesTags: ['Cart'],
    }),
    
    // Order endpoints
    placeOrder: builder.mutation({
      query: (orderData) => ({
        url: '/api/order/place',
        method: 'POST',
        body: orderData,
      }),
      invalidatesTags: ['Order', 'Cart'],
    }),
    
    getOrders: builder.query({
      query: () => '/api/order/list',
      transformResponse: (response) => {
        if (response?.success && Array.isArray(response?.data)) {
          return response.data;
        }
        return [];
      },
      providesTags: ['Order'],
    }),
    
    getDeliveredOrders: builder.query({
      query: () => '/api/order/delivered',
      transformResponse: (response) => {
        if (response?.success && Array.isArray(response?.data)) {
          return response.data;
        }
        return [];
      },
      providesTags: ['Order'],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetFoodListQuery,
  useLoginMutation,
  useGetCartQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  usePlaceOrderMutation,
  useGetOrdersQuery,
  useGetDeliveredOrdersQuery,
} = apiSlice;

