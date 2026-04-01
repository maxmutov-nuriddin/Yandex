import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaYoutube, FaTelegramPlane, FaApple } from "react-icons/fa";
import { SiGoogleplay } from "react-icons/si";

const FooterSeller = () => {
  return (
    <footer className="bg-[#1f2330] px-4 py-12 text-white sm:px-6 sm:py-16">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
        {/* 1-ustun */}
        <div>
          <h3 className="text-xl font-semibold mb-6">Sotuvchilar uchun</h3>
          <ul className="space-y-4 text-gray-300">
            <li><Link to="#" className="hover:text-white transition">Sotuvchi yo‘riqnomasi</Link></li>
            <li><Link to="#" className="hover:text-white transition">Ro‘yxatdan o‘tish yo‘riqnomasi</Link></li>
            <li><Link to="#" className="hover:text-white transition">Yangi hamkorlarni qo‘llab-quvvatlash</Link></li>
          </ul>
        </div>

        {/* 2-ustun */}
        <div>
          <h3 className="text-xl font-semibold mb-6">Kompaniya</h3>
          <ul className="space-y-4 text-gray-300">
            <li><Link to="#" className="hover:text-white transition">Bo‘sh ish o‘rinlari</Link></li>
            <li><Link to="#" className="hover:text-white transition">Ommaviy taklif</Link></li>
            <li><Link to="#" className="hover:text-white transition">Maxfiylik haqida nizom</Link></li>
            <li><Link to="#" className="hover:text-white transition">Shaxsiy ma’lumotlarni qayta ishlash bo‘yicha nizom</Link></li>
          </ul>
        </div>

        {/* 3-ustun */}
        <div>
          <h3 className="text-xl font-semibold mb-6">Uzum Sellers ijtimoiy tarmoqlarda</h3>
          <div className="flex gap-4 mb-10">
            <div className="bg-white text-black w-12 h-12 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition">
              <FaInstagram size={20} />
            </div>
            <div className="bg-white text-black w-12 h-12 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition">
              <FaYoutube size={20} />
            </div>
            <div className="bg-white text-black w-12 h-12 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition">
              <FaTelegramPlane size={20} />
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-6">Uzum Sellers sotuvchilari uchun mobil ilova</h3>
          <div className="flex gap-4">
            <div className="bg-white text-black w-14 h-14 rounded-xl flex items-center justify-center cursor-pointer hover:scale-110 transition">
              <SiGoogleplay size={22} />
            </div>
            <div className="bg-white text-black w-14 h-14 rounded-xl flex items-center justify-center cursor-pointer hover:scale-110 transition">
              <FaApple size={22} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSeller;
