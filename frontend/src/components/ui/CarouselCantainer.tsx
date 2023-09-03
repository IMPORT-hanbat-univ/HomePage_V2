"use client";
import React from "react";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

export default function CarouselContainer({ children }: { children: React.ReactNode }) {
  return (
    <Carousel
      swipeable={true}
      showDots={false}
      responsive={responsive}
      infinite={true}
      arrows={true}
      autoPlay
      keyBoardControl={true}
      containerClass="w-auto flex p-3  overflow-hidden"
      itemClass="pr-[15px]"
    >
      {children}
    </Carousel>
  );
}
