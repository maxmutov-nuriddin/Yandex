import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'

const videos = [
  'https://www.youtube.com/embed/MhOaVaZkjFM',
  'https://www.youtube.com/embed/B1uTgujSb4A',
  'https://www.youtube.com/embed/9OJUokPLhyo',
  'https://www.youtube.com/embed/mUDpuVNYD0s',
]

const SwiperSeller = () => {
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
        {videos.map((src) => (
          <SwiperSlide key={src} className='rounded-xl p-2'>
            <iframe
              className='h-52 w-full rounded-xl sm:h-60'
              src={src}
              title='Seller video'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              referrerPolicy='strict-origin-when-cross-origin'
              allowFullScreen
            ></iframe>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default SwiperSeller
