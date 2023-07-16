'use client';
import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

function MainCarousel({ config, children }: any) {
  const responsive: any = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 3000, min: 2000 },
      items: 5,
    },
    desktopLarge: {
      breakpoint: { max: 2000, min: 1024 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1800, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 720 },
      items: 3,
    },
    tabletSmall: {
      breakpoint: { max: 720, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <div>
      <Carousel responsive={config || responsive}>{children}</Carousel>
    </div>
  );
}

export default MainCarousel;
