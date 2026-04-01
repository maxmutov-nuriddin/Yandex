import React from 'react'
import HeaderSeller from './HeaderSeller'
import HeroSeller from './HeroSeller'
import SectionSellerTwo from './SectionSellerTwo'
import SectionSellerThree from './SectionSellerThree'
import SectionSellerFour from './SectionSellerFour'
import SectionSellerFive from './SectionSellerFive'
import SectionSeller from './SectionSeller'
import SwiperSeller from '../swayper/SwiperSeller'
import  SellerSwiper  from '../swayper/SellerSwiper'
import SectionSellerBlack from './SectionSellerBlack'
import FooterSeller from '../Footer/FooterSeller'



const GlobalSeller = () => {
  return (
    <div>
      <HeaderSeller />
      <HeroSeller />
      <SectionSellerTwo />
      <SectionSellerThree />
      <SectionSellerFour />
      <SectionSellerFive />
      <SectionSeller />
      <SwiperSeller />
      <SellerSwiper />
      <SectionSellerBlack/>
      <FooterSeller/>
    
    </div>
  )
}

export default GlobalSeller
