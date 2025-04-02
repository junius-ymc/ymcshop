import { useTranslation } from "react-i18next"; // ✅ เพิ่มตัวช่วยแปลภาษา
import { Helmet } from "react-helmet-async";

const HowToPay = () => {

  const { t } = useTranslation(); // ✅ ใช้ตัวช่วยแปลภาษา

  return (
    <div>
      <div className="div-wrap">
        <Helmet>
          <title>{t("mHowToPay")} | {t("shopName")}</title>
        </Helmet>

        <div className="div-head">{t("mHowToPay")}</div>
        <div className="div-content">
          <div className="div-content-box">

            <br /><hr /><br />
            <div className="howtopay">
              <div className="howtopay-text">
                <div className="howtopay-text-b">{t("htpText1")}</div>
              </div>
              <div className="howtopay-div-img">
                <a href="/img/howtopay/01.png" title={t("mHowToPay")} target="_howtopay">
                  <img src="/img/howtopay/01.png" alt={t("mHowToPay")} />
                </a>
              </div>
            </div>
            <br /><hr /><br />

            <div className="howtopay">
              <div className="howtopay-text">{t("htpText2")}
                <br /> {t("htpText3")}
                <div className="howtopay-text-b"> {t("lcOrderProducts")}</div>
              </div>
              <div className="howtopay-div-img">
                <a href="/img/howtopay/02.png" title={t("lcOrderProducts")} target="_howtopay">
                  <img src="/img/howtopay/02.png" alt={t("lcOrderProducts")} />
                </a>
              </div>
            </div>
            <br /><hr /><br />

            <div className="howtopay">
              <div className="howtopay-text">{t("htpText4")}<div className="howtopay-text-b"> {t("scShippingAddress")} </div>{t("htpText5")}
                <br /> {t("htpText3")}<div className="howtopay-text-b"> {t("scSaveAddress")}</div>
                <br /> {t("htpText6")} {t("htpText3")}<div className="howtopay-text-b"> {t("scProceedWithPayment")}</div>
              </div>
              <div className="howtopay-div-img">
                <a href="/img/howtopay/03.png" title={t("scShippingAddress")} target="_howtopay">
                  <img src="/img/howtopay/03.png" alt={t("scShippingAddress")} />
                </a>
              </div>
            </div>
            <br /><hr /><br />

            <div className="howtopay">
              <div className="howtopay-text">{t("htpText7")}<div className="howtopay-text-b"> {t("pmPayment")}</div>
                <br /> 1. {t("htpText8")}<div className="howtopay-text-b"> {t("htpText9")}</div>
                <br /><br /> {t("htpText10")}<div className="howtopay-text-b"> {t("htpText9")}</div>
                <br /> {t("htpText4")} {t("htpText5")}
                <br /> {t("htpText3")}<div className="howtopay-text-b"> {t("pmPayNow")}</div>
              </div>
              <div className="howtopay-div-img">
                <a href="/img/howtopay/04.png" title={t("htpText8") +" "+ t("htpText9")} target="_howtopay">
                  <img src="/img/howtopay/04.png" alt={t("pmPayment")} />
                </a>
              </div>
            </div>
            <br /><hr /><br />

            <div className="howtopay">
            <div className="howtopay-text">{t("htpText7")}<div className="howtopay-text-b"> {t("pmPayment")}</div>
            <br /> 2. {t("htpText11")}<div className="howtopay-text-b"> {t("htpText12")}</div>
                <br /><br /> {t("htpText10")} <div className="howtopay-text-b"> {t("htpText12")}</div>
                <br /> {t("htpText4")}<div className="howtopay-text-b"> {t("liEmail")} </div>{t("htpText5")}
                <br /> {t("htpText3")}<div className="howtopay-text-b"> {t("pmPayNow")}</div>
              </div>
              <div className="howtopay-div-img">
                <a href="/img/howtopay/05.png" title={t("htpText11") +" "+ t("htpText12")} target="_howtopay">
                  <img src="/img/howtopay/05.png" alt={t("pmPayment")} />
                </a>
              </div>
            </div>
            <br /><hr /><br />

            <div className="howtopay">
              <div className="howtopay-text">{t("htpText13")}<div className="howtopay-text-b"> {t("htpText12")} </div>{t("htpText14")}<div className="howtopay-text-b"> QR Code</div>
                <br /><br /><div className="howtopay-text-b"> {t("htpText15")} {t("htpText12")}</div>
                <br /> ธนาคารกสิกรไทย<div className="howtopay-text-b"> (KBank)</div>
                <br /> ธนาคารไทยพาณิชย์<div className="howtopay-text-b"> (SCB)</div>
                <br /> ธนาคารกรุงเทพ<div className="howtopay-text-b"> (Bangkok Bank)</div>
                <br /> ธนาคารกรุงไทย<div className="howtopay-text-b"> (Krunthai Bank)</div>
                <br /> ธนาคารกรุงศรีอยุธยา<div className="howtopay-text-b"> (Krungsri)</div>
              </div>
              <div className="howtopay-div-img">
                <a href="/img/howtopay/06.png" title="สแกนจ่ายผ่าน PromtPay โดย QR Code" target="_howtopay">
                  <img src="/img/howtopay/06.png" alt={t("pmPayment")} />
                </a>
              </div>
            </div>
            <br /><hr /><br />

          </div>
        </div>

      </div>
    </div>
  );
};

export default HowToPay;
