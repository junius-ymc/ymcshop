import { useTranslation } from "react-i18next"; // ✅ เพิ่มตัวช่วยแปลภาษา
import { Helmet } from "react-helmet-async";

const HowToPay = () => {

  const { t } = useTranslation(); // ✅ ใช้ตัวช่วยแปลภาษา
  //console.log(hotSellL)
  return (
    <div>
      <div className="div-wrap">
        <Helmet>
          <title>{t("mHowToPay")} | {t("shopName")}</title>
        </Helmet>

        <div className="div-head">{t("mHowToPay")} - ยังทำไม่เสร็จจ้า😅</div>
        <div className="div-content">
          <div className="div-content-box">

            <div className="text-center text-xl">
              <br></br>
              <p className="text-4xl">วิธีการชำระเงิน</p>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              เนื้อหาต่างๆจะแสดงอยู่ในส่วนนี้
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

export default HowToPay;
