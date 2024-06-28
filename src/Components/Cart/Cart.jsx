import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const {
    getLoggedUserCart,
    updateCartItemCount,
    deleteProductItem,
    clearCart,
  } = useContext(CartContext);
  const [cart, setCart] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await getLoggedUserCart();
        setCart(response);
      } catch (err) {
        setError("your cart is empty");
      }
    };

    fetchCart();
  }, []);

  const updateCartCount = async (productId, count) => {
    try {
      const response = await updateCartItemCount(productId, count);
      setCart(response);
    } catch (err) {
      setError("Failed to update cart item count.");
    }
  };

  const deleteItem = async (productId) => {
    try {
      const response = await deleteProductItem(productId);
      setCart(response);
    } catch (err) {
      setError("Failed to delete cart item.");
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart();
      setCart({});
    } catch (err) {
      setError("Failed to clear cart.");
    }
  };

  return (
    <>
      <h1 className="text-center my-10 text-5xl font-extrabold text-green-600 font-serif mt-14 cursor-default">
        Your Cart
      </h1>

      <div className="relative overflow-x-auto sm:rounded-lg">
        <div className="flex bg-gray-100 justify-between items-center w-3/4 p-8 mx-auto">
          <h3 className="font-extrabold text-green-600">
            <span className="text-gray-950">Total Price :</span>{" "}
            {cart?.totalCartPrice} EGP
          </h3>
          <Link
            to="/checkout"
            className="btn bg-green-600 rounded-lg hover:bg-green-400"
          >
            <span className="text-gray-950 font-bold">Check Out</span>
          </Link>
        </div>
        <table className="w-3/4 mx-auto px-4 text-sm text-left rtl:text-right text-gray-500">
          <tbody>
            {cart.products?.map((product) => (
              <tr
                key={product.product.id}
                className="bg-white border-b hover:bg-gray-50"
              >
                <td className="p-4">
                  <img
                    src={product.product.imageCover}
                    className="w-2/4"
                    alt={product.product.title}
                  />
                </td>
                <td className="px-6 py-4 font-extrabold text-3xl text-gray-900">
                  {product.product.title}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <button
                      onClick={() =>
                        updateCartCount(product.product.id, product.count - 1)
                      }
                      className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                      type="button"
                    >
                      <span className="sr-only">Quantity button</span>
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 2"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M1 1h16"
                        />
                      </svg>
                    </button>
                    <div>
                      <span>{product.count}</span>
                    </div>
                    <button
                      onClick={() =>
                        updateCartCount(product.product.id, product.count + 1)
                      }
                      className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                      type="button"
                    >
                      <span className="sr-only">Quantity button</span>
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 1v16M1 9h16"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 font-extrabold text-gray-900">
                  {product.price} EGP
                </td>
                <td className="px-6 py-4">
                  <span
                    onClick={() => deleteItem(product.product.id)}
                    className="bg-red-400 cursor-pointer font-medium p-2 rounded-lg text-gray-950 hover:bg-red-700"
                  >
                    Remove
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {error && <div className="text-red-500 text-center mt-4">{error}</div>}
        <div className="w-full flex items-center my-5 cursor-pointer">
          {" "}
          <span
            onClick={handleClearCart}
            className="bg-red-600 p-2 w-1/4 mx-auto text-center text-3xl text-white  rounded-lg hover:bg-red-700"
          >
            Clear Cart
          </span>
        </div>
      </div>
    </>
  );
}
