// rafce
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import useEcomStore from "../../store/ecom-store";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next"; // ✅ เพิ่มตัวช่วยแปลภาษา
import LoaderDiv from "../../components/LoaderDiv"; // ✅ เพิ่ม Div Loading
import IconLogin from "../../components/icon/IconLogin";
import { Helmet } from "react-helmet-async";

const Login = () => {
  // Javascript
  const navigate = useNavigate();
  const actionLogin = useEcomStore((state) => state.actionLogin);
  // const user = useEcomStore((state) => state.user);
  // console.log("user form zustand", user);

  const { t } = useTranslation(); // ✅ ใช้ตัวช่วยแปลภาษา
  const [loading, setLoading] = useState(false);  // ✅ เพิ่มตัวแปร loading

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    setLoading(true); // เริ่มโหลด
    e.preventDefault();
    try {
      const res = await actionLogin(form);
      const role = res.data.payload.role;
      roleRedirect(role);
      toast.success(`${t("liWelcomeBack")}`, {
        bodyClassName: "toastify-toast-modify",
        // icon: <img src="/img/icon/ic-cart.png"/>,
        // icon: false,
      });
    } catch (err) {
      console.log(err);
      // const errMsg = err.response?.data?.message;
      // toast.error(errMsg);
      const erRr = err.response?.data?.errrr;
      let chgLngMsg = erRr === "1" ? t("liErrMsg")
        : erRr === "2" ? t("liPasswordInvalid")
          : t("liServerError");
      toast.error(`${chgLngMsg}`, {
        bodyClassName: "toastify-toast-modify",
      });
    } finally {
      setLoading(false); // โหลดเสร็จ
    }
  };

  const roleRedirect = (role) => {
    if (role === "admin") {
      navigate("/admin/");
    } else {
      navigate(-1);
    }
  };

  return (

    <div className="div-wrap login">
      <Helmet>
        <title>{t("mLogin")} | {t("shopName")}</title>
      </Helmet>
      <div className="div-head">
        <span className="setdiv-3">
          <IconLogin className="icon-register" />
          {t("mLogin")}
        </span>
      </div>
      <div className="div-content">
        <div className="div-content-box">

          <div className="login-form">
            <div className="setdiv-3">

              {/* ✅ เริ่ม แสดง Loader */}
              {loading && (<div className="loader-on-top"><LoaderDiv /></div>)}
              {/* ✅ จบ แสดง Loader */}

              <form onSubmit={handleSubmit}>
                <div className="title-text-form">{t("liSignin")}</div>
                <div className="login-form-input">
                  <div>
                    <input
                      autoComplete="off"
                      placeholder={t("liEmail")}
                      className="form-input login-input"
                      onChange={handleOnChange}
                      name="email"
                      type="email"
                    />
                  </div>
                  <div>
                    <input
                      autoComplete="new-password"
                      placeholder={t("liPassword")}
                      className="form-input login-input"
                      onChange={handleOnChange}
                      name="password"
                      type="password"
                    />
                  </div>

                  <div>
                    <button className="bttn btn-mod">
                      {t("mLogin")}
                    </button>
                  </div>
                  <div className="check-box-mod text-form-go-to">
                    <Link to="/register">{t("liGoRegister")}</Link>
                  </div>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>

  );
};

export default Login;
