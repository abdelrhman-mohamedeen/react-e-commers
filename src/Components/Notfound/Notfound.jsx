import React from "react";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-red-500 to-red-700 text-white">
      <div className="text-center">
        <h1 className="text-9xl font-bold mb-4">404</h1>
        <p className="text-3xl font-semibold">Oops! Page not found</p>
        <p className="text-lg mt-4">
          The page you are looking for might have been removed or does not
          exist.
        </p>
      </div>
    </div>
  );
}
