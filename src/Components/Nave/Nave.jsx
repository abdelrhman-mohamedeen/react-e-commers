// import React, { useContext, useState } from "react";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import { UserContext } from "../../Context/UserContext";

// export default function Nave() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const { userLogin, setUserLogin } = useContext(UserContext);
//   let navigate = useNavigate();
//   function logOut() {
//     localStorage.removeItem("userToken");
//     setUserLogin(null);
//     navigate("/login");
//   }

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <div>
//       <nav className="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200">
//         <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
//           <div className="flex items-center space-x-3 rtl:space-x-reverse">
//             <Link
//               to="/"
//               className="flex items-center space-x-3 rtl:space-x-reverse"
//             >
//               <span className="self-center text-2xl font-semibold whitespace-nowrap">
//                 <i className="text-green-600 mx-2 fa-solid fa-cart-shopping nav-icon"></i>
//                 Fresh cart
//               </span>
//             </Link>
//           </div>
//           <div className="flex space-x-3 md:space-x-0 rtl:space-x-reverse">
//             <button
//               type="button"
//               onClick={toggleMenu}
//               className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600"
//               aria-controls="navbar-sticky"
//               aria-expanded={isMenuOpen ? "true" : "false"}
//             >
//               <span className="sr-only">Open main menu</span>
//               <svg
//                 className={`w-5 h-5 ${isMenuOpen ? "hidden" : "block"}`}
//                 aria-hidden="true"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 17 14"
//               >
//                 <path
//                   stroke="currentColor"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M1 1h15M1 7h15M1 13h15"
//                 />
//               </svg>
//               <svg
//                 className={`w-5 h-5 ${isMenuOpen ? "block" : "hidden"}`}
//                 aria-hidden="true"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 20 20"
//               >
//                 <path
//                   fill="currentColor"
//                   d="M14.865 7.707a1 1 0 010 1.414L10.121 12l4.744 4.879a1 1 0 11-1.414 1.414L8.293 12.707a1 1 0 010-1.414l5.121-5.121a1 1 0 011.414 0z"
//                 />
//               </svg>
//             </button>
//           </div>
//           <div
//             className={`items-center justify-between w-full md:flex md:w-auto ${
//               isMenuOpen ? "block" : "hidden"
//             }`}
//             id="navbar-sticky"
//           >
//             <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
//               {userLogin !== null ? (
//                 <>
//                   <li>
//                     <NavLink className="text-green-500" to="/">
//                       Home
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink className="text-green-500" to="/cart">
//                       Cart
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink className="text-green-500" to="/Wish">
//                       Wishlist
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink className="text-green-500" to="/products">
//                       Products
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink className="text-green-500" to="/categories">
//                       Categories
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink className="text-green-500" to="/brands">
//                       Brands
//                     </NavLink>
//                   </li>
//                 </>
//               ) : null}
//             </ul>
//           </div>
//           <ul className="flex items-center justify-center">
//             {userLogin === null ? (
//               <>
//                 <li className="mx-2">
//                   <NavLink className="text-green-500" to="/login">
//                     Login
//                   </NavLink>
//                 </li>
//                 <li className="mx-2">
//                   <NavLink className="text-green-500" to="/register">
//                     Register
//                   </NavLink>
//                 </li>
//               </>
//             ) : (
//               <>
//                 <li onClick={logOut} className="mx-2">
//                   <span className="fas fa-cart-plus mx-10 text-green-600 text-xl"></span>
//                   <span className="cursor-pointer text-green-500" to="/logout">
//                     Logout
//                   </span>
//                 </li>
//               </>
//             )}
//           </ul>
//         </div>
//       </nav>
//     </div>
//   );
// }

import React, { useContext, useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";

export default function Nave() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { userLogin, setUserLogin } = useContext(UserContext);
  const { getLoggedUserCart } = useContext(CartContext);
  const [cartCount, setCartCount] = useState(0);
  let navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      if (userLogin) {
        try {
          const cart = await getLoggedUserCart();
          setCartCount(cart.products?.length || 0);
        } catch (err) {
          ("Failed to fetch cart details:");
        }
      }
    };

    fetchCart();
  }, [userLogin, getLoggedUserCart]);

  function logOut() {
    localStorage.removeItem("userToken");
    setUserLogin(null);
    navigate("/login");
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <nav className="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <Link
              to="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <span className="self-center text-2xl font-semibold whitespace-nowrap">
                <i className="text-green-600 mx-2 fa-solid fa-cart-shopping nav-icon"></i>
                Fresh cart
              </span>
            </Link>
          </div>
          <div className="flex space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              type="button"
              onClick={toggleMenu}
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded={isMenuOpen ? "true" : "false"}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`w-5 h-5 ${isMenuOpen ? "hidden" : "block"}`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
              <svg
                className={`w-5 h-5 ${isMenuOpen ? "block" : "hidden"}`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  fill="currentColor"
                  d="M14.865 7.707a1 1 0 010 1.414L10.121 12l4.744 4.879a1 1 0 11-1.414 1.414L8.293 12.707a1 1 0 010-1.414l5.121-5.121a1 1 0 011.414 0z"
                />
              </svg>
            </button>
          </div>
          <div
            className={`items-center justify-between w-full md:flex md:w-auto ${
              isMenuOpen ? "block" : "hidden"
            }`}
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
              {userLogin !== null ? (
                <>
                  <li>
                    <NavLink className="text-green-500" to="/">
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="text-green-500" to="/cart">
                      Cart
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="text-green-500" to="/Wish">
                      Wishlist
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="text-green-500" to="/products">
                      Products
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="text-green-500" to="/categories">
                      Categories
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="text-green-500" to="/brands">
                      Brands
                    </NavLink>
                  </li>
                </>
              ) : null}
            </ul>
          </div>
          <ul className="flex items-center justify-center">
            {userLogin === null ? (
              <>
                <li className="mx-2">
                  <NavLink className="text-green-500" to="/login">
                    Login
                  </NavLink>
                </li>
                <li className="mx-2">
                  <NavLink className="text-green-500" to="/register">
                    Register
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="mx-2 flex justify-center items-center relative">
                  <span className="fas fa-cart-plus text-green-600 text-2xl mt-2"></span>
                  <span className="absolute bottom-8 bg-green-600 left-5 w-[18px] h-[18px] text-center text-sm font-bold text-gray-950  rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                </li>

                <li onClick={logOut} className="mx-2 cursor-pointer">
                  <span className="text-green-500">Logout</span>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}
