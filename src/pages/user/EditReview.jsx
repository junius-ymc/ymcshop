// ✅ File 2: EditReview.jsx
import React, { useState, useEffect } from 'react';
import useEcomStore from "../../store/ecom-store";
import { editReview, readReview, removeReview } from "../../api/review";
import { useTranslation } from "react-i18next";
import LoaderDiv from "../../components/LoaderDiv";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import { useParams, useNavigate } from 'react-router-dom';
import UploadOneFile from "./UploadOneFile";

const EditReview = () => {
  const token = useEcomStore((state) => state.token);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const initialState = {
    userName: "",
    reviewProduct: "",
    image: null,
  };

  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchReview(token, id);
  }, [token, id]);

  const fetchReview = async (token, id) => {
    try {
      const res = await readReview(token, id);
      setFormData({
        ...res.data,
        image: {
          asset_id: res.data.asset_id,
          public_id: res.data.public_id,
          url: res.data.url,
          secure_url: res.data.secure_url
        },
        orderedId: res.data.orderedId, // ✅ เพิ่มบรรทัดนี้
      });
    } catch (err) {
      console.log('Err fetch data', err);
    }
  };

  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (!formData.image) {
      toast.error("กรุณาอัปโหลดรูปก่อนบันทึก");
      setLoading(false);
      return;
    }

    try {
      const res = await editReview(token, id, formData);
      toast.success(`แก้ไขข้อมูล ${res.data.userName} สำเร็จ`);
      navigate('/user/history');
    } catch (err) {
      console.log(err);
      toast.error(`${err}`, { bodyClassName: "toastify-toast-modify" });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("จะลบจริงๆ หรอ")) {
      try {
        setLoading(true);
        await removeReview(token, id);
        toast.success("Deleted Review เรียบร้อยแล้ว");
        navigate('/user/history');
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  };

  // console.log('data:', formData);

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
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">แก้ไขรีวิวสินค้า</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* <div className="input-group">
                        <input
                          value={formData.userName}
                          onChange={handleOnChange}
                          placeholder=""
                          name="userName"
                          className="form-input"
                          required
                          disabled
                        />
                        <label>ชื่อเล่น/ชื่อที่จะให้แสดงหน้าเพ็จ</label>
                      </div> */}
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
                    <button className="bttn btn-mod" type="submit">
                      แก้ไขรีวิว
                    </button>
                  </form>
                  <br />
                  <div className="flex items-center justify-center">
                    <button onClick={() => handleDelete(formData.id)} className="bttn btn-mod">
                      ลบรีวิว ID: {formData.id}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditReview;
