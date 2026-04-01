import React, { useState } from "react";

export default function SliderOne() {
  const [current, setCurrent] = useState(0);
  const slides = ["/1ma.jpg", "/2ma.jpg", "/3ma.jpg"];

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  return (
    <div className="mx-auto mt-4 w-full max-w-[1450px] px-4 sm:px-6">
      <div className="relative">
        <img src={slides[current]} alt="slide" className="w-full rounded-2xl object-cover" />

        {current > 0 && (
          <button
            onClick={prevSlide}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white px-4 py-2"
          >
            <i className="fa-solid fa-chevron-left text-black"></i>
          </button>
        )}

        {current < slides.length - 1 && (
          <button
            onClick={nextSlide}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white px-4 py-2"
          >
            <i className="fa-solid fa-chevron-right text-black"></i>
          </button>
        )}
      </div>

      <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8">
        {[
          ["/312.jpg", "Brend chegirmalari"],
          ["/2long.jpg", "Sport kiyimlari"],
          ["/3long.jpg", "Kurtka va vetrovkalar"],
          ["/4long.jpg", "Xudi va svitshotlar"],
          ["/5long.jpg", "Krossovkalar"],
          ["/6long.jpg", "Bezaklar va soatlar"],
          ["/7long.jpg", "Sumkalar"],
          ["/8long.jpg", "Ichki kiyimlar"],
        ].map(([img, title]) => (
          <div key={img} className="flex flex-col items-center text-center">
            <img src={img} alt={title} className="w-28 sm:w-36" />
            <h1 className="mt-2 font-medium">{title}</h1>
          </div>
        ))}
      </div>

      <div className="mt-10 overflow-hidden bg-[rgb(255,245,155)] py-1">
        <div className="flex whitespace-nowrap animate-[marquee_13s_linear_infinite]">
          {[1, 2, 3].map((row) => (
            <div key={row} className="flex gap-12 px-6 font-semibold text-black">
              <span>Muddatli to'lovga mumkin</span>
              <span>Bepul kiyib ko'rish</span>
              <span>Muddatli to'lovga mumkin</span>
              <span>Bepul kiyib ko'rish</span>
            </div>
          ))}
        </div>
      </div>

      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>

      <div className="mt-10 flex items-center gap-4">
        <h1 className="text-3xl font-bold sm:text-4xl">Bahorgi kolleksiya</h1>
        <i className="fa-solid fa-chevron-right text-black"></i>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
        <img className="w-full rounded-2xl" src="/177.jpg" alt="" />
        <img className="w-full rounded-2xl" src="/277.jpg" alt="" />
        <img className="w-full rounded-2xl" src="/377.jpg" alt="" />
      </div>

      <div className="mt-10 flex items-center gap-4">
        <h1 className="text-3xl font-bold sm:text-4xl">Sevimli brendlar</h1>
        <i className="fa-solid fa-chevron-right text-black"></i>
      </div>
    </div>
  );
}

