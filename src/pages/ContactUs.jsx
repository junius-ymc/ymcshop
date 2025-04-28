import React, { useState, useEffect } from "react";
import useEcomStore from "../store/ecom-store";
import { useTranslation } from "react-i18next"; // ✅ เพิ่มตัวช่วยแปลภาษา
import { Helmet } from "react-helmet-async";
import IconAboutUs from "../components/icon/IconAboutUs";
import IconContactUs from "../components/icon/IconContactUs";
import { Link, useNavigate } from "react-router-dom";
import { createContact } from "../api/contact";
import { toast } from "react-toastify";
import LoaderDiv from "../components/LoaderDiv";
import { MessageCircleMore, MapPin, LocateFixed, Mail, Phone, Headset, Instagram, Facebook, MoveDown } from 'lucide-react';


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
  const navigate = useNavigate();
  const user = useEcomStore((state) => state.user);

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
      const res = await createContact(token, formData);
      setFormData(initialState);
      toast.success(t("cuTextSentMsg5") + t("_blank") + t("cuTextSentMsg6"), {
        bodyClassName: "toastify-toast-modify",
      });
      navigate("/");
      // console.log("✅ ส่งข้อมูลสำเร็จ", res.data);
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

  let nameData;
  try {
    nameData = JSON.parse(user?.name || "{}");
  } catch (error) {
    nameData = {};
  }

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

              <p className="contact-title flex justify-center items-center">
                <span className="mr-1"><Headset /></span>
                <span>{t("cuTextTt1")} {t("shopName")}</span>
              </p>
              <p className="contact-intro">
                {t("cuTextTt2")}
              </p>

              <div className="contact-grid">
                {/* ข้อมูลการติดต่อ */}
                <div className="contact-info">
                  <h2 className="contact-subtitle flex items-center">
                    <span className="mr-1"><Headset /></span>
                    <span>{t("cuTextTt1")}</span>
                  </h2>
                  <ul className="about-list">
                    <li className="flex items-center">
                      <span className="mr-6"><Instagram /></span>
                      <span className="mr-6">
                        <strong>{t("cuTextSo3")}</strong>: <a href="https://instagram.com/ymcshop.com" className="about-link" target="_blank" rel="noopener noreferrer">@ymcshop.com</a>
                      </span>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-6"><Facebook /></span>
                      <span className="mr-6">
                        <strong>{t("cuTextSo2")}</strong>: {t("cuTextSo2")}
                      </span>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-6"><MessageCircleMore /></span>
                      <span className="mr-6">
                        <strong>{t("cuTextSo4")}</strong>: {t("cuTextSo4")}
                      </span>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-6"><Mail /></span>
                      <span className="mr-6">
                        <strong>{t("cuTextSo1")}</strong>: <a href="mailto:ymccorp2016@gmail.com" className="about-link">ymccorp2016@gmail.com</a>
                      </span>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-6"><Phone /></span>
                      <span className="mr-6">
                        <strong>{t("cuTextSo5")}</strong>: 0622680706
                      </span>
                    </li>
                  </ul>
                </div>

                {/* ฟอร์ม */}
                <div className="contact-form contact-form-box">
                  <span className="contact-subtitle text-center">
                    {t("cuTextSentMsg7")}
                    <br />
                    {t("cuTextSentMsg8")}
                    <MoveDown className="justify-self-center" />
                    {/* <br /> */}
                  </span>
                  <br />
                  <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                      <input
                        type="text"
                        name="name"
                        placeholder=""
                        value={formData.name || nameData?.fullName}
                        onChange={handleChange}
                        className="form-input"
                        required
                      />
                      <label>{t("cuTextSentMsg1")}</label>
                    </div>
                    <div className="input-group">
                      <input
                        type="email"
                        name="email"
                        placeholder=""
                        value={formData.email || user?.email}
                        onChange={handleChange}
                        className="form-input"
                        required
                      />
                      <label>{t("cuTextSo1")}</label>
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
                      <label>{t("cuTextSentMsg2")}</label>
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
                      <label>{t("cuTextSentMsg3")}</label>
                    </div>
                    <button className="bttn btn-mod mt-4" type="submit">{t("cuTextSentMsg4")} ✉</button>
                  </form>
                </div>
              </div>

              {/* ✅ แสดง Google Map */}
              <h2 className="about-subtitle flex items-center mt-10">
                <span className="mr-1"><MapPin /></span>
                <span>{t("auTextLo1")}</span>
              </h2>
              <ul className="about-list">
                <li className="flex items-center">
                  <span className="mr-6"><LocateFixed /></span>
                  {/* <p>{t("auTextLo2")} (จำหน่ายเฉพาะออนไลน์เท่านั้น)</p> */}
                  {t("auTextLo2")}
                </li>
              </ul>
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
