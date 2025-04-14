import React, { useEffect } from "react";
import { useTranslation } from "react-i18next"; // ✅ เพิ่มตัวช่วยแปลภาษา
import { Helmet } from "react-helmet-async";
import IconAboutUs from "../components/icon/IconAboutUs";
import IconContactUs from "../components/icon/IconContactUs";
import { Link } from "react-router-dom";

const ContactUs = () => {

  const { t } = useTranslation(); // ✅ ใช้ตัวช่วยแปลภาษา

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div>
      <Helmet>
        <title>{t("mContactUs")} | {t("shopName")}</title>
      </Helmet>
      <div className="div-wrap">
        {/* <div className="div-head">{t("mContactUs")} - ยังทำไม่เสร็จจ้า😅</div> */}
        <div className="div-head">
          <span className="setdiv-3">
            <IconContactUs className="icon-shopping" />
            {t("mContactUs")}
          </span>
        </div>
        <div className="div-content">
          <div className="div-content-box">

            <div className="about-container">
              <p className="about-title">{t("shopName")}</p>
              <h2 className="about-subtitle">📍 สถานที่ตั้ง</h2>
              <p>ยามู ยะหริ่ง ปัตตานี, ประเทศไทย</p>
              <div className="mt-1 justify-items-center">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d795.5930272128094!2d101.36788102627287!3d6.866352407095104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31b3a98b750a2f6b%3A0x3723281715201d!2zMTEg4LiW4LiZ4LiZIOC4o-C4suC4oeC5guC4geC4oeC4uOC4lyDguIvguK3guKIgMTEg4LiV4Liz4Lia4LilIOC4ouC4suC4oeC4uSDguK3guLPguYDguKDguK0g4Lii4Liw4Lir4Lij4Li04LmI4LiHIOC4m-C4seC4leC4leC4suC4meC4tSA5NDE1MA!5e1!3m2!1sth!2sth!4v1737636221935!5m2!1sth!2sth"
                  width="95%"
                  height="400px"
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                >
                </iframe>
              </div>
              <h2 className="about-subtitle">📲 ติดต่อเรา</h2>
              <p>📧 อีเมล: <a href="mailto:ymccorp2016@gmail.com" className="about-link">ymccorp2016@gmail.com</a></p>
              {/* <p>📷 Instagram: <a href="https://instagram.com/ymcshop" className="about-link" target="_blank" rel="noopener noreferrer">@ymcshop</a></p> */}
              <p>📷 Instagram: <a href="#" className="about-link" rel="noopener noreferrer">@ymcshop</a></p>
              <div className="about-buttons">
                <Link to="/aboutus" className="bttn btn-mod">
                  <IconAboutUs className="icon-shopping" /> {t("mAboutUs")}
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
