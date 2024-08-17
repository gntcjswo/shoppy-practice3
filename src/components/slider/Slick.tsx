import React, { useMemo } from 'react';
import Slider, { Settings } from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface slideProps {
  children: React.ReactNode;
  className?: string;
  autoplay?: boolean | number;
  speed?: number;
  loop?: boolean;
}

export default function Slick({ children, className, autoplay = true, speed = 800, loop = true }: slideProps) {
  const settings = useMemo<Settings>(
    () => ({
      dots: true,
      infinite: loop,
      speed: speed,
      fade: true,
      arrows: false,
      slideToShow: 1,
      autoplay: Boolean(autoplay),
      autoplaySpeed: typeof autoplay === 'boolean' ? 6000 : autoplay,
      pauseOnHover: false,
    }),
    [autoplay, loop, speed]
  );
  return (
    <div className={className}>
      <Slider {...settings}>{children}</Slider>
    </div>
  );
}
