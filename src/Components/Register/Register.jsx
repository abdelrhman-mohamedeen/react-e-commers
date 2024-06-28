import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { UserContext } from "../../Context/UserContext";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const navigate = useNavigate();
  const { setUserLogin } = useContext(UserContext);

  async function handleRegister(
    formValues,
    { resetForm, setSubmitting, setErrors }
  ) {
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signup`,
        formValues
      );
      if (data.message === "success") {
        localStorage.setItem("userToken", data.token);
        setUserLogin(data.token);
        resetForm();
        navigate("/login");
      } else {
        setErrors({ submit: data.message });
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors({ submit: error.response.data.message });
      } else {
        setErrors({ submit: "Registration failed. Please try again." });
      }
    } finally {
      setSubmitting(false);
    }
  }

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, `Must be an Egyptian phone number`)
      .required("Phone number is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleRegister,
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        className="max-w-xl w-full bg-white p-8 rounded-lg shadow-md"
        onSubmit={formik.handleSubmit}
      >
        <h2 className="font-bold text-3xl justify-center flex px-5 text-green-600 mb-10">
          Register Now
        </h2>

        {formik.errors.submit && (
          <div
            className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:text-red-400 dark:border-red-800"
            role="alert"
          >
            {formik.errors.submit}
          </div>
        )}

        <div className="relative z-0 w-full mb-5 group">
          <input
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            name="name"
            id="name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Name
          </label>
          {formik.touched.name && formik.errors.name ? (
            <div className="text-red-600 text-sm">{formik.errors.name}</div>
          ) : null}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="tel"
            name="phone"
            id="phone"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="phone"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Phone
          </label>
          {formik.touched.phone && formik.errors.phone ? (
            <div className="text-red-600 text-sm">{formik.errors.phone}</div>
          ) : null}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="email"
            name="email"
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email
          </label>
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-600 text-sm">{formik.errors.email}</div>
          ) : null}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-500 focus:outline-none"
            >
              {showPassword ? (
                <i className="far fa-eye-slash"></i>
              ) : (
                <i className="far fa-eye"></i>
              )}
            </button>
          </div>
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-600 text-sm">{formik.errors.password}</div>
          ) : null}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type={showRePassword ? "text" : "password"}
            name="rePassword"
            id="rePassword"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="rePassword"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Confirm Password
          </label>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <button
              type="button"
              onClick={() => setShowRePassword(!showRePassword)}
              className="text-gray-500 focus:outline-none"
            >
              {showRePassword ? (
                <i className="far fa-eye-slash"></i>
              ) : (
                <i className="far fa-eye"></i>
              )}
            </button>
          </div>
          {formik.touched.rePassword && formik.errors.rePassword ? (
            <div className="text-red-600 text-sm">
              {formik.errors.rePassword}
            </div>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="mx-auto mt-12 flex items-center justify-center text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center"
        >
          Submit
          {formik.isSubmitting && (
            <i className="fas fa-spinner fa-spin ml-2"></i>
          )}
        </button>
        <p className="mt-5">
          Have an account?{" "}
          <Link
            to="/login"
            className="text-green-500 font-semibold m-5 hover:text-green-800"
          >
            Login Now
          </Link>
        </p>
      </form>
    </div>
  );
}
