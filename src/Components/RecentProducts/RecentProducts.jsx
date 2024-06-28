import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { WishlistContext } from "../../Context/WishlistContext";
import toast from "react-hot-toast";

export default function RecentProducts() {
  const { addProductToCart } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);

  const [recentProducts, setRecentProducts] = useState([]);

  const addProduct = async (productId) => {
    try {
      let response = await addProductToCart(productId);
      if (response.status === "success") {
        toast.success(response.message, {
          position: "bottom-right",
        });
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to add product to cart.");
    }
  };

  const getRecentProducts = () => {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then(({ data }) => {
        setRecentProducts(data.data);
      })
      .catch((error) => {
        console.error("Error fetching recent products:", error);
      });
  };

  useEffect(() => {
    getRecentProducts();
  }, []);

  const addToWishlistHandler = async (productId) => {
    try {
      let response = await addToWishlist(productId);
      if (response.status === "success") {
        toast.success(response.message, {
          position: "bottom-right",
        });
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to add product to wishlist.");
    }
  };

  return (
    <>
      <div className="container mx-auto py-8">
        {recentProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentProducts.map((product) => (
              <div
                className="bg-white rounded-lg shadow-lg p-4"
                key={product.id}
              >
                <Link to={`/ProductDetails/${product.id}`}>
                  <div className="product">
                    {product.imageCover && (
                      <img
                        className="w-full object-cover rounded-t-lg"
                        src={product.imageCover}
                        alt={product.title}
                      />
                    )}
                    <div className="p-4">
                      <span className="block text-green-600 font-semibold">
                        {product.category && product.category.name}
                      </span>
                      <h2 className="text-xl font-bold text-gray-800 mt-2 mb-4">
                        {product.title &&
                          product.title.split(" ").slice(0, 3).join(" ")}
                      </h2>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-bold">
                          {product.price && product.price} EGP
                        </span>
                        <span className="text-yellow-500 flex items-center">
                          <i className="fas fa-star mr-1"></i>
                          {product.ratingsAverage && product.ratingsAverage}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="flex space-x-2">
                  <button
                    onClick={() => addProduct(product.id)}
                    className="btn w-3/4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Add to cart
                  </button>
                  <button
                    onClick={() => addToWishlistHandler(product.id)}
                    className="btn w-1/4 flex justify-center items-center py-2 bg-red-100 rounded-lg hover:bg-red-200"
                  >
                    <i className="fas fa-heart text-red-500"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center w-full h-screen bg-transparent">
            <div className="sk-chase">
              <div className="sk-chase-dot"></div>
              <div className="sk-chase-dot"></div>
              <div className="sk-chase-dot"></div>
              <div className="sk-chase-dot"></div>
              <div className="sk-chase-dot"></div>
              <div className="sk-chase-dot"></div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
