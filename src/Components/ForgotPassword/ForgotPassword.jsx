import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(formValues, { setSubmitting, setErrors }) {
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
        formValues
      );
      if (data.statusMsg === "success") {
        setSubmitted(true);
        navigate("/reset-password");
      } else {
        setErrors({ submit: data.message });
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrors({ submit: error.response.data.message });
      } else {
        setErrors({
          submit: "An unexpected error occurred. Please try again.",
        });
      }
    } finally {
      setSubmitting(false);
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        className="max-w-xl w-full bg-white p-8 rounded-lg shadow-md"
        onSubmit={formik.handleSubmit}
      >
        <h2 className="font-bold text-3xl justify-center flex px-5 text-green-600 mb-10">
          Forgot Password
        </h2>

        {submitted && (
          <div className="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50">
            Password reset instructions have been sent to your email.
          </div>
        )}

        {formik.errors.submit && (
          <div
            className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:text-red-400 dark:border-red-800"
            role=""
          >
            {formik.errors.submit}
          </div>
        )}

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
          Remember your password?{" "}
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
