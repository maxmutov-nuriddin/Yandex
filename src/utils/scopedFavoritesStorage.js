import { CURRENT_USER_ID_KEY, USER_ROLE_KEY } from "../constants/storageKeys";

const FAVORITES_STORAGE_KEY_PREFIX = "uzum_favorite_items";

const getFavoritesScope = () => {
  try {
    const role = localStorage.getItem(USER_ROLE_KEY) || "guest";
    const currentUserId = localStorage.getItem(CURRENT_USER_ID_KEY);

    if (role === "user" && currentUserId) {
      return `user:${currentUserId}`;
    }

    if (role === "seller") {
      return "seller:default";
    }

    if (role === "admin") {
      return "admin:default";
    }

    return "guest:default";
  } catch {
    return "guest:default";
  }
};

export const getScopedFavoritesStorageKey = () => {
  return `${FAVORITES_STORAGE_KEY_PREFIX}:${getFavoritesScope()}`;
};

export const readScopedFavoriteItems = () => {
  try {
    const raw = localStorage.getItem(getScopedFavoritesStorageKey());
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const writeScopedFavoriteItems = (items) => {
  localStorage.setItem(getScopedFavoritesStorageKey(), JSON.stringify(items));
  window.dispatchEvent(new Event("favorites-updated"));
};
