import React, { useState, useEffect } from "react";
import { listUserCart, saveAddress } from "../../api/user";
import useEcomStore from "../../store/ecom-store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { numberFormat } from "../../utils/number";
import { useTranslation } from "react-i18next"; // ✅ เพิ่มตัวช่วยแปลภาษา
import LoaderDiv from "../LoaderDiv";

const SummaryCard = () => {
  const token = useEcomStore((state) => state.token);
  const [products, setProducts] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const user = useEcomStore((state) => state.user);

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
      phone: ""
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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const hdlSaveAddress = () => {
    if (Object.values(addressData).some(val => !val) || Object.values(nameData).some(val => !val)) {
      return toast.warning(t("scVerifyFill"), {
        bodyClassName: "toastify-toast-modify",
      });
    }
    setLoading(true);
    saveAddress(token, JSON.stringify(addressData), JSON.stringify(nameData))
      .then((res) => {
        toast.success(res.data.message);
        setAddressSaved(true);
        setLoading(false); // โหลดเสร็จ
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const hdlGoToPayment = () => {
    if (!addressSaved) {
      return toast.warning(t("scVerifyPay"), {
        bodyClassName: "toastify-toast-modify",
      });
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

        {/* ✅ เริ่ม แสดง Loader */}
        {loading && (<div className="loader-on-top"><LoaderDiv /></div>)}
        {/* ✅ จบ แสดง Loader */}

        {/* Left */}
        <div className="summary-card-left">
          <div className="div-head">{t("scShippingAddress")}</div>
          <div className="div-content">
            <div className="div-content-box">
              <input
                name="fullName"
                value={nameData.fullName}
                onChange={handleNameChange}
                placeholder={t("scFullName")}
                title={t("scFullName")}
                className="form-input-checkout"
              />
              <input name="houseNo" value={addressData.houseNo} onChange={handleAddressChange} placeholder={t("scHouseNo")} title={t("scHouseNo")} className="form-input-checkout" />
              <input name="district" value={addressData.district} onChange={handleAddressChange} placeholder={t("scDistrict")} title={t("scDistrict")} className="form-input-checkout" />
              <input name="city" value={addressData.city} onChange={handleAddressChange} placeholder={t("scCity")} title={t("scCity")} className="form-input-checkout" />
              <input name="province" value={addressData.province} onChange={handleAddressChange} placeholder={t("scProvince")} title={t("scProvince")} className="form-input-checkout" />
              <input name="zipCode" value={addressData.zipCode} onChange={handleAddressChange} placeholder={t("scZipCode")} title={t("scZipCode")} className="form-input-checkout" />
              <input
                name="phone"
                value={nameData.phone}
                onChange={handleNameChange}
                placeholder={t("scPhone")}
                title={t("scPhone")}
                className="form-input-checkout"
              />
              <hr />
              <div className="summary-card-div-btn"><button onClick={hdlSaveAddress} className="bnt-mod summary-card-btn">{t("scSaveAddress")}</button></div>
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
                  <span className="summary-card-right-list-discount">{t("scFreeOnlyInThailand")}</span>
                </div>
                <div className="summary-card-right-list-other">
                  <p>{t("scDiscount")}:</p>
                  <div className="summary-card-right-list-discount">-<span className="summary-card-right-list-total-price-unit"> {t("moneyUnit")}</span></div>

                </div>
              </div>
              <div className="summary-card-right-list-other-box">
                <hr />
                <div className="summary-card-right-list-other">
                  <p className="summary-card-right-list-total">{t("scNetTotal")}:</p>
                  <p className="summary-card-right-list-total-price">{numberFormat(cartTotal) + ' '}
                    <span className="summary-card-right-list-total-price-unit">{t("moneyUnit")}</span>
                  </p>
                </div>
                <hr />
              </div>
              <div>
                <div className="summary-card-div-btn">
                  <button onClick={hdlGoToPayment} className="bnt-mod summary-card-btn">{t("scProceedWithPayment")}</button>
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
