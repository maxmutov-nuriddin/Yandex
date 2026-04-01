import React, { useEffect, useMemo, useState } from "react";
import { readScopedCartItems, writeScopedCartItems } from "../../utils/scopedCartStorage";
const MIN_QTY = 1;
const MAX_QTY = 100;
const clampQuantity = (value) => Math.min(MAX_QTY, Math.max(MIN_QTY, Number(value) || MIN_QTY));

const products = [
  { id: 1, image: "https://images.uzum.uz/d64prvrvgbkv4qpr28bg/t_product_540_high.jpg", title: "Akkumulyatorli drel-shurup buragich to'plami 12V", price: "119 590", oldPrice: "129 990", monthly: "9 207", rating: 4.9, reviews: 456 },
  { id: 2, image: "https://images.uzum.uz/cudkvmc5j42bjc4bbujg/t_product_540_high.jpg", title: "Professional drel seti 18V", price: "46 710", oldPrice: "51 900", monthly: "3 676", rating: 4.9, reviews: 290 },
  { id: 3, image: "https://images.uzum.uz/cq2d64r5qt1gj8ddsfk0/t_product_540_high.jpg", title: "Changyutgich Bosch", price: "2 244 450", oldPrice: "2 262 327", monthly: "167 360", rating: 4.9, reviews: 785 },
  { id: 4, image: "https://images.uzum.uz/d63ij2s3obpn75709lhg/t_product_540_high.jpg", title: "Elektr asboblar to'plami", price: "4 084 050", oldPrice: "4 299 000", monthly: "304 512", rating: 4.5, reviews: 180 },
  { id: 5, image: "https://images.uzum.uz/d5rgsdj4eu2jdglgglj0/t_product_540_high.jpg", title: "Paxta tayoqchalari Sungliht, 400 dona", price: "9 711", oldPrice: "9 810", monthly: "694", rating: 4.9, reviews: 150 },
  { id: 6, image: "https://images.uzum.uz/d1rkg5tsp2tm1piir42g/t_product_540_high.jpg", title: "Old Spice erkaklar dezodoranti Wolfthorn, Whitewater, Captain, 50 ml", price: "30 390", oldPrice: "31 990", monthly: "2 833", rating: 4.5, reviews: 142 },
  { id: 7, image: "https://images.uzum.uz/d2r1p6niub35i07j0l60/t_product_540_high.jpg", title: "Feliks ho'l mushuk ovqati, jeledagi alabalik, 75 g, 5 dona", price: "24 750", oldPrice: "25 000", monthly: "1 770", rating: 4.5, reviews: 891 },
  { id: 8, image: "https://images.uzum.uz/cs9547bvgbkl7noke9d0/t_product_540_high.jpg", title: "Kislorodli tozalovchi, oqartiruvchi, dog' ketkazuvchi, Bavi, 300 gr + 50 gr", price: "36 790", oldPrice: "39 990", monthly: "2 832", rating: 4.8, reviews: 16170 },
  { id: 9, image: "https://images.uzum.uz/cnneultbl7rtgkb9sa40/t_product_540_high.jpg", title: "Uy uchun asboblar seti", price: "319 000", oldPrice: "349 000", monthly: "24 500", rating: 4.5, reviews: 142 },
  { id: 10, image: "https://images.uzum.uz/cpsfpqosarnfdo99552g/t_product_540_high.jpg", title: "Qog'oz sochiqlar Oila tanlovi, 2 qatlamli, 2 dona", price: "11 150", oldPrice: "11 990", monthly: "849", rating: 4.9, reviews: 11542 },
  { id: 11, image: "https://images.uzum.uz/ct9eubmi4n3ehka2jrm0/t_product_540_high.jpg", title: "Yashil no'xat Oila tanlovi, 400 g", price: "8 810", oldPrice: "8 990", monthly: "636", rating: 4.5, reviews: 142 },
  { id: 12, image: "https://images.uzum.uz/cpt55c0sarnfdo999mp0/t_product_540_high.jpg", title: "Hojatxona qog'ozi Oila tanlovi, 2 qatlamli, 6 dona", price: "11 390", oldPrice: "11 990", monthly: "849", rating: 4.5, reviews: 142 },
  { id: 13, image: "https://images.uzum.uz/cpsfqugsarnfdo9955d0/t_product_540_high.jpg", title: "Bolalar uchun nam salfetkalar Oila tanlovi, 120 dona", price: "9 890", oldPrice: "9 990", monthly: "707", rating: 4.7, reviews: 142 },
  { id: 14, image: "https://images.uzum.uz/cpsg3ur5qt1gj8dcpf3g/t_product_540_high.jpg", title: "Vizkozali universal sochiq-lattalar Oila tanlovi, 3 dona", price: "5 450", oldPrice: "5 990", monthly: "424", rating: 4.9, reviews: 9446 },
  { id: 15, image: "https://images.uzum.uz/d49glh5sp2tr82i3qdi0/t_product_540_high.jpg", title: "Idish yuvish vositasi Fairy Olma, 450 ml 1+1", price: "28 190", oldPrice: "29 990", monthly: "2 124", rating: 5.0, reviews: 288 },
  { id: 16, image: "https://images.uzum.uz/cpsfsbgsarnfdo9955m0/t_product_540_high.jpg", title: "Grechka Oila tanlovi, 900 g", price: "9 542", oldPrice: "9 940", monthly: "704", rating: 4.9, reviews: 14623 },
  { id: 17, image: "https://images.uzum.uz/d6b0qn1e6ph7gqpj6tp0/t_product_540_high.jpg", title: "Ramazon muborak bayram bezaklari", price: "29 691", oldPrice: "32 990", monthly: "2 336", rating: 5.0, reviews: 22 },
  { id: 18, image: "https://images.uzum.uz/d0tggaa7s4fo7mqbome0/t_product_540_high.jpg", title: "Ayollar uchun atir Tom Ford Lost Cherry", price: "7 191", oldPrice: "7 990", monthly: "565", rating: 4.6, reviews: 122 },
  { id: 19, image: "https://images.uzum.uz/cuvbt56i4n36ls3rqun0/t_product_540_high.jpg", title: "\"Qalb iffati\" - axloqiy qadriyatlar kitobi", price: "38 313", oldPrice: "42 570", monthly: "2 832", rating: 4.8, reviews: 16181 },
  { id: 20, image: "https://images.uzum.uz/cjcb68svutv7iatastt0/t_product_540_high.jpg", title: "Laktatsiya qoplamalari MELLO, 30 dona", price: "27 621", oldPrice: "27 900", monthly: "1 976", rating: 4.9, reviews: 5621 },
  { id: 21, image: "https://images.uzum.uz/cpsg450sarnfdo9958pg/t_product_540_high.jpg", title: "Osh tuzi Oila tanlovi, maydalangan 1 kg", price: "2 390", oldPrice: "2 490", monthly: "176", rating: 4.9, reviews: 9655 },
  { id: 22, image: "https://images.uzum.uz/d5ud7s6f4hvsl3r1qid0/t_product_540_high.jpg", title: "Kislorodli tozalovchi BRANDFREE, 1 kg", price: "48 290", oldPrice: "52 490", monthly: "3 178", rating: 4.8, reviews: 2811 },
  { id: 23, image: "https://images.uzum.uz/d60o78rq345o6s41g7gg/t_product_540_high.jpg", title: "MUMKINS bolalar tagliklari, 1-6 o'lcham", price: "43 461", oldPrice: "43 900", monthly: "3 109", rating: 4.7, reviews: 1812 },
  { id: 24, image: "https://images.uzum.uz/cudj9pk5j42bjc4bb0d0/t_product_540_high.jpg", title: "Sochlar uchun shampun Garnier Fructis SOS, 400 ml", price: "46 791", oldPrice: "51 990", monthly: "3 868", rating: 4.9, reviews: 10797 },
  { id: 25, image: "https://images.uzum.uz/csop1hdpq3ggq63cj8ag/t_product_540_high.jpg", title: "Kipriklar uchun uzaytiruvchi tush Suake", price: "10 800", oldPrice: "12 000", monthly: "850", rating: 4.6, reviews: 898 },
  { id: 26, image: "https://images.uzum.uz/d01liq47fd1p445tdai0/t_product_540_high.jpg", title: "Simsiz Bluetooth quloqchinlar P9", price: "36 000", oldPrice: "40 000", monthly: "2 833", rating: 4.5, reviews: 6527 },
  { id: 27, image: "https://images.uzum.uz/d0pvvqr3uvph509vrvig/t_product_540_high.jpg", title: "Dimlangan mol go'shti Oila Tanlovi, 325 g", price: "25 193", oldPrice: "35 990", monthly: "2 549", rating: 4.6, reviews: 2401 },
  { id: 28, image: "https://images.uzum.uz/cmbu0tjifoubkc6n29ng/t_product_540_high.jpg", title: "Ayollar uchun asboblar seti", price: "50 000", oldPrice: "62 990", monthly: "1 568", rating: 4.5, reviews: 142 },
  { id: 29, image: "https://images.uzum.uz/cpsg1fj5qt1gj8dcpei0/t_product_540_high.jpg", title: "Xushbo'ylangan sovun Oila tanlovi, 140 g", price: "4 890", oldPrice: "4 990", monthly: "353", rating: 4.9, reviews: 10909 },
  { id: 30, image: "https://images.uzum.uz/cpsfqqb6eisq2rkdbt90/t_product_540_high.jpg", title: "Nam salfetkalar Oila tanlovi, Delight, 120 dona", price: "10 770", oldPrice: "10 990", monthly: "778", rating: 4.9, reviews: 18665 },
  { id: 31, image: "https://images.uzum.uz/cuv9nm3vgbkm5ehgtr5g/t_product_540_high.jpg", title: "Oila Tanlovi suyuq krem-sovuni, 1000 ml", price: "9 775", oldPrice: "10 290", monthly: "728", rating: 4.9, reviews: 15465 },
  { id: 32, image: "https://images.uzum.uz/crqkg06vip07shn69q3g/t_product_540_high.jpg", title: "Kundalik prokladkalar Comforta, 60 dona", price: "16 219", oldPrice: "16 550", monthly: "1 172", rating: 4.9, reviews: 3809 },
  { id: 33, image: "https://images.uzum.uz/cpsftdb6eisq2rkdbuv0/t_product_540_high.jpg", title: "Hojatxonani tozalash vositasi Oila tanlovi, 750 ml", price: "18 990", oldPrice: "19 990", monthly: "1 415", rating: 4.8, reviews: 12536 },
  { id: 34, image: "https://images.uzum.uz/crta9ossslojjk5qj14g/t_product_540_high.jpg", title: "Idish yuvish vositasi Oila tanlovi, 1000 ml", price: "9 390", oldPrice: "9 990", monthly: "707", rating: 4.8, reviews: 16610 },
  { id: 35, image: "https://images.uzum.uz/crokh56vip07shn5qbf0/t_product_540_high.jpg", title: "Ofis qog'ozi Svetotopy ECO, A4, 500 varaq", price: "38 600", oldPrice: "38 990", monthly: "2 761", rating: 4.7, reviews: 6847 },
  { id: 36, image: "https://images.uzum.uz/cdl79dr5a95unf13lnr0/t_product_540_high.jpg", title: "Konfetlar Roshen jele, 1 kg", price: "37 093", oldPrice: "52 990", monthly: "3 753", rating: 5.0, reviews: 535 },
];

