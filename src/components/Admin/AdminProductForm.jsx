import React from "react";

const AdminProductForm = ({ form, setForm, editingId, onSubmit, onCancel }) => (
  <section className="h-fit rounded-3xl border border-slate-200 bg-white/95 p-5 shadow-sm sm:p-6">
    <h2 className="text-xl font-semibold text-slate-900 mb-4">
      {editingId ? "Mahsulotni tahrirlash" : "Yangi mahsulot qo'shish"}
    </h2>
    <form className="space-y-3" onSubmit={onSubmit}>
      <input
        className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
        placeholder="Mahsulot nomi"
        value={form.name}
        onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
      />
      <input
        className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
        placeholder="Bo'lim"
        value={form.section}
        onChange={(e) =>
          setForm((prev) => ({ ...prev, section: e.target.value }))
        }
      />
      <input
        className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
        placeholder="Narx (so'm)"
        value={form.price}
        onChange={(e) =>
          setForm((prev) => ({ ...prev, price: e.target.value }))
        }
      />
      <input
        className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
        placeholder="Eski narx (so'm)"
        value={form.oldPrice}
        onChange={(e) =>
          setForm((prev) => ({ ...prev, oldPrice: e.target.value }))
        }
      />
      <input
        className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
        placeholder="Soni"
        value={form.stock}
        onChange={(e) =>
          setForm((prev) => ({ ...prev, stock: e.target.value }))
        }
      />
      <input
        className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
        placeholder="Rasm URL"
        value={form.image}
        onChange={(e) =>
          setForm((prev) => ({ ...prev, image: e.target.value }))
        }
      />
      <div className="flex gap-2 pt-1">
        <button
          type="submit"
          className="flex-1 rounded-xl bg-slate-900 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          {editingId ? "Saqlash" : "Qo'shish"}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Bekor qilish
          </button>
        )}
      </div>
    </form>
  </section>
);

export default AdminProductForm;
