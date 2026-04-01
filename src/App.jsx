import React from "react";
import GlobalPage from "./Pages/GlobalPage";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Location from "./components/Location/Location";
import Layout from "./layouts/Layout";
import GlobalSeller from "./components/Seller/GlobalSeller";
import GlobalUzum from "./components/ArzonNarx/GlobalUzum";
import Vakansiya from "./components/Vakansiya/Vakansiya";
import SavolJavob from "./components/Savol/GlobalSavolJavob";
import GlobalDashboard from "./components/Dashboard/GlobalDashboard";
import HeroSwiper from "./components/hero2/HeroSwiper";
import HeroOne from "./components/hero2/HeroOne";
import HeroTwo from "./components/hero2/HeroTwo";
import YangiHeader from "./components/header2/YangiHeader";
import SavatPage from "./components/Savat/SavatPage";
import SaralanganPage from "./components/Saralangan/SaralanganPage";
import AdminPage from "./components/Admin/AdminPage";
import SellerAddOnlyPage from "./components/Seller/SellerAddOnlyPage";
import RegisterPage from "./components/Auth/RegisterPage";
import BigAdminPage from "./components/BigAdmin/BigAdminPage";
import UserAccountPage from "./components/User/UserAccountPage";
import {
  CURRENT_USER_ID_KEY,
  REGISTERED_USERS_KEY,
  USER_ROLE_KEY,
} from "./constants/storageKeys";

const getUserRole = () => {
  try {
    return localStorage.getItem(USER_ROLE_KEY);
  } catch {
    return null;
  }
};

const AdminGuard = ({ children }) => {
  const role = getUserRole();
  if (role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

const SellerGuard = ({ children }) => {
  const role = getUserRole();
  if (role !== "seller") {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

const UserGuard = ({ children }) => {
  const role = getUserRole();
  const currentUserId = localStorage.getItem(CURRENT_USER_ID_KEY);
  let users = [];
  try {
    const usersRaw = localStorage.getItem(REGISTERED_USERS_KEY);
    users = usersRaw ? JSON.parse(usersRaw) : [];
  } catch {
    users = [];
  }
  const exists = users.some((user) => user.id === currentUserId);
  if (role !== "user" || !currentUserId || !exists) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<GlobalPage />} />
          <Route path="location" element={<Location />} />
          <Route path="ArzonNarx" element={<GlobalUzum />} />
          <Route path="savat" element={<SavatPage />} />
          <Route path="saralangan" element={<SaralanganPage />} />

          <Route path="Vakansiya" element={<Vakansiya />} />
          <Route path="SavolJavob" element={<SavolJavob />} />

          {/* Bosh sahifalar */}
          <Route
            path="global"
            element={
              <>
                <YangiHeader />
                <HeroSwiper />
              </>
            }
          />
          <Route
            path="globaltwo"
            element={
              <>
                <YangiHeader />
                <HeroOne />
              </>
            }
          />
          <Route
            path="globalcenter"
            element={
              <>
                <YangiHeader />
                <HeroTwo />
              </>
            }
          />
        </Route>
        <Route
          path="admin"
          element={
            <AdminGuard>
              <AdminPage />
            </AdminGuard>
          }
        />
        <Route
          path="big-admin"
          element={
            <AdminGuard>
              <BigAdminPage />
            </AdminGuard>
          }
        />
        <Route
          path="seller-cabinet"
          element={
            <SellerGuard>
              <SellerAddOnlyPage />
            </SellerGuard>
          }
        />
        <Route
          path="my-account"
          element={
            <UserGuard>
              <UserAccountPage />
            </UserGuard>
          }
        />

        {/* Seller sahifasi */}
        <Route path="/seller" element={<GlobalSeller />} />

        {/* Login sahifasi */}
        <Route path="/dashboard" element={<GlobalDashboard />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Noto‘g‘ri yo‘l bo‘lsa */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
