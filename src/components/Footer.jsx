// rafce
// rfce
// import React, { useState, useRef } from "react";
// import { NavLink } from "react-router-dom";
// import useEcomStore from "../store/ecom-store";
import React from "react";
import { NavLink } from "react-router-dom";
import ScrollToTopButton from "./ScrollToTopButton";

const Footer = () => {
  //console.log(hotSellL)
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
                  <li><a href="/" target="_self">{chgLng.mHome1}</a></li>
                  <li><NavLink to={"/contactus/"}>{chgLng.mContactUs}</NavLink></li>
                  <li><NavLink to={"/aboutus/"}>{chgLng.mAboutUs}</NavLink></li>
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
