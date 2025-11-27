// rafce
import React, { useEffect, useState } from 'react'
import AppRoutes from './routes/AppRoutes'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./i18n"; // นำเข้าไฟล์ตั้งค่า i18n ตัวช่วยแปลภาษา
import { HelmetProvider } from "react-helmet-async";
import { registerSW } from 'virtual:pwa-register';
import usePwaStore from './store/pwa-store';

const App = () => {

  // เพิ่มปุ่มติดตั้ง VitePWA
  registerSW({ immediate: true });
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      usePwaStore.getState().setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  // ปุ่มแจ้งเตือน VitePWA อัปเดต
  const [showUpdate, setShowUpdate] = useState(false);
  const updateSW = registerSW({
    onNeedRefresh() {
      console.log("🔥 เวอร์ชันใหม่พร้อมอัปเดต!");
      setShowUpdate(true); // แสดงปุ่มแจ้งเตือน
    },
    onOfflineReady() {
      console.log("พร้อมใช้งานแบบออฟไลน์แล้ว 🎉");
    }
  });

  // ปิด Pull-to-Refresh
  // ป้องกันไม่ให้เว็บรีเฟรชเองตอน "ลากลง" จากด้านบนสุด
  // useEffect(() => {
  //   let touchStartY = 0;

  //   const handleTouchStart = (e) => {
  //     touchStartY = e.touches[0].clientY;
  //   };

  //   const handleTouchMove = (e) => {
  //     const touchY = e.touches[0].clientY;
  //     const scrollY = window.scrollY || document.documentElement.scrollTop;

  //     if (scrollY === 0 && touchY > touchStartY) {
  //       e.preventDefault();
  //     }
  //   };

  //   document.addEventListener("touchstart", handleTouchStart);
  //   document.addEventListener("touchmove", handleTouchMove, { passive: false });

  //   return () => {
  //     document.removeEventListener("touchstart", handleTouchStart);
  //     document.removeEventListener("touchmove", handleTouchMove);
  //   };
  // }, []);

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
      {/* ปุ่มแจ้งเตือน VitePWA */}
      {showUpdate && (
        <div className="fixed bottom-6 right-4 bg-yellow-500 text-white px-4 py-2 rounded shadow-lg z-50">
          <p>มีเวอร์ชันใหม่! 🎉</p>
          <button onClick={() => updateSW(true)} className="mt-2 bg-white text-black px-3 py-1 rounded">
            โหลดเวอร์ชันใหม่
          </button>
        </div>
      )}
    </>
  )
}

export default App