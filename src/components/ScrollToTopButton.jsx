import React, { useState, useEffect } from 'react';
import arrowup from '../assets/icon/arrowup.png'; // (ไว้ในโฟลเดอร์ assets)

const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false);
  const [scrollingDown, setScrollingDown] = useState(true);

  let lastScrollTop = 0;

  const handleScroll = () => {
    const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;

    // กำหนดทิศทางการเลื่อน
    if (currentScroll > lastScrollTop) {
      setScrollingDown(true);
    } else {
      setScrollingDown(false);
    }

    setShowButton(currentScroll > 150);

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  };

  const backToTop = () => {
    // เลื่อน body ขึ้นไปบนสุด
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // ค้นหา div ที่เป็น scrollable โดยใช้ ID หรือ Class แทน
    // const scrollableDivs = document.querySelectorAll('.scrollable-container'); // หรือใช้ #id ถ้ามี id
    // scrollableDivs.forEach((div) => {
    //   div.scrollTo({ top: 0, behavior: 'smooth' });
    // });

  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      {showButton && (
        <div
          onClick={backToTop}
          style={{
            opacity: scrollingDown ? 0.3 : 0.4,
            // pointerEvents: scrollingDown ? 'auto' : 'none' // ถ้าเลื่อนขึ้นจะคลิ้กไม่ได้
            pointerEvents: scrollingDown ? 'auto' : 'auto'
          }}
          className="back-to-top"
        >
          <img src={arrowup} alt="arrowup" className="" />
        </div>
      )}
    </div>
  );
};

export default ScrollToTopButton;
