import React, { useContext, useEffect, useState } from "react";
import { WishlistContext } from "../../Context/WishlistContext";

export default function Wishlist() {
  const { getLoggedUserWishlist, removeFromWishlist } =
    useContext(WishlistContext);
  const [wishlist, setWishlist] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await getLoggedUserWishlist();
        setWishlist(Array.isArray(response) ? response : []);
      } catch (err) {
        setError("Failed to fetch wishlist.");
      }
    };

    fetchWishlist();
  }, [getLoggedUserWishlist]);

  const deleteItemFromWishlist = async (productId) => {
    try {
      const response = await removeFromWishlist(productId);
      setWishlist(Array.isArray(response) ? response : []);
    } catch (err) {
      setError("Failed to delete wishlist item.");
    }
  };

  return (
    <>
      <h1 className="text-center my-10 text-5xl font-extrabold text-green-600 font-serif mt-14 cursor-default">
        Your Wishlist
      </h1>
      <div className="relative overflow-x-auto sm:rounded-lg">
        <div className="flex bg-gray-100 justify-between items-center w-3/4 p-8 mx-auto mb-4">
          <h3 className="font-extrabold text-green-600 text-2xl">
            <span className="text-gray-950">Total Items :</span>{" "}
            {wishlist.length}
          </h3>
        </div>
        <table className="w-3/4 mx-auto px-4 text-sm text-left rtl:text-right text-gray-500 border-collapse">
          <tbody>
            {wishlist.map((item) => (
              <tr
                key={item.id}
                className="bg-white border-b hover:bg-gray-50 transition duration-300"
              >
                <td className="p-4">
                  <img
                    className="w-[150px] h-[150px] object-cover rounded-lg shadow-lg"
                    src={item.imageCover}
                    alt={item.title}
                  />
                </td>
                <td className="px-6 py-4 font-extrabold text-2xl text-gray-900">
                  <h2>{item.title}</h2>
                </td>
                <td className="px-6 py-4 font-extrabold text-lg text-gray-700">
                  <h3>{item.price} EGP</h3>
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => deleteItemFromWishlist(item.id)}
                    className="bg-red-500 text-white font-medium px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {error && <div className="text-red-500 text-center mt-4">{error}</div>}
      </div>
    </>
  );
}
