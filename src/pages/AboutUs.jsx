import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next"; // ✅ เพิ่มตัวช่วยแปลภาษา
import { Helmet } from "react-helmet-async";
import IconAboutUs from "../components/icon/IconAboutUs";
import IconContactUs from "../components/icon/IconContactUs";
import logobig from '../assets/logobig.png'; // โลโก้เว็บ (อัปโหลดไว้ในโฟลเดอร์ assets)
import { Highlighter, Pin, Shirt, Handshake, Truck, MapPin, LocateFixed, Mail, Phone, Headset } from 'lucide-react';
import { usePWAInstall } from "../components/usePWAInstall";
// import InstallPWAButton from "../components/InstallPWAButton";

const AboutUs = () => {

  const { t } = useTranslation(); // ✅ ใช้ตัวช่วยแปลภาษา
  const { canInstall, triggerInstall } = usePWAInstall();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const emailSoc = "ymccorp2016@gmail.com";
  const phoneSoc = "0622680706";

  return (
    <div>
      <div className="div-wrap">
        <Helmet>
          <title>{t("mAboutUs")} | {t("shopName")}</title>
        </Helmet>

        {canInstall && (
          <button
            onClick={triggerInstall}
            className="fixed bottom-6 left-4 bg-blue-600 text-white px-4 py-2 rounded shadow z-50"
          >
            📲 ติดตั้ง YMC Shop เป็นแอป
          </button>
        )}

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

              <h2 className="about-subtitle flex items-center mb-1">
                <span className="mr-1"><Pin /></span>
                <span>{t("auTextHL1")}</span>
              </h2>
              <ul className="about-list">
                <li className="flex items-center">
                  <span className="mr-6"><Shirt /></span>
                  {t("auTextHL2")}
                </li>
                <li className="flex items-center">
                  <span className="mr-6"><Highlighter /></span>
                  {t("auTextHL3")}
                </li>
                <li className="flex items-center">
                  <span className="mr-6"><Handshake /></span>
                  {t("auTextHL4")}
                </li>
                <li className="flex items-center">
                  <span className="mr-6"><Truck /></span>
                  {t("auTextHL5")}
                </li>
              </ul>

              <h2 className="about-subtitle flex items-center mb-1">
                <span className="mr-1"><MapPin /></span>
                <span>{t("auTextLo1")}</span>
              </h2>
              <ul className="about-list">
                <li className="flex items-center">
                  <span className="mr-6"><LocateFixed /></span>
                  {/* <p>{t("auTextLo2")} (จำหน่ายเฉพาะออนไลน์เท่านั้น)</p> */}
                  {t("auTextLo2")}
                </li>
              </ul>

              <h2 className="about-subtitle flex items-center mb-1">
                <span className="mr-1"><Headset /></span>
                <span>{t("cuTextTt1")}</span>
              </h2>
              <ul className="about-list">
                <li className="flex items-center">
                  <span className="mr-6"><Mail /></span>
                  <span className="mr-6">
                    <strong>{t("cuTextSo1")}</strong>: <a href={`mailto:${emailSoc}`} className="about-link">{emailSoc}</a>
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="mr-6"><Phone /></span>
                  <span className="mr-6">
                    <strong>{t("cuTextSo5")}</strong>: {phoneSoc}
                  </span>
                </li>
              </ul>

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
