// rafce
// rfce
// import React, { useState, useRef } from "react";
// import { NavLink } from "react-router-dom";
// import useEcomStore from "../store/ecom-store";
import React from "react";
import { NavLink } from "react-router-dom";
import ScrollToTopButton from "./ScrollToTopButton";

import { useTranslation } from "react-i18next"; // ✅ เพิ่มตัวช่วยแปลภาษา

const Footer = () => {
  //console.log(hotSellL)

  const { t } = useTranslation(); // ✅ ใช้ตัวช่วยแปลภาษา

  return (
    <div>
      <footer>

        <div className="wrapper">
          <div className="setdiv-1">
            <div className="setdiv-2">

              <div className="setdiv-3">
                <p>&copy; YMC Shop. 2025</p>
              </div>

              <div className="setdiv-3">
                <ul className="">
                  <li><NavLink to={"/"}>{t("mHome1")}</NavLink></li>
                  <li><NavLink to={"/aboutus/"}>{t("mAboutUs")}</NavLink></li>
                  <li><NavLink to={"/contactus/"}>{t("mContactUs")}</NavLink></li>
                </ul>
              </div>

            </div>
          </div>
        </div>

        <ScrollToTopButton />

      </footer>

      <div className="setdiv-empty-space-bottom"></div>
    </div>
  );
};

export default Footer;
