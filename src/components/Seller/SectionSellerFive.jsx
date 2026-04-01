import React from 'react'

const steps = [
  {
    id: 1,
    title: 'Biznesingizni royxatdan o`tkazing',
    text: 'MChJ, YTT oching yoki oz-ozini band qiluvchi sifatida royxatdan oting.',
  },
  {
    id: 2,
    title: 'Hisob raqami oching',
    text: 'Mavjud hisobdan foydalaning yoki istalgan bankda yangisini oching.',
  },
  {
    id: 3,
    title: 'Royxatdan oting',
    text: 'Akkaunt oching, shaklni toldiring va Uzum Marketda daromad qilishni boshlang.',
  },
]

const SectionSellerFive = () => {
  return (
    <div className='mx-auto w-full max-w-7xl px-4 py-12 sm:px-6'>
      <h2 className='mx-auto max-w-3xl text-center text-2xl font-bold text-black sm:text-3xl lg:mt-8 lg:text-4xl'>
        Men Uzumda sotmoqchiman. Nimadan boshlash kerak?
      </h2>

      <div className='mt-8 grid gap-4 md:grid-cols-2'>
        {steps.slice(0, 2).map((step) => (
          <div key={step.id} className='flex gap-4 rounded-2xl bg-gray-200 p-5 sm:p-8 lg:p-10'>
            <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-xl font-bold text-purple-600 sm:h-14 sm:w-14 sm:text-2xl'>
              {step.id}
            </div>
            <p className='text-sm text-gray-800 sm:text-base lg:text-lg'>
              <span className='mb-2 block font-bold'>{step.title}</span>
              {step.text}
            </p>
          </div>
        ))}
      </div>

      <div className='mt-4'>
        <div className='flex gap-4 rounded-2xl bg-gray-200 p-5 sm:p-8 lg:p-10'>
          <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-xl font-bold text-purple-600 sm:h-14 sm:w-14 sm:text-2xl'>
            {steps[2].id}
          </div>
          <p className='text-sm text-gray-800 sm:text-base lg:text-lg'>
            <span className='mb-2 block font-bold'>{steps[2].title}</span>
            {steps[2].text}
          </p>
        </div>
      </div>

      <button className='mt-8 rounded-lg bg-purple-600 px-6 py-3 font-medium text-white transition-colors hover:bg-purple-700'>
        Royxatdan otish
      </button>
    </div>
  )
}

export default SectionSellerFive
