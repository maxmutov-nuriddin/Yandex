import React from "react";
import { formatPrice } from "./utils/adminStorage";

const AdminStats = ({ stats, trashCount }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 mb-6">
    <div className="rounded-2xl border bg-white p-4">
      <p className="text-gray-500">Jami mahsulot</p>
      <p className="text-2xl font-bold">{stats.total}</p>
    </div>
    <div className="rounded-2xl border bg-white p-4">
      <p className="text-gray-500">Faol mahsulot</p>
      <p className="text-2xl font-bold text-green-600">{stats.active}</p>
    </div>
    <div className="rounded-2xl border bg-white p-4">
      <p className="text-gray-500">Kam qoldiq</p>
      <p className="text-2xl font-bold text-orange-600">{stats.lowStock}</p>
    </div>
    <div className="rounded-2xl border bg-white p-4">
      <p className="text-gray-500">Narxlar yig'indisi</p>
      <p className="text-2xl font-bold text-violet-600">
        {formatPrice(stats.sum)} so'm
      </p>
    </div>
    <div className="rounded-2xl border bg-white p-4">
      <p className="text-gray-500">Trash (30 kun)</p>
      <p className="text-2xl font-bold text-red-600">{trashCount}</p>
    </div>
  </div>
);

export default AdminStats;
