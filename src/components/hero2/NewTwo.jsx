export default function NewTwo() {
  return (
    <div className="mx-auto mt-10 w-full max-w-[1450px] px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <h1 className="text-3xl font-bold">Bahorgi garderob</h1>
        <i className="fa-solid fa-chevron-right text-black"></i>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
        <img className="w-full rounded-2xl" src="/uzum.jpg" alt="" />
        <img className="w-full rounded-2xl" src="/taqinchoq.jpg" alt="" />
        <img className="w-full rounded-2xl" src="/sum.jpg" alt="" />
      </div>

      <div className="mt-8">
        <img className="w-full rounded-2xl" src="/shokalad.jpg" alt="" />
      </div>

      <div className="mt-10 flex items-center gap-3">
        <h1 className="text-3xl font-bold">Salomatlik va go'zallik</h1>
        <i className="fa-solid fa-chevron-right text-black"></i>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
        <img className="w-full rounded-2xl" src="/parfu.jpg" alt="" />
        <img className="w-full rounded-2xl" src="/parfume.jpg" alt="" />
        <img className="w-full rounded-2xl" src="/vitamin.jpg" alt="" />
      </div>

      <div className="mt-8">
        <img className="w-full rounded-2xl" src="/texnika.jpg" alt="" />
      </div>

      <div className="mt-10 flex items-center gap-3">
        <h1 className="text-3xl font-bold">Kichik malikalar uchun</h1>
        <i className="fa-solid fa-chevron-right text-black"></i>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
        <img className="w-full rounded-2xl" src="/libos.jpg" alt="" />
        <img className="w-full rounded-2xl" src="/sovga.jpg" alt="" />
      </div>

      <div className="mt-10 flex items-center gap-3">
        <h1 className="text-3xl font-bold">Shahrimizda bahor</h1>
        <i className="fa-solid fa-chevron-right text-black"></i>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-5 pb-2 md:grid-cols-3">
        <img className="w-full rounded-2xl" src="/rolik.jpg" alt="" />
        <img className="w-full rounded-2xl" src="/dacha.jpg" alt="" />
        <img className="w-full rounded-2xl" src="/ellek.jpg" alt="" />
      </div>
    </div>
  );
}

