import { useEffect, useState } from "react";

let deferredPrompt = null;

export function usePWAInstall() {
  const [canInstall, setCanInstall] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      deferredPrompt = e;
      if (!window.matchMedia('(display-mode: standalone)').matches) {
        setCanInstall(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const triggerInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;
    if (result.outcome === "accepted") {
      console.log("👍 ติดตั้งเรียบร้อย");
    } else {
      console.log("❌ ยกเลิกการติดตั้ง");
    }
    deferredPrompt = null;
    setCanInstall(false);
  };

  return { canInstall, triggerInstall };
}
