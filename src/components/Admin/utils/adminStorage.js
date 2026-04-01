import { arrData, arrData2, arrData3, arrData4 } from "../../../data/data";

export const ADMIN_PRODUCTS_KEY = "admin_products";
export const ADMIN_TRASH_KEY = "admin_products_trash";
export const TRASH_RETENTION_DAYS = 30;
export const TRASH_RETENTION_MS = TRASH_RETENTION_DAYS * 24 * 60 * 60 * 1000;

export const parsePrice = (value) =>
  Number(String(value ?? "").replace(/\D/g, "")) || 0;

export const formatPrice = (value) =>
  Number(value || 0).toLocaleString("ru-RU");

export const emptyForm = {
  name: "",
  section: "",
  price: "",
  oldPrice: "",
  stock: "",
  image: "",
};

export const readProducts = () => {
  try {
    const raw = localStorage.getItem(ADMIN_PRODUCTS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
};

export const writeProducts = (items) => {
  localStorage.setItem(ADMIN_PRODUCTS_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("admin-products-updated"));
};

export const readTrash = () => {
  try {
    const raw = localStorage.getItem(ADMIN_TRASH_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const writeTrash = (items) => {
  localStorage.setItem(ADMIN_TRASH_KEY, JSON.stringify(items));
};

export const cleanupExpiredTrash = (items) => {
  const now = new Date().getTime();
  return items.filter((item) => {
    const deletedAt = Number(item.deletedAt || 0);
    return deletedAt > 0 && now - deletedAt <= TRASH_RETENTION_MS;
  });
};

export const buildInitialProducts = () => {
  const collections = [
    { section: arrData.titleName, data: arrData.data },
    { section: arrData2.titleName, data: arrData2.data },
    { section: arrData3.titleName, data: arrData3.data },
    { section: arrData4.titleName, data: arrData4.data },
  ];

  return collections.flatMap((group, groupIndex) =>
    group.data.map((item, idx) => ({
      id: `${groupIndex + 1}-${idx + 1}`,
      section: group.section,
      name: item.discription || "Nomsiz mahsulot",
      price: parsePrice(item.price),
      oldPrice: parsePrice(item.oldPrice),
      stock: 10 + idx,
      status: "active",
      image: (item.img || "").trim(),
    }))
  );
};
