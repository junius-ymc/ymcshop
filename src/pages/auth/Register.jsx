// rafce
import React, { useState, useEffect } from "react";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import zxcvbn from "zxcvbn";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next"; // ✅ เพิ่มตัวช่วยแปลภาษา
import LoaderDiv from "../../components/LoaderDiv";
import IconRegister from "../../components/icon/IconRegister";
import { Helmet } from "react-helmet-async";
import { createAlert } from "../../utils/createAlert";

const Register = () => {
  // Javascript
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const { t } = useTranslation(); // ✅ ใช้ตัวช่วยแปลภาษา
  const registerSchema = z

    .object({
      email: z.string().email({ message: t("rgtInvalEmail") }),
      password: z.string().min(6, { message: t("rgtPassChk") }),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("rgtPassCon"),
      path: ["confirmPassword"],
    });

  const [passwordScore, setPasswordScore] = useState(0);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);  // ✅ เพิ่มตัวแปร loading

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const validatePassword = () => {
    let password = watch().password;
    return zxcvbn(password ? password : "").score;
  };
  useEffect(() => {
    setPasswordScore(validatePassword());
  }, [watch().password]);

  const onSubmit = async (data) => {
    setLoading(true); // เริ่มโหลด
    try {
      const res = await axios.post(`${BASE_URL}/api/register`, data);
      //console.log(res.data);
      createAlert("success",
        `${t("rgtRegisterSuccess")}`,
        `${t("ttClose")}`);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      //console.log(err);
      const msgNotif = err.response?.data?.msgnotif;
      let chgLngMsg = msgNotif === "1" ? t("rgtEmailCheck")
        : msgNotif === "2" ? t("rgtServerError")
          : t("rgtServerError");
      createAlert("error",
        `${chgLngMsg}`,
        `${t("ttClose")}`);
    } finally {
      setLoading(false); // โหลดเสร็จ
    }
  };

  //console.log(passwordScore);
  return (

    <div className="div-wrap regist">
      <Helmet>
        <title>{t("mRegister")} | {t("shopName")}</title>
      </Helmet>
      <div className="div-head">
        <span className="setdiv-3">
          <IconRegister className="icon-register" />
          {t("mRegister")}
        </span>
      </div>
      <div className="div-content">
        <div className="div-content-box">
          <div className="regist-form">
            <div className="setdiv-3">

              {/* ✅ เริ่ม แสดง Loader */}
              {loading && (<div className="loader-on-top"><LoaderDiv /></div>)}
              {/* ✅ จบ แสดง Loader */}

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="regist-div-with-space">
                  <div className="title-text-form">{t("rgtSignUp")}</div>
                  <div>
                    <input
                      autoComplete="off"
                      {...register("email")}
                      placeholder={t("rgtEmail")}
                      type="email"
                      className={`form-input regist-input
                  ${errors.email && "error-message"}
                  `}
                    />
                    {errors.email && (
                      <p className="error-message-text">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <input
                      autoComplete="off"
                      {...register("password")}
                      placeholder={t("rgtPassword")}
                      type="text"
                      className={`form-input regist-input
                  ${errors.password && "error-message"}
                  `}
                    />
                    {errors.password && (
                      <p className="error-message-text">{errors.password.message}</p>
                    )}
                    {watch().password?.length > 0 && (
                      <div className="div-pass-score">
                        {Array.from(Array(5).keys()).map((item, index) => (
                          <span className="pass-score" key={index}>
                            <div
                              className={`pass-score-block ${passwordScore <= 1
                                ? "passscore-bg-red"
                                : passwordScore < 3
                                  ? "passscore-bg-ora"
                                  : "passscore-bg-gre"
                                }
                                `}
                            ></div>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <input
                      autoComplete="new-password"
                      {...register("confirmPassword")}
                      placeholder={t("rgtConPass")}
                      type="password"
                      className={`form-input regist-input
                  ${errors.confirmPassword && "error-message"}
                  `}
                    />
                    {errors.confirmPassword && (
                      <p className="error-message-text">{errors.confirmPassword.message}</p>
                    )}
                  </div>

                  <div>
                    <button className="bttn btn-mod">
                      {t("rgtRegister")}
                    </button>
                  </div>
                  <div className="check-box-mod text-form-go-to">
                    <Link to="/login" className="">{t("rgtGoLogin")}</Link>
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

export default Register;
