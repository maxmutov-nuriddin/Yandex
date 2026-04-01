import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BIG_ADMIN_AUTH_KEY,
  CURRENT_USER_ID_KEY,
  USER_ROLE_KEY,
} from "../../constants/storageKeys";
import { getRegisteredUsers } from "../../services/sharedState";

const formatDate = (value) => {
  try {
    return new Date(value).toLocaleString("uz-UZ");
  } catch {
    return value || "-";
  }
};

const UserAccountPage = () => {
  const navigate = useNavigate();
  const currentUserId = localStorage.getItem(CURRENT_USER_ID_KEY);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      if (!currentUserId) {
        setUser(null);
        return;
      }
      const users = await getRegisteredUsers();
      setUser(users.find((item) => item.id === currentUserId) || null);
    };

    void loadUser();
    window.addEventListener("users-updated", loadUser);
    window.addEventListener("storage", loadUser);
    window.addEventListener("focus", loadUser);
    return () => {
      window.removeEventListener("users-updated", loadUser);
      window.removeEventListener("storage", loadUser);
      window.removeEventListener("focus", loadUser);
    };
  }, [currentUserId]);

  return (
    <div className="container py-8">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Mening akkauntim</h1>
          <p className="text-gray-500 mt-1">Sizning shaxsiy kabinetingiz</p>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem(USER_ROLE_KEY);
            localStorage.removeItem(CURRENT_USER_ID_KEY);
            localStorage.removeItem(BIG_ADMIN_AUTH_KEY);
            navigate("/dashboard");
          }}
          className="rounded-xl border px-4 py-2"
        >
          Chiqish
        </button>
      </div>

      {!user ? (
        <div className="rounded-2xl border bg-white p-5">
          <p className="text-gray-600">Akkaunt topilmadi. Iltimos, qayta login qiling.</p>
        </div>
      ) : (
        <div className="rounded-2xl border bg-white p-5 grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500">Ism</p>
            <p className="font-semibold">{user.firstName || "-"}</p>
          </div>
          <div>
            <p className="text-gray-500">Familiya</p>
            <p className="font-semibold">{user.lastName || "-"}</p>
          </div>
          <div>
            <p className="text-gray-500">Jins</p>
            <p className="font-semibold">{user.gender || "-"}</p>
          </div>
          <div>
            <p className="text-gray-500">Viloyat</p>
            <p className="font-semibold">{user.region || "-"}</p>
          </div>
          <div>
            <p className="text-gray-500">Telefon</p>
            <p className="font-semibold">+998 {user.phone || "-"}</p>
          </div>
          <div>
            <p className="text-gray-500">Email</p>
            <p className="font-semibold">{user.email || "-"}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-gray-500">Ro'yxatdan o'tgan sana</p>
            <p className="font-semibold">{formatDate(user.createdAt)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAccountPage;
