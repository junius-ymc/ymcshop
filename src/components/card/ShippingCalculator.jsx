import React, { useState, useEffect } from "react";
import useEcomStore from "../../store/ecom-store";
import { useTranslation } from "react-i18next";
import {
  getZoneFromCountryCode,
  shippingRatesByZone,
  countryList,
} from "../../utils/ShippingZones";

export default function ShippingCalculator({ itemCount = 1, onShippingChange }) {
  const userLocationData = useEcomStore((state) => state.userLocationData);
  const getUserLocation = useEcomStore((state) => state.getUserLocation);
  const [countryCode, setCountryCode] = useState("");
  const [shippingFee, setShippingFee] = useState(0);
  const [zone, setZone] = useState("A");
  const { t } = useTranslation();
  const countryName = countryList.find((c) => c.code === countryCode)?.name || "Unknown";

  // preload countryCode จาก store
  useEffect(() => {
    if (userLocationData?.countryCode) {
      const preload = userLocationData.countryCode.toLowerCase();
      setCountryCode(preload);
    }
  }, [userLocationData]);

  // คำนวณค่าจัดส่ง
  useEffect(() => {
    const zone = getZoneFromCountryCode(countryCode);
    setZone(zone);

    const rateFunc = shippingRatesByZone[zone] || shippingRatesByZone.default;
    const fee = rateFunc(itemCount);
    setShippingFee(fee);

    if (onShippingChange) {
      onShippingChange({ country: countryCode, fee });
      getUserLocation(countryCode, countryName);
    }
  }, [countryCode, itemCount, onShippingChange]);

  return (
    <div className="p-4 border rounded-lg w-[95%] shadow">
      <label className="cart-list-left-data-1-text-3 block mb-2">
        {t("lcSelectCountry")}
      </label>

      <select
        value={countryCode}
        onChange={(e) => setCountryCode(e.target.value)}
        className="form-input"
      >
        {countryList.map((c) => (
          <option key={c.code} value={c.code}>
            {c.name}
          </option>
        ))}
      </select>

      <div className="cart-list-left-data-1-text-3 block mb-2">
        {t("lcSelectedCountry")}<span className="cart-list-left-data-1-text-2">({countryList.find((c) => c.code === countryCode)?.emoji})</span> :
        <span className="cart-list-left-data-1-text-1 ml-2">
          {countryName}
        </span>
        <span>
          <img
            src={`https://flagcdn.com/24x18/${countryCode}.png`}
            alt={countryCode}
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
      </div>

      <div className="cart-list-left-data-1-text-3 mt-2">
        {t("scShippingCosts")}:
        <strong className="cart-list-left-data-2 ml-2">
          {shippingFee === 0 ? (
            t("scFreeOnlyInThailand")
          ) : (
            <>
              {shippingFee.toLocaleString()} {t("moneyUnit")}
            </>
          )}
        </strong>
      </div>
    </div>
  );
}
