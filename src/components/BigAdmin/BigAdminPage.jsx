import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getRegisteredUsers,
  getSellerCards,
  getSellerRequests,
  setRegisteredUsers,
  setSellerCards,
  setSellerRequests,
} from "../../services/sharedState";

const SELLER_PHONE = "901234567";

const formatPrice = (value) => Number(value || 0).toLocaleString("ru-RU");

const formatDate = (value) => {
  try {
    return new Date(value).toLocaleString("uz-UZ");
  } catch {
    return value;
  }
};

const BigAdminPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [sellerCards, setLocalSellerCards] = useState([]);
  const [sellerRequests, setLocalSellerRequests] = useState([]);

  useEffect(() => {
    const syncData = async () => {
      const [nextUsers, nextSellerCards, nextSellerRequests] = await Promise.all([
        getRegisteredUsers(),
        getSellerCards(),
        getSellerRequests(),
      ]);
      setUsers(nextUsers);
      setLocalSellerCards(nextSellerCards);
      setLocalSellerRequests(nextSellerRequests);
    };

    void syncData();
    window.addEventListener("users-updated", syncData);
    window.addEventListener("seller-cards-updated", syncData);
    window.addEventListener("seller-requests-updated", syncData);
    window.addEventListener("storage", syncData);
    window.addEventListener("focus", syncData);

    return () => {
      window.removeEventListener("users-updated", syncData);
      window.removeEventListener("seller-cards-updated", syncData);
      window.removeEventListener("seller-requests-updated", syncData);
      window.removeEventListener("storage", syncData);
      window.removeEventListener("focus", syncData);
    };
  }, []);

  const todayCount = useMemo(() => {
    const today = new Date().toDateString();
    return users.filter((user) => new Date(user.createdAt).toDateString() === today).length;
  }, [users]);

  const sellerStats = useMemo(() => {
    const cardsCount = sellerCards.length;
    const totalPrice = sellerCards.reduce((sum, card) => sum + Number(card.price || 0), 0);
    const pendingRequests = sellerRequests.filter((request) => request.status === "pending").length;
    return { cardsCount, totalPrice, pendingRequests };
  }, [sellerCards, sellerRequests]);

  const userStats = useMemo(() => {
    const active = users.filter((user) => (user.accountStatus || "active") === "active").length;
    const frozen = users.filter((user) => (user.accountStatus || "active") === "frozen").length;
    return { active, frozen };
  }, [users]);

  const requestStats = useMemo(() => {
    const pending = sellerRequests.filter((item) => item.status === "pending").length;
    const approved = sellerRequests.filter((item) => item.status === "approved").length;
    const rejected = sellerRequests.filter((item) => item.status === "rejected").length;
    return { pending, approved, rejected };
  }, [sellerRequests]);

  const handleDeleteUser = async (id) => {
    const ok = window.confirm("Bu akkauntni butunlay o'chirasizmi?");
    if (!ok) return;
    const nextUsers = users.filter((user) => user.id !== id);
    await setRegisteredUsers(nextUsers);
    setUsers(nextUsers);
  };

  const handleToggleFreeze = async (id) => {
    const nextUsers = users.map((user) => {
      if (user.id !== id) return user;
      const current = user.accountStatus || "active";
      return {
        ...user,
        accountStatus: current === "frozen" ? "active" : "frozen",
      };
    });
    await setRegisteredUsers(nextUsers);
    setUsers(nextUsers);
  };

  const handleApproveRequest = async (requestId) => {
    const request = sellerRequests.find((item) => item.id === requestId);
    if (!request || request.status !== "pending") return;

    const nextRequests = sellerRequests.map((item) =>
      item.id === requestId
        ? { ...item, status: "approved", reviewedAt: new Date().toISOString() }
        : item
    );
    await setSellerRequests(nextRequests);
    setLocalSellerRequests(nextRequests);

    const currentCards = await getSellerCards();
    const exists = currentCards.some((card) => card.requestId === requestId);
    if (!exists) {
      const newCard = {
        id: `seller-${Date.now()}`,
        requestId,
        requestedBy: request.requestedBy || "seller-1",
        sellerLogin: request.sellerLogin || "+998901234567",
        title: request.title,
        section: request.section || "Umumiy",
        price: Number(request.price || 0),
        oldPrice: Number(request.oldPrice || 0),
        stock: Number(request.stock || 0),
        image: request.image || "",
      };
      const nextCards = [newCard, ...currentCards];
      await setSellerCards(nextCards);
      setLocalSellerCards(nextCards);
    }
  };

  const handleRejectRequest = async (requestId) => {
    const request = sellerRequests.find((item) => item.id === requestId);
    if (!request || request.status !== "pending") return;

    const nextRequests = sellerRequests.map((item) =>
      item.id === requestId
        ? { ...item, status: "rejected", reviewedAt: new Date().toISOString() }
        : item
    );
    await setSellerRequests(nextRequests);
    setLocalSellerRequests(nextRequests);
  };

  return (
    <div className="bg-[linear-gradient(180deg,#f7fbff_0%,#edf4ff_100%)] py-8 sm:py-10">
      <div className="container">
        <div className="mb-6 rounded-3xl border border-slate-200 bg-white/95 p-5 shadow-sm sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                Markaziy boshqaruv
              </p>
              <h1 className="mt-2 text-2xl sm:text-3xl font-bold text-slate-900">Big Admin Panel</h1>
              <p className="mt-1 text-slate-500">Ro'yxatdan o'tgan foydalanuvchilar</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => navigate("/admin")}
                className="rounded-xl border border-slate-300 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
              >
                Admin panel
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem("user_role");
                  localStorage.removeItem("big_admin_auth");
                  navigate("/dashboard");
                }}
                className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-medium text-rose-700 transition hover:bg-rose-100"
              >
                Chiqish
              </button>
            </div>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-sm">
            <p className="text-sm text-slate-500">Jami xaridorlar</p>
            <p className="text-3xl font-bold text-slate-900">{users.length}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-sm">
            <p className="text-sm text-slate-500">Bugun ro'yxatdan o'tgan xaridorlar</p>
            <p className="text-3xl font-bold text-sky-700">{todayCount}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-sm">
            <p className="text-sm text-slate-500">Sotuvchi qo'shgan kartochkalar</p>
            <p className="text-3xl font-bold text-emerald-700">{sellerStats.cardsCount}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-sm">
            <p className="text-sm text-slate-500">Kutilayotgan so'rovlar</p>
            <p className="text-3xl font-bold text-amber-700">{sellerStats.pendingRequests}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-sm sm:col-span-2 lg:col-span-2">
            <p className="text-sm text-slate-500">Sotuvchi kartochkalari qiymati</p>
            <p className="text-3xl font-bold text-emerald-800">
              {formatPrice(sellerStats.totalPrice)} so'm
            </p>
          </div>
        </div>

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white/95 p-5 shadow-sm sm:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Xaridorlar ro'yxati</h2>
            <p className="mt-1 text-xs text-slate-500">Status va amallar tez ko'rinishda berilgan.</p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs font-semibold">
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-700">Faol: {userStats.active}</span>
            <span className="rounded-full bg-rose-100 px-3 py-1 text-rose-700">Muzlatilgan: {userStats.frozen}</span>
          </div>
        </div>
        {users.length === 0 ? (
          <p className="text-slate-500">Hozircha ro'yxatdan o'tgan user yo'q.</p>
        ) : (
          <div className="max-h-[460px] overflow-auto rounded-2xl border border-slate-200">
            <table className="w-full min-w-[760px] text-sm text-slate-700">
              <thead>
                <tr className="sticky top-0 z-10 border-b border-slate-200 bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <th className="py-3">ID</th>
                  <th className="py-3">Ism</th>
                  <th className="py-3">Familiya</th>
                  <th className="py-3">Jins</th>
                  <th className="py-3">Viloyat</th>
                  <th className="py-3">Telefon</th>
                  <th className="py-3">Email</th>
                  <th className="py-3">Status</th>
                  <th className="py-3">Ro'yxat sanasi</th>
                  <th className="py-3">Amallar</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-slate-100 last:border-b-0">
                    <td className="py-3 pr-3 text-slate-500">{user.id}</td>
                    <td className="py-3 pr-3 font-medium text-slate-900">{user.firstName || "-"}</td>
                    <td className="py-3 pr-3">{user.lastName || "-"}</td>
                    <td className="py-3 pr-3">{user.gender || "-"}</td>
                    <td className="py-3 pr-3">{user.region || "-"}</td>
                    <td className="py-3 pr-3">+998 {user.phone}</td>
                    <td className="py-3 pr-3">{user.email}</td>
                    <td className="py-3 pr-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          (user.accountStatus || "active") === "frozen"
                            ? "bg-rose-100 text-rose-700"
                            : "bg-emerald-100 text-emerald-700"
                        }`}
                      >
                        {(user.accountStatus || "active") === "frozen" ? "muzlatilgan" : "faol"}
                      </span>
                    </td>
                    <td className="py-3 pr-3">{formatDate(user.createdAt)}</td>
                    <td className="py-3 pr-3">
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => handleToggleFreeze(user.id)}
                          className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
                            (user.accountStatus || "active") === "frozen"
                              ? "border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                              : "border-amber-300 bg-amber-50 text-amber-700 hover:bg-amber-100"
                          }`}
                        >
                          {(user.accountStatus || "active") === "frozen"
                            ? "Muzdan yechish"
                            : "Muzlatish"}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteUser(user.id)}
                          className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-100"
                        >
                          O'chirish
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

      <section className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white/95 p-5 shadow-sm sm:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Sotuvchi so'rovlari</h2>
            <p className="mt-1 text-xs text-slate-500">Yangi so'rovlar yuqorida ko'rinadi, tez tasdiqlash uchun qulay.</p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs font-semibold">
            <span className="rounded-full bg-amber-100 px-3 py-1 text-amber-700">Kutilmoqda: {requestStats.pending}</span>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-700">Tasdiqlangan: {requestStats.approved}</span>
            <span className="rounded-full bg-rose-100 px-3 py-1 text-rose-700">Rad etilgan: {requestStats.rejected}</span>
          </div>
        </div>
        {sellerRequests.length === 0 ? (
          <p className="text-slate-500">Hozircha so'rov yo'q.</p>
        ) : (
          <div className="max-h-[460px] overflow-auto rounded-2xl border border-slate-200">
            <table className="w-full min-w-[860px] text-sm text-slate-700">
              <thead>
                <tr className="sticky top-0 z-10 border-b border-slate-200 bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <th className="py-3">Sotuvchi</th>
                  <th className="py-3">Mahsulot</th>
                  <th className="py-3">Narx</th>
                  <th className="py-3">So'rov vaqti</th>
                  <th className="py-3">Holati</th>
                  <th className="py-3">Javob</th>
                </tr>
              </thead>
              <tbody>
                {sellerRequests.map((request) => (
                  <tr key={request.id} className="border-b border-slate-100 last:border-b-0">
                    <td className="py-3 pr-3">{request.sellerLogin || "+998901234567"}</td>
                    <td className="py-3 pr-3">{request.title}</td>
                    <td className="py-3 pr-3">{formatPrice(request.price)} so'm</td>
                    <td className="py-3 pr-3">{formatDate(request.requestedAt)}</td>
                    <td className="py-3 pr-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          request.status === "approved"
                            ? "bg-emerald-100 text-emerald-700"
                            : request.status === "rejected"
                            ? "bg-rose-100 text-rose-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {request.status === "approved"
                          ? "Ha"
                          : request.status === "rejected"
                          ? "Yo'q"
                          : "Kutilmoqda"}
                      </span>
                    </td>
                    <td className="py-3 pr-3">
                      {request.status === "pending" ? (
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => handleApproveRequest(request.id)}
                            className="rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100"
                          >
                            Ha
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRejectRequest(request.id)}
                            className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-100"
                          >
                            Yo'q
                          </button>
                        </div>
                      ) : (
                        <span className="text-slate-500 text-xs">
                          {request.reviewedAt ? formatDate(request.reviewedAt) : "-"}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white/95 p-5 shadow-sm sm:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Sotuvchi ma'lumotlari</h2>
            <p className="mt-1 text-xs text-slate-500">Sotuvchi bo'yicha umumiy holat va qiymat.</p>
          </div>
          <div className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">
            1 ta asosiy sotuvchi
          </div>
        </div>
        <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
            <p className="text-xs text-slate-500">Kartochkalar soni</p>
            <p className="mt-1 text-xl font-bold text-slate-900">{sellerStats.cardsCount}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
            <p className="text-xs text-slate-500">Jami qiymat</p>
            <p className="mt-1 text-xl font-bold text-slate-900">{formatPrice(sellerStats.totalPrice)} so'm</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
            <p className="text-xs text-slate-500">Kutilayotgan so'rovlar</p>
            <p className="mt-1 text-xl font-bold text-slate-900">{sellerStats.pendingRequests}</p>
          </div>
        </div>
        <div className="overflow-auto rounded-2xl border border-slate-200">
          <table className="w-full min-w-[620px] text-sm text-slate-700">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                <th className="py-3">Sotuvchi ID</th>
                <th className="py-3">Login (telefon)</th>
                <th className="py-3">Rol</th>
                <th className="py-3">Qo'shgan kartochkalar</th>
                <th className="py-3">Jami qiymat</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-3 pr-3 text-slate-500">seller-1</td>
                <td className="py-3 pr-3">+998 {SELLER_PHONE}</td>
                <td className="py-3 pr-3">seller</td>
                <td className="py-3 pr-3 font-semibold text-slate-900">{sellerStats.cardsCount}</td>
                <td className="py-3 pr-3 font-semibold text-slate-900">
                  {formatPrice(sellerStats.totalPrice)} so'm
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </div>
  );
};

export default BigAdminPage;
