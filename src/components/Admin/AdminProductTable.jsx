import React from "react";
import { formatPrice } from "./utils/adminStorage";

const AdminProductTable = ({
  filtered,
  query,
  setQuery,
  onView,
  onEdit,
  onDelete,
  onToggleStatus,
}) => (
  <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white/95 p-5 shadow-sm sm:p-6">
    <div className="flex flex-wrap justify-between gap-3 mb-4">
      <h2 className="text-xl font-semibold text-slate-900">Mahsulotlar jadvali</h2>
      <input
        className="min-w-[220px] rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100 sm:min-w-[260px]"
        placeholder="Qidirish: nom / bo'lim / ID"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>

    <div className="overflow-auto">
      <table className="w-full min-w-[820px] text-sm text-slate-700">
        <thead>
          <tr className="text-left border-b border-slate-200 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <th className="py-3">ID</th>
            <th className="py-3">Mahsulot</th>
            <th className="py-3">Bo'lim</th>
            <th className="py-3">Narx</th>
            <th className="py-3">Qoldiq</th>
            <th className="py-3">Status</th>
            <th className="py-3">Amal</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((item) => (
            <tr key={item.id} className="border-b border-slate-100 align-top last:border-b-0">
              <td className="py-3 pr-3 text-slate-500">{item.id}</td>
              <td className="py-3 pr-3">
                <div className="flex gap-3">
                  <img
                    src={item.image || "/logo.png"}
                    alt={item.name}
                    className="h-12 w-12 rounded-xl object-cover ring-1 ring-slate-200"
                  />
                  <div>
                    <p className="font-medium leading-5 text-slate-900">{item.name}</p>
                    {!!item.oldPrice && (
                      <p className="text-slate-400 line-through">
                        {formatPrice(item.oldPrice)} so'm
                      </p>
                    )}
                  </div>
                </div>
              </td>
              <td className="py-3 pr-3">{item.section}</td>
              <td className="py-3 pr-3 font-semibold">
                {formatPrice(item.price)} so'm
              </td>
              <td className="py-3 pr-3">{item.stock}</td>
              <td className="py-3 pr-3">
                <button
                  onClick={() => onToggleStatus(item.id)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    item.status === "active"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {item.status === "active" ? "active" : "inactive"}
                </button>
              </td>
              <td className="py-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => onView(item)}
                    className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
                  >
                    View
                  </button>
                  <button
                    onClick={() => onEdit(item)}
                    className="rounded-lg border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700 transition hover:bg-sky-100"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-100"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
);

export default AdminProductTable;
