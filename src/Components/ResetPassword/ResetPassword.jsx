import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (formValues, { setSubmitting, setErrors }) => {
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
        formValues
      );

      console.log("Verify reset code response:", data.status);

      if (data.status !== "success") {
        const resetPasswordResponse = await axios.put(
          `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
          {
            email: formValues.email,
            newPassword: formValues.newPassword,
            resetCode: formValues.resetCode,
          }
        );

        console.log("Reset password response:", data.status);

        if (resetPasswordResponse.data.status !== "success") {
          setSubmitted(true);
          navigate("/login");
          console.log("Password reset successful");
        } else {
          setErrors({ submit: resetPasswordResponse.data.status });
          console.log(
            "Password reset failed:",
            resetPasswordResponse.data.status
          );
        }
      } else {
        setErrors({ submit: data.status });
        console.log("Verification failed:", data.status);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrors({ submit: error.response.data.message });
        console.log("Error:", error.response.data.message);
      } else {
        setErrors({
          submit: "An unexpected error occurred. Please try again.",
        });
        console.log("An unexpected error occurred:", error);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    resetCode: Yup.string().required("Reset code is required"),
    newPassword: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("New password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      resetCode: "",
      newPassword: "",
    },
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
          Reset Password
        </h2>

        {submitted && (
          <div className="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50">
            Your password has been reset successfully. You can now login.
          </div>
        )}

        {formik.errors.submit && (
          <div
            className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50"
            role="alert"
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

        <div className="relative z-0 w-full mb-5 group">
          <input
            value={formik.values.resetCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            name="resetCode"
            id="resetCode"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="resetCode"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Reset Code
          </label>
          {formik.touched.resetCode && formik.errors.resetCode ? (
            <div className="text-red-600 text-sm">
              {formik.errors.resetCode}
            </div>
          ) : null}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="password"
            name="newPassword"
            id="newPassword"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="newPassword"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            New Password
          </label>
          {formik.touched.newPassword && formik.errors.newPassword ? (
            <div className="text-red-600 text-sm">
              {formik.errors.newPassword}
            </div>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="mx-auto mt-12 flex items-center justify-center text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center"
        >
          Reset Password
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
};

export default ResetPassword;
