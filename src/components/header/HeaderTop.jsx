import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BIG_ADMIN_AUTH_KEY,
  CURRENT_USER_ID_KEY,
  USER_ROLE_KEY,
} from "../../constants/storageKeys";
import { useLanguage } from "../../i18n/languageContext";
import { getRegisteredUsers } from "../../services/sharedState";

const HeaderTop = () => {
  const navigate = useNavigate();
  const [openProfile, setOpenProfile] = useState(false);
  const [openLang, setOpenLang] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const syncCurrentUser = async () => {
      const role = localStorage.getItem(USER_ROLE_KEY);
      const currentUserId = localStorage.getItem(CURRENT_USER_ID_KEY);
      if (role !== "user" || !currentUserId) {
        setCurrentUser(null);
        return;
      }

      const users = await getRegisteredUsers();
      setCurrentUser(users.find((user) => user.id === currentUserId) || null);
    };

    void syncCurrentUser();
    window.addEventListener("users-updated", syncCurrentUser);
    window.addEventListener("storage", syncCurrentUser);
    window.addEventListener("focus", syncCurrentUser);
    return () => {
      window.removeEventListener("users-updated", syncCurrentUser);
      window.removeEventListener("storage", syncCurrentUser);
      window.removeEventListener("focus", syncCurrentUser);
    };
  }, []);

  const initials = currentUser
    ? `${(currentUser.firstName || "").slice(0, 1)}${(currentUser.lastName || "").slice(0, 1)}`.toUpperCase()
    : "U";

  useEffect(() => {
    if (!currentUser) return;
    if ((currentUser.accountStatus || "active") !== "frozen") return;

    const warned = sessionStorage.getItem("frozen_user_warned") === "1";
    if (!warned) {
      alert(t("frozenAlert"));
      sessionStorage.setItem("frozen_user_warned", "1");
    }

    localStorage.removeItem(USER_ROLE_KEY);
    localStorage.removeItem(CURRENT_USER_ID_KEY);
    localStorage.removeItem(BIG_ADMIN_AUTH_KEY);
    navigate(
      `/register?reason=frozen&email=${encodeURIComponent(currentUser.email || "")}`
    );
  }, [currentUser, navigate, t]);

  const handleLogout = () => {
    localStorage.removeItem(USER_ROLE_KEY);
    localStorage.removeItem(CURRENT_USER_ID_KEY);
    localStorage.removeItem(BIG_ADMIN_AUTH_KEY);
    navigate("/dashboard");
  };

  return (
    <div className="bg-stone-200">
      <div className="container">
        <nav className="flex flex-col lg:flex-row lg:items-center justify-between py-2 px-1 gap-2 font-medium text-sm">
          <ul className="flex flex-wrap items-center gap-3 lg:gap-5">
            <li>
              <button className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="lucide lucide-map-pin-icon lucide-map-pin"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" /><circle cx="12" cy="10" r="3" /></svg>
                {t("city")}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="lucide lucide-chevron-down-icon lucide-chevron-down"><path d="m6 9 6 6 6-6" /></svg>
              </button>
            </li>
            <li><Link to="/Location">{t("pickupPoints")}</Link></li>
          </ul>
          <ul className="flex flex-wrap items-center gap-3 lg:gap-5">
            <li><Link to="/Seller" className="text-[#7f4dff]">{t("sellerSection")}</Link></li>
            <li className="hidden md:block"><Link to="https://promo.uzum.uz/uz/promo/pvz" className="text-[#7f4dff]">{t("openPickupPoint")}</Link></li>
            <li className="hidden sm:block"><Link to="/SavolJavob" className="text-[#4d4f59]">{t("faq")}</Link></li>
            <li className="hidden sm:block"><Link to="/" className="text-[#4d4f59]">{t("myOrders")}</Link></li>
            <li className="relative">
              <button onClick={() => setOpenLang((prev) => !prev)} className="flex items-center gap-2">
                <img width="25px" className="rounded-3xl" src="/bayrog.png" alt="" />
                {language === "ru" ? t("russian") : t("uzbek")}
              </button>
              {openLang && (
                <div className="absolute right-0 top-9 w-44 rounded-xl border bg-white p-2 shadow-xl z-50">
                  <p className="px-2 py-1 text-xs text-gray-500">{t("chooseLanguage")}</p>
                  <button
                    onClick={() => {
                      setLanguage("uz");
                      setOpenLang(false);
                    }}
                    className="w-full rounded-lg px-2 py-2 text-left hover:bg-gray-100"
                  >
                    {t("uzbek")}
                  </button>
                  <button
                    onClick={() => {
                      setLanguage("ru");
                      setOpenLang(false);
                    }}
                    className="w-full rounded-lg px-2 py-2 text-left hover:bg-gray-100"
                  >
                    {t("russian")}
                  </button>
                </div>
              )}
            </li>

            {currentUser && (
              <li className="relative">
                <button
                  onClick={() => setOpenProfile((prev) => !prev)}
                  className="w-9 h-9 rounded-full bg-violet-600 text-white flex items-center justify-center font-semibold"
                >
                  {initials}
                </button>

                {openProfile && (
                  <div className="absolute right-0 top-11 w-[88vw] max-w-72 bg-white border rounded-xl shadow-xl p-4 z-50">
                    <p className="font-semibold text-base">{currentUser.fullName}</p>
                    <p className="text-sm text-gray-600 mt-1">{currentUser.email}</p>
                    <p className="text-sm text-gray-600">+998 {currentUser.phone}</p>
                    <p className="text-sm text-gray-600">{currentUser.gender || "-"}</p>
                    <p className="text-sm text-gray-600">{currentUser.region || "-"}</p>
                    <button
                      onClick={handleLogout}
                      className="mt-3 w-full rounded-lg border border-red-300 text-red-600 py-2"
                    >
                      {t("logout")}
                    </button>
                  </div>
                )}
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default HeaderTop;
