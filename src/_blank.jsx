import { useTranslation } from "react-i18next"; // ✅ เพิ่มตัวช่วยแปลภาษา
import { Helmet } from "react-helmet-async";

const AboutUs = () => {

  const { t } = useTranslation(); // ✅ ใช้ตัวช่วยแปลภาษา
  //console.log(hotSellL)
  return (
    <div>
      <Helmet>
        <title>{t("mAboutUs")} | {t("shopName")}</title>
      </Helmet>
      <div className="div-wrap">

        <div className="div-head">{t("mAboutUs")}</div>
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

          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutUs;
