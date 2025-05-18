// rafce
import React, { useEffect } from 'react'
import AppRoutes from './routes/AppRoutes'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./i18n"; // นำเข้าไฟล์ตั้งค่า i18n ตัวช่วยแปลภาษา
import { HelmetProvider } from "react-helmet-async";
import { registerSW } from 'virtual:pwa-register';

const App = () => {

  registerSW({ immediate: true });

  // ปิด Pull-to-Refresh
  // ป้องกันไม่ให้เว็บรีเฟรชเองตอน "ลากลง" จากด้านบนสุด
  useEffect(() => {
    let touchStartY = 0;

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      const touchY = e.touches[0].clientY;
      const scrollY = window.scrollY || document.documentElement.scrollTop;

      if (scrollY === 0 && touchY > touchStartY) {
        e.preventDefault();
      }
    };

    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

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