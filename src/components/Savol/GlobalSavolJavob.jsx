import React, { useMemo, useState } from "react";
import SavolJavobLeft from "./SavolJavobLeft";
import SavolJavobRight from "./SavolJavobRight";

const faqSections = [
  {
    id: "registration",
    title: "Ro'yxatdan o'tish",
    items: [
      {
        id: "registration-app",
        question: "Qanday qilib ilovada ro'yxatdan o'tish mumkin?",
        answer:
          "Ilovani oching, telefon raqamingizni kiriting va SMS orqali kelgan kod bilan tasdiqlang. Profil sozlamalarida ism, familiya va boshqa kerakli ma'lumotlarni to'ldiring.",
      },
      {
        id: "registration-web",
        question: "Qanday qilib saytda ro'yxatdan o'tish mumkin?",
        answer:
          "Saytda 'Kirish' tugmasini bosing, telefon raqamingizni kiriting va tasdiqlash kodini kiriting. Shundan keyin akkaunt tayyor bo'ladi.",
      },
      {
        id: "uzum-id",
        question: "Uzum ID nima?",
        answer:
          "Uzum ID - Uzum ekotizimidagi xizmatlarga bitta akkaunt bilan kirish imkonini beradigan yagona avtorizatsiya tizimi.",
      },
    ],
  },
  {
    id: "orders",
    title: "Buyurtma",
    items: [
      {
        id: "order-create",
        question: "Qanday buyurtma beriladi?",
        answer:
          "Mahsulotlarni savatga qo'shing, yetkazib berish va to'lov usulini tanlang, keyin buyurtmani tasdiqlang.",
      },
      {
        id: "order-cancel",
        question: "Buyurtmani bekor qilish mumkinmi?",
        answer:
          "Buyurtma holatiga qarab qisqa vaqt ichida bekor qilish mumkin. Agar imkon bo'lmasa, qo'llab-quvvatlashga murojaat qilinadi.",
      },
      {
        id: "order-hold",
        question: "Buyurtma qancha muddat saqlanadi?",
        answer:
          "Tarqatish punktiga kelgan buyurtmalar odatda bir necha kun saqlanadi. Aniq muddat buyurtma sahifasida ko'rsatiladi.",
      },
    ],
  },
  {
    id: "delivery",
    title: "Yetkazib berish",
    items: [
      {
        id: "delivery-types",
        question: "Yetkazib berishning qanday turlari bor?",
        answer:
          "Buyurtmani tarqatish punktidan olish yoki kuryer orqali manzilga yetkazib berish mavjud.",
      },
      {
        id: "delivery-date",
        question: "Buyurtma qachon yetib keladi?",
        answer:
          "Yetkazib berish sanasi rasmiylashtirish bosqichida va buyurtma tafsilotlari ichida ko'rsatiladi.",
      },
      {
        id: "delivery-change",
        question: "Yetkazib berish manzilini o'zgartirish mumkinmi?",
        answer:
          "Ba'zi holatlarda buyurtma berilgandan keyin qisqa muddat ichida manzil yoki punktni o'zgartirish mumkin.",
      },
    ],
  },
  {
    id: "payment",
    title: "To'lov",
    items: [
      {
        id: "payment-types",
        question: "Qanday to'lov usullari mavjud?",
        answer:
          "Onlayn karta orqali to'lov, muddatli to'lov va buyurtmani olganda to'lash usullari mavjud.",
      },
      {
        id: "payment-installment",
        question: "Muddatli to'lov qanday ishlaydi?",
        answer:
          "Buyurtma summasi tanlangan muddat bo'yicha bo'lib to'lanadi. Limit va shartlar foydalanuvchi profiliga bog'liq.",
      },
      {
        id: "payment-refund",
        question: "To'lovni qaytarish qancha vaqt oladi?",
        answer:
          "Qaytarish usuliga qarab muddat farq qiladi. Karta orqali to'lovlarda mablag' bank tomonidan bir necha ish kunida qaytariladi.",
      },
    ],
  },
  {
    id: "returns",
    title: "Qaytarish",
    items: [
      {
        id: "return-rules",
        question: "Mahsulotni qaysi holatlarda qaytarish mumkin?",
        answer:
          "Ishlatilmagan va tovar ko'rinishi saqlangan mahsulotlar belgilangan muddat ichida qaytarilishi mumkin.",
      },
      {
        id: "return-defect",
        question: "Nuqsonli mahsulot bo'lsa nima qilish kerak?",
        answer:
          "Mahsulotni tarqatish punktiga topshiring yoki qo'llab-quvvatlashga yozing. Tekshiruvdan so'ng almashtirish yoki qaytarish amalga oshiriladi.",
      },
      {
        id: "return-missing",
        question: "Buyurtma to'liq kelmasa-chi?",
        answer:
          "Buyurtma raqami va mahsulot rasmlari bilan qo'llab-quvvatlashga murojaat qiling. Holat bo'yicha tezkor tekshiruv qilinadi.",
      },
    ],
  },
];

const SavolJavob = () => {
  const [activeSectionId, setActiveSectionId] = useState(faqSections[0].id);
  const [openItemId, setOpenItemId] = useState(faqSections[0].items[0].id);

  const activeSection = useMemo(
    () => faqSections.find((section) => section.id === activeSectionId) ?? faqSections[0],
    [activeSectionId]
  );

  const handleSectionSelect = (sectionId) => {
    const nextSection =
      faqSections.find((section) => section.id === sectionId) ?? faqSections[0];
    setActiveSectionId(nextSection.id);
    setOpenItemId(nextSection.items[0]?.id ?? null);
  };

  const handleToggleItem = (itemId) => {
    setOpenItemId((prev) => (prev === itemId ? null : itemId));
  };

  return (
    <section className="min-h-screen bg-[#f5f5f7] py-8 md:py-12">
      <div className="container">
        <h1 className="text-3xl font-semibold text-[#1f1f26] md:text-4xl">Savol-javob</h1>
        <p className="mt-2 text-sm text-[#5f6070] md:text-base">
          Tez-tez beriladigan savollar va ularga qisqa javoblar
        </p>

        <div className="mt-6 grid grid-cols-1 items-start gap-5 lg:grid-cols-[320px_1fr]">
          <SavolJavobLeft
            sections={faqSections}
            activeSectionId={activeSection.id}
            onSectionSelect={handleSectionSelect}
          />
          <SavolJavobRight
            section={activeSection}
            openItemId={openItemId}
            onToggleItem={handleToggleItem}
          />
        </div>
      </div>
    </section>
  );
};

export default SavolJavob;
