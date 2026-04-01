import React, { useState } from "react";
import HeaderTop from "./HeaderTop";
import HeaderCenter from "./HeaderCenter";
import HeaderFooter from "./HeaderFooter";
import CatalogMenu from "./CatalogMenu";

const Header = () => {
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);

  return (
    <div>
      <HeaderTop />
      <div className="container relative">
        <HeaderCenter onCatalogToggle={() => setIsCatalogOpen((prev) => !prev)} />
        <HeaderFooter onCatalogToggle={() => setIsCatalogOpen((prev) => !prev)} />
        {isCatalogOpen && <CatalogMenu onClose={() => setIsCatalogOpen(false)} />}
      </div>
    </div>
  );
};

export default Header;
