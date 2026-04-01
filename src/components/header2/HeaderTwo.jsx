import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../i18n/languageContext";

export default function HeaderTwo() {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full">
      <div className="flex justify-between items-center py-4 px-9">
        <img
          onClick={() => navigate("/")}
          className="w-[225px] h-[40px] cursor-pointer"
          src="/4.png"
          alt="Logo"
        />

        <div className="flex items-center gap-7">
          <button className="flex items-center justify-center rounded-xl gap-3 border border-gray-300 w-[200px] h-[57px] hover:bg-gray-100 transition">
            <img className="w-[32px]" src="/i.jpg" alt="Icon" />
            {t("askQuestion")}
          </button>

          <div className="relative flex items-center gap-4">
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="px-4 py-2 border border-gray-300 rounded-xl w-[200px] h-[57px] bg-white hover:bg-gray-100 transition"
            >
              {language === "ru" ? t("russian") : t("uzbek")}
            </button>

            {open && (
              <div className="absolute right-0 mt-58 w-[250px] bg-white border rounded-lg shadow-md z-50">
                <div className="ms-3 my-6 text-xl font-medium">{t("chooseLanguage")}</div>
                <button
                  onClick={() => {
                    setLanguage("uz");
                    setOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  {t("uzbek")}
                </button>
                <button
                  onClick={() => {
                    setLanguage("ru");
                    setOpen(false);
                  }}
                  className="block w-full text-left px-4 py-4 hover:bg-gray-100"
                >
                  {t("russian")}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
