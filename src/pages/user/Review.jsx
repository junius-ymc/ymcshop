// ✅ File 1: Review.jsx
import React, { useState, useEffect } from 'react'
import useEcomStore from "../../store/ecom-store";
import { createReview, readReview } from "../../api/review";
import { useTranslation } from "react-i18next"; // ✅ เพิ่มตัวช่วยแปลภาษา
import LoaderDiv from "../../components/LoaderDiv";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import UploadOneFile from "./UploadOneFile";

const Review = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location?.search);
  const reviewProductId = queryParams?.get("reviewProductId"); // ✅ ดึงค่า reviewProductId จาก URL
  const orderedId = queryParams?.get("orderedId"); // ✅ ดึงค่า orderedId จาก URL

  const token = useEcomStore((state) => state.token);
  const { t } = useTranslation(); // ✅ ใช้ตัวช่วยแปลภาษา
  const [loading, setLoading] = useState(false); // เพิ่มตัวแปร Loading

  const initialState = {
    userName: "",
    reviewProduct: "",
    reviewProductId,
    orderedId,
    image: null,
  };
  const [formData, setFormData] = useState(initialState);

  const handleSubmit = async (e) => {
    setLoading(true); // เริ่มโหลด
    e.preventDefault();

    if (!formData.image) {
      toast.error("กรุณาอัปโหลดรูปภาพก่อนส่งรีวิว");
      setLoading(false);
      return;
    }

    try {
      const res = await createReview(token, formData);
      toast.success(`เพิ่มข้อมูล ${res.data.userName} สำเร็จ`);
      navigate('/user/history');
    } catch (err) {
      console.log(err);
      toast.error(`${err}`, { bodyClassName: "toastify-toast-modify" });
    } finally {
      setLoading(false); // โหลดเสร็จ
    }
  };

  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const checkExistingReview = async () => {
      try {
        const res = await readReview(token, orderedId);
        if (res.data) {
          // ถ้ามีรีวิว → ไปหน้าแก้ไข
          navigate(`/user/review/${orderedId}`);
        }
      } catch (err) {
        // ถ้ายังไม่มีรีวิว → ไม่ต้องทำอะไร ปล่อยให้โพสต์ใหม่
        console.log('ยังไม่มีรีวิว สามารถโพสต์ได้');
      }
    };
  
    if (token && orderedId) checkExistingReview();
  }, [token, orderedId]);

  // console.log(formData);
  
  return (
    <div>
      <div className="div-wrap">
        <Helmet>
          <title>{t("htrHistory")} | {t("shopName")}</title>
        </Helmet>
        <div className="div-head">{t("htrHistory")} - Review</div>
        <div className="div-content">
          <div className="div-content-box">

            <div className="text-center">
              {loading ? (
                <LoaderDiv />
              ) : (
                <div>
                  <form onSubmit={handleSubmit} className="contact-form">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">เพิ่มรีวิวสินค้า</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="input-group">
                        <input
                          value={formData.userName}
                          onChange={handleOnChange}
                          placeholder=""
                          name="userName"
                          className="form-input"
                          required
                        />
                        <label>ชื่อเล่น/ชื่อที่จะให้แสดงหน้าเพ็จ</label>
                      </div>
                      <div className="input-group">
                        <input
                          value={formData.reviewProduct}
                          onChange={handleOnChange}
                          placeholder=""
                          name="reviewProduct"
                          className="form-input"
                          required
                        />
                        <label>รีวิวสินค้า</label>
                      </div>
                    </div>
                    <UploadOneFile formData={formData} setFormData={setFormData} />
                    <button
                      className="bttn btn-mod"
                      type="submit"
                    >
                      เพิ่มรีวิว
                    </button>
                  </form>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
