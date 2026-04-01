import React from "react";
import Header from "../components/header/Header";
import Footer from "../components/Footer/Footer";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const { pathname } = useLocation();
  const hideHeaderPaths = ["/global", "/globaltwo", "/globalcenter"];
  const shouldHideHeader = hideHeaderPaths.includes(pathname);

  return (
    <div>
      {!shouldHideHeader && <Header />}
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
