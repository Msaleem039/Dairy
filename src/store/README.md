# RTK Query Setup

This directory contains the Redux Toolkit Query (RTK Query) setup for the application. RTK Query provides a robust, production-ready data fetching and caching solution that works seamlessly in both local and production environments.

## Files

- `apiSlice.js` - Contains all API endpoints and RTK Query configuration
- `store.js` - Redux store configuration
- `StoreProvider.jsx` - React provider component for Redux store
- `hooks.js` - Re-exported hooks for easier imports

## Features

✅ **Environment-aware base URL** - Automatically handles local and production API URLs  
✅ **Automatic token management** - Automatically includes auth token in requests  
✅ **Error handling** - Handles 401 errors and token expiration  
✅ **Caching** - Automatic caching and invalidation with tags  
✅ **TypeScript ready** - Easy to add TypeScript types later  
✅ **SSR compatible** - Works with Next.js server-side rendering  

## Usage Example

### Using Query Hooks (for fetching data)

```jsx
import { useGetFoodListQuery } from '@/store/hooks';

function FoodList() {
  const { data, isLoading, error } = useGetFoodListQuery();
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      {data.map(item => (
        <div key={item._id}>{item.name}</div>
      ))}
    </div>
  );
}
```

### Using Mutation Hooks (for creating/updating data)

```jsx
import { useLoginMutation } from '@/store/hooks';

function LoginForm() {
  const [login, { isLoading, error }] = useLoginMutation();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await login({ email, password }).unwrap();
      // Handle success
    } catch (err) {
      // Handle error
    }
  };
  
  return <form onSubmit={handleSubmit}>...</form>;
}
```

## Available Hooks

- `useGetFoodListQuery()` - Fetch food items
- `useLoginMutation()` - User login
- `useGetCartQuery()` - Fetch user cart
- `useAddToCartMutation(itemId)` - Add item to cart
- `useRemoveFromCartMutation(itemId)` - Remove item from cart
- `usePlaceOrderMutation(orderData)` - Place an order
- `useGetOrdersQuery()` - Fetch all orders
- `useGetDeliveredOrdersQuery()` - Fetch delivered orders

## Environment Variables

Set `NEXT_PUBLIC_API_URL` in your `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

For production:
```env
NEXT_PUBLIC_API_URL=https://api.dairydelightcheese.com
```

The setup automatically normalizes the URL (removes trailing `/api` if present).

## Migration from Axios

The existing `StoreContext` still works alongside RTK Query. You can gradually migrate components to use RTK Query hooks instead of the context API.




