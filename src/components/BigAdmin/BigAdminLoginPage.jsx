import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BIG_ADMIN_EMAIL = "rahmatjonovabdulazi9@gmail.com";
const BIG_ADMIN_PASSWORD = "Uzum2026!Rahmatjon";
const BIG_ADMIN_AUTH_KEY = "big_admin_auth";

const BigAdminLoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const normalizedEmail = String(email || "").trim().toLowerCase();
    if (normalizedEmail !== BIG_ADMIN_EMAIL || password !== BIG_ADMIN_PASSWORD) {
      setError("BigAdmin email yoki paroli noto'g'ri");
      return;
    }

    localStorage.setItem(BIG_ADMIN_AUTH_KEY, "1");
    navigate("/big-admin");
  };

  return (
    <div className="min-h-[70vh] bg-[radial-gradient(circle_at_top,_#e0f2fe_0%,_#f8fafc_48%,_#eef2ff_100%)] py-10 sm:py-14">
      <div className="container">
        <div className="mx-auto w-full max-w-md rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-xl sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Xavfsiz kirish</p>
          <h1 className="mt-2 text-2xl font-bold text-slate-900">BigAdmin kirish</h1>
          <p className="mt-1 text-slate-500">BigAdmin panel uchun alohida parol kiriting.</p>

          <form className="mt-5 space-y-3" onSubmit={handleSubmit}>
            <input
              type="email"
              className="w-full rounded-xl border border-slate-300 px-3 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
              placeholder="BigAdmin email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError("");
              }}
            />
            <input
              type="password"
              className="w-full rounded-xl border border-slate-300 px-3 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
              placeholder="BigAdmin paroli"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError("");
              }}
            />
            {error && <p className="text-sm text-rose-600">{error}</p>}
            <button
              type="submit"
              className="w-full rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Kirish
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BigAdminLoginPage;
