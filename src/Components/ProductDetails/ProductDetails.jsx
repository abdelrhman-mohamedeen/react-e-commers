import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import { CartContext } from "../../Context/CartContext"; // Adjust the path as needed
import { WishlistContext } from "../../Context/WishlistContext"; // Adjust the path as needed

export default function ProductDetails() {
  let { id } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const { addToCart } = useContext(CartContext);
  const { wishlist, addToWishlist, removeFromWishlist } =
    useContext(WishlistContext);
  const [isInWishlist, setIsInWishlist] = useState(false);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  function getProductDetails(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        setProductDetails(data.data);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  }

  useEffect(() => {
    getProductDetails(id);
  }, [id]);

  useEffect(() => {
    if (wishlist) {
      setIsInWishlist(wishlist.some((item) => item.id === id));
    }
  }, [wishlist, id]);

  const handleAddToCart = () => {
    addToCart(productDetails.id);
  };

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      removeFromWishlist(productDetails.id);
    } else {
      addToWishlist(productDetails.id);
    }
    setIsInWishlist(!isInWishlist);
  };

  return (
    <>
      <div className="container mx-auto w-10/12 py-8">
        {productDetails ? (
          <div className="flex flex-wrap bg-white shadow-lg rounded-lg p-6">
            <div className="w-full md:w-1/3 mb-10 md:mb-0">
              <Slider {...settings}>
                {productDetails?.images.map((src, index) => (
                  <div key={index} className="w-full md:w-1/3 mb-10 md:mb-0">
                    <img
                      className="w-full rounded-lg"
                      src={src}
                      alt={productDetails.title}
                    />
                  </div>
                ))}
              </Slider>
            </div>
            <div className="w-full md:w-2/3 md:pl-6 flex flex-col justify-center ">
              <h2 className="text-4xl text-gray-800 font-bold mb-10">
                {productDetails.title}
              </h2>
              <p className="text-gray-700 mb-10">
                {productDetails.description}
              </p>
              <div className="flex items-center justify-between mb-10">
                <span className="text-2xl font-bold text-gray-800">
                  {productDetails.price} EGP
                </span>
                <span className="flex items-center text-yellow-500">
                  <span className="text-xl font-semibold mr-1">
                    {productDetails.ratingsAverage}
                  </span>
                  <i className="fas fa-star"></i>
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleAddToCart}
                  className="btn bg-green-600 text-white font-bold py-2 px-4 rounded-lg w-full"
                >
                  Add to Cart
                </button>
                <i
                  onClick={handleWishlistToggle}
                  className={`fas fa-heart text-4xl cursor-pointer ${
                    isInWishlist ? "text-red-500" : "text-black"
                  }`}
                ></i>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-64">
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
