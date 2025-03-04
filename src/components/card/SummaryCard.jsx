import React, { useState, useEffect } from "react";
import { listUserCart, saveAddress } from "../../api/user";
import useEcomStore from "../../store/ecom-store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { numberFormat } from "../../utils/number";

const SummaryCard = () => {
  const token = useEcomStore((state) => state.token);
  const [products, setProducts] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const user = useEcomStore((state) => state.user);
  // console.log("user form zustand", user);

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

  const [addressData, setAddressData] = useState(initialAddress);
  const [nameData, setNameData] = useState(initialName);
  const [addressSaved, setAddressSaved] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    hdlGetUserCart(token);
  }, []);

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
      return toast.warning(chgLng.scVerifyFill, {
                bodyClassName: "toastify-toast-modify",
              });
    }
    saveAddress(token, JSON.stringify(addressData), JSON.stringify(nameData))
      .then((res) => {
        toast.success(res.data.message);
        setAddressSaved(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const hdlGoToPayment = () => {
    if (!addressSaved) {
      return toast.warning(chgLng.scVerifyPay, {
        bodyClassName: "toastify-toast-modify",
      });
    }
    navigate("/user/payment");
  };

  const handleAddressChange = (e) => {
    setAddressData({ ...addressData, [e.target.name]: e.target.value });
  };

  const handleNameChange = (e) => {
    setNameData({ ...nameData, [e.target.name]: e.target.value });
  };

  // console.log(products);

  return (

    <div className="div-wrap">
      <div className="summary-card">

{/* Left */}
        <div className="summary-card-left">
          <div className="div-head">{chgLng.scShippingAddress}</div>
          <div className="div-content">
            <div className="div-content-box">
              <input
                name="fullName"
                value={nameData.fullName}
                onChange={handleNameChange}
                placeholder={chgLng.scFullName}
                title={chgLng.scFullName}
                className="form-input-checkout"
              />
              <input name="houseNo" value={addressData.houseNo} onChange={handleAddressChange} placeholder={chgLng.scHouseNo} title={chgLng.scHouseNo} className="form-input-checkout" />
              <input name="district" value={addressData.district} onChange={handleAddressChange} placeholder={chgLng.scDistrict} title={chgLng.scDistrict} className="form-input-checkout" />
              <input name="city" value={addressData.city} onChange={handleAddressChange} placeholder={chgLng.scCity} title={chgLng.scCity} className="form-input-checkout" />
              <input name="province" value={addressData.province} onChange={handleAddressChange} placeholder={chgLng.scProvince} title={chgLng.scProvince} className="form-input-checkout" />
              <input name="zipCode" value={addressData.zipCode} onChange={handleAddressChange} placeholder={chgLng.scZipCode} title={chgLng.scZipCode} className="form-input-checkout" />
              <input
                name="phone"
                value={nameData.phone}
                onChange={handleNameChange}
                placeholder={chgLng.scPhone}
                title={chgLng.scPhone}
                className="form-input-checkout"
              />
              <hr />
              <div className="summary-card-div-btn"><button onClick={hdlSaveAddress} className="bnt-mod summary-card-btn">{chgLng.scSaveAddress}</button></div>
            </div>
          </div>
        </div>

{/* Right */}
        <div className="summary-card-right">
          <div className="div-head">{chgLng.scYourOrder}</div>
          <div className="div-content">
            <div className="div-content-box">
              {products?.map((item, index) => (
                <div key={index}>
                  <div className="summary-card-right-list">
                    <div>
                      <p className="summary-card-right-list-title">{item.product.title}</p>
                      <p className="summary-card-right-list-count">
                      {chgLng.scQuantity}: {item.count} x {numberFormat(item.product.price)}
                      </p>
                    </div>
                    <div>
                      <p className="summary-card-right-list-price">
                        {numberFormat(item.count * item.product.price) + ' '}
                        <span className="summary-card-right-list-total-price-unit">{chgLng.moneyUnit}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              <div>
                <div className="summary-card-right-list-other">
                  <p>{chgLng.scShippingCosts}:</p>
                  <span className="summary-card-right-list-discount">{chgLng.scFreeOnlyInThailand}</span>
                </div>
                <div className="summary-card-right-list-other">
                  <p>{chgLng.scDiscount}:</p>
                  <div className="summary-card-right-list-discount">-<span className="summary-card-right-list-total-price-unit"> {chgLng.moneyUnit}</span></div>
                  
                </div>
              </div>
              <div className="summary-card-right-list-other-box">
                <hr />
                <div className="summary-card-right-list-other">
                  <p className="summary-card-right-list-total">{chgLng.scNetTotal}:</p>
                  <p className="summary-card-right-list-total-price">{numberFormat(cartTotal) + ' '}
                  <span className="summary-card-right-list-total-price-unit">{chgLng.moneyUnit}</span>
                  </p>
                </div>
                <hr />
              </div>
              <div>
              <div className="summary-card-div-btn">
                <button onClick={hdlGoToPayment} className="bnt-mod summary-card-btn">{chgLng.scProceedWithPayment}</button>
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
