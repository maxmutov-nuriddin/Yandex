import React, { useState } from 'react'

const faqData = [
  {
    question: 'Royxatdan otish uchun qanday hujjatlar kerak?',
    answer: 'Hujjatlar biznes turiga bogliq: YTT yoki MChJ hujjatlari va pasport talab qilinadi.',
  },
  {
    question: 'Uzum Marketda komissiya qancha?',
    answer: 'Komissiya tovar toifasi va olchamiga qarab ozgaradi.',
  },
  {
    question: 'Tovarlarni omborga topshirish kerakmi?',
    answer: 'Ishlash sxemasiga qarab: FBO yoki FBS modelida ishlash mumkin.',
  },
  {
    question: 'Shartnoma sanasini qayerda korish mumkin?',
    answer: 'Shaxsiy kabinetdagi shaxsiy malumotlar bolimida korishingiz mumkin.',
  },
]

const SectionSeller = () => {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <div className='mx-auto mt-10 w-full max-w-4xl px-4 sm:mt-16'>
      {faqData.map((item, index) => (
        <div key={item.question} className='border-b border-gray-300 py-5 sm:py-6'>
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className='flex w-full items-center justify-between gap-4 text-left'
          >
            <span className='text-lg font-semibold text-gray-900 sm:text-2xl'>{item.question}</span>
            <span className={`text-xl transition-transform duration-300 sm:text-2xl ${openIndex === index ? 'rotate-180' : ''}`}>
              v
            </span>
          </button>

          <div className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'mt-4 max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            <p className='text-sm text-gray-600 sm:text-lg'>{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SectionSeller
