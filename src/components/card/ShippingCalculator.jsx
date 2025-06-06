import React, { useState, useEffect } from "react";
import useEcomStore from "../../store/ecom-store";
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
    <div className="p-4 border rounded-lg bg-white w-[95%] shadow">
      <label className="block mb-2 font-medium text-gray-700">
        กรุณาเลือกประเทศปลายทางในการจัดส่ง:
      </label>

      <select
        value={countryCode}
        onChange={(e) => setCountryCode(e.target.value)}
        className="w-full p-2 border rounded bg-gray-50"
      >
        {countryList.map((c) => (
          <option key={c.code} value={c.code}>
            {c.name}
          </option>
        ))}
      </select>

      <div className="mt-2 text-sm text-gray-600">
        🌍 ประเทศ:
        <span className="ml-2">
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
        ({countryList.find((c) => c.code === countryCode)?.emoji})
      </div>

      <div className="mt-2">
        💸 ค่าจัดส่ง:
        <strong className="ml-2">
          {shippingFee === 0 ? "ฟรี" : `${shippingFee.toLocaleString()} บาท`}
        </strong>
      </div>
    </div>
  );
}
