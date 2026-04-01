import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className="my-5">
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4 xl:gap-4">
        <li className="rounded-xl bg-stone-200 px-4 py-3">
          <Link className="flex items-center gap-3 text-sm font-medium sm:text-base" to="/global">
            <img className="h-9 w-9 shrink-0 sm:h-10 sm:w-10" src="https://static.uzum.uz/static/promo_images/756b6f56-9d2d-414c-a9d3-37d40d1c808b" alt="" />
            <span>Onalar va bolalar uchun</span>
          </Link>
        </li>
        <li className="rounded-xl bg-stone-200 px-4 py-3">
          <Link className="flex items-center gap-3 text-sm font-medium sm:text-base" to="/ArzonNarx">
            <img className="h-9 w-9 shrink-0 sm:h-10 sm:w-10" src="https://static.uzum.uz/static/promo_images/a266cae1-db3a-4b40-a984-cf9220d9b2e8" alt="" />
            <span>Arzon narxlar kafolati</span>
          </Link>
        </li>
        <li className="rounded-xl bg-stone-200 px-4 py-3">
          <Link className="flex items-center gap-3 text-sm font-medium sm:text-base" to="/globaltwo">
            <img className="h-9 w-9 shrink-0 sm:h-10 sm:w-10" src="https://static.uzum.uz/static/promo_images/c1ade4dd-8de3-475e-9632-7ab0586ddcd9" alt="" />
            <span>Zamonaviy bozor</span>
          </Link>
        </li>
        <li className="rounded-xl bg-stone-200 px-4 py-3">
          <Link className="flex items-center gap-3 text-sm font-medium sm:text-base" to="/globalcenter">
            <img className="h-9 w-9 shrink-0 sm:h-10 sm:w-10" src="https://static.uzum.uz/static/promo_images/14d81cd8-d743-4db1-9355-52c34882e3ad" alt="" />
            <span>Qishki chegirma</span>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Hero
