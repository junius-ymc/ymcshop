import { useEffect, useState } from "react";
import usePwaStore from "../store/pwa-store";

const InstallPWAButton = () => {

  const prompt = usePwaStore((s) => s.deferredPrompt);
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches;
    if (!isStandalone && prompt) {
      setShowBtn(true);
    }
  }, [prompt]);

  const handleClick = async () => {
    if (prompt) {
      prompt.prompt();
      const result = await prompt.userChoice;
      if (result.outcome === "accepted") {
        toast.success(`✅ Installed. 🎉`, {
          bodyClassName: "toastify-toast-modify",
        });
        console.log("✅ Installed. 🎉");
      }
    }
  };

  return (
    <>
      {showBtn && (
        <button
          onClick={handleClick}
          className="fixed bottom-6 left-4 bg-blue-600 text-white px-4 py-2 rounded shadow z-50"
        >
          📲 Install YMC Shop
        </button>
      )}
      {/* <button onClick={handleClick}> */}
      {/* <button
        onClick={handleClick}
        className="fixed bottom-6 left-4 bg-blue-600 text-white px-4 py-2 rounded shadow z-50"
      >
        📲 ติดตั้งแอป YMC Shop
      </button> */}
    </>
  );
}

export default InstallPWAButton