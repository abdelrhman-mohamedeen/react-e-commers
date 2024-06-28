import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import axios from "axios";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
export default function Checkout() {
  const { cart, setCart } = useContext(CartContext);
  const headers = {
    token: localStorage.getItem("userToken"),
  };
  const [orderType, setOrderType] = useState(null);

  async function createCashOrder(values) {
    console.log(`##############`);
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/${cart._id}`,
        method: "POST",
        headers: headers,
        data: values,
      };
      const { data } = await axios(options);
      console.log("Order created:", data);
      setCart([]);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  }

  async function createOnlineOrder(values) {
    try {
      console.log(`$$$$$$$online$$$$$`);
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart._id}?url=http://localhost:5173`,
        method: "POST",
        headers: headers,
        data: values,
      };
      const { data } = await axios(options);
      console.log("Order created:", data);
      toast.loading("online payment ");

      setTimeout(() => {
        window.location.href = data.session.url;
      }, 3000);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  }

  const formik = useFormik({
    initialValues: {
      shippingAddress: {
        details: "",
        phone: "",
        city: "",
      },
    },
    onSubmit: (values) => {
      if (orderType === "cash") createCashOrder(values);
      else createOnlineOrder(values);
    },
  });

  return (
    <div>
      <h1>Checkout</h1>

      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
        <div className="relative z-0 w-full mb-5 group">
          <input
            value={formik.values.shippingAddress.city}
            onChange={formik.handleChange}
            type="text"
            name="shippingAddress.city"
            id="address"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="address"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Address
          </label>
        </div>

        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              value={formik.values.shippingAddress.phone}
              onChange={formik.handleChange}
              type="tel"
              name="shippingAddress.phone"
              id="phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="phone"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Phone number (123-456-7890)
            </label>
          </div>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <textarea
            value={formik.values.shippingAddress.details}
            onChange={formik.handleChange}
            type="text"
            name="shippingAddress.details"
            id="details"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="details"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Details
          </label>
        </div>
        <button
          onClick={() => {
            setOrderType("cash");
          }}
          type="submit"
          className="text-white mx-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Pay Cash
        </button>
        <button
          onClick={() => {
            setOrderType("online");
          }}
          type="submit"
          className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-2 sm:mt-0"
        >
          Pay Online
        </button>
      </form>
    </div>
  );
}
