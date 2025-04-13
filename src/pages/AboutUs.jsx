import { useTranslation } from "react-i18next"; // ✅ เพิ่มตัวช่วยแปลภาษา
import { Helmet } from "react-helmet-async";
import IconAboutUs from "../components/icon/IconAboutUs";
import IconContactUs from "../components/icon/IconContactUs";
import { Link } from "react-router-dom";

const AboutUs = () => {

  const { t } = useTranslation(); // ✅ ใช้ตัวช่วยแปลภาษา

  return (
    <div>
      <div className="div-wrap">
        <Helmet>
          <title>{t("mAboutUs")} | {t("shopName")}</title>
        </Helmet>

        <div className="div-head">
          <span className="setdiv-3">
            <IconAboutUs className="icon-shopping" />
            {t("mAboutUs")}
          </span>
        </div>
        <div className="div-content">
          <div className="div-content-box">

            <div className="about-container">
              <img className="about-logo" src="/img/Logo-for-test.png" />
              <p className="about-title">{t("shopName")}</p>
              <p className="about-intro">
                <strong>YMC Shop</strong> คือร้านค้าออนไลน์สำหรับสาย <span className="highlight">Streetwear</span> และ <span className="highlight">Vintage </span>
                <br />แหล่งรวมเสื้อผ้าแฟชั่นสุดคูล สำหรับคนรักสไตล์การแต่งตัวเฉพาะตัว
              </p>

              <h2 className="about-subtitle">📌 จุดเด่นของเรา</h2>
              <ul className="about-list">
                <li>🎽 เสื้อผ้าแนวสตรีทเท่ห์ๆ หลากหลายสไตล์</li>
                <li>🧥 เสื้อผ้าวินเทจคัดสรรมาอย่างพิเศษ</li>
                <li>💯 สินค้าคุณภาพ ราคาจับต้องได้</li>
                <li>🚀 ส่งเร็วทันใจ พร้อมบริการลูกค้า 24 ชม.</li>
              </ul>

              <h2 className="about-subtitle">📍 ที่ตั้ง</h2>
              <p>ยามู ยะหริ่ง ปัตตานี, ประเทศไทย (จำหน่ายเฉพาะออนไลน์เท่านั้น)</p>

              <h2 className="about-subtitle">📲 ติดต่อเรา</h2>
              <p>📧 อีเมล: <a href="mailto:support@ymcshop.com" className="about-link">ymccorp2016@gmail.com</a></p>
              {/* <p>📷 Instagram: <a href="https://instagram.com/ymcshop" className="about-link" target="_blank" rel="noopener noreferrer">@ymcshop</a></p> */}
              <p>📷 Instagram: <a href="#" className="about-link" rel="noopener noreferrer">@ymcshop</a></p>

              <div className="about-buttons">
                <Link to="/contactus" className="bttn btn-mod">
                  <IconContactUs className="icon-shopping" /> {t("mContactUs")}
                </Link>
              </div>

              <div className="flex justify-center items-center pt-5">
                <img className="w-auto rounded-lg" src="/img/Logo-for-test.png" />
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutUs;
