import { CURRENT_USER_ID_KEY, USER_ROLE_KEY } from "../constants/storageKeys";

const CART_STORAGE_KEY_PREFIX = "uzum_cart_items";

const getCartScope = () => {
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

export const getScopedCartStorageKey = () => {
  return `${CART_STORAGE_KEY_PREFIX}:${getCartScope()}`;
};

export const readScopedCartItems = () => {
  try {
    const raw = localStorage.getItem(getScopedCartStorageKey());
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const writeScopedCartItems = (items) => {
  localStorage.setItem(getScopedCartStorageKey(), JSON.stringify(items));
  window.dispatchEvent(new Event("cart-updated"));
};
