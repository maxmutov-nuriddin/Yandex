const FooterTwo = () => {
  return (
    <footer className="bg-gray-100 px-20 py-10">
      {/* Top */}
      <div className="flex justify-between gap-10 items-start">
        {/* Column 1 */}
        <div className="flex flex-col gap-2">
          <h4 className="text-base font-semibold text-gray-900">
            Biz haqimizda
          </h4>
          <a href="#" className="text-sm text-gray-500 hover:text-black">
            Topshirish punktlari
          </a>
          <a href="#" className="text-sm text-gray-500 hover:text-black">
            Vakansiyalar
          </a>
        </div>

        {/* Column 2 */}
        <div className="flex flex-col gap-2">
          <h4 className="text-base font-semibold text-gray-900">
            Foydalanuvchilarga
          </h4>
          <a href="#" className="text-sm text-gray-500 hover:text-black">
            Biz bilan bog'lanish
          </a>
          <a href="#" className="text-sm text-gray-500 hover:text-black">
            Savol-Javob
          </a>
        </div>

        {/* Column 3 */}
        <div className="flex flex-col gap-2">
          <h4 className="text-base font-semibold text-gray-900">
            Tadbirkorlarga
          </h4>
          <a href="#" className="text-sm text-gray-500 hover:text-black">
            Uzumda soting
          </a>
          <a href="#" className="text-sm text-gray-500 hover:text-black">
            Sotuvchi kabinetiga kirish
          </a>
          <a href="#" className="text-sm text-gray-500 hover:text-black">
            Topshirish punkti ochish
          </a>
        </div>

        {/* App box */}
        <div className="flex items-center gap-4 bg-white p-4 rounded-2xl max-w-sm">
          <img
            src="/qrrrr uzumm.svg"
            alt="QR"
            className="w-20 h-20 cursor-pointer"
          />
          <div>
            <h4 className="text-sm font-semibold mb-1">
              Ilovada harid qilish qulayroq.
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Kamerani yo'naltiring va ilovani <br />
              App Store va Google Play orqali <br />
              bepul yuklab oling.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-8 flex justify-between items-center">
        <p className="text-sm text-gray-900">
          Uzum ijtimoiy tarmoqlarda
        </p>

        <div className="flex gap-4">
          {/* Instagram */}
          <a href="https://www.instagram.com/uzum.market" target="_blank">
            <svg
              className="w-7 h-7 text-red-500 hover:scale-110 transition"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5z" />
              <path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 1.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7z" />
              <circle cx="17.5" cy="6.5" r="1" />
            </svg>
          </a>

          {/* Telegram */}
          <svg
            className="w-7 h-7 text-blue-600 hover:scale-110 transition cursor-pointer"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M9.993 15.674l-.396 5.57c.568 0 .814-.244 1.11-.537l2.664-2.532 5.52 4.032c1.012.56 1.728.264 1.98-.94L23.9 2.82c.314-1.48-.536-2.06-1.52-1.7L1.52 9.64c-1.45.566-1.43 1.37-.248 1.73l5.7 1.78L19.2 6.48c.576-.384 1.1-.172.668.212z" />
          </svg>

          {/* Facebook */}
          <svg
            className="w-7 h-7 text-blue-600 hover:scale-110 transition cursor-pointer"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M22 12a10 10 0 1 0-11.5 9.95v-7.03H8.1V12h2.4V9.8c0-2.37 1.42-3.68 3.6-3.68 1.04 0 2.12.18 2.12.18v2.34h-1.2c-1.18 0-1.55.73-1.55 1.48V12h2.64l-.42 2.92h-2.22v7.03A10 10 0 0 0 22 12z" />
          </svg>

          {/* YouTube */}
          <svg
            className="w-7 h-7 text-red-600 hover:scale-110 transition cursor-pointer"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M23.5 6.5s-.23-1.64-.94-2.36c-.9-.95-1.9-.96-2.36-1.01C16.9 2.9 12 2.9 12 2.9h-.01s-4.9 0-8.2.23c-.46.05-1.46.06-2.36 1.01C.73 4.86.5 6.5.5 6.5S.27 8.43.27 10.36v1.28c0 1.93.23 3.86.23 3.86s.23 1.64.94 2.36c.9.95 2.08.92 2.6 1.02 1.88.18 7.96.23 7.96.23s4.9-.01 8.2-.24c.46-.05 1.46-.06 2.36-1.01.71-.72.94-2.36.94-2.36s.23-1.93.23-3.86v-1.28c0-1.93-.23-3.86-.23-3.86zM9.75 14.56V8.44l6.5 3.06-6.5 3.06z" />
          </svg>
        </div>
      </div>
    </footer>
  );
};

export default FooterTwo;
