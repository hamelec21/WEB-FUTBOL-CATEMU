"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type SlideItem = {
  id: number;
  imageDesktop: string;
  imageMobile: string;
};

const slides: SlideItem[] = [
  {
    id: 1,
    imageDesktop: "/slider/slider-1-desktop.png",
    imageMobile: "/slider/slider-1-mobile.png",
  },
  {
    id: 2,
    imageDesktop: "/slider/slider-2-desktop.png",
    imageMobile: "/slider/slider-2-mobile.png",
  },
  {
    id: 3,
    imageDesktop: "/slider/slider-3-desktop.png",
    imageMobile: "/slider/slider-3-mobile.png",
  },
];

export default function FullWidthSwiper() {
  return (
    <div className="w-full">
      <Swiper
        modules={[Navigation, Pagination, A11y, Autoplay]}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop
        a11y={{ enabled: true }}
        spaceBetween={0}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="w-full">
              {/* Imagen móvil */}
              <div className="block md:hidden">
                <Image
                  src={slide.imageMobile}
                  alt={`Slide ${slide.id} Mobile`}
                  width={1920}
                  height={600}
                  className="w-full h-auto"
                  priority={slide.id === 1}
                />
              </div>

              {/* Imagen escritorio */}
              <div className="hidden md:block">
                <Image
                  src={slide.imageDesktop}
                  alt={`Slide ${slide.id} Desktop`}
                  width={1920}
                  height={600}
                  className="w-full h-auto"
                  priority={slide.id === 1}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
