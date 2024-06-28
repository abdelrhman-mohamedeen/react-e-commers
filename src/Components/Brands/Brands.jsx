import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [alertContent, setAlertContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBrands = async () => {
      try {
        const response = await axios.get(
          "https://ecommerce.routemisr.com/api/v1/brands"
        );
        setBrands(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Brands:", error);
      }
    };

    getBrands();
  }, []);

  function showAlert(name, image) {
    setAlertContent({ name, image });
  }

  function closeAlert() {
    setAlertContent(null);
  }

  return (
    <>
      <h1 className="text-center text-5xl font-extrabold text-green-600 font-serif mt-14 cursor-default">
        All Brands
      </h1>
      <div className="container mx-auto py-8">
        {loading ? (
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
        ) : brands.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {brands.map((brand) => (
              <div
                className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
                key={brand.id}
                onClick={() => showAlert(brand.name, brand.image)}
              >
                <div className="product">
                  <div className="w-full h-48">
                    <img
                      className="w-full h-full object-cover object-center"
                      src={brand.image}
                      alt={brand.name}
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="text-xl text-center font-bold text-gray-800 mt-2 mb-4">
                      {brand.name}
                    </h2>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600 mt-4">No brands found.</div>
        )}
      </div>
      {alertContent && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden w-1/4">
            <div className="p-4">
              <h2 className="text-2xl text-center font-bold text-gray-800 mb-4">
                <span className="self-center font-semibold whitespace-nowrap">
                  <i className="text-green-600 mx-2 fa-solid fa-cart-shopping nav-icon"></i>
                  Fresh cart
                </span>
              </h2>
              <img
                className="w-full h-48 object-cover object-center mb-4"
                src={alertContent.image}
                alt={alertContent.name}
              />
              <h2 className="text-2xl mb-5 text-center font-bold text-green-700 m">
                {alertContent.name}
              </h2>
              <button
                className="bg-red-600 text-white mx-auto block w-2/4 py-3 rounded-lg"
                onClick={closeAlert}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
