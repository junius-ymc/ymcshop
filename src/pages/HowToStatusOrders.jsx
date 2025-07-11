import React, { useEffect } from "react";
import { useTranslation } from "react-i18next"; // ✅ เพิ่มตัวช่วยแปลภาษา
import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";
import IconHowTo from "../components/icon/IconHowTo";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const HowToStatusOrders = () => {

  const { t } = useTranslation(); // ✅ ใช้ตัวช่วยแปลภาษา

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div>
      <div className="div-wrap">
        <Helmet>
          <title>{t("mHowToStatus")} | {t("shopName")}</title>
        </Helmet>

        <div className="div-head">
          <span className="setdiv-3">
            <IconHowTo className="icon-shopping" />
            {t("mHowToStatus")}
          </span>
        </div>
        <div className="div-content">
          <div className="div-content-box">

            {/* ปุ่มด้านบน */}
            {/* <div className="flex items-center justify-end mb-2">
              <NavLink
                to="/howtopay"
                className="bttn btn-mod"
              >
                {t("mClickHowTo")}
                <IconHowTo className="icon-shopping" />
                {t("mHowToPay")}
              </NavLink>
            </div> */}

            <hr />

            <br />
            <div className="howtopay">
              <div className="howtopay-text">
                <div className="howtopay-text-b">{t("htpText1")}</div>
              </div>
              <div className="howtopay-div-img">
                <Zoom>
                  <img src="/img/ordersstatus/ordersstatus0.png" alt={t("mHowToStatus")} loading="lazy" />
                </Zoom>
              </div>
            </div>
            <br /><hr /><br />

            <div className="howtopay">
              <div className="howtopay-text">{t("htpText2")}
                <br />{t("htpText3")}<div className="howtopay-text-b">{t("mHistory")}</div>
              </div>
              <div className="howtopay-div-img">
                <Zoom>
                  <img src="/img/ordersstatus/ordersstatus1.png" alt={t("mHistory")} loading="lazy" />
                </Zoom>
              </div>
              {t("mOdersStatusOr")}
              <div className="howtopay-div-img">
                <Zoom>
                  <img src="/img/ordersstatus/ordersstatus2.png" alt={t("mHistory")} loading="lazy" />
                </Zoom>
              </div>
            </div>
            <br /><hr /><br />

            <div className="howtopay">
              <div className="howtopay-text">
                {t("mOdersStatus")}:
                <br />
                <div className="howtopay-text-b">{t("htrNotProcess")}</div>
              </div>
              <div className="howtopay-div-img">
                <Zoom>
                  <img src="/img/ordersstatus/ordersstatus3.png" alt={t("htrNotProcess")} loading="lazy" />
                </Zoom>
              </div>
            </div>
            <br /><hr /><br />

            <div className="howtopay">
              <div className="howtopay-text">
                {t("mOdersStatus")}:
                <br />
                <div className="howtopay-text-b">{t("htrProcessing")}</div>
              </div>
              <div className="howtopay-div-img">
                <Zoom>
                  <img src="/img/ordersstatus/ordersstatus4.png" alt={t("htrProcessing")} loading="lazy" />
                </Zoom>
              </div>
            </div>
            <br /><hr /><br />

            <div className="howtopay">
              <div className="howtopay-text">
                {t("mOdersStatus")}:
                <br />
                <div className="howtopay-text-b">{t("htrCompleted")}</div>
                <br /><br />
                {t("mHowToStatusCheck")}
              </div>
              <div className="howtopay-div-img">
                <Zoom>
                  <img src="/img/ordersstatus/ordersstatus5.png" alt={t("htrCompleted")} loading="lazy" />
                </Zoom>
              </div>
            </div>
            <br />
            <hr />

            {/* ปุ่มด้านล่าง */}
            <div className="flex items-center justify-end mt-2">
              <NavLink
                to="/howtopay"
                className="bttn btn-mod"
              >
                {t("mClickHowTo")}
                <IconHowTo className="icon-shopping" />
                {t("mHowToPay")}
              </NavLink>
            </div>

          </div>
        </div>

      </div>
    </div >
  );
};

export default HowToStatusOrders;
