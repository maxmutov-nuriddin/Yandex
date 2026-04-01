import React from 'react'

const HeroSeller = () => {
  return (
    <div className='bg-[#1F2026] px-4 py-8 text-white sm:px-6 lg:px-10'>
      <div className='mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-2 lg:items-center'>
        <div className='space-y-6'>
          <div>
            <h2 className='max-w-xl text-2xl font-bold sm:text-3xl lg:text-4xl'>
              Prodavayte po vsemu Uzbekistanu na Uzum Market!
            </h2>
            <p className='mt-4 max-w-2xl text-sm text-slate-200 sm:text-base'>
              S nami uje tisyachi prodavtsov. Prisoedinyaytes i poluchayte dostup k millionam
              pokupateley po vsey strane.
            </p>
          </div>

          <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            <p className='text-sm'>
              <span className='text-xl font-bold'>10 mln</span> pokupateley zaregistrirovano v Uzum Market
            </p>
            <p className='text-sm'>
              <span className='text-xl font-bold'>x23</span> rost prodaj na marketpleyse za posledniy god
            </p>
            <p className='text-sm sm:col-span-2 lg:col-span-1'>
              <span className='text-xl font-bold'>14 dney</span> srednee vremya polucheniya pervoy viruchki s momenta registratsii
            </p>
          </div>

          <button className='inline-flex w-fit rounded-md bg-gray-200 px-5 py-2 text-black'>
            Stat prodavtsom
          </button>
        </div>

        <div className='mx-auto w-full max-w-md lg:max-w-lg'>
          <img className='h-auto w-full rounded-md object-cover' src='./image copy.png' alt='Seller hero' />
        </div>
      </div>
    </div>
  )
}

export default HeroSeller
