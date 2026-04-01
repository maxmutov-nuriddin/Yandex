import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getSellerCards,
  getSellerRequests,
  setSellerCards,
  setSellerRequests,
} from "../../services/sharedState";

const SELLER_ID = "seller-1";
const SELLER_LOGIN = "+998901234567";

const emptyForm = {
  title: "",
  section: "",
  price: "",
  oldPrice: "",
  stock: "",
  image: "",
};

const formatPrice = (value) => Number(value || 0).toLocaleString("ru-RU");

const SellerAddOnlyPage = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [requests, setRequests] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingCardId, setEditingCardId] = useState(null);
  const [editForm, setEditForm] = useState(emptyForm);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const sync = async () => {
      const [nextCards, nextRequests] = await Promise.all([
        getSellerCards(),
        getSellerRequests(),
      ]);
      setCards(nextCards);
      setRequests(nextRequests);
    };

    void sync();
    window.addEventListener("seller-cards-updated", sync);
    window.addEventListener("seller-requests-updated", sync);
    window.addEventListener("storage", sync);

    return () => {
      window.removeEventListener("seller-cards-updated", sync);
      window.removeEventListener("seller-requests-updated", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const handleDeleteCard = async (id) => {
    const isConfirmed = window.confirm("Kartochkani o'chirishni tasdiqlaysizmi?");
    if (!isConfirmed) return;

    const nextCards = cards.filter((card) => card.id !== id);
    setCards(nextCards);
    await setSellerCards(nextCards);
  };

  const handleStartEdit = (card) => {
    setEditingCardId(card.id);
    setEditForm({
      title: card.title || "",
      section: card.section || "",
      price: String(card.price || ""),
      oldPrice: String(card.oldPrice || ""),
      stock: String(card.stock || ""),
      image: card.image || "",
    });
  };

  const handleCancelEdit = () => {
    setEditingCardId(null);
    setEditForm(emptyForm);
  };

  const handleUpdateCard = async (event) => {
    event.preventDefault();
    if (!editingCardId || !editForm.title.trim()) return;

    const nextCards = cards.map((card) =>
      card.id === editingCardId
        ? {
            ...card,
            title: editForm.title.trim(),
            section: editForm.section.trim() || "Umumiy",
            price: Number(String(editForm.price || "").replace(/\D/g, "")) || 0,
            oldPrice: Number(String(editForm.oldPrice || "").replace(/\D/g, "")) || 0,
            stock: Number(String(editForm.stock || "").replace(/\D/g, "")) || 0,
            image: editForm.image.trim(),
          }
        : card
    );

    setCards(nextCards);
    await setSellerCards(nextCards);
    setSuccess("Kartochka yangilandi.");
    handleCancelEdit();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.title.trim()) return;

    const newRequest = {
      id: `req-${Date.now()}`,
      requestedBy: SELLER_ID,
      sellerLogin: SELLER_LOGIN,
      title: form.title.trim(),
      section: form.section.trim() || "Umumiy",
      price: Number(String(form.price || "").replace(/\D/g, "")) || 0,
      oldPrice: Number(String(form.oldPrice || "").replace(/\D/g, "")) || 0,
      stock: Number(String(form.stock || "").replace(/\D/g, "")) || 0,
      image: form.image.trim(),
      status: "pending",
      requestedAt: new Date().toISOString(),
    };

    const allRequests = await getSellerRequests();
    const nextRequests = [newRequest, ...allRequests];
    setRequests(nextRequests);
    await setSellerRequests(nextRequests);
    setForm(emptyForm);
    setSuccess("So'rov Big Admin'ga yuborildi. Tasdiq kutilmoqda.");
  };

  const myRequests = requests.filter((item) => item.requestedBy === SELLER_ID);
  const myCards = cards.filter(
    (card) => card.requestedBy === SELLER_ID || !card.requestedBy
  );

  return (
    <div className="container py-8">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Sotuvchi bo'limi</h1>
          <p className="text-gray-500 mt-1">Bu yerda faqat kartochka qo'shish mumkin.</p>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem("user_role");
            navigate("/Dashboard");
          }}
          className="rounded-xl border px-4 py-2"
        >
          Chiqish
        </button>
      </div>

      <div className="mt-6 grid lg:grid-cols-[560px_1fr] gap-6">
        <section className="bg-white border rounded-3xl p-5 sm:p-7 h-fit">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Yangi kartochka qo'shish</h2>
          <form className="space-y-3" onSubmit={handleSubmit}>
            <input
              className="w-full border rounded-2xl px-4 py-3 sm:py-4 text-base"
              placeholder="Mahsulot nomi"
              value={form.title}
              onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
            />
            <input
              className="w-full border rounded-2xl px-4 py-3 sm:py-4 text-base"
              placeholder="Bo'lim"
              value={form.section}
              onChange={(e) => setForm((prev) => ({ ...prev, section: e.target.value }))}
            />
            <input
              className="w-full border rounded-2xl px-4 py-3 sm:py-4 text-base"
              placeholder="Narx (so'm)"
              value={form.price}
              onChange={(e) => setForm((prev) => ({ ...prev, price: e.target.value }))}
            />
            <input
              className="w-full border rounded-2xl px-4 py-3 sm:py-4 text-base"
              placeholder="Eski narx (so'm)"
              value={form.oldPrice}
              onChange={(e) => setForm((prev) => ({ ...prev, oldPrice: e.target.value }))}
            />
            <input
              className="w-full border rounded-2xl px-4 py-3 sm:py-4 text-base"
              placeholder="Soni"
              value={form.stock}
              onChange={(e) => setForm((prev) => ({ ...prev, stock: e.target.value }))}
            />
            <input
              className="w-full border rounded-2xl px-4 py-3 sm:py-4 text-base"
              placeholder="Rasm URL"
              value={form.image}
              onChange={(e) => setForm((prev) => ({ ...prev, image: e.target.value }))}
            />

            <button
              type="submit"
              className="w-full bg-violet-600 hover:bg-violet-700 text-white rounded-2xl py-3 font-semibold text-xl sm:text-2xl"
            >
              So'rov yuborish
            </button>
            {success && <p className="text-sm text-emerald-700">{success}</p>}
          </form>
        </section>

        <section className="bg-white border rounded-2xl p-5">
          <h2 className="text-xl font-semibold mb-4">Tasdiqlangan kartochkalar</h2>
          {myCards.length === 0 ? (
            <p className="text-gray-500">Hali kartochka qo'shilmagan.</p>
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {myCards.map((card) => (
                <article key={card.id} className="border rounded-xl overflow-hidden">
                  <img
                    src={card.image || "/logo.png"}
                    alt={card.title}
                    className="w-full h-44 object-cover bg-gray-100"
                  />
                  <div className="p-3">
                    <h3 className="font-medium line-clamp-2 min-h-[40px]">{card.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{card.section}</p>
                    <p className="text-violet-600 font-bold mt-2">
                      {formatPrice(card.price)} so'm
                    </p>
                    {!!card.oldPrice && (
                      <p className="text-gray-400 line-through text-sm">
                        {formatPrice(card.oldPrice)} so'm
                      </p>
                    )}
                    <p className="text-sm mt-1">Soni: {card.stock}</p>
                    <button
                      type="button"
                      onClick={() => handleStartEdit(card)}
                      className="mt-3 w-full rounded-lg border border-blue-300 text-blue-600 py-2"
                    >
                      Tahrirlash
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteCard(card.id)}
                      className="mt-3 w-full rounded-lg border border-red-300 text-red-600 py-2"
                    >
                      O'chirish
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>

      <section className="bg-white border rounded-2xl p-5 mt-6">
        <h2 className="text-xl font-semibold mb-4">Big Admin javoblari</h2>
        {myRequests.length === 0 ? (
          <p className="text-gray-500">Hali so'rov yubormagansiz.</p>
        ) : (
          <div className="overflow-auto">
            <table className="w-full min-w-[700px] text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-2">Mahsulot</th>
                  <th className="py-2">Narx</th>
                  <th className="py-2">So'rov vaqti</th>
                  <th className="py-2">Holati</th>
                </tr>
              </thead>
              <tbody>
                {myRequests.map((request) => (
                  <tr key={request.id} className="border-b">
                    <td className="py-3 pr-3">{request.title}</td>
                    <td className="py-3 pr-3">{formatPrice(request.price)} so'm</td>
                    <td className="py-3 pr-3">
                      {new Date(request.requestedAt).toLocaleString("uz-UZ")}
                    </td>
                    <td className="py-3 pr-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs ${
                          request.status === "approved"
                            ? "bg-emerald-100 text-emerald-700"
                            : request.status === "rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {request.status === "approved"
                          ? "Ha (tasdiqlandi)"
                          : request.status === "rejected"
                          ? "Yo'q (rad etildi)"
                          : "Kutilmoqda"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {editingCardId && (
        <section className="bg-white border rounded-2xl p-5 mt-6">
          <h2 className="text-xl font-semibold mb-4">Kartochkani tahrirlash</h2>
          <form className="space-y-3" onSubmit={handleUpdateCard}>
            <input
              className="w-full border rounded-2xl px-4 py-3 text-base"
              placeholder="Mahsulot nomi"
              value={editForm.title}
              onChange={(e) => setEditForm((prev) => ({ ...prev, title: e.target.value }))}
            />
            <input
              className="w-full border rounded-2xl px-4 py-3 text-base"
              placeholder="Bo'lim"
              value={editForm.section}
              onChange={(e) => setEditForm((prev) => ({ ...prev, section: e.target.value }))}
            />
            <input
              className="w-full border rounded-2xl px-4 py-3 text-base"
              placeholder="Narx (so'm)"
              value={editForm.price}
              onChange={(e) => setEditForm((prev) => ({ ...prev, price: e.target.value }))}
            />
            <input
              className="w-full border rounded-2xl px-4 py-3 text-base"
              placeholder="Eski narx (so'm)"
              value={editForm.oldPrice}
              onChange={(e) => setEditForm((prev) => ({ ...prev, oldPrice: e.target.value }))}
            />
            <input
              className="w-full border rounded-2xl px-4 py-3 text-base"
              placeholder="Soni"
              value={editForm.stock}
              onChange={(e) => setEditForm((prev) => ({ ...prev, stock: e.target.value }))}
            />
            <input
              className="w-full border rounded-2xl px-4 py-3 text-base"
              placeholder="Rasm URL"
              value={editForm.image}
              onChange={(e) => setEditForm((prev) => ({ ...prev, image: e.target.value }))}
            />

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                className="w-full bg-violet-600 hover:bg-violet-700 text-white rounded-2xl py-3 font-semibold text-lg"
              >
                Saqlash
              </button>
              <button
                type="button"
                onClick={handleCancelEdit}
                className="w-full rounded-2xl border py-3 font-semibold text-lg"
              >
                Bekor qilish
              </button>
            </div>
          </form>
        </section>
      )}
    </div>
  );
};

export default SellerAddOnlyPage;
