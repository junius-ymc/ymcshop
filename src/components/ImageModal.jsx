import React, { useState, useEffect } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import "../style/ImageModal.css"; // สำหรับซูมตามเมาส์ (CSS แยกไว้ด้านล่าง)

const ImageModal = ({ product, arrimg, onClose }) => {
  // const [currentImage, setCurrentImage] = useState(product.images.url[0]);
  const [currentImage, setCurrentImage] = useState(arrimg);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomStyle, setZoomStyle] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  const handleZoom = (e) => {
    if (!isZoomed) return;
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({ transformOrigin: `${x}% ${y}%` });
  };

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth <= 550);
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // console.log(arrimg);

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      {/* ปิดโมดัล */}
      <button onClick={onClose} className="zoomed-btn-close absolute top-1 right-50% text-3xl font-bold z-[55]">
        ✕
      </button>

      <div onClick={onClose} className="loader-on-top z-0"></div>

      {/* กล่องรูป */}
      <div className="zoomed-img-s-box bg-[--white] p-[12px] rounded-lg max-w-[90vw] max-h-[90vh] z-50">

        {/* รูปเล็ก */}
        <div className="zoomed-img-s">
          {product.images?.map((img, index) => (
            // <div key={index} className="justify-items-center">
            <div key={index} className="">
              <img
                src={img.url}
                alt={product.title}
                onClick={() => setCurrentImage(img.url)}
                className={`w-16 h-16 object-cover border cursor-pointer rounded-md ${currentImage === img.url ? "border-[--red] border-2" : "border-transparent"
                }`}
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* รูปใหญ่ */}
        <div className="relative">
          {isMobile ? (
            // ✅ MOBILE: pinch zoom
            <Zoom>
              <img
                src={currentImage}
                alt="main"
                className="max-w-[80vw] max-h-[90vh] object-contain rounded-md border-[--red] border-[1px]"
                loading="lazy"
              />
            </Zoom>
          ) : (
            // ✅ DESKTOP: zoom on click + follow mouse
            <div className="overflow-hidden cursor-zoom-in">
              <img
                src={currentImage}
                alt="main"
                onClick={() => setIsZoomed(!isZoomed)}
                onMouseMove={handleZoom}
                className={`max-w-[80vw] max-h-[90vh] object-contain rounded-md border-[--red] border-[1px] transition-transform duration-200 ${isZoomed ? "zoomed-image" : ""
                  }`}
                style={isZoomed ? zoomStyle : {}}
                loading="lazy"
              />
              {/* <p className="text-sm text-gray-600 text-center mt-1">
                {isZoomed ? "คลิกอีกครั้งเพื่อออกจากการซูม" : "คลิกรูปเพื่อซูม"}
              </p> */}
            </div>
          )}
        </div>
      </div>
    </div>

  );
};

export default ImageModal;
