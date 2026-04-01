import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../i18n/languageContext";

const HeaderFooter = ({ onCatalogToggle }) => {
  const { t } = useLanguage();

  const quickLinks = [
    {
      key: "weekProducts",
      to: "/ArzonNarx",
      icon: "https://static.uzum.uz/baner/tovarnednew1612.png",
    },
    {
      key: "winterCollection",
      to: "/ArzonNarx",
      icon: "https://static.uzum.uz/baner/feshn3110.png",
    },
    {
      key: "yourBeauty",
      to: "/ArzonNarx",
      icon: "https://static.uzum.uz/baner/krasotanew1812.png",
    },
    {
      key: "hobby",
      to: "/ArzonNarx",
      icon: "https://static.uzum.uz/baner/hobbi2110.png",
    },
    {
      key: "smartphones",
      to: "/ArzonNarx",
      icon: "https://static.uzum.uz/baner/smart2010.png",
    },
    { key: "fishing", to: "/ArzonNarx" },
    { key: "electronics", to: "/ArzonNarx" },
    { key: "appliances", to: "/ArzonNarx" },
    { key: "clothes", to: "/ArzonNarx" },
  ];

  return (
    <div className="px-1 py-3">
      <ul className="flex flex-wrap items-center justify-between gap-3">
        {quickLinks.map((item) => (
          <li key={item.key}>
            <Link
              className={`text-[#4d4f59] hover:text-[#2f3140] ${
                item.icon ? "flex items-center gap-1" : ""
              }`}
              to={item.to}
            >
              {item.icon ? <img width={24} height={24} src={item.icon} alt="" /> : null}
              {t(item.key)}
            </Link>
          </li>
        ))}

        <li>
          <button type="button" onClick={onCatalogToggle} className="text-[#4d4f59] flex gap-2">
            {t("more")}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#4d4f59"
              className="lucide lucide-chevron-down-icon lucide-chevron-down"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default HeaderFooter;
