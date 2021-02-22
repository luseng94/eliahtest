import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import { PrevArrow, NextArrow } from "../../Other/SliderArrow";

export default function ProductDetailSlideTwo({ data }) {
  const slider1Settings = {
    arrows: false,
    swipe: false,
  };
  const slider2Settings = {
    arrows: true,
    focusOnSelect: true,
    slidesToShow: 3,
    centerMode: true,
    centerPadding: "80px",
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          centerPadding: "50px",
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          centerPadding: "50px",
        },
      },
    ],
  };
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  return (
    <div className="product-detail__slide-two">
      <div className="product-detail__slide-two__big">
        <Slider asNavFor={nav2} ref={(c) => setNav1(c)} {...slider1Settings}>
          {data &&
            data.images.map((img, index) => (
              <div key={index} className="slider__item">
                <img src={img} alt="Product image" />
              </div>
            ))}
        </Slider>
      </div>
      <div className="product-detail__slide-two__small">
        <Slider asNavFor={nav1} ref={(c) => setNav2(c)} {...slider2Settings}>
          {data &&
            data.images.map((img, index) => (
              <div key={index} className="slider__item">
                <img src={img} alt="Product image" />
              </div>
            ))}
        </Slider>
      </div>
    </div>
  );
}
