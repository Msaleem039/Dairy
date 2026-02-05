'use client';

import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { food_list as fallback_food_list } from "../../assets/assets";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const [foodList, setFoodList] = useState([]);
  
  // Initialize state with empty values to avoid hydration mismatch
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  
  // Load from localStorage only on client side after mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cartItems');
      if (savedCart) {
        try {
          setCartItems(JSON.parse(savedCart));
        } catch (e) {
          console.error('Error parsing cart from localStorage:', e);
        }
      }
      
      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        setToken(savedToken);
      }
    }
  }, []);

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const addToCart = async (itemId) => {
    const newCart = !cartItems[itemId] 
      ? { ...cartItems, [itemId]: 1 }
      : { ...cartItems, [itemId]: cartItems[itemId] + 1 };
    
    setCartItems(newCart);
    
    if (token) {
      await axios.post(
        url + "/api/cart/add",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const removeFromCart = async (itemId) => {
    const newCart = { ...cartItems, [itemId]: cartItems[itemId] - 1 };
    setCartItems(newCart);
    
    if (token) {
      await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = (foodList || []).find((product) => product._id === item);
        if (!itemInfo) continue;
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(url + "/api/food/list");
      if (response?.data?.success && Array.isArray(response?.data?.data)) {
        setFoodList(response.data.data);
      } else if (Array.isArray(response?.data?.data?.data)) {
        // extra-safety for inconsistent shapes
        setFoodList(response.data.data.data);
      } else {
        setFoodList([]);
      }
    } catch {
      // keep UX alive even if API is down
      setFoodList([]);
    }
  };

  const loadCartData = async (token) => {
    const response = await axios.post(
      url + "/api/cart/get",
      {},
      { headers: { token } }
    );
    setCartItems(response.data.cartData || {});
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      // Token is already loaded from localStorage in the first useEffect
      if (token) {
        await loadCartData(token);
      }
    }
    loadData();
  }, [token]);

  const contextValue = {
    // Use API list if available, otherwise fall back to bundled seed list
    food_list: (foodList && foodList.length > 0) ? foodList : fallback_food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
