import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

var settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 8,
  slidesToScroll: 1,
  autoplay: true,
  swipeToSlide: true,
  arrows: false,
};
export default function categoriesSlider() {
  const [categoriesSlider, setCategoriesSlider] = useState([]);

  function getCategoriesSlider() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then(({ data }) => {
        setCategoriesSlider(data.data);
      })
      .catch((error) => {
        console.error("Error fetching  categories:", error);
      });
  }
  useEffect(() => {
    getCategoriesSlider();
  }, []);
  return (
    <>
      <Slider {...settings}>
        {categoriesSlider.map((category) => (
          <div key={`id`}>
            <img
              className="w-full h-48 p-1 object-center"
              src={category.image}
              alt={category.name}
            />
            <h3 className="text-center font-semibold text-green-700">
              {category.name}
            </h3>
          </div>
        ))}
      </Slider>
    </>
  );
}
