import React, { useEffect, useMemo, useState } from "react";
import {
  emptyForm,
  parsePrice,
  writeProducts,
  // readTrash,
  // writeTrash,
  // cleanupExpiredTrash,
} from "./utils/adminStorage";
import AdminHeader from "./AdminHeader";
import AdminStats from "./AdminStats";
import AdminProductForm from "./AdminProductForm";
import AdminProductTable from "./AdminProductTable";
import AdminTrash from "./AdminTrash";
import AdminProductModal from "./AdminProductModal";

const AdminPage = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)




  const [query, setQuery] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [viewItem, setViewItem] = useState(null);
  // const [trash, setTrash] = useState(() => {
  //   const cleaned = cleanupExpiredTrash(readTrash());
  //   writeTrash(cleaned);
  //   return cleaned;
  // });

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.section.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q)
    );
  }, [products, query]);

  // const stats = useMemo(() => {
  //   const total = products.length;
  //   const active = products.filter((p) => p.status === "active").length;
  //   const lowStock = products.filter((p) => Number(p.stock || 0) < 5).length;
  //   const sum = products.reduce((acc, p) => acc + Number(p.price || 0), 0);
  //   return { total, active, lowStock, sum };
  // }, [products]);

  const persist = (next) => {
    setProducts(next);
    writeProducts(next);
  };

  // const persistTrash = (next) => {
  //   const cleaned = cleanupExpiredTrash(next);
  //   setTrash(cleaned);
  //   writeTrash(cleaned);
  // };

  const fetchUsers = async () => {
    try {
      const response = await fetch("https://6979e39fcc9c576a8e181e8c.mockapi.io/email")
      if (!response.ok) {
        throw new Error("Zapal");
      }
      const data = await response.json();
      setProducts(data)
      setLoading(false)
    } catch (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()

  }, [])

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch(`https://6979e39fcc9c576a8e181e8c.mockapi.io/email/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: form.name.trim(),
          section: form.section.trim() || "Umumiy",
          price: parsePrice(form.price),
          oldPrice: parsePrice(form.oldPrice),
          stock: Number(form.stock || 0),
          image: form.image.trim(),
          status: "active",
        })
      });

      if (!res.ok) {
        throw new Error("Qochib ketibti");
      }

      setLoading(false)
      fetchUsers()
    } catch (error) {
      setError(error.message)
      setLoading(false)
    }
    if (!form.name.trim()) return;
    resetForm();
  };



  const handleEdit = (item) => {
    setEditingId(item.id);
    setForm({
      name: item.name,
      section: item.section,
      price: String(item.price || ""),
      oldPrice: String(item.oldPrice || ""),
      stock: String(item.stock || 0),
      image: item.image || "",
    });
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`https://6979e39fcc9c576a8e181e8c.mockapi.io/email/${id}`, {
        method: "DELETE"
      });
      console.log(res);

      if (!res.ok) {
        throw new Error("Qochib ketibti");
      }

      setProducts(products.filter((el) => el.id !== id))
      setLoading(false)
    } catch (error) {
      setError(error.message)
      setLoading(false)
    }
  };

  const toggleStatus = (id) => {
    persist(
      products.map((item) =>
        item.id === id
          ? { ...item, status: item.status === "active" ? "inactive" : "active" }
          : item
      )
    );
  };


  if (loading) {
    return (
      <div className="container py-10">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 text-slate-600 shadow-sm">
          Loading...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-10">
        <div className="rounded-3xl border border-rose-200 bg-rose-50 p-6 text-rose-700 shadow-sm">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[linear-gradient(180deg,#f8fbff_0%,#eef4ff_100%)] py-8 sm:py-10">
      <div className="container">
        <AdminHeader />

        <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
          <AdminProductForm
            form={form}
            setForm={setForm}
            editingId={editingId}
            onSubmit={handleSubmit}
            onCancel={resetForm}
          />
          <AdminProductTable
            filtered={filtered}
            query={query}
            setQuery={setQuery}
            onView={setViewItem}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggleStatus={toggleStatus}
          />
        </div>

        <AdminProductModal item={viewItem} onClose={() => setViewItem(null)} />
      </div>
    </div>
  );
};

export default AdminPage;
