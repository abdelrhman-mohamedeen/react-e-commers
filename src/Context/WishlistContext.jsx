// WishlistContext.js
import React, { createContext, useState, useContext } from "react";
import axios from "axios";

export const WishlistContext = createContext();

export const WishlistContextProvider = (props) => {
  const [wishlist, setWishlist] = useState([]);
  const [error, setError] = useState(null);

  const headers = {
    token: localStorage.getItem("userToken"),
  };

  const getLoggedUserWishlist = async () => {
    try {
      const response = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { headers }
      );
      setWishlist(response.data.data);
      return response.data.data;
    } catch (err) {
      console.error("Error fetching wishlist:", err);
      throw err;
    }
  };

  const addToWishlist = async (productId) => {
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId },
        { headers }
      );
      setWishlist(response.data.data);
      return response.data;
    } catch (err) {
      console.error("Error adding to wishlist:", err);
      throw err;
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const response = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        { headers }
      );
      setWishlist(response.data.data);
      return response.data;
    } catch (err) {
      console.error("Error removing from wishlist:", err);
      throw err;
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        error,
        getLoggedUserWishlist,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {props.children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
