import React, { useState, useEffect } from "react";
import { listUserCart, saveAddress } from "../../api/user";
import useEcomStore from "../../store/ecom-store";
import { useNavigate } from "react-router-dom";
import { numberFormat } from "../../utils/number";
import { useTranslation } from "react-i18next"; // ✅ เพิ่มตัวช่วยแปลภาษา
import LoaderDiv from "../LoaderDiv";
import { Helmet } from "react-helmet-async";
import { createAlert } from "../../utils/createAlert";
import { countryList } from "../../utils/ShippingZones";

const SummaryCard = () => {
  const token = useEcomStore((state) => state.token);
  const [products, setProducts] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const user = useEcomStore((state) => state.user);
  const userLocationData = useEcomStore((state) => state.userLocationData);
  const [grandTotal, setGrandTotal] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);

  let initialAddress, initialName;
  try {
    initialAddress = user.address ? JSON.parse(user.address) : null;
  } catch (error) {
    initialAddress = null;
  }

  try {
    initialName = user.name ? JSON.parse(user.name) : null;
  } catch (error) {
    initialName = null;
  }

  if (!initialAddress) {
    initialAddress = {
      houseNo: "",
      district: "",
      city: "",
      province: "",
      zipCode: ""
    };
  }

  if (!initialName) {
    initialName = {
      fullName: "",
      phone: "",
      social: "",
      country: ""
    };
  }

  const { t } = useTranslation(); // ✅ ใช้ตัวช่วยแปลภาษา
  const [addressData, setAddressData] = useState(initialAddress);
  const [nameData, setNameData] = useState(initialName);
  const [addressSaved, setAddressSaved] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);  // ✅ เพิ่มตัวแปร loading

  const hdlGetUserCart = (token) => {
    listUserCart(token)
      .then((res) => {
        // console.log(res)
        setProducts(res.data.products);
        setCartTotal(res.data.cartTotal);
        setGrandTotal(res.data.grandTotal);
        setShippingFee(res.data.shippingFee);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const hdlSaveAddress = () => {
    if (Object.values(addressData).some(val => !val) || Object.values(nameData).some(val => !val)) {
      return createAlert("warning",
        `${t("scVerifyFill")}`,
        `${t("ttClose")}`);
    }
    setLoading(true); // เริ่มโหลด
    saveAddress(token, JSON.stringify(addressData), JSON.stringify(nameData))
      .then((res) => {
        const msgNotif = res.data?.msgfromapi;
        let chgLngMsg = msgNotif === "1" ? t("scSaveAddressSus")
          : t("rgtServerError");
        createAlert("success",
          `${chgLngMsg}`,
          `${t("ttClose")}`);
        setAddressSaved(true);
      })
      .catch((err) => {
        console.log(err);
        createAlert("error",
          `${t("rgtServerError")}`,
          `${t("ttClose")}`);
      })
      .finally(() => {
        setLoading(false); // โหลดเสร็จ
      });
  };

  const hdlGoToPayment = () => {
    if (!addressSaved) {
      return createAlert("warning",
        `${t("scVerifyPay")}`,
        `OK`,
        5000);
    }
    setLoading(true); // เริ่มโหลด
    navigate("/user/payment");
  };

  const handleAddressChange = (e) => {
    setAddressData({ ...addressData, [e.target.name]: e.target.value });
  };

  const handleNameChange = (e) => {
    setNameData({ ...nameData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    hdlGetUserCart(token);
  }, []);

  // console.log(products);

  return (

    <div className="div-wrap">
      <div className="summary-card">
        <Helmet>
          <title>{t("scYourOrder")} | {t("shopName")}</title>
        </Helmet>

        {/* ✅ เริ่ม แสดง Loader */}
        {loading && (<div className="loader-on-top"><LoaderDiv /></div>)}
        {/* ✅ จบ แสดง Loader */}

        <div className="setgrid-1">
          {/* Left */}
          <div className="summary-card-left">
            <div className="div-head">{t("scShippingAddress")}</div>
            <div className="div-content">
              <div className="div-content-box">

                <div>
                  <div className="input-group">
                    <input
                      name="fullName"
                      value={nameData.fullName}
                      onChange={handleNameChange}
                      // placeholder={t("scFullName")}
                      placeholder=""
                      title={t("scFullName")}
                      className="form-input checkout-input"
                    />
                    <label>{t("scFullName")}</label>
                  </div>
                  <div className="input-group">
                    <input
                      name="houseNo"
                      value={addressData.houseNo}
                      onChange={handleAddressChange}
                      placeholder=""
                      title={t("scHouseNo")}
                      className="form-input checkout-input"
                    />
                    <label>{t("scHouseNo")}</label>
                  </div>
                  <div className="input-group">
                    <input
                      name="district"
                      value={addressData.district}
                      onChange={handleAddressChange}
                      placeholder=""
                      title={t("scDistrict")}
                      className="form-input checkout-input"
                    />
                    <label>{t("scDistrict")}</label>
                  </div>
                  <div className="input-group">
                    <input
                      name="city"
                      value={addressData.city}
                      onChange={handleAddressChange}
                      placeholder=""
                      title={t("scCity")}
                      className="form-input checkout-input"
                    />
                    <label>{t("scCity")}</label>
                  </div>
                  <div className="input-group">
                    <input
                      name="province"
                      value={addressData.province}
                      onChange={handleAddressChange}
                      placeholder=""
                      title={t("scProvince")}
                      className="form-input checkout-input"
                    />
                    <label>{t("scProvince")}</label>
                  </div>
                  <div className="input-group">
                    <input
                      name="zipCode"
                      value={addressData.zipCode}
                      onChange={handleAddressChange}
                      placeholder=""
                      title={t("scZipCode")}
                      className="form-input checkout-input"
                    />
                    <label>{t("scZipCode")}</label>
                  </div>
                  <div className="input-group">
                    <input
                      name="phone"
                      value={nameData.phone}
                      onChange={handleNameChange}
                      placeholder=""
                      title={t("scPhone")}
                      className="form-input checkout-input"
                    />
                    <label>{t("scPhone")}</label>
                  </div>
                  <div className="input-group">
                    <input
                      name="social"
                      value={nameData.social}
                      onChange={handleNameChange}
                      placeholder=""
                      title={t("scSocial")}
                      className="form-input checkout-input"
                    />
                    <label>{t("scSocial")}</label>
                  </div>
                  <hr />
                  <div className="flex items-center mb-4 font-bold">
                    {t("lcSelectedCountry")} ({countryList.find((c) => c.code === userLocationData.countryCode)?.emoji}) : {userLocationData.country}
                    <span>
                      <img
                        src={`https://flagcdn.com/24x18/${userLocationData.countryCode}.png`}
                        alt={userLocationData.countryCode}
                        style={{
                          display: "inline-block",
                          marginLeft: "10px",
                          marginRight: "10px",
                          verticalAlign: "middle",
                          width: "24px",
                          height: "18px",
                        }}
                      />
                    </span>
                    <input
                    name="country"
                    // value={nameData.country || (nameData.country = userLocationData?.countryCode)}
                    value={(nameData.country = userLocationData?.countryCode)}
                    type="hidden"
                  />
                  </div>
                  <hr />
                  <div className="summary-card-div-btn">
                    <button onClick={hdlSaveAddress} className="bttn btn-mod">1. {t("scSaveAddress")}</button>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Right */}
          <div className="summary-card-right">
            <div className="div-head">{t("scYourOrder")}</div>
            <div className="div-content">
              <div className="div-content-box">
                {products?.map((item, index) => (
                  <div key={index}>
                    <div className="summary-card-right-list">
                      <div>
                        <p className="summary-card-right-list-title">{item.product.title}</p>
                        <p className="summary-card-right-list-count">
                          {t("scQuantity")}: {item.count} x {numberFormat(item.product.price)}
                        </p>
                      </div>
                      <div>
                        <p className="summary-card-right-list-price">
                          {numberFormat(item.count * item.product.price) + ' '}
                          <span className="summary-card-right-list-total-price-unit">{t("moneyUnit")}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                <div>
                  <div className="summary-card-right-list-other">
                    <p>{t("scShippingCosts")}:</p>
                    <span className="summary-card-right-list-discount">
                      {shippingFee === 0 ? (
                        t("scFreeOnlyInThailand")
                      ) : (
                        <>
                          {shippingFee.toLocaleString()} <span className="summary-card-right-list-total-price-unit">{t("moneyUnit")}</span>
                        </>
                      )}
                    </span>
                  </div>
                  <div className="summary-card-right-list-other">
                    <p>{t("scDiscount")}:</p>
                    <div className="summary-card-right-list-discount">-<span className="summary-card-right-list-total-price-unit"> {t("moneyUnit")}</span></div>

                  </div>
                </div>
                <div className="summary-card-right-list-other-box">
                  <hr />
                  <div className="cart-list-right-text-1 text-sm">
                    <span>{t("htrTotal")}{t("htrPrice")}</span>
                    <span className="cart-list-right-text-2 text-sm">
                      {numberFormat(cartTotal)} {t("moneyUnit")}
                    </span>
                  </div>
                  <div className="cart-list-right-text-1 text-sm">
                    <span>{t("scShippingCosts")}</span>
                    <span className="cart-list-right-text-2 text-sm">
                      {numberFormat(shippingFee)} {t("moneyUnit")}
                    </span>
                  </div>
                  <hr className="border-[1px]" />
                  <div className="summary-card-right-list-other">
                    <p className="summary-card-right-list-total">{t("scNetTotal")}:</p>
                    <p className="summary-card-right-list-total-price">{numberFormat(grandTotal) + ' '}
                      <span className="summary-card-right-list-total-price-unit">{t("moneyUnit")}</span>
                    </p>
                  </div>
                  <hr className="border-[1px]" />
                </div>
                <div>
                  <div className="summary-card-div-btn">
                    <button onClick={hdlGoToPayment} className="bttn btn-mod">2. {t("scProceedWithPayment")}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

  );
};

export default SummaryCard;
