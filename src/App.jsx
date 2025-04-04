// rafce
import React from 'react'
import AppRoutes from './routes/AppRoutes'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./i18n"; // นำเข้าไฟล์ตั้งค่า i18n ตัวช่วยแปลภาษา
import { HelmetProvider } from "react-helmet-async";

const App = () => {
  return (
    <>
      <ToastContainer
      position="top-center"
      autoClose={2500}
      limit={3} // โชว์พร้อมกันสูงสุด
      />
      <HelmetProvider>
        <AppRoutes />
      </HelmetProvider>
    </>
  )
}

export default App