import React from "react";
import { useNavigate } from "react-router-dom";

const AdminHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user_role");
    localStorage.removeItem("big_admin_auth");
    navigate("/Dashboard");
  };

  return (
    <div className="mb-6 rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm backdrop-blur sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Boshqaruv</p>
          <h1 className="mt-2 text-2xl sm:text-3xl font-bold text-slate-900">Admin Panel</h1>
          <p className="text-slate-500 mt-1">Mahsulotlar boshqaruvi</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => navigate("/big-admin")}
            className="rounded-xl border border-slate-300 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
          >
            Big Admin
          </button>
          <button
            onClick={handleLogout}
            className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-medium text-rose-700 transition hover:bg-rose-100"
          >
            Chiqish
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
