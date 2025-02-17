import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

export default function PopularCategories() {
  var settings = {
    arrows: false,
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 100,  
    speed: 900,  
    slidesToShow: 5,  
    slidesToScroll: 1, 
    initialSlide: 0,
    cssEase: "ease-in-out",  
    pauseOnHover: true, 
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [categories, setCategories] = useState([]);

  async function getCategories() {
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    setCategories(data.data);
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold text-yellow-600 mb-6 text-center drop-shadow-lg">
        Shop Popular Categories
      </h2>
      <Slider {...settings}>
        {categories.map((category) => (
          <div
            key={category._id}
            className="relative group mx-4 hover:scale-105 transition-transform duration-300"
          >
            <div className="overflow-hidden rounded-xl shadow-lg">
            
              <img
                loading="lazy"
                src={category.image}
                alt={category.name}
                className="w-[120px] h-[120px] object-cover rounded-full mx-auto transition-transform duration-500 ease-in-out group-hover:scale-110 object-top"
              />
            </div>
            <div className="mt-2 text-center">
              <p className="text-lg font-bold text-gray-600 dark:text-white">{category.name}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
