import React from 'react'
import UzumPageTwo from './UzumPageTwo'
import UzumCards from './UzumCards'

const GlobalUzum = () => {
  return (
    <section className='bg-slate-50 py-6 md:py-10'>
      <div className='mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 lg:flex-row lg:items-start lg:gap-8'>
        <UzumPageTwo />
        <UzumCards />
      </div>
    </section>
  )
}

export default GlobalUzum
