import React from "react";
import RecentProducts from "../RecentProducts/RecentProducts";
export default function Products() {
  return (
    <div>
      {" "}
      <h1 className="text-center text-5xl font-extrabold text-green-600 font-serif mt-14 cursor-default">
        All Products
      </h1>
      <RecentProducts />
    </div>
  );
}
