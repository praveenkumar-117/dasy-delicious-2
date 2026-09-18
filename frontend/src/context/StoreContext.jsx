import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");

  // Cart items
  // Example:
  // {
  //   "foodId": 2,
  //   "foodId2": 1
  // }
  const [cartItems, setCartItems] = useState({});
  const [food_list, setFoodList] = useState([]);

  //fetch foodlist
  const fetchFoodList = async () => {
    try {
      const response = await axios.get(
        "http://localhost:7000/api/admin/food/list",
      );

      setFoodList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadCartData = async () => {
    if (!token) return;

    try {
      const response = await axios.get("http://localhost:7000/api/cart/get", {
        headers: {
          token: token,
        },
      });

      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Add item to cart
  const addToCart = async (item) => {
    const itemId = item._id;

    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));

    if (!token) {
      return;
    }

    try {
      await axios.post(
        "http://localhost:7000/api/cart/add",
        { itemId },
        {
          headers: {
            token: token,
          },
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  // Remove one quantity
  const removeFromCart = async (item) => {
    const itemId = item._id;

    setCartItems((prev) => {
      const updatedCart = { ...prev };

      if (!updatedCart[itemId]) {
        return prev;
      }

      if (updatedCart[itemId] === 1) {
        delete updatedCart[itemId];
      } else {
        updatedCart[itemId] -= 1;
      }

      return updatedCart;
    });

    if (!token) {
     
      return;
    }

    try {
     

      const response = await axios.post(
        "http://localhost:7000/api/cart/remove",
        { itemId },
        {
          headers: {
            token: token,
          },
        },
      );

      
    } catch (error) {
      console.log("REMOVE ERROR:", error);
    }
  };

  const clearCartItem = async (itemId) => {
    if (!token) {
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:7000/api/cart/delete",
        { itemId },
        { headers: { token: token } },
      );

      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log("DELETE ITEM ERROR:", error);
    }
  };

  // Clear complete cart
  const clearCart = async () => {
    if (!token) {
      setCartItems({});
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:7000/api/cart/clear",
        {},
        { headers: { token: token } },
      );

      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log("CLEAR CART ERROR:", error);
    }
  };

  // Total number of items
  const getCartCount = () => {
    return Object.keys(cartItems).length;
  };

  // Total cart amount
  const getCartAmount = () => {
    return Object.entries(cartItems).reduce((total, [itemId, quantity]) => {
      const item = food_list.find((food) => food._id === itemId);

      if (item) {
        return total + item.price * quantity;
      }

      return total;
    }, 0);
  };

  useEffect(() => {
    fetchFoodList();
    loadCartData();
  }, [token]);

  const contextValue = {
    token,
    setToken,
    cartItems,
    setCartItems,
    food_list,
    addToCart,
    removeFromCart,
    clearCartItem,
    clearCart,
    getCartCount,
    getCartAmount,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
