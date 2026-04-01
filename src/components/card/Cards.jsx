import React, { useEffect, useMemo, useState } from "react";
import { readScopedCartItems, writeScopedCartItems } from "../../utils/scopedCartStorage";
import {
  readScopedFavoriteItems,
  writeScopedFavoriteItems,
} from "../../utils/scopedFavoritesStorage";

const Cards = ({
  img,
  price,
  oldPrice,
  tolash,
  discription,
  reyting,
  gaps,
  dates = "Ertaga",
  like,
}) => {
  const MIN_QTY = 1;
  const MAX_QTY = 100;
  const clampQuantity = (value) =>
    Math.min(MAX_QTY, Math.max(MIN_QTY, Number(value) || MIN_QTY));

  const [isOpen, setIsOpen] = useState(false);
  const [count, setCount] = useState(1);
  const [isLiked, setIsLiked] = useState(false);

  const basePrice = useMemo(() => {
    const numericValue = Number(String(price ?? "").replace(/\D/g, ""));
    return Number.isFinite(numericValue) ? numericValue : 0;
  }, [price]);

  const formatPrice = (value) => {
    return value.toLocaleString("ru-RU");
  };

  const totalPrice = basePrice * count;
  const itemId = `${img}-${discription}`;

  useEffect(() => {
    const syncFavoriteState = () => {
      const favoriteItems = readScopedFavoriteItems();
      setIsLiked(favoriteItems.some((item) => item.id === itemId));
    };

    syncFavoriteState();
    window.addEventListener("favorites-updated", syncFavoriteState);
    window.addEventListener("storage", syncFavoriteState);
    return () => {
      window.removeEventListener("favorites-updated", syncFavoriteState);
      window.removeEventListener("storage", syncFavoriteState);
    };
  }, [itemId]);

  const toggleFavorite = () => {
    const favoriteItems = readScopedFavoriteItems();
    const exists = favoriteItems.some((item) => item.id === itemId);

    if (exists) {
      const filtered = favoriteItems.filter((item) => item.id !== itemId);
      writeScopedFavoriteItems(filtered);
      setIsLiked(false);
      return;
    }

    const nextItems = [
      ...favoriteItems,
      {
        id: itemId,
        img,
        discription,
        price: basePrice,
        oldPrice,
      },
    ];

    writeScopedFavoriteItems(nextItems);
    setIsLiked(true);
  };

  const addToCartFromModal = () => {
    const cartItems = readScopedCartItems();
    const existingItem = cartItems.find((item) => item.id === itemId);

    if (existingItem) {
      const nextItems = cartItems.map((item) =>
        item.id === itemId
          ? {
              ...item,
              quantity: clampQuantity(Number(item.quantity || MIN_QTY) + count),
            }
          : item
      );
      writeScopedCartItems(nextItems);
    } else {
      const nextItems = [
        ...cartItems,
        {
          id: itemId,
          img,
          discription,
          price: basePrice,
          oldPrice,
          quantity: clampQuantity(count),
        },
      ];
      writeScopedCartItems(nextItems);
    }
    setIsOpen(false);
  };

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            setIsOpen(true);
          }
        }}
      className="h-full rounded-xl bg-white shadow-md overflow-hidden font-sans flex flex-col"
    >
      {/* Image */}
      <div className="relative">
        <button
          className="absolute top-2 right-2 z-10 bg-white/80 p-1 rounded-full"
          onClick={(event) => {
            event.stopPropagation();
            toggleFavorite();
          }}
          aria-label="Saralash"
        >
          <img
            className="w-6 h-6"
            src={
              isLiked || like
                ? "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDJhZmYiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMiA5LjVhNS41IDUuNSAwIDAgMSA5LjU5MS0zLjY3Ni41Ni41NiAwIDAgMCAuODE4IDBBNS40OSA1LjQ5IDAgMCAxIDIyIDkuNWMwIDIuMjktMS41IDQtMyA1LjVsLTUuNDkyIDUuMzEzYTIgMiAwIDAgMS0zIC4wMTlMNSAxNWMtMS41LTEuNS0zLTMuMi0zLTUuNSIvPjwvc3ZnPg=="
                : "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMiA5LjVhNS41IDUuNSAwIDAgMSA5LjU5MS0zLjY3Ni41Ni41NiAwIDAgMCAuODE4IDBBNS40OSA1LjQ5IDAgMCAxIDIyIDkuNWMwIDIuMjktMS41IDQtMyA1LjVsLTUuNDkyIDUuMzEzYTIgMiAwIDAgMS0zIC4wMTlMNSAxNWMtMS41LTEuNS0zLTMuMi0zLTUuNSIvPjwvc3ZnPg=="
            }
            alt=""
          />
        </button>

        <img src={img} alt="Product" className="h-48 w-full object-cover sm:h-56 lg:h-64" />
      </div>

      {/* Content */}
      <div className="p-3 flex-1 flex flex-col gap-1">
        {/* Price */}
        <div className="flex items-center gap-1 text-base font-bold text-purple-600 sm:text-lg">
          {price} so'm
          <span className="inline-flex">
            <img
              className="w-5 h-5"
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMxMTAwZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iMTQiIHg9IjIiIHk9IjUiIHJ4PSIyIi8+PGxpbmUgeDE9IjIiIHgyPSIyMiIgeTE9IjEwIiB5Mj0iMTAiLz48L3N2Zz4="
              alt=""
            />
          </span>
        </div>

        {/* Old price (joy doim band bo'lsin) */}
        <div className="min-h-[20px] text-xs text-gray-400 sm:text-sm">
          {oldPrice ? (
            <span className="line-through">{oldPrice} so'm</span>
          ) : (
            <span className="invisible">0 so'm</span>
          )}
        </div>

        {/* Monthly */}
        <div className="w-fit rounded bg-yellow-300 px-2 py-[2px] text-[11px] text-black sm:text-xs">
          {tolash} so'm/oyiga
        </div>

        {/* Title (2 qatordan oshmasin) */}
        <p className="min-h-[40px] text-xs text-gray-800 line-clamp-2 sm:text-sm">
          {discription}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 text-xs text-gray-600 sm:text-sm">
          ⭐ <span>{reyting}</span>
          <span className="text-gray-400">({gaps} sharhlar)</span>
        </div>

        {/* Button pastga yopishadi */}
        <button
          onClick={(event) => {
            event.stopPropagation();
            setIsOpen(true);
          }}
          className="mt-auto flex w-full items-center justify-center gap-2 rounded-lg bg-purple-600 py-2 text-xs font-medium text-white hover:bg-purple-700 sm:text-sm"
        >
          <img
            className="w-5 h-5"
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJtMTUgMTEtMSA5Ii8+PHBhdGggZD0ibTE5IDExLTQtNyIvPjxwYXRoIGQ9Ik0yIDExaDIwIi8+PHBhdGggZD0ibTMuNSAxMSAxLjYgNy40YTIgMiAwIDAgMCAyIDEuNmg5LjhhMiAyIDAgMCAwIDItMS42bDEuNy03LjQiLz48cGF0aCBkPSJNNC41IDE1LjVoMTUiLz48cGF0aCBkPSJtNSAxMSA0LTciLz48cGF0aCBkPSJtOSAxMSAxIDkiLz48L3N2Zz4="
            alt=""
          />
          {dates}
        </button>
      </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-3 sm:items-center sm:p-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="grid w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-xl md:grid-cols-2 md:max-h-[90vh]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="bg-gray-100 p-3 sm:p-4 md:p-6">
              <img
                src={img}
                alt={discription}
                className="h-56 w-full rounded-xl bg-white object-contain sm:h-[300px] md:h-[500px]"
              />
            </div>

            <div className="p-4 sm:p-5 md:overflow-y-auto md:p-8">
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-base font-bold text-gray-900 sm:text-lg md:text-2xl">
                  {discription}
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 rounded-full bg-gray-100 text-gray-700 sm:h-9 sm:w-9"
                  aria-label="Yopish"
                >
                  x
                </button>
              </div>

              <p className="mt-3 text-2xl font-extrabold text-violet-600 sm:mt-4 sm:text-4xl">
                {formatPrice(totalPrice)} so'm
              </p>
              <p className="mt-2 text-xs text-gray-500 sm:text-sm">
                Dona narxi: {formatPrice(basePrice)} so'm
              </p>

              <div className="mt-5 flex items-center gap-3 sm:mt-6">
                <button
                  onClick={() => setCount((prev) => Math.max(1, prev - 1))}
                  className="h-10 w-10 rounded-xl bg-gray-200 text-xl font-bold sm:h-12 sm:w-12 sm:text-2xl"
                >
                  -
                </button>
                <span className="w-12 text-center text-lg font-semibold sm:w-14 sm:text-xl">
                  {count}
                </span>
                <button
                  onClick={() =>
                    setCount((prev) => clampQuantity(prev + 1))
                  }
                  disabled={count >= MAX_QTY}
                  className="h-10 w-10 rounded-xl bg-violet-600 text-xl font-bold text-white sm:h-12 sm:w-12 sm:text-2xl"
                >
                  +
                </button>
              </div>

              <button
                onClick={addToCartFromModal}
                className="mt-6 w-full rounded-xl bg-violet-600 py-3 text-base font-semibold text-white hover:bg-violet-700 sm:mt-8 sm:text-lg"
              >
                Savatga qo'shish
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cards;
