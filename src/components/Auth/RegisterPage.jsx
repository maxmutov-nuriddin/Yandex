import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { hashPassword } from "../../utils/password";
import { getRegisteredUsers, setRegisteredUsers } from "../../services/sharedState";

const normalizePhone = (value) => {
  const digits = String(value || "").replace(/\D/g, "");
  if (digits.startsWith("998")) return digits.slice(3);
  return digits;
};

const regions = [
  "Toshkent shahri",
  "Toshkent viloyati",
  "Andijon",
  "Buxoro",
  "Farg'ona",
  "Jizzax",
  "Xorazm",
  "Namangan",
  "Navoiy",
  "Qashqadaryo",
  "Qoraqalpog'iston Respublikasi",
  "Samarqand",
  "Sirdaryo",
  "Surxondaryo",
];

const isStrongPassword = (value) => {
  const password = String(value || "");
  return password.length >= 8;
};

const RegisterPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const freezeReason = searchParams.get("reason") === "frozen";
  const prefEmail = searchParams.get("email") || "";
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [region, setRegion] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState(prefEmail);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const normalizedPhone = normalizePhone(phone);
    const safeEmail = email.trim().toLowerCase();

    if (!firstName.trim()) {
      setError("Ismni kiriting");
      return;
    }
    if (!lastName.trim()) {
      setError("Familiyani kiriting");
      return;
    }
    if (!gender) {
      setError("Jinsni tanlang");
      return;
    }
    if (!region) {
      setError("Viloyatni tanlang");
      return;
    }
    if (normalizedPhone.length !== 9) {
      setError("Telefon raqam 9 xonali bo'lishi kerak");
      return;
    }
    if (!safeEmail || !safeEmail.includes("@")) {
      setError("To'g'ri email kiriting");
      return;
    }
    if (!isStrongPassword(password)) {
      setError("Parol kamida 8 ta belgi bo'lsin");
      return;
    }
    if (password !== confirmPassword) {
      setError("Parollar bir xil emas");
      return;
    }

    const users = await getRegisteredUsers();
    const alreadyExists = users.some(
      (user) => user.phone === normalizedPhone || user.email === safeEmail
    );
    if (alreadyExists) {
      setError("Bu telefon yoki email bilan oldin ro'yxatdan o'tilgan");
      return;
    }

    const passwordHash = await hashPassword(password);

    const newUser = {
      id: `user-${Date.now()}`,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      fullName: `${firstName.trim()} ${lastName.trim()}`,
      gender,
      region,
      phone: normalizedPhone,
      email: safeEmail,
      passwordHash,
      accountStatus: "active",
      createdAt: new Date().toISOString(),
    };

    await setRegisteredUsers([newUser, ...users]);
    setError("");
    setSuccess("Ro'yxatdan o'tish muvaffaqiyatli. Endi tizimga kiring.");
    setFirstName("");
    setLastName("");
    setGender("");
    setRegion("");
    setPhone("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");

    setTimeout(() => navigate("/dashboard"), 900);
  };

  return (
    <div className="min-h-screen bg-[#1F2026] px-4 py-10">
      <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Ro'yxatdan o'tish</h1>
        <p className="text-gray-500 mb-5">Hisob yarating</p>
        {freezeReason && (
          <p className="mb-4 rounded-lg border border-amber-300 bg-amber-50 p-3 text-amber-700 text-sm">
            Oldingi akkauntingiz muzlatilgan. Davom etish uchun Telegramdan @abdulaz12_0 ga yozing.
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="Ism"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              if (error) setError("");
            }}
          />
          <input
            className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="Familiya"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
              if (error) setError("");
            }}
          />
          <select
            className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:ring-2 focus:ring-violet-500 bg-white"
            value={gender}
            onChange={(e) => {
              setGender(e.target.value);
              if (error) setError("");
            }}
          >
            <option value="">Jinsni tanlang</option>
            <option value="Erkak">Erkak</option>
            <option value="Ayol">Ayol</option>
          </select>
          <select
            className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:ring-2 focus:ring-violet-500 bg-white"
            value={region}
            onChange={(e) => {
              setRegion(e.target.value);
              if (error) setError("");
            }}
          >
            <option value="">Viloyatni tanlang</option>
            {regions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <input
            className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="Telefon (+998...)"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              if (error) setError("");
            }}
          />
          <input
            type="email"
            className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError("");
            }}
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full rounded-lg border border-gray-300 p-3 pr-20 outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="Parol"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError("");
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-violet-600"
            >
              {showPassword ? "Yashirish" : "Ko'rish"}
            </button>
          </div>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="w-full rounded-lg border border-gray-300 p-3 pr-20 outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="Parolni tasdiqlang"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (error) setError("");
              }}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-violet-600"
            >
              {showConfirmPassword ? "Yashirish" : "Ko'rish"}
            </button>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
          {success && <p className="text-sm text-green-600">{success}</p>}

          <button
            type="submit"
            className="w-full rounded-lg bg-violet-600 hover:bg-violet-700 text-white py-3 font-semibold"
          >
            Ro'yxatdan o'tish
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600">
          Hisobingiz bormi?{" "}
          <Link to="/dashboard" className="text-violet-600 underline">
            Kirish
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
