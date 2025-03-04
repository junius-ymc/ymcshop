// rafce
// rfce
import React, { useState, useEffect } from "react";

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
      author: "Ben Adam",
      url: "./src/img/carouselslider/01.jpg",
    },
    {
      id: "102",
      author: "Ismad",
      url: "./src/img/carouselslider/02.jpg",
    },
    {
      id: "103",
      author: "SuZuKi",
      url: "./src/img/carouselslider/03.jpg",
    },
    {
      id: "104",
      author: "ฟฟฟฟฟ",
      url: "./src/img/carouselslider/04.jpg",
    },
    {
      id: "105",
      author: "Dyaa",
      url: "./src/img/carouselslider/05.jpg",
    },
    {
      id: "106",
      author: "ททททท Eldin",
      url: "./src/img/carouselslider/06.jpg",
    },
    {
      id: "107",
      author: "Dy xxx",
      url: "./src/img/carouselslider/07.jpg",
    },
    {
      id: "108",
      author: "Adam Ben",
      url: "./src/img/carouselslider/08.jpg",
    },
    {
      id: "109",
      author: "yyy xxx",
      url: "./src/img/carouselslider/09.jpg",
    },
    {
      id: "110",
      author: "dddd",
      url: "./src/img/carouselslider/10.jpg",
    }
  ];

  return (
    <>
      <section className="div-content collection-crsl">
        <div className="swiper mySwiper">
          <div className="swiper-wrapper">

            {itemsdata?.map((itemdata, index) => (
              <div className="swiper-slide content-crsl" key={index}>
                <img src={itemdata.url} alt={itemdata.author} />
                <div className="text-content-crsl">
                  <h4>Supporter:</h4> &nbsp; <p>{itemdata.author}</p>
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
