import React, { useState } from "react";
import { APP_LANGUAGE_KEY } from "../constants/storageKeys";
import { LanguageContext } from "./languageContext";
import { translations } from "./translations";

const getInitialLanguage = () => {
  try {
    const saved = localStorage.getItem(APP_LANGUAGE_KEY);
    return saved === "ru" ? "ru" : "uz";
  } catch {
    return "uz";
  }
};

export default function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(getInitialLanguage);

  const setLanguage = (nextLanguage) => {
    const normalized = nextLanguage === "ru" ? "ru" : "uz";
    setLanguageState(normalized);
    try {
      localStorage.setItem(APP_LANGUAGE_KEY, normalized);
    } catch {
      // ignore storage errors
    }
  };

  const t = (key) => translations[language]?.[key] ?? translations.uz[key] ?? key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

