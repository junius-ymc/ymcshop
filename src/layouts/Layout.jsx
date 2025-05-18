import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import MainNav from "../components/MainNav";
import Footer from "../components/Footer";

const Layout = () => {

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
    <div>
      <MainNav />
      <main className="content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
