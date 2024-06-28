import React, { Component } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Components/Home/Home.jsx";
import Layout from "./Components/Layout/Layout.jsx";
import Notfound from "./Components/Notfound/Notfound.jsx";
import Register from "./Components/Register/Register.jsx";
import Login from "./Components/Login/Login.jsx";
import Cart from "./Components/Cart/Cart.jsx";
import Wish from "./Components/Wish/Wish.jsx";
import Products from "./Components/Products/Products.jsx";
import Brands from "./Components/Brands/Brands.jsx";
import Categories from "./Components/Categories/Categories.jsx";
import ProductDetails from "./Components/ProductDetails/ProductDetails.jsx";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword.jsx";
import { UserContextProvider } from "./Context/UserContext.jsx";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute.jsx";
import ResetPassword from "./Components/ResetPassword/ResetPassword.jsx";
import { CartContextProvider } from "./Context/CartContext.jsx";
import { WishlistContextProvider } from "./Context/WishlistContext.jsx"; // Ensure correct import path
import { Toaster } from "react-hot-toast";
import Checkout from "./Components/CheckOut/Checkout.jsx";

const Routing = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "wish",
        element: (
          <ProtectedRoute>
            <Wish />
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: "ProductDetails/:id",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "reset-password", element: <ResetPassword /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "*", element: <Notfound /> },
    ],
  },
]);

class App extends Component {
  render() {
    return (
      <UserContextProvider>
        <WishlistContextProvider>
          <CartContextProvider>
            <RouterProvider router={Routing} />
            <Toaster />
          </CartContextProvider>
        </WishlistContextProvider>
      </UserContextProvider>
    );
  }
}

export default App;
