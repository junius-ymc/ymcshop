import React, { useState, useEffect } from "react";
// import axios from "axios";
import useEcomStore from "../store/ecom-store";
import { useTranslation } from "react-i18next"; // ✅ เพิ่มตัวช่วยแปลภาษา
import { Helmet } from "react-helmet-async";
import IconAboutUs from "../components/icon/IconAboutUs";
import IconContactUs from "../components/icon/IconContactUs";
import { Link } from "react-router-dom";
import { createContact } from "../api/contact";
import { toast } from "react-toastify";
import LoaderDiv from "../components/LoaderDiv";

const ContactUs = () => {

  const initialState = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };

  const { t } = useTranslation(); // ✅ ใช้ตัวช่วยแปลภาษา
  const token = useEcomStore((state) => state.token);
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);  // ✅ เพิ่มตัวแปร loading

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    setLoading(true); // เริ่มโหลด
    e.preventDefault();
    try {
      // const res = await axios.post("http://localhost:5001/api/contact", formData);
      const res = await createContact(token, formData);
      setFormData(initialState);
      toast.success("ส่งข้อความเรียบร้อยแล้ว!");
      console.log("✅ ส่งข้อมูลสำเร็จ", res.data);
    } catch (error) {
      toast.error("เกิดข้อผิดพลาดในการส่งข้อมูล");
      console.error("❌ เกิดข้อผิดพลาด", error);
    } finally {
      setLoading(false); // โหลดเสร็จ
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div>
      <Helmet>
        <title>{t("mContactUs")} | {t("shopName")}</title>
      </Helmet>
      {/* ✅ เริ่ม แสดง Loader */}
      {loading && (<div className="loader-on-top"><LoaderDiv /></div>)}
      {/* ✅ จบ แสดง Loader */}
      <div className="div-wrap">
        <div className="div-head">
          <span className="setdiv-3">
            <IconContactUs className="icon-shopping" />
            {t("mContactUs")}
          </span>
        </div>
        <div className="div-content">
          <div className="div-content-box">

            <div className="contact-container">
              <h1 className="contact-title">📩 ติดต่อเรา</h1>
              <p className="about-title">{t("shopName")}</p>
              <p className="contact-intro">
                หากคุณมีคำถาม ข้อเสนอแนะ หรือต้องการสั่งซื้อ สามารถส่งข้อความถึงเราได้ที่นี่!
              </p>

              <div className="contact-grid">
                {/* ข้อมูลการติดต่อ */}
                <div className="contact-info">
                  <h2 className="contact-subtitle">📱 ติดต่อเรา</h2>
                  <p>📧 <strong>อีเมล</strong>: <a href="mailto:ymccorp2016@gmail.com" className="about-link">ymccorp2016@gmail.com</a></p>
                  {/* <p>📷 Instagram: <a href="https://instagram.com/ymcshop" className="about-link" target="_blank" rel="noopener noreferrer">@ymcshop</a></p> */}
                  <p>📷 <strong>Instagram:</strong> <a href="#" className="about-link" rel="noopener noreferrer">@ymcshop</a></p>
                  <p>📲 <strong>โทร:</strong> 099-999-9999</p>
                  <p><strong>เวลาทำการ:</strong> จันทร์ - ศุกร์ 10.00 - 18.00 น.</p>
                </div>

                {/* ฟอร์ม */}
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="input-group">
                    <input
                      type="text"
                      name="name"
                      placeholder=""
                      value={formData.name}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                    <label>ชื่อของคุณ</label>
                  </div>
                  <div className="input-group">
                    <input
                      type="email"
                      name="email"
                      placeholder=""
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                    <label>{t("liEmail")}</label>
                  </div>
                  <div className="input-group">
                    <input
                      type="text"
                      name="subject"
                      placeholder=""
                      value={formData.subject}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                    <label>หัวข้อเรื่อง</label>
                  </div>
                  <div className="input-group">
                    <textarea
                      name="message"
                      placeholder=""
                      value={formData.message}
                      onChange={handleChange}
                      rows="5"
                      className="form-textarea"
                      required
                    ></textarea>
                    <label>ข้อความของคุณ</label>
                  </div>
                  <button className="bttn btn-mod mt-4" type="submit">ส่งข้อความ ✉</button>
                </form>
              </div>

              {/* ✅ แสดง Google Map */}
              <h2 className="about-subtitle mt-10">📍 สถานที่ตั้ง</h2>
              <p>ยามู ยะหริ่ง ปัตตานี, ประเทศไทย</p>
              <iframe
                title="YMC Shop Location"
                // src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d795.5930272128094!2d101.36788102627287!3d6.866352407095104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31b3a98b750a2f6b%3A0x3723281715201d!2zMTEg4LiW4LiZ4LiZIOC4o-C4suC4oeC5guC4geC4oeC4uOC4lyDguIvguK3guKIgMTEg4LiV4Liz4Lia4LilIOC4ouC4suC4oeC4uSDguK3guLPguYDguKDguK0g4Lii4Liw4Lir4Lij4Li04LmI4LiHIOC4m-C4seC4leC4leC4suC4meC4tSA5NDE1MA!5e1!3m2!1sth!2sth!4v1737636221935!5m2!1sth!2sth"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d495.1501533839789!2d101.3680518306993!3d6.866473593132129!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31b3a98b7433884f%3A0x923ed8918d96ad24!2zMzAtMiDguJbguJnguJkg4Lij4Liy4Lih4LmC4LiB4Lih4Li44LiXIOC4i-C4reC4oiAxMSDguJXguLPguJrguKUg4Lii4Liy4Lih4Li5IOC4reC4s-C5gOC4oOC4rSDguKLguLDguKvguKPguLTguYjguIcg4Lib4Lix4LiV4LiV4Liy4LiZ4Li1IDk0MTUw!5e0!3m2!1sth!2sth!4v1744658161209!5m2!1sth!2sth"
                width="100%"
                height="360"
                style={{ border: 0, borderRadius: "10px", marginTop: "2px" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>

              <div className="about-buttons">
                <Link to="/aboutus" className="bttn btn-mod">
                  <IconAboutUs className="icon-shopping" /> {t("mAboutUs")}
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
