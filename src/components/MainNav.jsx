// rafce
// rfce
// import React, { useState, useRef } from "react";
import React, { useRef } from "react";
import { useNavigate, NavLink, Link } from "react-router-dom";
import useEcomStore from "../store/ecom-store";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
// import { User } from "lucide-react";
// import ScrollToTopButton from "./ScrollToTopButton";

import { useTranslation } from "react-i18next"; // ✅ เพิ่มตัวช่วยแปลภาษา

function MainNav() {
  // Javascript
  const carts = useEcomStore((s) => s.carts);
  // console.log(carts)
  const user = useEcomStore((s) => s.user);
  const logout = useEcomStore((s) => s.logout);
  const navigate = useNavigate();

  // const [isOpen, setIsOpen] = useState(false);
  // const toggleDropdown = () => {
  //   setIsOpen(!isOpen);
  // };

  const { t } = useTranslation(); // ✅ ใช้ตัวช่วยแปลภาษา

  // ใช้ useRef เพื่ออ้างอิงถึง NavBar
  const navbar = useRef(null);

  // ฟังก์ชันเพื่อแสดงเมนู
  const showMenu = () => {
    if (navbar.current) {
      navbar.current.style.left = '0'; // เลื่อนเมนูออกมา
    }
  };

  // ฟังก์ชันเพื่อซ่อนเมนู
  const hideMenu = () => {
    if (navbar.current) {
      navbar.current.style.left = '-300px'; // ซ่อนเมนู
    }
  };

  // ฟังก์ชัน Logout เพื่อลบ Token
  const handleLogout = () => {
    // ลบ Token
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    // เรียกใช้งานฟังก์ชัน logout จาก Zustand store
    logout(true);
    toast.success(`${t("liLogout")}`, {
      bodyClassName: "toastify-toast-modify",
    });
    navigate("/"); // กลับไปหน้า Home

  };

  return (

    <nav className="navbox">

      {/* ----------- เริ่ม TOP WEB ----------- */}
      <div className="topweb">
        <div className="wrapper">
          <div className="top-web-left">
            <a href="/" target="_self">{t("mHome1")}</a>
            <NavLink to={"/aboutus/"}>{t("mAboutUs")}</NavLink>
            <NavLink to={"/contactus/"}>{t("mContactUs")}</NavLink>
          </div>

          <div className="top-web-right">
            <i className="top-web-right"><img src="/img/icon/ic-facebook.png" /></i>
            <i className="top-web-right"><img src="/img/icon/ic-instagram.png" /></i>
            <i className="top-web-right"><img src="/img/icon/ic-youtube.png" /></i>
          </div>
        </div>
      </div>
      {/* ----------- จบ TOP WEB ----------- */}

      {/* ----------- เริ่ม NAVIGATION NAVBAR ----------- */}
      <header>
        <div className="wrapper">

          <div className="setdiv-1">
            <div className="setdiv-2 addgap">

              {/* Start ส่วนของโลโก้ ด้านซ้าย */}
              <div className="setdiv-3">
                <i className="logo">
                  <NavLink to={"/"}>
                    <img src="/img/logo-b.png" />
                  </NavLink>
                </i>
                {/* </div> */}
                {/* End ส่วนของโลโก้ ด้านซ้าย */}

                {/* Start Show Menu Button */}
                <div className="times-1" id="times-1" onClick={showMenu}>
                  <img className="bttn" src="/img/icon/ic-menu.png" />
                </div>
                {/* End Show Menu Button */}

                {/* Start ส่วนของเมนู ตรงกลาง */}
                {/* <div className="setdiv-3"> */}
                <ul className="navbar" id="navbar" ref={navbar}>
                  <div className="times-2" id="times-2" >
                    <i onClick={hideMenu} className="bttn">
                      <img className="img-icon-s" src="/img/icon/ic-x.png" />
                    </i>
                  </div>

                  <div onClick={hideMenu} className="logo-s">
                    <img className="img-logo-s" src="/img/logo-s.png" />
                  </div>

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
                      to={"/shop/"}
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
                      to={"/cart/"}
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
                  {user
                    ?
                    <li>
                    <Link onClick={() => handleLogout()} className="bttn">
                      {t("mLogout")}
                    </Link>
                  </li>
                    :
                    ""
                    // <li>
                    //   <NavLink
                    //     className={({ isActive }) =>
                    //       isActive
                    //         ? "bttn bttnact"
                    //         : "bttn"
                    //     }
                    //     to={"/login/"}
                    //   >
                    //     {t("mLogin")}
                    //   </NavLink>
                    // </li>
                  }

                </ul>
              </div>
              {/* End ส่วนของเมนู ตรงกลาง */}

              {/* เสริมจากตรงนี้ ส่วนของเมนู ค้นหาสินค้า */}
              {/* <div className="setdiv-3 addgap">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "bttnact"
                      : "bttn"
                  }
                  to={"/search/"}
                >
                  <img className="img-icon-s" src="/img/icon/ic-search.png" />
                </NavLink>
              </div> */}
              {/* ถึงตรงนี้ ส่วนของเมนู ค้นหาสินค้า */}

              {/* Start ส่วนของเมนู Sidebar ด้านขวา */}
              {/* <div className="setdiv-3"> */}
              {/* <div className="wrap-sidebar"><Sidebar /></div> */}
              {/* </div> */}
              {/* End ส่วนของเมนู Sidebar ด้านขวา */}

            </div>
          </div>
          
          <div className="wrap-sidebar"><Sidebar /></div>
          {/* <ScrollToTopButton /> */}

        </div>
      </header>
      {/* ----------- จบ NAVIGATION NAVBAR ----------- */}

    </nav>

  );
}

export default MainNav;
