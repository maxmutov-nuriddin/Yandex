import React from "react";
import { Link } from "react-router-dom";
import Cards from "./Cards";

const CardPage = ({ arrData }) => {
  return (
    <>
      <div className="my-6">
        <Link
          className="flex items-center gap-3 text-xl font-bold sm:text-2xl"
          to="/"
        >
          {" "}
          <h2>{arrData.titleName}</h2>{" "}
          <img
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tcmlnaHQtaWNvbiBsdWNpZGUtY2hldnJvbi1yaWdodCI+PHBhdGggZD0ibTkgMTggNi02LTYtNiIvPjwvc3ZnPg=="
            alt=""
          />
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-4">
        {arrData?.data?.map((el, index) => (
          <Cards
            key={index}
            img={el.img}
            price={el.price}
            oldPrice={el.oldPrice}
            stock={el.stock}
            tolash={el.tolash}
            discription={el.discription}
            reyting={el.reyting}
            gaps={el.gaps}
            dates={el.dates}
            like={el.like}
            link={el.link}
          />
        ))}
      </div>
    </>
  );
};

export default CardPage;
