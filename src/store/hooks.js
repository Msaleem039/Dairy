// Re-export RTK Query hooks for easier imports
export {
  useGetFoodListQuery,
  useLoginMutation,
  useGetCartQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  usePlaceOrderMutation,
  useGetOrdersQuery,
  useGetDeliveredOrdersQuery,
} from './apiSlice';

// Re-export Redux hooks
export { useDispatch, useSelector } from 'react-redux';

