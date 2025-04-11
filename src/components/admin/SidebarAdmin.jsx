import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  UserCog,
  SquareChartGantt,
  ShoppingBasket,
  ListOrdered,
  LogOut
} from "lucide-react";
// import IconLogout from "../icon/IconLogout";

const SidebarAdmin = () => {
  
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
      </nav>

      <div>
        <NavLink className="bttn sidebar-admin-menu">
          {/* <div><IconLogout className="icon-menu-s icon-menu-stroke" /></div> */}
          <LogOut className="mr-2" />
          Logout
        </NavLink>
      </div>
    </div>
  );
};

export default SidebarAdmin;
