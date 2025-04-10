import React from 'react'
import { Outlet } from 'react-router-dom'
import SidebarAdmin from '../components/admin/SidebarAdmin'
import HeaderAdmin from '../components/admin/HeaderAdmin'
import '../../../theme/adminstyle.css'

const LayoutAdmin = () => {
    return (
        <div className='layout-admin'>
            <div className="wrap-sidebar-admin">
                <SidebarAdmin />
            </div>
            <div className='header-admin'>
                <HeaderAdmin />
                <div className='main-admin'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default LayoutAdmin