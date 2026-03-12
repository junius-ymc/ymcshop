import React, { useState, useEffect } from 'react';
import cursor from '../../assets/icon/cursor.gif'; // (ไว้ในโฟลเดอร์ assets)

const TextAnimation = () => {
  // กำหนด Array ของข้อความที่ต้องการแสดง
  const texts = [
    // '🙏 สวัสดีจ้าาาา คุณ🦆หนุ่ยนุ้ย ยินดีต้อนรับสู่ร้าน YMC Shop ✨🎉',
    // '🥰เราเป็นคนแรกที่หลงเข้ามาในเว็บนี้นะ😝',
    // '😮 ห๊าาา..อะไรนะ..!!! จะเหมาหมดทั้งร้านนี้เลยรึ 😆😆😆',
    '🙏 สวัสดี, Hello, こんにちは 🎉✨🎊✨🎈',
    '👉 ยินดีต้อนรับสู่ YMC Shop – แหล่งรวมเสื้อผ้าสไตล์ Streetwear และเครื่องแต่งกาย Vintage ที่คัดสรรมาเพื่อคนทันสมัยเช่นคุณ 👈',
    '🛠 ขณะนี้..เว็บไซต์เสร็จสมบูณร์แล้ว 95% 😎',
    '✅ คุณสามารถทดสอบระบบและทดลองสั่งซื้อสินค้าในร้านได้แล้วในขณะนี้ 🛒',
    // '👌 ... กรูใส่ อิโมติค่อน เป็นแล้วโว้ยยยยย!! ... 😝',
    // '👽 การแสดงผลแบบพิมพ์ข้อความ ได้โค้ดนี้ มาจากการถาม Ai 😅',
  ];

  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [waitTime, setWaitTime] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0); // ตำแหน่งข้อความปัจจุบันใน Array

  useEffect(() => {
    let timeout;

    if (waitTime > 0) {
      // รอ 5 วินาที ก่อนเริ่มพิมพ์ใหม่
      timeout = setTimeout(() => {
        setWaitTime(0); // รีเซ็ตเวลารอ
        setIsDeleting(true); // เริ่มลบข้อความ
      }, waitTime);
    } else if (isDeleting) {
      // ลบข้อความทีละตัวอักษร
      if (index > 0) {
        timeout = setTimeout(() => {
          setDisplayText((prev) => prev.slice(0, -1));
          setIndex((prev) => prev - 1);
        }, 12); // ความเร็วในการลบ
      } else {
        setIsDeleting(false); // สิ้นสุดการลบ
        setIndex(0); // รีเซ็ต index เพื่อเริ่มพิมพ์ใหม่

        // สลับไปยังข้อความต่อไปใน Array
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        setWaitTime(0); // รีเซ็ตเวลารอ
      }
    } else {
      // พิมพ์ข้อความทีละตัวอักษร
      const currentText = texts[currentTextIndex]; // ข้อความปัจจุบัน
      if (index < currentText.length) {
        timeout = setTimeout(() => {
          setDisplayText((prev) => prev + currentText[index]);
          setIndex((prev) => prev + 1);
        }, 90); // ความเร็วในการพิมพ์
      } else {
        setWaitTime(5000); // รอ 5 วินาที ก่อนเริ่มพิมพ์ใหม่
      }
    }

    return () => clearTimeout(timeout); // ล้าง timeout เมื่อ component ถูกลบ
  }, [index, isDeleting, waitTime, currentTextIndex, texts]);

  return (
    <div className="mini-box">
      <div className="typewriter-container">
        <div className="typewriter-text">
          <div className="mini-link-box-info">
            {displayText}
            <img src={cursor} alt="cursor" className="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextAnimation;