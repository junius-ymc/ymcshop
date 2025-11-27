// rafce

import React from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useEcomStore from "../../store/ecom-store";

const HeaderAdmin = () => {

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
        <div className='header-admin-bar'>
            <div className="setdiv-1">
                <div className="setdiv-2">
                    <div className="setdiv-3">

                        <NavLink
                            to={"/admin/"}
                            end
                            className={({ isActive }) =>
                                isActive
                                    ? "bttn bttnact header-admin-menu"
                                    : "bttn header-admin-menu"
                            }
                        >
                            Dashboard
                        </NavLink>
                        <NavLink
                            to={"manage"}
                            className={({ isActive }) =>
                                isActive
                                    ? "bttn bttnact header-admin-menu"
                                    : "bttn header-admin-menu"
                            }
                        >
                            User
                        </NavLink>
                        <NavLink
                            to={"category"}
                            className={({ isActive }) =>
                                isActive
                                    ? "bttn bttnact header-admin-menu"
                                    : "bttn header-admin-menu"
                            }
                        >
                            Category
                        </NavLink>
                        <NavLink
                            to={"product"}
                            className={({ isActive }) =>
                                isActive
                                    ? "bttn bttnact header-admin-menu"
                                    : "bttn header-admin-menu"
                            }
                        >
                            Product
                        </NavLink>
                        <NavLink
                            to={"orders"}
                            className={({ isActive }) =>
                                isActive
                                    ? "bttn bttnact header-admin-menu"
                                    : "bttn header-admin-menu"
                            }
                        >
                            Orders
                        </NavLink>
                        <NavLink
                            to={"contactlist"}
                            className={({ isActive }) =>
                                isActive
                                    ? "bttn bttnact header-admin-menu"
                                    : "bttn header-admin-menu"
                            }
                        >
                            ContactList
                        </NavLink>
                        <NavLink
                            to={"allreviews"}
                            className={({ isActive }) =>
                                isActive
                                    ? "bttn bttnact header-admin-menu"
                                    : "bttn header-admin-menu"
                            }
                        >
                            AllReviews
                        </NavLink>

                    </div>
                    <div className="setdiv-3">
                        <a className="bttn header-admin-menu" href='/' target='_YMCshop'>
                            Homepage
                        </a>
                        <NavLink onClick={() => handleLogout()} className="bttn header-admin-menu">
                            Logout
                        </NavLink>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderAdmin