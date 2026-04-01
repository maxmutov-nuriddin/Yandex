import {
  REGISTERED_USERS_KEY,
  SELLER_CARDS_KEY,
  SELLER_CARD_REQUESTS_KEY,
} from "../constants/storageKeys";

const API_BASE = String(import.meta.env.VITE_SHARED_API_BASE_URL || "")
  .trim()
  .replace(/\/+$/, "");
const STATE_COLLECTION = String(import.meta.env.VITE_SHARED_STATE_COLLECTION || "app_state").trim();

let cloudRecordId = null;

const readLocalArray = (key) => {
  try {
    const raw = localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeLocalArray = (key, value) => {
  try {
    const safeValue = Array.isArray(value) ? value : [];
    localStorage.setItem(key, JSON.stringify(safeValue));
  } catch {
    // ignore
  }
};

const readLocalState = () => ({
  users: readLocalArray(REGISTERED_USERS_KEY),
  sellerCards: readLocalArray(SELLER_CARDS_KEY),
  sellerRequests: readLocalArray(SELLER_CARD_REQUESTS_KEY),
});

const writeLocalState = (state) => {
  writeLocalArray(REGISTERED_USERS_KEY, state.users);
  writeLocalArray(SELLER_CARDS_KEY, state.sellerCards);
  writeLocalArray(SELLER_CARD_REQUESTS_KEY, state.sellerRequests);
};

const normalizeState = (value) => {
  const safe = value && typeof value === "object" ? value : {};
  return {
    users: Array.isArray(safe.users) ? safe.users : [],
    sellerCards: Array.isArray(safe.sellerCards) ? safe.sellerCards : [],
    sellerRequests: Array.isArray(safe.sellerRequests) ? safe.sellerRequests : [],
  };
};

const fetchJson = async (url, init) => {
  const response = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return response.json();
};

const hasCloud = () => Boolean(API_BASE);

const ensureCloudRecordId = async () => {
  if (cloudRecordId) return cloudRecordId;

  const list = await fetchJson(`${API_BASE}/${STATE_COLLECTION}`);
  if (Array.isArray(list) && list.length > 0 && list[0]?.id) {
    cloudRecordId = String(list[0].id);
    return cloudRecordId;
  }

  const created = await fetchJson(`${API_BASE}/${STATE_COLLECTION}`, {
    method: "POST",
    body: JSON.stringify(readLocalState()),
  });
  cloudRecordId = String(created?.id || "");
  if (!cloudRecordId) {
    throw new Error("Cloud state id topilmadi");
  }
  return cloudRecordId;
};

const loadCloudState = async () => {
  const id = await ensureCloudRecordId();
  const data = await fetchJson(`${API_BASE}/${STATE_COLLECTION}/${id}`);
  return normalizeState(data);
};

const saveCloudState = async (state) => {
  const id = await ensureCloudRecordId();
  const safeState = normalizeState(state);
  await fetchJson(`${API_BASE}/${STATE_COLLECTION}/${id}`, {
    method: "PUT",
    body: JSON.stringify(safeState),
  });
};

const loadState = async () => {
  const localState = readLocalState();
  if (!hasCloud()) return localState;

  try {
    const cloudState = await loadCloudState();
    writeLocalState(cloudState);
    return cloudState;
  } catch {
    return localState;
  }
};

const saveState = async (nextState) => {
  const safeState = normalizeState(nextState);
  writeLocalState(safeState);
  if (!hasCloud()) return safeState;

  try {
    await saveCloudState(safeState);
  } catch {
    // local cache already saved, keep app usable
  }
  return safeState;
};

export const getRegisteredUsers = async () => {
  const state = await loadState();
  return state.users;
};

export const setRegisteredUsers = async (users) => {
  const state = await loadState();
  const nextState = { ...state, users: Array.isArray(users) ? users : [] };
  const saved = await saveState(nextState);
  window.dispatchEvent(new Event("users-updated"));
  return saved.users;
};

export const getSellerCards = async () => {
  const state = await loadState();
  return state.sellerCards;
};

export const setSellerCards = async (cards) => {
  const state = await loadState();
  const nextState = { ...state, sellerCards: Array.isArray(cards) ? cards : [] };
  const saved = await saveState(nextState);
  window.dispatchEvent(new Event("seller-cards-updated"));
  return saved.sellerCards;
};

export const getSellerRequests = async () => {
  const state = await loadState();
  return state.sellerRequests;
};

export const setSellerRequests = async (requests) => {
  const state = await loadState();
  const nextState = {
    ...state,
    sellerRequests: Array.isArray(requests) ? requests : [],
  };
  const saved = await saveState(nextState);
  window.dispatchEvent(new Event("seller-requests-updated"));
  return saved.sellerRequests;
};
