import React, { useEffect, useState } from "react";
import axios from "axios";
import RecentProducts from "../RecentProducts/RecentProducts";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import MaineSlider from "../MaineSlider/MaineSlider";

export default function Home() {
  const [products, setProducts] = useState([]);

  async function getProduct() {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products"
    );
    setProducts(data.data);
  }

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <MaineSlider />
      <CategoriesSlider />
      <RecentProducts />
    </>
  );
}
