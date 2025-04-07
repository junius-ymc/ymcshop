import { Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";

const SwiperShowNewProduct = ({ children }) => {

  return (

    <Swiper
      slidesPerView={5}
      spaceBetween={10}
      centeredSlides={false}
      navigation={true}
      modules={[Autoplay, Navigation]}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      breakpoints={{
        160: {
          slidesPerView: 1,
          // spaceBetween: 0,
        },
        320: {
          slidesPerView: 2,
          // spaceBetween: 10,
        },
        640: {
          slidesPerView: 3,
          // spaceBetween: 10,
        },
        768: {
          slidesPerView: 4,
          // spaceBetween: 10,
        },
        1024: {
          slidesPerView: 5,
          // spaceBetween: 10,
        },
        1280: {
          slidesPerView: 5,
          // spaceBetween: 15,
        },
      }}
      // className="object-cover rounded-md justify-center"
    >
      {children}
    </Swiper>

  );
};

export default SwiperShowNewProduct;
