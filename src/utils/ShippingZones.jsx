// 📦 โซนจัดส่งตามประเทศ (แบ่งตามระยะทาง + ต้นทุน)
export const shippingZones = {
  A: ["th"], // ไทย
  B: ["la", "kh", "mm", "vn", "sg", "my", "id"], // ประเทศเพื่อนบ้าน / เอเชียตะวันออกเฉียงใต้
  C: ["jp", "kr", "cn", "hk", "tw"],             // เอเชียตะวันออก
  D: ["in", "pk", "bd", "ae", "qa"],             // เอเชียใต้ / ตะวันออกกลาง
  E: ["us", "gb", "fr", "au", "de", "ca"],       // ตะวันตก / ไกล
  default: [],
};

// 📐 ค่าจัดส่งตามโซน
export const shippingRatesByZone = {
  A: (count) => 0 + (count - 1) * 25,
  B: (count) => 200 + (count - 1) * 80,
  C: (count) => 370 + (count - 1) * 120,
  D: (count) => 450 + (count - 1) * 125,
  E: (count) => 500 + (count - 1) * 150,
  default: (count) => 550 + (count - 1) * 180,
};

export const countryList = [
  { code: "th", name: "Thailand", emoji: "🇹🇭"  },
  // โซนใกล้ไทย
  { code: "la", name: "Laos", emoji: "🇱🇦" },
  { code: "kh", name: "Cambodia", emoji: "🇰🇭" },
  { code: "mm", name: "Myanmar", emoji: "🇲🇲" },
  { code: "vn", name: "Vietnam", emoji: "🇻🇳" },
  { code: "sg", name: "Singapore", emoji: "🇸🇬" },
  { code: "my", name: "Malaysia", emoji: "🇲🇾" },
  { code: "id", name: "Indonesia", emoji: "🇮🇩" },
  // เอเชียตะวันออก
  { code: "jp", name: "Japan", emoji: "🇯🇵" },
  { code: "kr", name: "Korea", emoji: "🇰🇷" },
  { code: "cn", name: "China", emoji: "🇨🇳" },
  { code: "hk", name: "Hong Kong", emoji: "🇭🇰" },
  { code: "tw", name: "Taiwan", emoji: "🇹🇼" },
  // เอเชียใต้ / ตะวันออกกลาง
  { code: "in", name: "India", emoji: "🇮🇳" },
  { code: "pk", name: "Pakistan", emoji: "🇵🇰" },
  { code: "bd", name: "Bangladesh", emoji: "🇧🇩" },
  { code: "ae", name: "United Arab Emirates", emoji: "🇦🇪" },
  { code: "qa", name: "Qatar", emoji: "🇶🇦" },
  // ตะวันตก
  { code: "us", name: "United States of America", emoji: "🇺🇸" },
  { code: "gb", name: "United Kingdom", emoji: "🇬🇧" },
  { code: "fr", name: "French", emoji: "🇫🇷" },
  { code: "au", name: "Australia", emoji: "🇦🇺" },
  { code: "de", name: "Germany", emoji: "🇩🇪" },
  { code: "ca", name: "Canada", emoji: "🇨🇦" },
  // อื่นๆ 
  { code: "xx", name: "Other", emoji: "xx" },
];

// 🔍 หาว่า countryCode อยู่ในโซนไหน
export const getZoneFromCountryCode = (code) => {
  code = code.toLowerCase();
  for (const zone in shippingZones) {
    if (shippingZones[zone].includes(code)) {
      return zone;
    }
  }
  return "default";
};
