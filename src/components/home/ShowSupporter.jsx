// rafce
// rfce
import React, { useEffect } from "react";

const ShowSupporter = () => {

  // -------------------------------------------------------------------------

  // สร้าง component Swiper
  useEffect(() => {
    const swiper = new Swiper(".mySwiper", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      loop: true,
      slidesPerView: "auto",
      coverflowEffect: {
        // เริ่ม ค่านี้ปรับเปลี่ยนได้ตามตัองการ
        stretch: 0, // ปรับระยะห่างระหว่างภาพ
        // rotate: 0, // ปรับองศา
        rotate: (Math.random() * 49.75 + 0.25).toFixed(2), // ปรับองศา สุ่มค่าระหว่าง 0.25-50
        // depth: 100, // ความตื้น/ลึก
        depth: Math.floor(Math.random() * 40) + 80, // ความตื้น/ลึก สุ่มค่าระหว่าง 80-120
        // modifier: 2.5, // ปรับขนาดของรูปย่อย
        modifier: (Math.random() * 1 + 2).toFixed(2), // ปรับขนาดของรูปย่อย สุ่มค่าระหว่าง 2-3
        // จบ ค่านี้ปรับเปลี่ยนได้ตามตัองการ
        slideShadows: true,
      },
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      }
    });

    // Cleanup when the component unmounts
    return () => {
      swiper.destroy();
    };
  }, []);

  // -------------------------------------------------------------------------

  // ไฟล์ข้อมูลและรูป
  const itemsdata = [
    {
      id: "101",
      userName: "Ben Adam",
      reviewProduct: "สินค้าดี มีคุณภาพ",
      url: "/img/carouselslider/01.jpg",
    },
    {
      id: "102",
      userName: "Ismad",
      reviewProduct: "สินค้าดี มีคุณภาพ จัดส่งเร็วทันใจ สินค้าดี มีคุณภาพ จัดส่งเร็วทันใจ",
      url: "/img/carouselslider/02.jpg",
    },
    {
      id: "103",
      userName: "SuZuKi",
      reviewProduct: "review Product ทดสอบ",
      url: "/img/carouselslider/03.jpg",
    },
    {
      id: "104",
      userName: "ฟฟฟฟฟ",
      reviewProduct: "จัดส่งเร็วทันใจ สินค้าดี มีคุณภาพ",
      url: "/img/carouselslider/04.jpg",
    },
    {
      id: "105",
      userName: "Dyaa",
      reviewProduct: "ทดสอบ review Product ทดสอบ",
      url: "/img/carouselslider/05.jpg",
    },
    {
      id: "106",
      userName: "ททททท Eldin",
      reviewProduct: "จัดส่งเร็วทันใจ สินค้าดี มีคุณภาพ review Product",
      url: "/img/carouselslider/06.jpg",
    },
    {
      id: "107",
      userName: "Dy xxx",
      reviewProduct: "review Product สินค้าดี มีคุณภาพ review Product",
      url: "/img/carouselslider/07.jpg",
    },
    {
      id: "108",
      userName: "Adam Ben",
      reviewProduct: "สินค้าดี มีคุณภาพ review Product review Product",
      url: "/img/carouselslider/08.jpg",
    },
    {
      id: "109",
      userName: "yyy xxx",
      reviewProduct: "สินค้าดี มีคุณภาพ review Product review Product",
      url: "/img/carouselslider/09.jpg",
    },
    {
      id: "110",
      userName: "dddd",
      reviewProduct: "review Product สินค้าดี มีคุณภาพ review Product",
      url: "/img/carouselslider/10.jpg",
    }
  ];

  return (
    <>
      <section className="div-content collection-crsl">
        <div className="swiper mySwiper">
          <div className="swiper-wrapper">

            {itemsdata?.map((itemdata) => (
              <div className="swiper-slide content-crsl" key={itemdata.id}>
                <img src={itemdata.url} alt={itemdata.userName} />
                <div className="content-crsl-userName">
                  <h4>Supporter:</h4> &nbsp; <p>{itemdata.userName}</p>
                </div>
                <div className="content-crsl-reviewProduct-box">
                  <div className="content-crsl-reviewProduct">
                    <p>" {itemdata.reviewProduct} "</p>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>
    </>
  );

};

export default ShowSupporter;
