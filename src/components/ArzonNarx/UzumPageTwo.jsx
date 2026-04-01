import React from 'react'
import { Link } from 'react-router-dom'

const categories = [
    "Avtotovarlar",
    "Aksesuarlar",
    "Maishiy texnika",
    "Maishiy kimyoviy moddalar",
    "Dacha, bog' va tomorqa",
    "Bolalar tovarlari",
    "Hayvonlar uchun tovarlar",
    "Kanselyariya tovarlari",
    "Kitoblar",
    "Go'zallik va parvarish",
    "Mebel",
    "Poyabzallar",
    "Kiyim",
    "Oziq-ovqat mahsulotlari",
    "Sport va hordiq",
    "Qurilish va ta'mirlash",
    "Uy-ro'zg'or buyumlari",
    "Turizm, baliq ovi va ovchilik",
    "Xobbi va ijod",
    "Elektronika",
]

const brands = ["5elements", "Aevit by Librederm", "ARUA", "BAHMAL HOME", "bemonde"]

const countries = ["Abxaziya", "Avstraliya", "Avstriya", "Ozarbayjon", "Amerika Samoasi", "Angliya"]

const UzumPageTwo = () => {
    return (
        <aside className='w-full lg:sticky lg:top-4 lg:w-[300px] xl:w-[320px]'>
            <div className='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'>
                <p className='text-sm text-slate-500'>
                    <Link className='text-slate-700 hover:text-emerald-700' to='/'>
                        Bosh sahifa
                    </Link>{" "}
                    / <span>Arzon narxlar kafolati</span>
                </p>

                <div className='mt-4'>
                    <h3 className='text-2xl font-semibold tracking-tight text-slate-900'>Arzon narxlar kafolati</h3>
                    <p className='mt-1 text-sm text-slate-500'>Termada quyidagi turkumlardan 383 386 ta tovar</p>
                </div>
            </div>

            <div className='mt-4 space-y-4'>
                <div className='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'>
                    <h4 className='text-lg font-semibold text-slate-900'>Turkumlar</h4>
                    <ul className='mt-3 max-h-[260px] space-y-2 overflow-y-auto pr-1 text-sm text-slate-600'>
                        {categories.map((item) => (
                            <li key={item}>
                                <Link className='transition hover:text-emerald-700' to='/'>
                                    {item}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'>
                    <h4 className='text-lg font-semibold text-slate-900'>Brend</h4>
                    <ul className='mt-3 space-y-2 text-sm text-slate-600'>
                        {brands.map((item) => (
                            <li key={item} className='flex items-center gap-2'>
                                <input type='radio' name='brand' className='accent-emerald-600' />
                                <Link className='transition hover:text-emerald-700' to='/'>
                                    {item}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'>
                    <h4 className='text-lg font-semibold text-slate-900'>Ishlab chiqarish mamlakati</h4>
                    <ul className='mt-3 space-y-2 text-sm text-slate-600'>
                        {countries.map((item) => (
                            <li key={item}>
                                <Link className='transition hover:text-emerald-700' to='/'>
                                    {item}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </aside>
    )
}

export default UzumPageTwo
