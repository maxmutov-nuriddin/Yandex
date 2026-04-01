import React from "react";

export default function SliderTwo() {
  return (
    <div className="mx-auto mt-4 w-full max-w-[1450px] px-4 sm:px-6">
      <img className="w-full rounded-3xl" src="/mart.jpg" alt="" />

      <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8">
        {[
          ["/p.jpg", "Bahoriy kiyimlar kolleksiyasi"],
          ["/17.jpg", "Smartfon va aksessuarlar"],
          ["/yog.jpg", "Parfyumeriya va kosmetika"],
          ["/delet.jpg", "Sovg'alar"],
          ["/watch.jpg", "Elektronika xitlari"],
          ["/q.jpg", "Har kun uchun"],
          ["/f.jpg", "Foydali xaridlar"],
          ["/g.jpg", "Zamonaviy yechimlar"],
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
        <h1 className="text-3xl font-bold sm:text-4xl">Sovg'alar</h1>
        <i className="fa-solid fa-chevron-right text-black"></i>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
        <img className="w-full rounded-2xl" src="/s.jpg" alt="" />
        <img className="w-full rounded-2xl" src="/sensor.jpg" alt="" />
        <img className="w-full rounded-2xl" src="/bezak.jpg" alt="" />
      </div>
    </div>
  );
}

