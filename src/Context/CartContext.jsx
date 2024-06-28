import axios from "axios";
import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartContextProvider(props) {
  const [cart, setCart] = useState({});

  let headers = {
    token: localStorage.getItem("userToken"),
  };

  async function getLoggedUserCart() {
    try {
      const res = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { headers }
      );
      setCart(res.data.data);
      return res.data.data;
    } catch (err) {
      throw err;
    }
  }

  async function addProductToCart(productId) {
    try {
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId: productId },
        { headers }
      );
      await getLoggedUserCart();
      return res.data;
    } catch (err) {
      throw err;
    }
  }

  async function updateCartItemCount(productId, count) {
    try {
      const res = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count: count },
        { headers }
      );
      await getLoggedUserCart();
      return res.data;
    } catch (err) {
      throw err;
    }
  }

  async function deleteProductItem(productId) {
    try {
      const res = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { headers }
      );
      await getLoggedUserCart();
      return res.data;
    } catch (err) {
      throw err;
    }
  }

  async function clearCart() {
    try {
      const res = await axios.delete(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { headers }
      );
      setCart({});
      return res.data;
    } catch (err) {
      throw err;
    }
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        getLoggedUserCart,
        addProductToCart,
        updateCartItemCount,
        deleteProductItem,
        clearCart,
        setCart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
