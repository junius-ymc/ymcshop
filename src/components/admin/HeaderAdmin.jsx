// rafce

import React from 'react'
import { NavLink } from "react-router-dom";

const HeaderAdmin = () => {
    return (
        <div className='header-admin-bar'>
            <div className="setdiv-1">
                <div className="setdiv-2">

                    <div className="setdiv-3">
                        <NavLink
                            to={"/admin"}
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
                    </div>
                    <div className="setdiv-3">
                        <a className="bttn header-admin-menu" href='/' target='_YMCshop'>
                            Homepage
                        </a>
                        <NavLink className="bttn header-admin-menu">
                            Logout
                        </NavLink>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default HeaderAdmin