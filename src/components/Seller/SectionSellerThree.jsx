import React from 'react'

const SectionSellerThree = () => {
  return (
    <section className='bg-[#f3f4f6] py-12'>
      <div className='mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8'>
        <div className='space-y-6'>
          <h1 className='text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-6xl'>
            Istalgan joydan ishlang
          </h1>

          <p className='max-w-lg text-sm text-gray-600 sm:text-base lg:text-lg'>
            Biznesingizni masofadan boshqaring. Sotuvchilar uchun qulay veb-sayt yoki mobil ilova orqali.
          </p>

          <button className='rounded-2xl bg-linear-to-r from-purple-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition duration-300 hover:scale-105 sm:text-base lg:px-8 lg:py-4'>
            Sotuvchi bolish
          </button>
        </div>

        <div className='relative mx-auto flex w-full max-w-xl justify-center'>
          <img
            src='https://seller.uzum.uz/_nuxt/laptop.CFRYQ9RJ.jpg'
            alt='Dashboard'
            className='w-full rounded-2xl shadow-2xl'
          />

          <img
            src='https://seller.uzum.uz/_nuxt/iphone-uz.BUK7saXJ.png'
            alt='Phone'
            className='absolute -bottom-6 left-2 w-28 drop-shadow-2xl sm:w-36 lg:-left-10 lg:bottom-0 lg:w-56'
          />
        </div>
      </div>
    </section>
  )
}

export default SectionSellerThree
