import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next"; // ✅ เพิ่มตัวช่วยแปลภาษา
import { Helmet } from "react-helmet-async";
import IconAboutUs from "../components/icon/IconAboutUs";
import IconContactUs from "../components/icon/IconContactUs";
import logobig from '../assets/logobig.png'; // โลโก้เว็บ (อัปโหลดไว้ในโฟลเดอร์ assets)

const AboutUs = () => {

  const { t } = useTranslation(); // ✅ ใช้ตัวช่วยแปลภาษา

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

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
              <div className="about-logo">
              <img src={logobig} alt="YMC Shop Logo" />
              </div>
              <p className="about-title">{t("shopName")}</p>
              <p className="about-intro">
                <strong>YMC Shop</strong> {t("auTextTt1")}
                <br />{t("auTextTt2")}
              </p>

              <h2 className="about-subtitle">📌 {t("auTextHL1")}</h2>
              <ul className="about-list">
                <li>🎽 {t("auTextHL2")}</li>
                <li>🧥 {t("auTextHL3")}</li>
                <li>💯 {t("auTextHL4")}</li>
                <li>🚀 {t("auTextHL5")}</li>
              </ul>

              <h2 className="about-subtitle">📍 {t("auTextLo1")}</h2>
              {/* <p>{t("auTextLo2")} (จำหน่ายเฉพาะออนไลน์เท่านั้น)</p> */}
              <p>{t("auTextLo2")}</p>

              <h2 className="about-subtitle">📲 {t("cuTextTt1")}</h2>
              <p>📧 <strong>{t("cuTextSo1")}</strong>: <a href="mailto:ymccorp2016@gmail.com" className="about-link">ymccorp2016@gmail.com</a></p>
              <p>📲 <strong>{t("cuTextSo5")}</strong>: 0622680706</p>
              {/* <p>📷 Instagram: <a href="https://instagram.com/ymcshop" className="about-link" target="_blank" rel="noopener noreferrer">@ymcshop</a></p> */}
              {/* <p>📷 Instagram: <a href="#" className="about-link" rel="noopener noreferrer">@ymcshop</a></p> */}

              <div className="about-buttons">
                <Link to="/contactus" className="bttn btn-mod">
                  <IconContactUs className="icon-shopping" /> {t("mContactUs")}
                </Link>
              </div>

              <div className="flex justify-center items-center pt-5">
              <img src={logobig} alt="YMC Shop Logo" className="w-auto rounded-lg" />
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutUs;
