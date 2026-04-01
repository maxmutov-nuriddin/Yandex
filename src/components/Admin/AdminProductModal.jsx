import React from "react";
import { formatPrice } from "./utils/adminStorage";

const AdminProductModal = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-2xl font-bold text-slate-900">Mahsulot ma'lumoti</h3>
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-300 bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
          >
            Yopish
          </button>
        </div>

        <div className="mt-4 grid md:grid-cols-[220px_1fr] gap-5">
          <img
            src={item.image || "/logo.png"}
            alt={item.name}
            className="h-52 w-full rounded-2xl object-cover ring-1 ring-slate-200"
          />
          <div className="space-y-2 text-slate-700">
            <p>
              <span className="font-semibold text-slate-900">ID:</span> {item.id}
            </p>
            <p>
              <span className="font-semibold text-slate-900">Nomi:</span> {item.name}
            </p>
            <p>
              <span className="font-semibold text-slate-900">Bo'lim:</span> {item.section}
            </p>
            <p>
              <span className="font-semibold text-slate-900">Narx:</span>{" "}
              {formatPrice(item.price)} so'm
            </p>
            <p>
              <span className="font-semibold text-slate-900">Eski narx:</span>{" "}
              {formatPrice(item.oldPrice)} so'm
            </p>
            <p>
              <span className="font-semibold text-slate-900">Qoldiq:</span> {item.stock}
            </p>
            <p>
              <span className="font-semibold text-slate-900">Status:</span> {item.status}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProductModal;
