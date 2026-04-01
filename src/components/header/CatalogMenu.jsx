import React, { useState } from "react";
import { Link } from "react-router-dom";

const categories = [
  "Hafta tovarlari",
  "Bahorgi kolleksiya",
  "Sizning go'zalligingiz",
  "Xobbi va ijod",
  "Smartfonlari",
  "Ramazon oyi",
  "Mebel",
  "Turizm, baliq ovi va ovchilik",
  "Elektronika",
  "Maishiy texnika",
  "Kiyim",
  "Poyabzallar",
];

const categoryContent = {
  Mebel: [
    {
      title: "Karavot va matraslar",
      items: ["Matraslar", "Karavotlar", "Yotoqxona uchun mebel to'plamlari"],
    },
    {
      title: "Kompakt mebel",
      items: ["Kompakt divanlar", "Kompakt karavotlar", "Kompakt kreslolar", "Kompakt shkaflar"],
    },
    {
      title: "Mebel uchun furnitura va butlovchi qismlar",
      items: ["Mebel uchun butlovchi qismlar", "Mebel uchun furnitura"],
    },
    {
      title: "Ofis va kompyuter mebellari",
      items: ["Ofis kreslolari", "Geymerlar uchun kreslolar", "Seyflar", "Partalar", "Yana 3"],
    },
    {
      title: "Oshxona mebellari",
      items: ["Oshxona burchaklari", "Oshxona garniturasi", "Oshxona modullari", "Oshxona xontaxtalari"],
    },
    {
      title: "Saqlash mebellari",
      items: ["Komodlar va tumbalar", "Tokcha va javonlar", "Qavatli ilgichlar", "Shkaflar va garderoblar"],
    },
    {
      title: "Stollar va stullar",
      items: ["Stullar", "Jurnal stollari", "Stollar", "Ovqatlanish guruhlari", "Yana 2"],
    },
    {
      title: "Vannaxona uchun mebel",
      items: [
        "Rakovina uchun tumbalar",
        "Vannaxona uchun mebel to'plamlari",
        "Vannaxona uchun shkaflar",
        "Vannaxona uchun penallar",
      ],
    },
    {
      title: "Yumshoq mebel",
      items: ["Pufiklar ba banketkalar", "Divanlar", "Karkassis divanlar", "Kreslolar", "Yumshoq mebel to'plamlari"],
    },
  ],
};

const defaultSections = [
  { title: "Bo'limlar", items: ["Ommabop", "Yangi mahsulotlar", "Chegirmalar", "Barchasini ko'rish"] },
];

const CatalogMenu = ({ onClose }) => {
  const [activeCategory, setActiveCategory] = useState("Mebel");
  const sections = categoryContent[activeCategory] || defaultSections;

  return (
    <div className="absolute left-0 right-0 top-full z-50 mt-2 rounded-2xl border bg-white shadow-2xl">
      <div className="grid grid-cols-[320px_1fr]">
        <div className="max-h-[72vh] overflow-y-auto border-r p-2">
          {categories.map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => setActiveCategory(name)}
              className={`flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-[18px] ${
                activeCategory === name ? "bg-gray-100 font-semibold" : "hover:bg-gray-50"
              }`}
            >
              <span>{name}</span>
              <span className="text-gray-400">›</span>
            </button>
          ))}
        </div>

        <div className="max-h-[72vh] overflow-y-auto p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-4xl font-bold">{activeCategory}</h2>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-2 py-1 text-4xl text-gray-600 hover:bg-gray-100"
            >
              x
            </button>
          </div>

          <div className="grid grid-cols-3 gap-x-12 gap-y-8">
            {sections.map((section) => (
              <div key={section.title}>
                <h3 className="mb-3 text-2xl font-bold">{section.title}</h3>
                <ul className="space-y-2">
                  {section.items.map((item) => (
                    <li key={item}>
                      <Link
                        to="/"
                        onClick={onClose}
                        className="text-xl text-gray-500 hover:text-violet-600"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogMenu;
