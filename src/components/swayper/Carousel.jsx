import { Navigation, Pagination, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Carousel = () => {
  return (
    <>
      <style>{`
        .custom-swiper {
          position: relative;
          border-radius: 12px;
        }

        .custom-swiper .swiper-button-next,
        .custom-swiper .swiper-button-prev {
          width: 30px;
          height: 30px;
          background: #7c3aed;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 25px rgba(124, 58, 237, 0.45);
          z-index: 10;
        }

        /* sariq halo */
        .custom-swiper .swiper-button-next::before,
        .custom-swiper .swiper-button-prev::before {
          content: "";
          position: absolute;
          inset: -10px;
          background: #FBFFFF;
          border-radius: 9999px;
          z-index: -1;
        }

        /* arrow */
        .custom-swiper .swiper-button-next::after,
        .custom-swiper .swiper-button-prev::after {
          font-size: 16px;
          font-weight: 700;
          color: white;
        }

        .custom-swiper .swiper-button-next:hover,
        .custom-swiper .swiper-button-prev:hover {
          transform: scale(1.08);
          transition: 0.2s ease;
        }
      `}</style>

      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        className="custom-swiper"
      >
        <SwiperSlide>
          <img width="100%" src="https://images.uzum.uz/d5spb9r4eu2jdglh0rug/main_page_banner.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img width="100%" src="https://images.uzum.uz/d5s5sgr4eu2jdglgonvg/main_page_banner.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img width="100%" src="https://images.uzum.uz/d5ilh7btqdhu87jro7v0/main_page_banner.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img width="100%" src="https://images.uzum.uz/d5n2ao6j76og35gj4e3g/main_page_banner.jpg" />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Carousel;
