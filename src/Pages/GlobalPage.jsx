import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Component from "../components/swayper/Carousel";
import Hero from "../components/hero/Hero";
import CardPage from "../components/card/CardPage";
import { arrData, arrData2, arrData3, arrData4 } from "../data/data";
import { getSellerCards } from "../services/sharedState";

const DEFAULT_COLLECTIONS = [arrData, arrData2, arrData3, arrData4];

const formatNumber = (value) => Number(value || 0).toLocaleString("ru-RU");

const parsePrice = (value) => Number(String(value ?? "").replace(/\D/g, "")) || 0;

const buildDefaultProducts = () =>
  DEFAULT_COLLECTIONS.flatMap((group, groupIndex) =>
    (group.data || []).map((item, idx) => ({
      id: item.id || `${groupIndex + 1}-${idx + 1}`,
      section: group.titleName || "Umumiy",
      name: item.discription || "Nomsiz mahsulot",
      price: parsePrice(item.price),
      oldPrice: parsePrice(item.oldPrice),
      image: (item.img || "").trim(),
      tolash: item.tolash || "",
      reyting: item.reyting || "5.0",
      gaps: item.gaps || "0",
      dates: item.dates || "Ertaga",
      status: "active",
    }))
  );

const normalizeSellerCards = (items) =>
  items.map((item, index) => ({
    id: item.id || `seller-${index + 1}`,
    section: (item.section || "Sotuvchi mahsulotlari").trim(),
    name: (item.title || item.name || "Nomsiz mahsulot").trim(),
    price: Number(item.price || 0),
    oldPrice: Number(item.oldPrice || 0),
    image: (item.image || "").trim(),
    tolash:
      item.tolash ||
      `${formatNumber(Math.max(1, Math.round(Number(item.price || 0) / 12)))} so'm/oyiga`,
    reyting: item.reyting || "5.0",
    gaps: item.gaps || "0",
    dates: item.dates || "Ertaga",
    status: "active",
  }));

const normalizeAdminProducts = (items) =>
  items.map((item, index) => ({
    id: item.id || `admin-${index + 1}`,
    section: (item.section || "Umumiy").trim(),
    name: (item.name || "Nomsiz mahsulot").trim(),
    price: Number(item.price || 0),
    oldPrice: Number(item.oldPrice || 0),
    image: (item.image || "").trim(),
    tolash: item.tolash || "",
    reyting: item.reyting || "5.0",
    gaps: item.gaps || "0",
    dates: item.dates || "Ertaga",
    status: item.status || "active",
  }));

const mapToCard = (item) => {
  const monthly =
    item.tolash || `${formatNumber(Math.max(1, Math.round(Number(item.price || 0) / 12)))} so'm`;

  return {
    link: "/",
    img: item.image || "/logo.png",
    price: formatNumber(item.price),
    oldPrice: item.oldPrice ? formatNumber(item.oldPrice) : "",
    tolash: monthly,
    discription: item.name,
    reyting: item.reyting,
    gaps: item.gaps,
    dates: item.dates,
    like: false,
  };
};

const groupBySection = (items) => {
  const map = new Map();
  items.forEach((item) => {
    if (!map.has(item.section)) {
      map.set(item.section, []);
    }
    map.get(item.section).push(item);
  });

  return Array.from(map.entries()).map(([titleName, data]) => ({
    titleName,
    data: data.map(mapToCard),
  }));
};



const DEFAULT_PRODUCTS = buildDefaultProducts();

const GlobalPage = () => {
  const [searchParams] = useSearchParams();
  const query = (searchParams.get("q") || "").trim().toLowerCase();
  const [adminProducts, setAdminProducts] = useState([]);
  const [sellerProducts, setSellerProducts] = useState([]);

  const readAdminProducts = async () => {
    try {
      const response = await fetch("https://6979e39fcc9c576a8e181e8c.mockapi.io/email");
      if (!response.ok) {
        throw new Error("Zapal");
      }
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        setAdminProducts(normalizeAdminProducts(data));
      } else {
        setAdminProducts([]);
      }
    } catch (error) {
      console.log(error);
      setAdminProducts([]);
    }
  };

  useEffect(() => {
    readAdminProducts();
  }, []);

  useEffect(() => {
    const syncSellerCards = async () => {
      const cards = await getSellerCards();
      setSellerProducts(normalizeSellerCards(cards));
    };

    void syncSellerCards();
    window.addEventListener("seller-cards-updated", syncSellerCards);
    window.addEventListener("storage", syncSellerCards);
    window.addEventListener("focus", syncSellerCards);

    return () => {
      window.removeEventListener("seller-cards-updated", syncSellerCards);
      window.removeEventListener("storage", syncSellerCards);
      window.removeEventListener("focus", syncSellerCards);
    };
  }, []);

  const products = useMemo(
    () => [...DEFAULT_PRODUCTS, ...adminProducts, ...sellerProducts],
    [adminProducts, sellerProducts]
  );

  const visibleProducts = useMemo(() => {
    const activeItems = products.filter((item) => item.status !== "inactive");
    if (!query) return activeItems;

    return activeItems.filter((item) => {
      const name = String(item.name || "").toLowerCase();
      const section = String(item.section || "").toLowerCase();
      return name.includes(query) || section.includes(query);
    });
  }, [products, query]);

  const sections = useMemo(() => groupBySection(visibleProducts), [visibleProducts]);

  return (
    <div className="container">
      <Component />
      <Hero />

      {sections.length > 0 ? (
        sections.map((section) => <CardPage key={section.titleName} arrData={section} />)
      ) : (
        <div className="my-10 p-6 rounded-xl border text-center text-gray-600">
          Qidiruv bo'yicha mahsulot topilmadi.
        </div>
      )}
    </div>
  );
};

export default GlobalPage;
