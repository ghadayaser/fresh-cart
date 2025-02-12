import React from "react";
import image1 from "../../assets/images/slider-image-2.jpeg";
import image2 from "../../assets/images/slider-image-3.jpeg";
import image3 from "../../assets/images/grocery-banner.png";
import image4 from "../../assets/images/grocery-banner-2.jpeg";

import Slider from "react-slick";

export default function MainSlider() {
  var settings = {
    arrows: false,  
    autoplay: true,  
    autoplaySpeed: 3000,  
    dots: false,  
    infinite: true,  
    speed: 1000,  
    slidesToShow: 1,  
    slidesToScroll: 1,  
    cssEase: 'ease-in-out',  
  };

  return (
    <div className="relative w-full">
      <Slider {...settings}>
        <div className="focus:outline-none">
          <img
            src={image1}
            loading="lazy"
            className="w-full h-[400px] object-cover rounded-lg shadow-md transition-transform duration-1000 ease-in-out"
            alt="slider image 1"
          />
        </div>
        <div className="focus:outline-none">
          <img
            src={image2}
            loading="lazy"
            className="w-full h-[400px] object-cover rounded-lg shadow-md transition-transform duration-1000 ease-in-out"
            alt="slider image 2"
          />
        </div>
        <div className="focus:outline-none">
          <img
            src={image3}
            loading="lazy"
            className="w-full h-[400px] object-cover rounded-lg shadow-md transition-transform duration-1000 ease-in-out"
            alt="slider image 3"
          />
        </div>
        <div className="focus:outline-none">
          <img
            src={image4}
            loading="lazy"
            className="w-full h-[400px] object-cover rounded-lg shadow-md transition-transform duration-1000 ease-in-out"
            alt="slider image 4"
          />
        </div>
      </Slider>
    </div>
  );
}
