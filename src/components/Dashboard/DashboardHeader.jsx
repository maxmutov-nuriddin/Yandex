import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BIG_ADMIN_AUTH_KEY,
  CURRENT_USER_ID_KEY,
  LOGIN_AUDIT_KEY,
  USER_ROLE_KEY,
} from "../../constants/storageKeys";
import { hashPassword } from "../../utils/password";
import { getRegisteredUsers, setRegisteredUsers } from "../../services/sharedState";

const ADMIN_PHONE = "123456789";
const ADMIN_PASSWORD = "admin123";
const SELLER_PHONE = "seller";
const SELLER_PASSWORD = "seller";
const BIG_ADMIN_EMAIL = "support@gmail.com";
const BIG_ADMIN_PASSWORD = "support";

const normalizePhone = (value) => {
  const digits = String(value || "").replace(/\D/g, "");
  if (digits.startsWith("998")) return digits.slice(3);
  return digits;
};

const appendLoginAudit = (entry) => {
  try {
    const raw = localStorage.getItem(LOGIN_AUDIT_KEY);
    const list = raw ? JSON.parse(raw) : [];
    const next = Array.isArray(list) ? [entry, ...list].slice(0, 200) : [entry];
    localStorage.setItem(LOGIN_AUDIT_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event("login-audit-updated"));
  } catch {
    // ignore
  }
};

const DashboardHeader = () => {
  const navigate = useNavigate();
  const [loginValue, setLoginValue] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const setRoleAndNavigate = (role, path) => {
    try {
      localStorage.setItem(USER_ROLE_KEY, role);
      localStorage.removeItem(BIG_ADMIN_AUTH_KEY);
      localStorage.removeItem(CURRENT_USER_ID_KEY);
      navigate(path);
    } catch {
      setError("Storage ishlamayapti. Browser sozlamasini tekshiring.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const normalizedPhone = normalizePhone(loginValue);
    const loginLower = String(loginValue || "").trim().toLowerCase();
    const looksLikeEmail = /[a-z]/i.test(loginLower) || loginLower.includes("@");

    if (!loginLower) {
      setError("Email yoki telefon kiriting");
      return;
    }

    if (!password.trim()) {
      setError("Parol kiriting");
      return;
    }

    if (looksLikeEmail && loginLower !== SELLER_PHONE && !loginLower.includes("@")) {
      setError("Iltimos, @ ni kirgizin");
      return;
    }

    if (looksLikeEmail && loginLower !== SELLER_PHONE && !loginLower.includes("gmail.com")) {
      setError("Iltimos, gmail.com ni kirgizin");
      return;
    }

    if (
      (loginLower === "bigadmin" || loginLower === BIG_ADMIN_EMAIL) &&
      password === BIG_ADMIN_PASSWORD
    ) {
      setError("");
      localStorage.setItem(USER_ROLE_KEY, "admin");
      localStorage.setItem(BIG_ADMIN_AUTH_KEY, "1");
      localStorage.removeItem(CURRENT_USER_ID_KEY);
      appendLoginAudit({
        id: `audit-${Date.now()}`,
        role: "admin",
        login: "BigAdmin",
        name: "Big Admin",
        at: new Date().toISOString(),
      });
      navigate("/big-admin");
      return;
    }

    if (normalizedPhone === ADMIN_PHONE && password === ADMIN_PASSWORD) {
      setError("");
      appendLoginAudit({
        id: `audit-${Date.now()}`,
        role: "admin",
        login: `+998${ADMIN_PHONE}`,
        name: "Admin",
        at: new Date().toISOString(),
      });
      setRoleAndNavigate("admin", "/admin");
      return;
    }

    if (loginLower === SELLER_PHONE && password === SELLER_PASSWORD) {
      setError("");
      appendLoginAudit({
        id: `audit-${Date.now()}`,
        role: "seller",
        login: SELLER_PHONE,
        name: "Seller",
        at: new Date().toISOString(),
      });
      setRoleAndNavigate("seller", "/seller-cabinet");
      return;
    }

    const users = await getRegisteredUsers();
    const inputHash = await hashPassword(password);
    const matchedUser = users.find(
      (user) =>
        String(user.email || "").toLowerCase() === loginLower &&
        (user.passwordHash === inputHash || user.password === password)
    );
    if (matchedUser) {
      if ((matchedUser.accountStatus || "active") === "frozen") {
        setError("Akkaunt muzlatilgan. Yangi akkaunt ochishingiz kerak.");
        setTimeout(() => {
          navigate(
            `/register?reason=frozen&email=${encodeURIComponent(
              matchedUser.email || ""
            )}`
          );
        }, 800);
        return;
      }
      setError("");
      localStorage.setItem(USER_ROLE_KEY, "user");
      localStorage.setItem(CURRENT_USER_ID_KEY, matchedUser.id);
      localStorage.removeItem(BIG_ADMIN_AUTH_KEY);

      // Backward-compatibility: old users with plain password -> hashga migrate qilamiz.
      if (!matchedUser.passwordHash && matchedUser.password) {
        const nextUsers = users.map((user) =>
          user.id === matchedUser.id ? { ...user, passwordHash: inputHash, password: undefined } : user
        );
        await setRegisteredUsers(nextUsers);
      }

      appendLoginAudit({
        id: `audit-${Date.now()}`,
        role: "user",
        login: matchedUser.email,
        name: matchedUser.fullName || `${matchedUser.firstName || ""} ${matchedUser.lastName || ""}`.trim(),
        at: new Date().toISOString(),
      });

      navigate("/");
      return;
    }

    setError("Login yoki parol noto'g'ri");
  };

  return (
    <div className="w-full">
      <header className="w-full border-b border-white/10 bg-[#1F2026]">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/"> <img src="/Dashboard.jpg" alt="Dashboard logo" className="h-10 w-auto" /> </Link>
          <Link to="/register" className="text-white text-sm underline">
            Ro'yxatdan o'tish
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10 flex justify-center">
        <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
          <h1 className="text-2xl font-bold text-gray-800 mb-5">Dashboard orqali kiring</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Email yoki telefon"
              value={loginValue}
              onChange={(e) => {
                setLoginValue(e.target.value);
                if (error) setError("");
              }}
              className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:ring-2 focus:ring-violet-500"
            />

            <input
              type="password"
              placeholder="Parol"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError("");
              }}
              className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:ring-2 focus:ring-violet-500"
            />

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              className="w-full rounded-lg bg-violet-600 hover:bg-violet-700 text-white py-3 font-semibold"
            >
              Kirish
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default DashboardHeader;
