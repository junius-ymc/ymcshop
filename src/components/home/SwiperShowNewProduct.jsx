import { Swiper } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
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
          // spaceBetween: 20,
        },
        320: {
            slidesPerView: 2,
            // spaceBetween: 20,
          },
        640: {
          slidesPerView: 3,
          // spaceBetween: 30,
        },
        768: {
          slidesPerView: 4,
          // spaceBetween: 40,
        },
        1024: {
          slidesPerView: 5,
          // spaceBetween: 30,
        },
        1280: {
            slidesPerView: 5,
            // spaceBetween: 10,
       },
      }}
      // className="mySwiper object-cover rounded-md justify-center mr-0"
      // className="object-cover rounded-md justify-center"
    >
      {children}
    </Swiper>


  );
};

export default SwiperShowNewProduct;
