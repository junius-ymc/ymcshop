import React, { useState, useEffect } from "react";
import { useNavigate, NavLink, Link } from "react-router-dom";
import useEcomStore from "../store/ecom-store";
import CartModal from "./CartModal";
import { toast } from "react-toastify";

import { useTranslation } from "react-i18next"; // ✅ เพิ่มตัวช่วยแปลภาษา

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(window.innerWidth <= 1425);
  const [openDropdown, setOpenDropdown] = useState(null);

  const carts = useEcomStore((s) => s.carts);
  const user = useEcomStore((s) => s.user);
  const logout = useEcomStore((s) => s.logout);
  const navigate = useNavigate();

  // console.log(Boolean(user))
  // console.log(carts)

  const { t, i18n } = useTranslation(); // ✅ ใช้ตัวช่วยแปลภาษา
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang); // ✅ บันทึกค่าภาษาไว้
  };


  useEffect(() => {
    const handleResize = () => setCollapsed(window.innerWidth <= 1425);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);

  }, []);

  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
  //   setIsLoggedIn(!!token); // ถ้ามี Token แสดงว่าล็อกอินอยู่
  // }, []);

  const toggleSidebar = () => {
    setCollapsed((prev) => !prev);
    setOpenDropdown(null); // ปิด dropdown เมื่อสลับ sidebar
  };

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  // modal
  const [isModalOpenCart, setIsModalOpenCart] = useState(false);

  const handleCartClick = () => {
    setIsModalOpenCart(true);
  };

  // const logoutNotify = () => {
  //   logout(true);
  //   toast.success(`${t("liLogout")}`, {
  //     bodyClassName: "toastify-toast-modify",
  //   });

  // ฟังก์ชัน Logout เพื่อลบ Token
  const handleLogout = () => {
    // ลบ Token และ Email
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    // localStorage.removeItem("rememberedEmail"); // ลบ Email ถ้ามี

    // เรียกใช้งานฟังก์ชัน logout จาก Zustand store
    logout(true);

    // แจ้งเตือนว่าล็อกเอาท์สำเร็จ
    toast.success(`${t("liLogout")}`, {
      bodyClassName: "toastify-toast-modify",
    });
    navigate("/"); // กลับไปหน้า Home

  };

  return (
    <>

      <CartModal
        isOpen={isModalOpenCart}
        onClose={() => setIsModalOpenCart(false)}
      // product={selectedProduct}
      />

      <button className="sidebar-menu-button" onClick={toggleSidebar}>
        <span className="bttn">
          <img className="img-icon-m" src="/img/icon/ic-menu.png" />
          {/* เริ่ม ส่วนแสดงจำนวนสินค้าที่อยู่ในตะกร้า */}
          <span className="notifycart-on-menu">
            {
              carts.length === 0
                ?
                <span className="absolute"></span>
                :
                <span className="notifycart notifycart-2">{carts.length}</span>
            }
          </span>
          {/* จบ ส่วนแสดงจำนวนสินค้าที่อยู่ในตะกร้า */}
        </span>
      </button>

      <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <header className="sidebar-header">

          <button className="sidebar-toggler" onClick={toggleSidebar}>
            <span>
              {/* <span className="sidebar-nav nav-item nav-link"> */}
              <img className="img-icon-m" src="/img/icon/ic-left.png" />
              {/* </span> */}
            </span>
          </button>

          <a className="header-logo">
            {/* <button className="sidebar-menu-button" onClick={toggleSidebar}> */}
            <img src="/img/logo-s.png" onClick={toggleSidebar} />
            {/* </button> */}
          </a>

        </header>

        <nav className="sidebar-nav">
          {/* ------------------------------- Start Sidebar primary-nav ------------------------------- */}
          <ul className="nav-list primary-nav">

            {/* <li className="nav-item">
              <NavLink className="nav-link" to="/">
                <img className="img-icon-m" src="/img/icon/ic-home.png" />
                <span className="nav-label">{t("mHome1}</span>
              </NavLink>
            </li> */}

            <li className="nav-item">
              <NavLink className="nav-link" to="/shop/">
                <img className="img-icon-m" src="/img/icon/ic-shopping.png" alt={t("mShop")} />
                <span className="nav-label">{t("mShop")}</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/cart/">
                <img className="img-icon-m" src="/img/icon/ic-cart.png" />
                <span className="nav-label">{t("mCart")}</span>
                {/* เริ่ม ส่วนแสดงจำนวนสินค้าที่อยู่ในตะกร้า */}
                {
                  carts.length === 0
                    ?
                    <span></span>
                    :
                    <span className="notifycart-3">{carts.length}</span>
                }
                {/* จบ ส่วนแสดงจำนวนสินค้าที่อยู่ในตะกร้า */}
              </NavLink>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="#" onClick={() => handleCartClick()}>
                <img className="img-icon-m" src="/img/icon/ic-list.png" />
                <span className="nav-label">{t("ccShoppingCart")}</span>
                {/* เริ่ม ส่วนแสดงจำนวนสินค้าที่อยู่ในตะกร้า */}
                {
                  carts.length === 0
                    ?
                    <span></span>
                    :
                    <span className="notifycart notifycart-2">{carts.length}</span>
                }
                {/* จบ ส่วนแสดงจำนวนสินค้าที่อยู่ในตะกร้า */}
              </Link>
            </li>

            <li className={`nav-item dropdown-container ${openDropdown === 0 ? "open" : ""}`}>
              <a className="nav-link dropdown-toggle" onClick={() => toggleDropdown(0)}>
                <img className="img-icon-m" src="/img/icon/ic-language.png" />
                <span className="nav-label">{t("mLang")}</span>
                <span className="dropdown-icon"><img className="img-icon-xs" src="/img/icon/ic-down.png" /></span>
              </a>
              <ul className="dropdown-menu" style={{ height: openDropdown === 0 ? "auto" : 0 }}>
                <li className="nav-item"><a className="nav-link dropdown-title">{t("mLang")}</a></li>
                {/* <li className="nav-item">
                  <a href="/chglng.html?usl=th" target="_self" className="nav-link dropdown-link">
                    <img className="img-icon-xs" src="/img/icon/ic-th.png" /> {t("mShowLang1")}
                  </a>
                </li> */}
                <li className="nav-item">
                  <a onClick={() => changeLanguage("th")} className="nav-link dropdown-link">
                    <img className="img-icon-xs" src="/img/icon/ic-th.png" /> {t("mShowLang1")}
                  </a>
                </li>
                <li className="nav-item">
                  <a onClick={() => changeLanguage("en")} className="nav-link dropdown-link">
                    <img className="img-icon-xs" src="/img/icon/ic-en.png" /> {t("mShowLang2")}
                  </a>
                </li>
                <li className="nav-item">
                  <a onClick={() => changeLanguage("jp")} className="nav-link dropdown-link">
                    <img className="img-icon-xs" src="/img/icon/ic-jp.png" /> {t("mShowLang3")}
                  </a>
                </li>
              </ul>
            </li>

            <li className={`nav-item dropdown-container ${openDropdown === 1 ? "open" : ""}`}>
              <a className="nav-link dropdown-toggle" onClick={() => toggleDropdown(1)}>
                <img className="img-icon-m" src="/img/icon/ic-theme.png" />
                <span className="nav-label">{t("mTheme")}</span>
                <span className="dropdown-icon"><img className="img-icon-xs" src="/img/icon/ic-down.png" /></span>
              </a>
              <ul className="dropdown-menu" style={{ height: openDropdown === 1 ? "auto" : 1 }}>
                <li className="nav-item"><a className="nav-link dropdown-title">{t("mTheme")}</a></li>
                <li className="nav-item">
                  <a className="nav-link dropdown-link">
                    <img className="img-icon-xs" src="/img/icon/ic-theme.png" /> {t("mTheme1")}
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link dropdown-link">
                    <img className="img-icon-xs" src="/img/icon/ic-theme.png" /> {t("mTheme2")}
                  </a>
                </li>
              </ul>
            </li>

            {/* <li className="nav-item">
              <NavLink className="nav-link" to="/">
                <img className="img-icon-m" src="/img/icon/ic-home.png" />
                <span className="nav-label">{t("mHome1")}</span>
              </NavLink>
            </li> */}



          </ul>
          {/* ------------------------------- End Sidebar primary-nav ------------------------------- */}

          {/* ------------------------------- Start Sidebar secondary-nav ------------------------------- */}
          <ul className="nav-list secondary-nav">

            <li className={`nav-item dropdown-container ${openDropdown === 2 ? "open" : ""}`}>
              <a className="nav-link dropdown-toggle" onClick={() => toggleDropdown(2)}>
                <img className="img-icon-m" src="/img/icon/ic-person.png" />
                <span className="nav-label">{t("mUser")}</span>
                <span className="dropdown-icon"><img className="img-icon-xs" src="/img/icon/ic-down.png" /></span>
              </a>
              {
                user
                  ?

                  <ul className="dropdown-menu" style={{ height: openDropdown === 2 ? "auto" : 2 }}>
                    <li className="nav-item">
                      <NavLink className="nav-link dropdown-link" to="/user/history/">
                        <img className="img-icon-xs" src="/img/icon/ic-history.png" />
                        <span className="nav-item">{t("mHistory")}</span>
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      {/* <Link className="nav-link dropdown-link" to="/" onClick={() => logout()}> */}
                      {/* <Link className="nav-link dropdown-link" to="/" onClick={() => handleLogout()}>
                        <img className="img-icon-xs" src="/img/icon/ic-logout.png" />
                        <span className="nav-item">{t("mLogout")}</span>
                      </Link> */}
                      <Link className="nav-link dropdown-link" onClick={() => handleLogout()}>
                        <img className="img-icon-xs" src="/img/icon/ic-logout.png" />
                        <span className="nav-item">{t("mLogout")}</span>
                      </Link>
                      {/* {isLoggedIn && (
                        // <Link className="nav-link dropdown-link" to="/login" onClick={() => handleLogout()}>
                        <Link className="nav-link dropdown-link" onClick={() => handleLogout()}>
                        <img className="img-icon-xs" src="/img/icon/ic-logout.png" />
                        <span className="nav-item">{t("mLogout")}</span>
                      </Link>
                      )} */}
                    </li>
                  </ul>

                  :

                  <ul className="dropdown-menu" style={{ height: openDropdown === 2 ? "auto" : 2 }}>
                    <li className="nav-item">
                      <NavLink className="nav-link dropdown-link" to="/register/">
                        <img className="img-icon-xs" src="/img/icon/ic-register.png" />
                        <span className="nav-item">{t("mRegister")}</span>
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link dropdown-link" to="/login/">
                        <img className="img-icon-xs" src="/img/icon/ic-login.png" />
                        <span className="nav-item">{t("mLogin")}</span>
                      </NavLink>
                    </li>
                  </ul>

              }


            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                <img className="img-icon-m" src="/img/icon/ic-home.png" />
                <span className="nav-label">{t("mHome1")}</span>
              </NavLink>
            </li>

          </ul>
          {/* ------------------------------- End Sidebar secondary-nav ------------------------------- */}
        </nav>
      </aside>

    </>
  );
};

export default Sidebar;
