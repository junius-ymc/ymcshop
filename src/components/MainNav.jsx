import React, { useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import useEcomStore from "../store/ecom-store";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next"; // ✅ เพิ่มตัวช่วยแปลภาษา
import logo from '../assets/logo.png'; // (ไว้ในโฟลเดอร์ assets)
import { jwtDecode } from "jwt-decode"; // ✅ import jwtDecode

function MainNav() {
  // Javascript
  const carts = useEcomStore((s) => s.carts);
  const user = useEcomStore((s) => s.user);
  const logout = useEcomStore((s) => s.logout);
  const navigate = useNavigate();
  const { t } = useTranslation(); // ✅ ใช้ตัวช่วยแปลภาษา

  const safeDecodeToken = (token) => {
    try {
      return jwtDecode(token);
    } catch (err) {
      return null;
    }
  };

  // ฟังก์ชัน Logout เพื่อลบ Token
  const handleLogout = () => {
    // เรียกใช้งานฟังก์ชัน logout จาก Zustand store
    logout(true);
    // ลบ Token
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    toast.success(`${t("liLogout")}`, {
      bodyClassName: "toastify-toast-modify",
    });
    navigate("/"); // กลับไปหน้า Home
  };

  useEffect(() => {
    const token = useEcomStore.getState().token;
    const decoded = safeDecodeToken(token);
  
    if (token && decoded?.exp) {
      const now = Date.now() / 1000;
      if (decoded.exp < now) {
        handleLogout(); // ⏰ Token หมดอายุ → ล็อกเอาท์ทันที
      }
    }
  }, []);

  return (

    <nav className="navbox">
      <header>
        <div className="wrapper">
          <div className="setdiv-1">
            <div className="setdiv-2">

              {/* Start ส่วนของโลโก้ ด้านซ้าย */}
              <div className="setdiv-3">
              <i>
                  <NavLink to="/">
                    <img src={logo} alt="Logo" className="logo" />
                  </NavLink>
                </i>
                {/* End ส่วนของโลโก้ ด้านซ้าย */}

                {/* Start ส่วนของเมนู */}
                <ul className="navbar" id="navbar">
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "bttn bttnact"
                          : "bttn"
                      }
                      to={"/"}
                    >
                      {t("mHome")}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "bttn bttnact"
                          : "bttn"
                      }
                      to={"/shop"}
                    >
                      {t("mShop")}
                    </NavLink>
                  </li>
                  <li className="relative">
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "bttn bttnact"
                          : "bttn"
                      }
                      to={"/cart"}
                    >
                      {t("mCart")}
                      {/* เริ่ม ส่วนแสดงจำนวนสินค้าที่อยู่ในตะกร้า */}
                      {
                        carts.length === 0
                          ?
                          <span className="absolute"></span>
                          :
                          <span className="notifycart notifycart-1">{carts.length}</span>
                      }
                      {/* จบ ส่วนแสดงจำนวนสินค้าที่อยู่ในตะกร้า */}
                    </NavLink>
                  </li>
                  {user && (
                    <li>
                      <NavLink onClick={() => handleLogout()} className="bttn">
                        {t("mLogout")}
                      </NavLink>
                    </li>
                  )}
                </ul>
              </div>
              {/* End ส่วนของเมนู */}

            </div>
          </div>
        </div>
        <div className="wrap-sidebar"><Sidebar /></div>
      </header>
    </nav>

  );
}

export default MainNav;