const parseNumber = (value) => Number(String(value).replace(/\D/g, "")) || 0;

const discountPercent = (oldPrice, price) => {
  const oldVal = parseNumber(oldPrice);
  const newVal = parseNumber(price);
  if (!oldVal || oldVal <= newVal) return 0;
  return Math.round(((oldVal - newVal) / oldVal) * 100);
};

const toStorageItem = (product, quantity = 1) => {
  const id = `${product.image}-${product.title}`;
  return {
    id,
    img: product.image,
    discription: product.title,
    price: parseNumber(product.price),
    oldPrice: product.oldPrice,
    quantity: clampQuantity(quantity),
  };
};

const UzumCards = () => {
  const [savedItems, setSavedItems] = useState(() => readScopedCartItems());
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [count, setCount] = useState(1);

  useEffect(() => {
    const syncItems = () => {
      setSavedItems(readScopedCartItems());
    };

    window.addEventListener("cart-updated", syncItems);
    window.addEventListener("storage", syncItems);
    window.addEventListener("focus", syncItems);

    return () => {
      window.removeEventListener("cart-updated", syncItems);
      window.removeEventListener("storage", syncItems);
      window.removeEventListener("focus", syncItems);
    };
  }, []);

  const savedIds = useMemo(() => {
    return new Set(savedItems.map((item) => item.id));
  }, [savedItems]);

  const writeItems = (nextItems) => {
    setSavedItems(nextItems);
    writeScopedCartItems(nextItems);
  };

  const toggleSave = (product) => {
    const card = toStorageItem(product);
    const exists = savedItems.some((item) => item.id === card.id);

    if (exists) {
      writeItems(savedItems.filter((item) => item.id !== card.id));
      return;
    }

    writeItems([...savedItems, card]);
  };

  const addToCart = (product, quantity = 1) => {
    const card = toStorageItem(product);
    const existing = savedItems.find((item) => item.id === card.id);

    if (existing) {
      const next = savedItems.map((item) =>
        item.id === card.id
          ? {
              ...item,
              quantity: clampQuantity(Number(item.quantity || MIN_QTY) + Number(quantity || 1)),
            }
          : item
      );
      writeItems(next);
      return;
    }

    writeItems([...savedItems, toStorageItem(product, quantity)]);
  };

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setCount(1);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
    setCount(1);
  };

  const addSelectedToCart = () => {
    if (!selectedProduct) return;
    addToCart(selectedProduct, count);
    closeProductModal();
  };

  return (
    <section className="w-full lg:flex-1">
      <div className="mb-4 flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <p className="text-sm text-slate-600">
          Natijalar: <span className="font-semibold text-slate-900">{products.length} ta</span>
        </p>
        <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-700 transition hover:bg-slate-50">
          Ommabop
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:gap-4 2xl:grid-cols-4">
        {products.map((product) => {
          const discount = discountPercent(product.oldPrice, product.price);
          const itemId = `${product.image}-${product.title}`;
          const isSaved = savedIds.has(itemId);

          return (
            <article
              key={product.id}
              role="button"
              tabIndex={0}
              onClick={() => openProductModal(product)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  openProductModal(product);
                }
              }}
              className="h-full rounded-xl bg-white shadow-md overflow-hidden flex flex-col"
            >
              <div className="relative">
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    toggleSave(product);
                  }}
                  className="absolute top-2 right-2 z-10 bg-white/90 p-2 rounded-full border border-slate-200"
                  aria-label="Saralangan"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill={isSaved ? "#2563eb" : "none"}
                    stroke={isSaved ? "#2563eb" : "#64748b"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
                  </svg>
                </button>

                {discount > 0 && (
                  <span className="absolute top-2 left-2 z-10 rounded-md bg-rose-500 px-2 py-1 text-xs font-semibold text-white">
                    -{discount}%
                  </span>
                )}

                <img src={product.image} alt={product.title} className="h-44 w-full object-cover sm:h-64 lg:h-72" />
              </div>

              <div className="p-3 flex-1 flex flex-col gap-1">
                <span className="inline-flex w-fit rounded-md bg-emerald-50 px-2 py-1 text-[11px] font-semibold text-emerald-700">
                  Arzon narx kafolati
                </span>

                <div className="flex items-center gap-1 text-base font-bold text-purple-600 sm:text-2xl lg:text-3xl">
                  {product.price} so'm
                </div>

                <div className="min-h-[20px] text-sm text-gray-400 sm:text-xl lg:text-2xl">
                  <span className="line-through">{product.oldPrice} so'm</span>
                </div>

                <div className="w-fit rounded-lg bg-yellow-300 px-2 py-1 text-[11px] text-black sm:text-sm">
                  {product.monthly} so'm/oyiga
                </div>

                <p className="min-h-[44px] text-xs text-gray-800 line-clamp-2 sm:min-h-[56px] sm:text-base lg:min-h-[64px] lg:text-xl">
                  {product.title}
                </p>

                <div className="flex items-center gap-1 text-xs text-gray-600 sm:text-sm lg:text-lg">
                  * <span>{product.rating}</span>
                  <span className="text-gray-400">({product.reviews} sharhlar)</span>
                </div>

                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    addToCart(product);
                  }}
                  className="mt-auto w-full rounded-xl bg-purple-600 py-2 text-sm font-medium text-white hover:bg-purple-700 sm:py-3 sm:text-lg lg:text-xl"
                >
                  Savatga qo'shish
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-3 sm:items-center sm:p-4"
          onClick={closeProductModal}
        >
          <div
            className="grid w-full max-w-5xl overflow-hidden rounded-2xl bg-[#ececef] lg:grid-cols-[420px_1fr] lg:max-h-[90vh]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="p-3 sm:p-4 md:p-6">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.title}
                className="h-56 w-full rounded-2xl object-cover sm:h-[320px] md:h-[520px]"
              />
            </div>

            <div className="p-4 sm:p-5 md:p-8 lg:overflow-y-auto">
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-lg font-bold leading-tight text-[#1a2233] sm:text-2xl md:text-4xl">
                  {selectedProduct.title}
                </h2>
                <button
                  onClick={closeProductModal}
                  className="h-8 w-8 rounded-full bg-[#d4d6dd] text-xl text-[#626874] sm:h-10 sm:w-10 sm:text-2xl"
                  aria-label="Yopish"
                >
                  x
                </button>
              </div>

              <p className="mt-3 text-2xl font-extrabold text-violet-600 sm:mt-4 sm:text-4xl md:text-5xl">
                {Number(selectedProduct.price.replace(/\D/g, "")).toLocaleString("ru-RU")} so'm
              </p>
              <p className="mt-2 text-sm text-[#667084] sm:text-lg md:text-xl">
                Dona narxi: {Number(selectedProduct.price.replace(/\D/g, "")).toLocaleString("ru-RU")} so'm
              </p>

              <div className="mt-5 flex items-center gap-3 sm:mt-8 sm:gap-4">
                <button
                  onClick={() => setCount((prev) => Math.max(MIN_QTY, prev - 1))}
                  className="h-10 w-10 rounded-xl bg-[#d0d3db] text-2xl font-semibold text-[#2a2f3a] sm:h-14 sm:w-14 sm:rounded-2xl sm:text-4xl"
                >
                  -
                </button>
                <span className="w-10 text-center text-xl font-semibold sm:w-14 sm:text-3xl">{count}</span>
                <button
                  onClick={() => setCount((prev) => clampQuantity(prev + 1))}
                  disabled={count >= MAX_QTY}
                  className="h-10 w-10 rounded-xl bg-violet-600 text-2xl font-semibold text-white disabled:opacity-60 sm:h-14 sm:w-14 sm:rounded-2xl sm:text-4xl"
                >
                  +
                </button>
              </div>

              <button
                onClick={addSelectedToCart}
                className="mt-6 w-full rounded-2xl bg-violet-600 py-3 text-base font-semibold text-white hover:bg-violet-700 sm:mt-8 sm:py-4 sm:text-2xl md:text-3xl"
              >
                Savatga qo'shish
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default UzumCards;
