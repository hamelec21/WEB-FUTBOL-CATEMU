"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

interface Club {
  id: number;
  nombre: string;
  logo: string;
}

export default function ClubLogoSlider() {
  const [clubes, setClubes] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/clubes/logos`,
          { headers: { Accept: "application/json" } }
        );
        const data = await response.json();
        setClubes(data);
      } catch (error) {
        console.error("Error al cargar los clubes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <p className="text-center text-lg font-semibold">Cargando logos...</p>
    );

  return (
    <div className="p-6 bg-gradient-to-b from-blue-100 to-blue-50 rounded-xl">
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={30}
        slidesPerView={6}
        loop
        autoplay={{ delay: 3000 }}
        breakpoints={{
          0: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 6 },
        }}
      >
        {clubes.map((club) => (
          <SwiperSlide key={club.id}>
            <div className="flex flex-col items-center text-center transition transform hover:scale-105 hover:shadow-xl p-4 bg-white rounded-xl">
              <div className="w-16 h-16 relative">
                {" "}
                {/* 👈 importante para fill */}
                <Image
                  src={club.logo}
                  alt={club.nombre}
                  fill
                  className="object-contain"
                />
              </div>
              <p className="mt-3 text-sm font-medium text-gray-800">
                 {club.nombre}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
