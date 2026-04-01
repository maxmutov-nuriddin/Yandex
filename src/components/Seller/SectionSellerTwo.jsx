import React from 'react'

const SectionSellerTwo = () => {
  return (
    <section className='mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8'>
      <div className='order-2 lg:order-1'>
        <img
          src='https://seller.uzum.uz/_nuxt/second.B3RCPCpy.png'
          alt='Uzum Academy'
          className='h-[260px] w-full rounded-2xl object-cover sm:h-[360px] lg:h-[500px]'
        />
      </div>

      <div className='order-1 lg:order-2'>
        <h2 className='text-2xl font-bold leading-tight sm:text-3xl lg:text-5xl'>
          Nimadan boshlash va biznesni qanday qilib samaraliroq qilish kerak
        </h2>
        <p className='mt-4 text-sm text-gray-700 sm:text-base lg:text-lg'>
          Uzum Academy yordam beradi. Top sotuvchilardan tajribali maruzachilar va Uzum ekspertlari,
          real holatlar, biznes jamiyat va juda kop foydali bilimlar.
        </p>
        <button className='mt-6 rounded-lg bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800 sm:text-base lg:px-8 lg:py-4'>
          Batafsil malumot olish
        </button>
      </div>
    </section>
  )
}

export default SectionSellerTwo
