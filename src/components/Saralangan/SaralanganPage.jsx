import React, { useMemo, useState } from "react";
import { readScopedCartItems, writeScopedCartItems } from "../../utils/scopedCartStorage";
import {
  readScopedFavoriteItems,
  writeScopedFavoriteItems,
} from "../../utils/scopedFavoritesStorage";

const formatPrice = (value) => Number(value || 0).toLocaleString("ru-RU");

const SaralanganPage = () => {
  const [items, setItems] = useState(() => readScopedFavoriteItems());

  const removeItem = (id) => {
    const next = items.filter((item) => item.id !== id);
    setItems(next);
    writeScopedFavoriteItems(next);
  };

  const addToCart = (product) => {
    const cartItems = readScopedCartItems();
    const exists = cartItems.some((item) => item.id === product.id);
    if (exists) return;

    const next = [
      ...cartItems,
      {
        id: product.id,
        img: product.img,
        discription: product.discription,
        price: Number(product.price || 0),
        oldPrice: product.oldPrice,
        quantity: 1,
      },
    ];
    writeScopedCartItems(next);
  };

  const normalized = useMemo(() => {
    return items.map((item) => ({
      ...item,
      price: Number(item.price || 0),
      oldPrice: Number(String(item.oldPrice || "").replace(/\D/g, "")) || 0,
    }));
  }, [items]);

  return (
    <div className="container py-8">
      <h1 className="text-5xl font-bold mb-6">Istaklarim</h1>

      {normalized.length === 0 ? (
        <div className="bg-white border rounded-2xl p-10 text-center text-gray-500">
          Hali saralangan mahsulot yo&apos;q.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {normalized.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl bg-white shadow-md overflow-hidden"
            >
              <div className="relative">
                <img
                  src={item.img}
                  alt={item.discription}
                  className="w-full h-72 object-cover"
                />
                <button
                  onClick={() => removeItem(item.id)}
                  className="absolute top-3 right-3 bg-white/90 p-2 rounded-full"
                  aria-label="Yo'q qilish"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
                  </svg>
                </button>
              </div>

              <div className="p-3">
                <p className="text-4xl text-violet-600 font-bold">
                  {formatPrice(item.price)} so&apos;m
                </p>
                {item.oldPrice > 0 && (
                  <p className="text-3xl text-gray-400 line-through">
                    {formatPrice(item.oldPrice)}
                  </p>
                )}
                <p className="inline-block bg-yellow-300 px-2 rounded mt-2 text-sm font-medium">
                  {formatPrice(Math.round(item.price / 12))} so&apos;m/oyiga
                </p>
                <p className="mt-2 text-2xl leading-8 min-h-[64px] line-clamp-2">
                  {item.discription}
                </p>
                <p className="mt-1 text-xl text-gray-600">⭐ 4.9 (46 sharhlar)</p>

                <button
                  onClick={() => addToCart(item)}
                  className="w-full mt-3 bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-2xl text-xl font-semibold"
                >
                  Savatga qo'shish
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default SaralanganPage;
