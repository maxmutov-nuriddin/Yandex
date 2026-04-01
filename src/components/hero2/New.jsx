import { useState } from "react";

export default function New() {
  const [current, setCurrent] = useState(0);
  const [clickCount, setClickCount] = useState(0);

  const slides = [
    "/1chicco.jpg",
    "/2lego.jpg",
    "/3lallaku.jpg",
    "/4huggies.jpg",
    "/5perla.jpg",
    "/6nestle.jpg",
    "/bonito.jpg",
    "/kabrita.jpg",
    "/9anex.jpg",
  ];

  const slideWidth = 200;
  const gap = 20;

  const nextSlide = () => {
    const moveBy = clickCount === 0 ? 2 : 1;
    const maxIndex = slides.length - 2;
    setCurrent((prev) => Math.min(prev + moveBy, maxIndex));
    setClickCount((prev) => prev + 1);
  };

  const prevSlide = () => {
    setCurrent((prev) => Math.max(prev - 2, 0));
    if (clickCount > 0) setClickCount((prev) => prev - 1);
  };

  return (
    <div className="mx-auto mt-10 w-full max-w-[1450px] px-4 sm:px-6">
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${current * (slideWidth + gap)}px)` }}
        >
          {slides.map((slide, index) => (
            <img
              key={index}
              src={slide}
              alt=""
              className="mr-4 h-[80px] w-[200px] rounded-2xl object-cover"
            />
          ))}
        </div>

        <button onClick={prevSlide} className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white p-2">
          <i className="fa-solid fa-chevron-left text-black"></i>
        </button>
        {clickCount < 2 && (
          <button onClick={nextSlide} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white p-2">
            <i className="fa-solid fa-chevron-right text-black"></i>
          </button>
        )}
      </div>

      <div className="mt-10 flex items-center gap-3">
        <h1 className="text-3xl font-bold">Bolalik dunyosi</h1>
        <i className="fa-solid fa-chevron-right text-black"></i>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
        <img className="w-full rounded-2xl" src="/eng3.jpg" alt="" />
        <img className="w-full rounded-2xl" src="/eng2.jpg" alt="" />
        <img className="w-full rounded-2xl" src="/eng1.jpg" alt="" />
      </div>

      <div className="mt-8">
        <img className="w-full rounded-2xl" src="/nomer.jpg" alt="" />
      </div>

      <div className="mt-10 flex items-center gap-3">
        <h1 className="text-3xl font-bold">Birga ulg'ayamiz</h1>
        <i className="fa-solid fa-chevron-right text-black"></i>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
        <img className="w-full rounded-2xl" src="/123.jpg" alt="" />
        <img className="w-full rounded-2xl" src="/1234.jpg" alt="" />
        <img className="w-full rounded-2xl" src="/98.jpg" alt="" />
      </div>

      <div className="mt-8">
        <img className="w-full rounded-2xl" src="/1987.jpg" alt="" />
      </div>

      <div className="mt-10 flex items-center gap-3">
        <h1 className="text-3xl font-bold">Xobbi va qiziqishlar</h1>
        <i className="fa-solid fa-chevron-right text-black"></i>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
        <img className="w-full rounded-2xl" src="/45.jpg" alt="" />
        <img className="w-full rounded-2xl" src="/46.jpg" alt="" />
      </div>

      <div className="mt-10 flex items-center gap-3">
        <h1 className="text-3xl font-bold">Tozalik va sog'liq</h1>
        <i className="fa-solid fa-chevron-right text-black"></i>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
        <img className="w-full rounded-2xl" src="/56.jpg" alt="" />
        <img className="w-full rounded-2xl" src="/57.jpg" alt="" />
        <img className="w-full rounded-2xl" src="/58.jpg" alt="" />
      </div>
    </div>
  );
}

