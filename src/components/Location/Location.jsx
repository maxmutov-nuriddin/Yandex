import React, { useState } from "react";
import { Link } from "react-router-dom";
import { arrData5 } from "../../data/data";

const Location = () => {
  const [city, setCity] = useState("Toshkent");

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* LEFT SIDEBAR */}
      <aside className="w-64 bg-white border-r p-6">
        <h1 className="text-xl font-bold mb-6">Uzum</h1>
        <ul className="space-y-3 text-gray-700">
          <li>
            <Link to="/" className="font-medium text-black">
              Topshirish punktlari
            </Link>
          </li>
          <li>
            <Link to="/Vakansiya" className="hover:text-purple-600">
              Vakansiyalar
            </Link>
          </li>
        </ul>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex flex-1">
        {/* LIST */}
        <hr />{" "}
        <section className="w-120 bg-white border-r p-6 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-2">Topshirish punkti</h2>
          <p className="text-gray-600 mb-4">
            Oʻzbekiston 525 ta shahridagi topshirish punktlariga bepul yetkazib
            berish
          </p>

          {/* CITY SELECT */}
          <select onChange={handleChange}
            className="w-full flex items-center justify-between border rounded-lg px-4 py-2 mb-6">
            <option value="Toshkent">
              Toshkent
            </option>
            <option value="Abdukarim">
              Abdukarim
            </option>
            <option value="Ahmad Yassaviy">Ahmad Yassaviy</option>
            <option value="Alaja">Alaja</option>
            <option value="Alamli">Alamli</option>
            <option value="Altinkol">Altinkol</option>
          </select>

          {/* POINT CARD */}
          <div className="space-y-6 overflow-auto h-100">
            {arrData5.filter(el => el.city == city)
              .map((el, index) => (
                <div key={index} className="border-b pb-4">
                  <h3 className="font-semibold mb-2">
                    {el.district} {el.address}
                  </h3>

                  <p className="text-sm text-gray-600 mb-2">
                    👕{el.landmark}
                  </p>

                  <p className="flex items-start text-sm text-gray-600 mb-2">
                    {el.district} {el.address}
                  </p>

                  <div className="text-sm text-gray-600 space-y-1">
                    <p>🕒 Dushanba – Yakshanba</p>

                    <p>
                      {
                        <span>
                          Dushanbi :{el.working_hours.monday} <br />
                          Seshanbi: {el.working_hours.tuesday} <br />
                          Chorshanba:{el.working_hours.wednesday} <br />
                          Payshanba:{el.working_hours.thrusday} <br />
                          Juma:{el.working_hours.friday} <br />
                          Shanba:{el.working_hours.saturday} <br />
                          Yakshanba :{el.working_hours.sunday}  <br />
                        </span>
                      }
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </section>
        {/* MAP */}
        <section className="flex-1">
          <iframe
            title="map"
            className="w-full h-full"
            src="https://www.google.com/maps?q=Tashkent&output=embed"
            loading="lazy"
          />
        </section>
      </main>
    </div>
  );
};

export default Location;
