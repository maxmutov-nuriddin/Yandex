import React from "react";
import { formatPrice, TRASH_RETENTION_MS } from "./utils/adminStorage";

const getDaysLeft = (deletedAt) => {
  const endAt = Number(deletedAt || 0) + TRASH_RETENTION_MS;
  const leftMs = endAt - new Date().getTime();
  if (leftMs <= 0) return 0;
  return Math.ceil(leftMs / (24 * 60 * 60 * 1000));
};

const AdminTrash = ({ trash, onCleanup, onRestore, onPermanentDelete }) => (
  <section className="rounded-2xl border bg-white p-5 mt-6">
    <div className="flex items-center justify-between gap-3 mb-4">
      <h2 className="text-xl font-semibold">
        O'chirilgan mahsulotlar (30 kun ichida tiklash)
      </h2>
      <button
        type="button"
        onClick={onCleanup}
        className="rounded-lg border px-3 py-1 text-sm"
      >
        Eskilarini tozalash
      </button>
    </div>

    {trash.length === 0 ? (
      <p className="text-gray-500">Hozircha o'chirilgan mahsulot yo'q.</p>
    ) : (
      <div className="overflow-auto">
        <table className="w-full min-w-[760px] text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2">Mahsulot</th>
              <th className="py-2">Bo'lim</th>
              <th className="py-2">Narx</th>
              <th className="py-2">Qolgan muddat</th>
              <th className="py-2">Amal</th>
            </tr>
          </thead>
          <tbody>
            {trash.map((item) => (
              <tr key={item.id} className="border-b align-top">
                <td className="py-3 pr-3">
                  <div className="flex gap-3">
                    <img
                      src={item.image || "/logo.png"}
                      alt={item.name}
                      className="w-12 h-12 rounded-lg object-cover bg-gray-100"
                    />
                    <p className="font-medium leading-5">{item.name}</p>
                  </div>
                </td>
                <td className="py-3 pr-3">{item.section}</td>
                <td className="py-3 pr-3">{formatPrice(item.price)} so'm</td>
                <td className="py-3 pr-3">{getDaysLeft(item.deletedAt)} kun</td>
                <td className="py-3">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => onRestore(item.id)}
                      className="rounded-lg border px-3 py-1 text-green-700"
                    >
                      Restore
                    </button>
                    <button
                      type="button"
                      onClick={() => onPermanentDelete(item.id)}
                      className="rounded-lg border px-3 py-1 text-red-600"
                    >
                      Butunlay o'chirish
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </section>
);

export default AdminTrash;
