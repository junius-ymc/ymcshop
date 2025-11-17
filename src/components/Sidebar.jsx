import React, { useState, useEffect } from "react";
import { useNavigate, NavLink, Link } from "react-router-dom";
import useEcomStore from "../store/ecom-store";
import CartModal from "./CartModal";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next"; // ✅ เพิ่มตัวช่วยแปลภาษา
import IconShopping from "./icon/IconShopping";
import IconCart from "./icon/IconCart";
import IconCartList from "./icon/IconCartList";
import IconLanguage from "./icon/IconLanguage";
import IconTheme from "./icon/IconTheme";
import IconUser from "./icon/IconUser";
import IconHome from "./icon/IconHome";
import IconRegister from "./icon/IconRegister";
import IconLogin from "./icon/IconLogin";
import IconHistory from "./icon/IconHistory";
import IconLogout from "./icon/IconLogout";
import IconArrow from "./icon/IconArrow";
import IconMenuSideBar from "./icon/IconMenuSideBar";
import IconHowTo from "./icon/IconHowTo";
import IconAboutUs from "./icon/IconAboutUs";
import IconContactUs from "./icon/IconContactUs";
import IconInstallWebApp from "./icon/IconInstallWebApp";
import flagth from '../assets/icon/flagth.png'; // (ไว้ในโฟลเดอร์ assets)
import flagen from '../assets/icon/flagen.png';
import flagjp from '../assets/icon/flagjp.png';
import usePwaStore from "../store/pwa-store";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(window.innerWidth <= 1425);
  const [openDropdown, setOpenDropdown] = useState(null);

  const carts = useEcomStore((s) => s.carts);
  const user = useEcomStore((s) => s.user);
  const logout = useEcomStore((s) => s.logout);
  const navigate = useNavigate();
  const [theme, setTheme] = useState("style1"); // ค่าเริ่มต้น

  // console.log(Boolean(user))
  // console.log(carts)
  // console.log(user.email)

  const { t, i18n } = useTranslation(); // ✅ ใช้ตัวช่วยแปลภาษา
  const changeLanguage = (lang, langSeo) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang); // ✅ บันทึกค่าภาษาไว้
    localStorage.setItem("languageSeo", langSeo); // ✅ บันทึกค่าภาษาไว้
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

  // ฟังก์ชัน Logout เพื่อลบ Token
  const handleLogout = () => {

    // เรียกใช้งานฟังก์ชัน logout จาก Zustand store
    logout(true);

    // ลบ Token และ Email
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    // localStorage.removeItem("rememberedEmail"); // ลบ Email ถ้ามี

    // แจ้งเตือนว่าล็อกเอาท์สำเร็จ
    toast.success(`${t("liLogout")}`, {
      bodyClassName: "toastify-toast-modify",
    });
    navigate("/"); // กลับไปหน้า Home

  };

  // ✅ โหลดค่าธีมจาก localStorage ทันทีที่หน้าโหลดขึ้นมา
  useEffect(() => {
    const savedTheme = localStorage.getItem("style");
    if (savedTheme) {
      setTheme(savedTheme);
      document.getElementById("theme-style").href = `/theme/${savedTheme}.css`;
    }
  }, []);

  // ✅ ฟังก์ชันเปลี่ยนธีม
  const changeTheme = (selectedTheme) => {
    setTheme(selectedTheme);
    document.getElementById("theme-style").href = `/theme/${selectedTheme}.css`;
    localStorage.setItem("style", selectedTheme); // บันทึกค่าธีม
  };

  // ✅ แบบที่ 1: เอาเฉพาะชื่อด้านหน้า หลังตัว @ ให้ตัดออก
  function EmailUsername({ email }) {
    const username = email.split('@')[0];
    return <div>{username}</div>;
  }

  // ✅ แบบที่ 2: ตัดให้แสดงตัวอักษรตามที่กำหนด
  function TruncatedEmail({ email, maxLength = 12 }) {
    const truncated = email.length > maxLength
      ? `${email.slice(0, maxLength)}...`
      : email;

    return <div>{truncated}</div>;
  }

  const prompt = usePwaStore((s) => s.deferredPrompt);
  // useEffect(() => {
  //   const isStandalone = window.matchMedia("(display-mode: standalone)").matches;
  //   if (!isStandalone && prompt) {
  //     setShowBtn(true);
  //   }
  // }, [prompt]);
  const handleClick = async () => {
    if (prompt) {
      prompt.prompt();
      const result = await prompt.userChoice;
      if (result.outcome === "accepted") {
        console.log("ติดตั้งแล้ว 🎉");
      }
    }
  };

  return (
    <>

      <CartModal
        isOpen={isModalOpenCart}
        onClose={() => setIsModalOpenCart(false)}
      />

      {!collapsed && (
        <div className="sidebar-toggler-overlay" onClick={toggleSidebar}></div>
      )}

      <button className="sidebar-menu-button" onClick={toggleSidebar}>
        <span>
          <IconMenuSideBar className="icon-menu-sidebar" />
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

      {user && (
        <div className="sidebar-menu-button menu-dropdown">
          <div>
            <button className="sidebar-menu-user-button">
              <span>
                <IconUser className="icon-menu-sidebar icon-menu" />
              </span>
            </button>
          </div>
          <div className="menu-sub">
            <div className="setdiv-3 menu-sub-wrap">
              <div className="setdiv-1">
                <li>
                  <NavLink to="/user/history/">
                    <div className="flex justify-start items-center">
                      <span className="mr-1"><IconHistory className="icon-menu-s icon-menu-stroke" /></span>
                      <span>{t("mHistory")}</span>
                    </div>
                  </NavLink>
                </li>
                <li>
                  <Link onClick={() => handleLogout()}>
                    <div className="flex justify-start items-center">
                      <span className="mr-1"><IconLogout className="icon-menu-s icon-menu-stroke" /></span>
                      <span>{t("mLogout")}</span>
                    </div>
                  </Link>
                </li>
                {(user?.role === "staff" || user?.role === "admin") && (
                  <li>
                    <a href="/admin/" target="_YMCshop-Admin">
                      <div className="flex justify-start items-center">
                        <span className="mr-1">For: </span>
                        <span>{user?.role}</span>
                      </div>
                    </a>
                  </li>
                )}
              </div>
              {/* <div className="menu-sub-arrow">◀</div> */}
            </div>
          </div>
        </div>
      )}

      <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <header className="sidebar-header">
          {/* <span className="sidebar-header-text-username">
            <EmailUsername email={user.email} />
          </span> */}
          {user?.email && (
            <span className="sidebar-header-text-username" onClick={toggleSidebar}>
              <TruncatedEmail email={user.email} />
            </span>
          )}
          <button className="sidebar-toggler" onClick={toggleSidebar}>
            <span><IconArrow className="icon-menu-arrow" /></span>
          </button>
        </header>

        <nav className="sidebar-nav">
          {/* ------------------------------- Start Sidebar primary-nav ------------------------------- */}
          <ul className="nav-list primary-nav">

            <li className="nav-item">
              <NavLink className="nav-link" to="/" title={t("mHome")} onClick={toggleSidebar}>
                <div className="icon-menu"><IconHome className="icon-menu" /></div>
                <span className="nav-label">{t("mHome")}</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/shop" title={t("mShop")} onClick={toggleSidebar}>
                <div className="icon-menu"><IconShopping className="icon-menu" /></div>
                <span className="nav-label">{t("mShop")}</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/cart" title={t("mCart")} onClick={toggleSidebar}>
                <div className="icon-menu"><IconCart className="icon-menu" /></div>
                <span className="nav-label">{t("mCart")}</span>
                {/* เริ่ม ส่วนแสดงจำนวนสินค้าที่อยู่ในตะกร้า */}
                {
                  carts.length === 0
                    ?
                    <span></span>
                    :
                    <span className="notifycart notifycart-2">{carts.length}</span>
                }
                {/* จบ ส่วนแสดงจำนวนสินค้าที่อยู่ในตะกร้า */}
              </NavLink>
            </li>

            <li className={`nav-item dropdown-container ${openDropdown === 3 ? "open" : ""}`}>
              <a className="nav-link dropdown-toggle" onClick={() => toggleDropdown(3)} title={t("mHowTo")}>
                <div className="icon-menu"><IconHowTo className="icon-menu" /></div>
                <span className="nav-label">{t("mHowTo")}</span>
                <span className="dropdown-icon">
                  <IconArrow className="icon-menu-s" />
                </span>
              </a>
              <ul className="dropdown-menu" style={{ height: openDropdown === 3 ? "auto" : 3 }}>
                <li className="nav-item"><a className="nav-link dropdown-title">{t("mHowTo")}</a></li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/howtopay" title={t("mHowToPay")} onClick={toggleSidebar}>
                    <div className="icon-menu-s"><IconHowTo className="icon-menu-s" /></div>
                    {t("mHowToPay")}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/howtostatusorders" title={t("mHowToStatus")} onClick={toggleSidebar}>
                    <div className="icon-menu-s"><IconHowTo className="icon-menu-s" /></div>
                    {t("mHowToStatus")}
                  </NavLink>
                </li>
              </ul>
            </li>

            <li className={`nav-item dropdown-container ${openDropdown === 0 ? "open" : ""}`}>
              <a className="nav-link dropdown-toggle" onClick={() => toggleDropdown(0)} title={t("mLang")}>
                <div className="icon-menu"><IconLanguage className="icon-menu" /></div>
                <span className="nav-label">{t("mLang")}</span>
                <span className="dropdown-icon">
                  <IconArrow className="icon-menu-s" />
                </span>
              </a>
              <ul className="dropdown-menu" style={{ height: openDropdown === 0 ? "auto" : 0 }}>
                <li className="nav-item"><a className="nav-link dropdown-title">{t("mLang")}</a></li>
                <li className="nav-item">
                  <a onClick={() => changeLanguage("th", "th_TH")} href="?" target="_self" className="nav-link dropdown-link">
                    <div className="icon-menu-s">
                      <img src={flagth} alt="flagth" className="icon-menu-s" />
                    </div>
                    {t("mShowLang1")}
                  </a>
                </li>
                <li className="nav-item">
                  <a onClick={() => changeLanguage("en", "en_US")} href="?" target="_self" className="nav-link dropdown-link">
                    <div className="icon-menu-s">
                      <img src={flagen} alt="flagen" className="icon-menu-s" />
                    </div>
                    {t("mShowLang2")}
                  </a>
                </li>
                <li className="nav-item">
                  <a onClick={() => changeLanguage("ja", "ja_JA")} href="?" target="_self" className="nav-link dropdown-link">
                    <div className="icon-menu-s">
                      <img src={flagjp} alt="flagjp" className="icon-menu-s" />
                    </div>
                    {t("mShowLang3")}
                  </a>
                </li>
              </ul>
            </li>

            <li className={`nav-item dropdown-container ${openDropdown === 1 ? "open" : ""}`}>
              <a className="nav-link dropdown-toggle" onClick={() => toggleDropdown(1)} title={t("mTheme")}>
                <div className="icon-menu"><IconTheme className="icon-menu-theme" /></div>
                <span className="nav-label">{t("mTheme")}</span>
                <span className="dropdown-icon">
                  <IconArrow className="icon-menu-s" />
                </span>
              </a>
              <ul className="dropdown-menu" style={{ height: openDropdown === 1 ? "auto" : 1 }}>
                <li className="nav-item"><a className="nav-link dropdown-title">{t("mTheme")}</a></li>
                <li className="nav-item">
                  <a className="nav-link dropdown-link" onClick={() => changeTheme("style1") + toggleSidebar()}>
                    <div className="icon-menu-s"><IconTheme className="icon-menu-s" /></div>
                    {t("mTheme1")}
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link dropdown-link" onClick={() => changeTheme("style2") + toggleSidebar()}>
                    <div className="icon-menu-s"><IconTheme className="icon-menu-s" /></div>
                    {t("mTheme2")}
                  </a>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/aboutus" title={t("mAboutUs")} onClick={toggleSidebar}>
                <div className="icon-menu"><IconAboutUs className="icon-menu" /></div>
                <span className="nav-label">{t("mAboutUs")}</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/contactus" title={t("mContactUs")} onClick={toggleSidebar}>
                <div className="icon-menu"><IconContactUs className="icon-menu" /></div>
                <span className="nav-label">{t("mContactUs")}</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="#" title={t("mIconInstallWebApp")} onClick={handleClick}>
                <div className="icon-menu"><IconInstallWebApp className="icon-menu" /></div>
                <span className="nav-label">{t("mIconInstallWebApp")}</span>
              </NavLink>
            </li>

          </ul>
          {/* ------------------------------- End Sidebar primary-nav ------------------------------- */}

          {/* ------------------------------- Start Sidebar secondary-nav ------------------------------- */}
          <ul className="nav-list secondary-nav">

            <li className={`nav-item dropdown-container ${openDropdown === 2 ? "open" : ""}`}>
              <a className="nav-link dropdown-toggle" onClick={() => toggleDropdown(2)} title={t("mUser")}>
                <div className="icon-menu"><IconUser className="icon-menu" /></div>
                <span className="nav-label">{t("mUser")}</span>
                <span className="dropdown-icon">
                  <IconArrow className="icon-menu-s" />
                </span>
              </a>
              {
                user
                  ?
                  <ul className="dropdown-menu" style={{ height: openDropdown === 2 ? "auto" : 2 }}>
                    <li className="nav-item">
                      <NavLink className="nav-link dropdown-link" to="/user/history/" onClick={toggleSidebar}>
                        <div><IconHistory className="icon-menu-s icon-menu-stroke" /></div>
                        <span className="nav-item">{t("mHistory")}</span>
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link dropdown-link" onClick={() => handleLogout()}>
                        <div><IconLogout className="icon-menu-s icon-menu-stroke" /></div>
                        <span className="nav-item">{t("mLogout")}</span>
                      </Link>
                    </li>
                  </ul>
                  :
                  <ul className="dropdown-menu" style={{ height: openDropdown === 2 ? "auto" : 2 }}>
                    <li className="nav-item">
                      <NavLink className="nav-link dropdown-link" to="/register/" onClick={toggleSidebar}>
                        <div><IconRegister className="icon-menu-s" /></div>
                        <span className="nav-item">{t("mRegister")}</span>
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link dropdown-link" to="/login/" onClick={toggleSidebar}>
                        <div><IconLogin className="icon-menu-s icon-menu-stroke" /></div>
                        <span className="nav-item">{t("mLogin")}</span>
                      </NavLink>
                    </li>
                  </ul>
              }
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="#" onClick={() => handleCartClick() + toggleSidebar()} title={t("ccShoppingCart")}>
                <div className="icon-menu"><IconCartList className="icon-menu icon-cart-list" /></div>
                <span className="nav-label">{t("ccShoppingCart")}</span>
                {/* เริ่ม ส่วนแสดงจำนวนสินค้าที่อยู่ในตะกร้า */}
                {
                  carts.length === 0
                    ?
                    <span></span>
                    :
                    <span className="notifycart-3">{carts.length}</span>
                }
                {/* จบ ส่วนแสดงจำนวนสินค้าที่อยู่ในตะกร้า */}
              </Link>
            </li>

          </ul>
          {/* ------------------------------- End Sidebar secondary-nav ------------------------------- */}
        </nav>
      </aside>

    </>
  );
};

export default Sidebar;
