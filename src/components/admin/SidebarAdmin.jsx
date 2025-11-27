import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  UserCog,
  SquareChartGantt,
  ShoppingBasket,
  ListOrdered,
  LogOut
} from "lucide-react";
import { toast } from "react-toastify";
import useEcomStore from "../../store/ecom-store";
// import IconLogout from "../icon/IconLogout";

const SidebarAdmin = () => {

  // ฟังก์ชัน Logout เพื่อลบ Token
  const logout = useEcomStore((s) => s.logout);
  const navigate = useNavigate();
  const handleLogout = () => {
    // เรียกใช้งานฟังก์ชัน logout จาก Zustand store
    logout(true);
    // ลบ Token
    toast.success("Logged out.", {
      bodyClassName: "toastify-toast-modify",
    });
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    navigate("/"); // กลับไปหน้า Home
  };

  return (
    <div className="sidebar-admin">
      <div className="sidebar-admin-header">
        Admin Panel
      </div>
      <nav className="sidebar-admin-wrap-menu">

        <NavLink
          to={"/admin/"}
          end
          className={({ isActive }) =>
            isActive
              ? "bttn bttnact sidebar-admin-menu"
              : "bttn sidebar-admin-menu"
          }
        >
          <LayoutDashboard className="mr-2" />
          Dashboard
        </NavLink>

        <NavLink
          to={"manage"}
          className={({ isActive }) =>
            isActive
              ? "bttn bttnact sidebar-admin-menu"
              : "bttn sidebar-admin-menu"
          }
        >
          <UserCog className="mr-2" />
          User
        </NavLink>

        <NavLink
          to={"category"}
          className={({ isActive }) =>
            isActive
              ? "bttn bttnact sidebar-admin-menu"
              : "bttn sidebar-admin-menu"
          }
        >
          <SquareChartGantt className="mr-2" />
          Category
        </NavLink>

        <NavLink
          to={"product"}
          className={({ isActive }) =>
            isActive
              ? "bttn bttnact sidebar-admin-menu"
              : "bttn sidebar-admin-menu"
          }
        >
          <ShoppingBasket className="mr-2" />
          Product
        </NavLink>

        <NavLink
          to={"orders"}
          className={({ isActive }) =>
            isActive
              ? "bttn bttnact sidebar-admin-menu"
              : "bttn sidebar-admin-menu"
          }
        >
          <ListOrdered className="mr-2" />
          Orders
        </NavLink>

        <NavLink
          to={"contactlist"}
          className={({ isActive }) =>
            isActive
              ? "bttn bttnact sidebar-admin-menu"
              : "bttn sidebar-admin-menu"
          }
        >
          {/* <ListOrdered className="mr-2" /> */}
          📩 Contact List
        </NavLink>

        <NavLink
          to={"allreviews"}
          className={({ isActive }) =>
            isActive
              ? "bttn bttnact sidebar-admin-menu"
              : "bttn sidebar-admin-menu"
          }
        >
          {/* <ListOrdered className="mr-2" /> */}
          🧾 All Reviews
        </NavLink>

      </nav>
      <div>
        <NavLink onClick={() => handleLogout()} className="bttn sidebar-admin-menu">
          {/* <div><IconLogout className="icon-menu-s icon-menu-stroke" /></div> */}
          <LogOut className="mr-2" />
          Logout
        </NavLink>
      </div>
    </div>
  );
};

export default SidebarAdmin;
