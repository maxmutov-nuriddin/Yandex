import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../i18n/languageContext";

export default function YangiOne() {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();
  const [open, setOpen] = useState(false);

  const changeLanguage = (nextLanguage) => {
    setLanguage(nextLanguage);
    setOpen(false);
  };

  return (
    <header className="w-full">
      <div className="mx-auto flex w-full max-w-[1450px] flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <img
          onClick={() => navigate("/")}
          className="h-[40px] w-[225px] cursor-pointer"
          src="/4.png"
          alt="Logo"
        />

        <div className="flex w-full flex-wrap items-center gap-3 lg:w-auto lg:justify-end">
          <button className="flex h-[50px] w-full items-center justify-center gap-3 rounded-xl border border-gray-300 transition hover:bg-gray-100 sm:w-[220px]">
            <img className="w-[32px]" src="/i.jpg" alt="Icon" />
            {t("askQuestion")}
          </button>

          <div className="relative w-full sm:w-[220px]">
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="h-[50px] w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-left transition hover:bg-gray-100"
            >
              {language === "ru" ? t("russian") : t("uzbek")}
            </button>

            {open && (
              <div className="absolute right-0 top-full z-50 mt-2 w-full rounded-lg border bg-white shadow-md">
                <div className="ms-3 my-6 text-xl font-medium">{t("chooseLanguage")}</div>
                <button
                  onClick={() => changeLanguage("uz")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  {t("uzbek")}
                </button>
                <button
                  onClick={() => changeLanguage("ru")}
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
