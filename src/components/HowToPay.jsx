import { useTranslation } from "react-i18next"; // ✅ เพิ่มตัวช่วยแปลภาษา

const HowToPay = () => {

  const { t } = useTranslation(); // ✅ ใช้ตัวช่วยแปลภาษา
  //console.log(hotSellL)
  return (
    <div>
      <div className="div-wrap">

        <div className="div-head">{t("mHowToPay")}</div>
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
