import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'

const news = [
  'Uzum Market DBS sxemasi boyicha sotish uchun yangi toifalarni ishga tushirmoqda.',
  'Uzum Market bir qator toifalar boyicha komissiyalarni yangilamoqda.',
  'Sotuvchilar uchun yoriknomadagi ayrim bandlar yangilandi.',
  'Platformadagi yangiliklarni doimiy kuzatib boring va assortimentni moslab boring.',
]

const SellerSwiper = () => {
  return (
    <div className='mx-auto mt-10 w-full max-w-7xl px-4 sm:px-6'>
      <Swiper
        navigation
        modules={[Navigation]}
        spaceBetween={16}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className='w-full'
      >
        {news.map((item, idx) => (
          <SwiperSlide key={idx} className='rounded-xl bg-gray-200 p-4 sm:p-6'>
            <p className='line-clamp-6 text-sm text-gray-800 sm:text-base'>{item}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default SellerSwiper
