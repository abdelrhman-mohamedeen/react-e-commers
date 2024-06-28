import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  function getCategories() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then(({ data }) => {
        setCategories(data.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <h1 className="text-center text-5xl font-extrabold text-green-600 font-serif mt-14 cursor-default">
        All categories
      </h1>
      <div className="container mx-auto py-8">
        {categories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <div
                className="bg-white rounded-lg shadow-lg overflow-hidden"
                key={category.id}
              >
                <Link to={`/ProductDetails/${category.id}`}>
                  <div className="product">
                    <div className="w-full h-48">
                      <img
                        className="w-full h-full object-center"
                        src={category.image}
                        alt={category.name}
                      />
                    </div>
                    <div className="p-4">
                      <span className="block text-green-600 font-semibold">
                        {category.category}
                      </span>
                      <h2 className="text-xl font-bold text-gray-800 mt-2 mb-4">
                        {category.name}
                      </h2>
                    </div>
                  </div>
                </Link>
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
