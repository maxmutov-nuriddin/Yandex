import React from 'react'
import { Link } from 'react-router-dom'

const cards = [
  {
    title: 'Muddatli tolov',
    name: 'Uzum nasiya',
    desc: 'Har qanday xaridlar uchun qulay va adolatli nasiya',
    img: 'https://seller.uzum.uz/_nuxt/nasiya.N0ph2TWp.png',
  },
  {
    title: 'Bank',
    name: 'Uzum Bank',
    desc: 'Biznesingizda moliyaviy operatsiyalarni qulay boshqarish',
    img: 'https://seller.uzum.uz/_nuxt/bank.CH1KUh3k.png',
  },
  {
    title: 'Biznes',
    name: 'Uzum Business',
    desc: 'Biznesni boshqarish xizmati',
    img: 'https://seller.uzum.uz/_nuxt/business.Dm3toxbu.png',
  },
  {
    title: 'Yetkazib berish',
    name: 'Uzum Tezkor',
    desc: 'Kafe, restoran va dokonlardan tez yetkazib berish',
    img: 'https://seller.uzum.uz/_nuxt/tezkor.BMwDmjnf.png',
  },
]

const SectionSellerBlack = () => {
  return (
    <div className='mt-16 bg-[#1F2026] px-4 py-12 sm:px-6 lg:mt-20'>
      <div className='mx-auto w-full max-w-7xl'>
        <h2 className='mx-auto max-w-3xl text-center text-2xl font-bold text-white sm:text-3xl lg:text-4xl'>
          Uzum faqatgina marketpleys emas
        </h2>
        <p className='mt-4 text-center text-sm text-slate-300 sm:text-base'>
          Qulay hayot va samarali biznes uchun xizmatlar ekotizimini yaratmoqdamiz
        </p>

        <div className='mt-8 grid gap-4 sm:grid-cols-2 lg:gap-6'>
          {cards.map((item) => (
            <div key={item.name} className='rounded-lg bg-[#36373C] p-5 sm:p-6'>
              <h3 className='text-lg text-white sm:text-xl'>{item.title}</h3>
              <img className='mt-4 h-16 w-16 object-contain sm:h-20 sm:w-20' src={item.img} alt={item.name} />
              <Link to='/' className='mt-3 inline-block text-white'>
                {item.name}
              </Link>
              <p className='mt-2 text-sm text-gray-300'>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SectionSellerBlack
