import { NavLink, useNavigate } from "react-router-dom";
import useEcomStore from "../store/ecom-store";
import ScrollToTopButton from "./ScrollToTopButton";
import { useTranslation } from "react-i18next"; // ✅ เพิ่มตัวช่วยแปลภาษา
import { toast } from "react-toastify";
import IconLogout from "./icon/IconLogout";

const Footer = () => {

  const user = useEcomStore((s) => s.user);
  const { t } = useTranslation(); // ✅ ใช้ตัวช่วยแปลภาษา
  const logout = useEcomStore((s) => s.logout);
  const navigate = useNavigate();

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
    <div>
      <footer>

        <div className="wrapper">
          <div className="setdiv-1">
            <div className="setdiv-2">

              <div className="setdiv-3 footer-left">
                <p>&copy; YMC Shop. 2025</p>
              </div>

              <div className="setdiv-3 footer-right">
                <ul>
                  <li>
                    <NavLink className={({ isActive }) => isActive ? "textact" : ""}
                      to={"/"}
                    >
                      {t("mHome")}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className={({ isActive }) => isActive ? "textact" : ""}
                      to={"/shop"}
                    >
                      {t("mShop")}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className={({ isActive }) => isActive ? "textact" : ""}
                      to={"/cart"}
                    >
                      {t("mCart")}
                    </NavLink>
                  </li>

                  <div className="text-link-right">
                  <li>
                    <NavLink className={({ isActive }) => isActive ? "textact" : ""}
                      to={"/howtopay"}
                    >
                      {t("mHowToPay")}
                    </NavLink>
                  </li>
                  </div>
                  {user
                    ?
                    <li>
                      <NavLink onClick={() => handleLogout()}>
                        <IconLogout className="icon-logout" />
                      </NavLink>
                    </li>
                    :
                    ""
                  }
                </ul>
              </div>

            </div>
          </div>
        </div>

        <ScrollToTopButton />

      </footer>

      <div className="setdiv-empty-space-bottom"></div>
    </div>
  );
};

export default Footer;
