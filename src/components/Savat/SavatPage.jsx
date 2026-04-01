import React, { useMemo, useState } from "react";
import { readScopedCartItems, writeScopedCartItems } from "../../utils/scopedCartStorage";
import { useLanguage } from "../../i18n/languageContext";

const formatPrice = (value) => value.toLocaleString("ru-RU");
const MIN_QTY = 1;
const MAX_QTY = 100;
const clampQuantity = (value) => Math.min(MAX_QTY, Math.max(MIN_QTY, Number(value) || MIN_QTY));

const SavatPage = () => {
  const { t } = useLanguage();
  const [items, setItems] = useState(() =>
    readScopedCartItems().map((item) => ({
      ...item,
      quantity: clampQuantity(item.quantity),
    }))
  );

  const updateItems = (nextItems) => {
    const normalizedItems = nextItems.map((item) => ({
      ...item,
      quantity: clampQuantity(item.quantity),
    }));
    setItems(normalizedItems);
    writeScopedCartItems(normalizedItems);
  };

  const increase = (id) => {
    const nextItems = items.map((item) => {
      if (item.id !== id) return item;
      return { ...item, quantity: clampQuantity(Number(item.quantity || MIN_QTY) + 1) };
    });
    updateItems(nextItems);
  };

  const decrease = (id) => {
    const nextItems = items.map((item) => {
      if (item.id !== id) return item;
      return { ...item, quantity: clampQuantity(Number(item.quantity || MIN_QTY) - 1) };
    });
    updateItems(nextItems);
  };

  const removeItem = (id) => {
    const nextItems = items.filter((item) => item.id !== id);
    updateItems(nextItems);
  };

  const total = useMemo(() => {
    return items.reduce(
      (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1),
      0
    );
  }, [items]);

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">
        {t("cartTitle")}, <span className="text-gray-500">{items.length} {t("productsCount")}</span>
      </h1>

      {items.length === 0 ? (
        <div className="bg-white border rounded-2xl p-10 text-center text-gray-500">
          {t("cartEmpty")}
        </div>
      ) : (
        <div className="grid lg:grid-cols-[1fr_360px] gap-6">
          <div className="bg-white border rounded-2xl p-4 md:p-6">
            <div className="space-y-5">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="border rounded-xl p-4 flex flex-col md:flex-row md:items-center gap-4"
                >
                  <img
                    src={item.img}
                    alt={item.discription}
                    className="w-28 h-28 object-cover rounded-lg bg-gray-100"
                  />

                  <div className="flex-1">
                    <h2 className="font-medium text-lg leading-6">{item.discription}</h2>
                    <p className="mt-2 text-violet-600 text-2xl font-bold">
                      {formatPrice(Number(item.price || 0) * Number(item.quantity || 1))} so'm
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => decrease(item.id)}
                      className="w-10 h-10 rounded-lg bg-gray-200 text-2xl"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-lg font-semibold">
                      {item.quantity || 1}
                    </span>
                    <button
                      onClick={() => increase(item.id)}
                      disabled={Number(item.quantity || MIN_QTY) >= MAX_QTY}
                      className="w-10 h-10 rounded-lg bg-violet-600 text-white text-2xl"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-gray-500 hover:text-red-500 font-medium"
                  >
                    {t("remove")}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <aside className="bg-white border rounded-2xl p-6 h-fit">
            <h3 className="text-3xl font-bold text-violet-600">
              {formatPrice(total)} so'm
            </h3>
            <p className="text-gray-500 mt-2">{t("total")}</p>
            <button className="mt-6 w-full bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-xl font-semibold text-lg">
              {t("checkout")}
            </button>
          </aside>
        </div>
      )}
    </div>
  );
};

export default SavatPage;
