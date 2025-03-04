// import React from "react";
// import ContentCarouselPa from "../components/home/ContentCarouselPa";
// import ContentCarouselPb from "../components/home/ContentCarouselPb";
// import BestSeller from "../components/home/BestSeller";
// import NewProduct from "../components/home/NewProduct";

import useEcomStore from "../store/ecom-store";



const AboutUs = () => {
  //console.log(hotSellL)

  const user = useEcomStore((state) => state.user);
  // เช็ค user และแปลง JSON String เป็น Object อย่างปลอดภัย
  const nameData = user?.name ? JSON.parse(user.name) : {}; 
  const fullName = nameData.fullName || "ไม่พบชื่อ";

  return (
    <div>
      <div className="div-wrap">

        <div className="div-head">{chgLng.mAboutUs} - {fullName}</div>
        <div className="div-content">
          <div className="div-content-box">

            <div className="text-center text-xl">
              <br></br>
              <p className="text-4xl">หน้าตาเว็บ YMC SHOP ฉบับปรับปรุงใหม่</p>
              <br></br>
              <br></br>
              <p className="text-2xl">หัวข้อเนื้อหา</p>
              <br></br>
              <br></br>
              <br></br>
              เนื้อหาต่างๆจะแสดงอยู่ในส่วนนี้
              <br></br>
              <br></br>
              จะอยู่ในเขตพื้นที่สีขาว
              <br></br>
              <br></br>
              ถ้าเนื้อหามีเยอะ ก็จะเลื่อนลงด้านล่างเรื่อยๆ
              <br></br>
              <br></br>
              <br></br>
            </div>

            <div className="first-box-content">
              <div>
                <div className="first-box-content-img">
                  <img className="h-36" src="http://res.cloudinary.com/dmau9g363/image/upload/v1739863825/Ecom2024/YmcShop-1739863823419.jpg" alt="Converse One Star" />
                </div>
              </div>
              <div className="first-content">
                <div className="first-content-catagory">รองเท้า</div>
                <h4>Converse One Star</h4>
                <p>18 กุมภาพันธ์ 2025</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutUs;
