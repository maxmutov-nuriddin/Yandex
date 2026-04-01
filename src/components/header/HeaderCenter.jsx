import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CURRENT_USER_ID_KEY, USER_ROLE_KEY } from "../../constants/storageKeys";
import { readScopedCartItems } from "../../utils/scopedCartStorage";
import { readScopedFavoriteItems } from "../../utils/scopedFavoritesStorage";
import { useLanguage } from "../../i18n/languageContext";

const HeaderCenter = ({ onCatalogToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const [counts, setCounts] = useState({ savat: 0, saralangan: 0 });
  const [searchQuery, setSearchQuery] = useState(() => {
    const params = new URLSearchParams(location.search);
    return params.get("q") || "";
  });
  const userRole = localStorage.getItem(USER_ROLE_KEY);
  const currentUserId = localStorage.getItem(CURRENT_USER_ID_KEY);
  const isUserLoggedIn = userRole === "user" && Boolean(currentUserId);

  useEffect(() => {
    const syncCounts = () => {
      try {
        const items = readScopedCartItems();
        const favoriteItems = readScopedFavoriteItems();
        const savatCount = items.reduce((sum, item) => sum + Number(item.quantity || 1), 0);
        const saralanganCount = favoriteItems.length;
        setCounts({ savat: savatCount, saralangan: saralanganCount });
      } catch {
        setCounts({ savat: 0, saralangan: 0 });
      }
    };

    syncCounts();
    window.addEventListener("storage", syncCounts);
    window.addEventListener("cart-updated", syncCounts);
    window.addEventListener("favorites-updated", syncCounts);
    return () => {
      window.removeEventListener("storage", syncCounts);
      window.removeEventListener("cart-updated", syncCounts);
      window.removeEventListener("favorites-updated", syncCounts);
    };
  }, []);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const value = searchQuery.trim();
    if (!value) {
      navigate("/");
      return;
    }
    navigate(`/?q=${encodeURIComponent(value)}`);
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between gap-3 lg:gap-6 lg:items-center py-3 px-1">
      <Link to="/">
        <img className="" width="215px" height="32px" src="/Uzum Market Logo Vector.svg.png" alt="" />
      </Link>
      <form onSubmit={handleSearchSubmit} className="flex flex-wrap sm:flex-nowrap justify-between gap-2 items-center w-full">
        <button
          type="button"
          onClick={onCatalogToggle}
          className="bg-[#e5e5ff] text-[#7f4dff] py-2 px-4 rounded-md flex gap-2 w-full sm:w-auto justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="lucide lucide-notebook-tabs-icon lucide-notebook-tabs"
          >
            <path d="M2 6h4" />
            <path d="M2 10h4" />
            <path d="M2 14h4" />
            <path d="M2 18h4" />
            <rect width="16" height="20" x="4" y="2" rx="2" />
            <path d="M15 2v20" />
            <path d="M15 7h5" />
            <path d="M15 12h5" />
            <path d="M15 17h5" />
          </svg>
          {t("catalog")}
        </button>
        <input
          className="w-full border border-stone-400 py-2 px-4 rounded-md"
          type="search"
          placeholder={t("searchPlaceholder")}
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        <button type="submit" className="border border-stone-400 py-2 px-4 rounded-md w-full sm:w-auto">
          {t("search")}
        </button>
      </form>
      <ul className="flex justify-between sm:justify-end gap-4 sm:gap-5 items-center w-full lg:w-auto">
        {!isUserLoggedIn && (
          <li>
            <Link to="/dashboard" className="flex gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="lucide lucide-user-icon lucide-user"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              {t("login")}
            </Link>
          </li>
        )}
        <li>
          <Link to="/saralangan" className="flex gap-2 relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="lucide lucide-heart-icon lucide-heart"
            >
              <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
            </svg>
            {t("favorites")}
            {counts.saralangan > 0 && (
              <span className="absolute -top-2 -right-3 bg-violet-600 text-white text-[10px] rounded-full min-w-5 h-5 px-1 flex items-center justify-center">
                {counts.saralangan}
              </span>
            )}
          </Link>
        </li>
        <li>
          <Link to="/savat" className="flex gap-2 relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="lucide lucide-shopping-cart-icon lucide-shopping-cart"
            >
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
            {t("cart")}
            {counts.savat > 0 && (
              <span className="absolute -top-2 -right-3 bg-violet-600 text-white text-[10px] rounded-full min-w-5 h-5 px-1 flex items-center justify-center">
                {counts.savat}
              </span>
            )}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default HeaderCenter;
