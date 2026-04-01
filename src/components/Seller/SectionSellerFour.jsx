import React from 'react'

const partners = [
  {
    name: 'Andrey Malaxov',
    role: 'Selfie brendining tijorat direktori',
    text: 'Biz muntazam marketpleys aksiyalarida qatnashamiz va sotuvlar darhol oshadi.',
    img: 'https://seller.uzum.uz/_nuxt/avatar_andrey.DtNA_lgO.jpg',
  },
  {
    name: 'Artur Kim',
    role: 'Texnomart tarmogi menejeri',
    text: 'Sellers ilovasi orqali jonatmalar va statistika bilan ishlash juda qulay.',
    img: 'https://seller.uzum.uz/_nuxt/avatar_artur.DuWOyTH5.jpg',
  },
  {
    name: 'Ozod Hasanov',
    role: 'LP Kid`s sherik egasi',
    text: 'Uzum Academy menga startni to`g`ri boshlashda katta yordam berdi.',
    img: 'https://seller.uzum.uz/_nuxt/avatar_ozod.CKdzBumu.jpg',
  },
  {
    name: 'Shaxzod Xojaev',
    role: 'Terra Pro elektron tijorat yonalishi boshligi',
    text: 'Yangi mijozlarni jalb qilish uchun aksiyalar va savdolarda faol ishlaymiz.',
    img: 'https://seller.uzum.uz/_nuxt/avatar_shah.BTzO2iYC.jpg',
  },
]

const SectionSellerFour = () => {
  return (
    <div className='bg-[#EDEFF2] py-12 sm:py-16 lg:py-20'>
      <div className='mx-auto w-full max-w-7xl px-4 sm:px-6'>
        <h2 className='text-center text-2xl font-bold text-[#7F4DFF] sm:text-3xl lg:text-4xl'>Hamkorlar</h2>
        <h3 className='mt-4 mb-8 text-center text-2xl font-bold sm:mb-12 sm:text-3xl lg:mb-16'>
          Biz haqimizda sotuvchilar nima deyishadi
        </h3>

        <div className='grid gap-6 sm:gap-8 md:grid-cols-2 md:gap-10'>
          {partners.map((item) => (
            <div key={item.name} className='rounded-[28px] bg-white p-5 shadow-sm sm:p-8 lg:p-12'>
              <div className='mb-6 flex items-center gap-4 sm:mb-10 sm:gap-6'>
                <img src={item.img} alt={item.name} className='h-16 w-16 rounded-full object-cover sm:h-24 sm:w-24' />
                <div>
                  <h4 className='text-lg font-semibold sm:text-2xl'>{item.name}</h4>
                  <p className='mt-1 text-sm text-gray-500 sm:text-lg'>{item.role}</p>
                </div>
              </div>
              <hr className='mb-6 border-gray-200 sm:mb-10' />
              <p className='text-sm leading-7 text-gray-800 sm:text-lg sm:leading-9 xl:text-xl'>{item.text}</p>
            </div>
          ))}

          <div className='rounded-[28px] bg-white p-5 shadow-sm md:col-span-2 sm:p-8 lg:p-12'>
            <h4 className='text-lg font-semibold sm:text-2xl'>Sizning hikoyangiz hozir boshlanadi</h4>
            <p className='mt-4 mb-6 text-sm leading-7 text-gray-800 sm:mb-8 sm:text-lg sm:leading-9 xl:text-xl'>
              Ertaga eng zor bolish uchun bugun Uzum Marketga qoshiling.
            </p>
            <button className='w-full rounded-full bg-linear-to-r from-purple-600 to-purple-800 py-4 text-base font-semibold text-white transition hover:opacity-90 sm:py-5 sm:text-xl'>
              Sotuvchi bolish
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SectionSellerFour
