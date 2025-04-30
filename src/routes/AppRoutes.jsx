// rafce
import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { useTranslation } from "react-i18next"; // ✅ เพิ่มตัวช่วยแปลภาษา
import Home from '../pages/Home'
import Shop from '../pages/Shop'
import Cart from '../pages/Cart'
import History from '../pages/user/History'
import Checkout from '../pages/Checkout'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import Layout from '../layouts/Layout'
import LayoutAdmin from '../layouts/LayoutAdmin'
import Dashboard from '../pages/admin/Dashboard'
import Product from '../pages/admin/Product'
import Category from '../pages/admin/Category'
import Manage from '../pages/admin/Manage'
import LayoutUser from '../layouts/LayoutUser'
import HomeUser from '../pages/user/HomeUser'
import ProtectRouteUser from './ProtectRouteUser'
import ProtectRouteAdmin from './ProtectRouteAdmin'
import EditProduct from '../pages/admin/EditProduct'
import Payment from '../pages/user/Payment'
import ManageOrders from '../pages/admin/ManageOrders'
// จากตรงนี้เสริมเองทั้งหมด 
import AboutUs from '../pages/AboutUs'
import ContactUs from '../pages/ContactUs'
import HowToPay from '../pages/HowToPay'
import HowToStatusOrders from '../pages/HowToStatusOrders'
import ContactList from '../pages/admin/ContactList'
import Review from '../pages/user/Review'
import EditReview from '../pages/user/EditReview'
import AllReviews from '../pages/admin/AllReviews'


const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: 'shop', element: <Shop /> },
            { path: 'cart', element: <Cart /> },
            { path: 'checkout', element: <Checkout /> },
            { path: 'login', element: <Login /> },
            { path: 'register', element: <Register /> },
            // จากตรงนี้เสริมเองทั้งหมด
            { path: 'aboutus', element: <AboutUs /> },
            { path: 'contactus', element: <ContactUs /> },
            { path: 'howtopay', element: <HowToPay /> },
            { path: 'howtostatusorders', element: <HowToStatusOrders /> },
        ]
    },
    {
        path: '/admin',
        element: <ProtectRouteAdmin element={<LayoutAdmin />} />,
        children: [
            { index: true, element: <Dashboard /> },
            { path: 'category', element: <Category /> },
            { path: 'product', element: <Product /> },
            { path: 'product/:id', element: <EditProduct /> },
            { path: 'manage', element: <Manage /> },
            { path: 'orders', element: <ManageOrders /> },
            // จากตรงนี้เสริมเองทั้งหมด
            { path: 'contactlist', element: <ContactList /> },
            { path: 'allreviews', element: <AllReviews /> },
        ]
    },
    {
        path: '/user',
        // element: <LayoutUser />,
        element: <ProtectRouteUser element={<LayoutUser />} />,
        children: [
            { index: true, element: <HomeUser /> },
            { path: 'payment', element: <Payment /> },
            { path: 'history', element: <History /> },
            // จากตรงนี้เสริมเองทั้งหมด
            { path: 'review', element: <Review /> },
            { path: 'review/:id', element: <EditReview /> },
        ]
    }

])

const AppRoutes = () => {

    const { t } = useTranslation(); // ✅ ใช้ตัวช่วยแปลภาษา

    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default AppRoutes