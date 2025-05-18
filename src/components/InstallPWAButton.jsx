import { useEffect, useState } from "react";

const InstallPWAButton = () => {

  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowButton(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); // 🔔 เปิด popup ของเบราว์เซอร์
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response to the install prompt: ${outcome}`);
      setDeferredPrompt(null);
      setShowButton(false); // ซ่อนปุ่มหลังติดตั้งหรือยกเลิก
    }
  };

  return (
    <>
      {showButton && (
        <button
          onClick={handleInstallClick}
          className="fixed bottom-6 left-4 bg-blue-600 text-white px-4 py-2 rounded shadow-lg z-50"
        >
          📲 ติดตั้งแอป YMC Shop
        </button>
      )}
      {/* <button
        onClick={handleInstallClick}
        className="fixed bottom-4 left-4 bg-blue-600 text-white px-4 py-2 rounded shadow-lg z-50"
      >ติดตั้งแอป YMC Shop จ้า..
      </button> */}
    </>
  )
}
export default InstallPWAButton