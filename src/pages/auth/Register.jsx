// rafce
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import zxcvbn from "zxcvbn";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";

import { useTranslation } from "react-i18next"; // ✅ เพิ่มตัวช่วยแปลภาษา

const registerSchema = z

  .object({
    email: z.string().email({ message: "Invalid Email !!!" }),
    password: z.string().min(6, { message: "Password must be more than 6 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const Register = () => {
  // Javascript
  const [passwordScore, setPasswordScore] = useState(0);

  const navigate = useNavigate();

  const { t } = useTranslation(); // ✅ ใช้ตัวช่วยแปลภาษา

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
    // const passwordScore = zxcvbn(data.password).score;
    // console.log(passwordScore);
    // if (passwordScore < 3) {
    //   toast.warning("Password บ่ Strong!!!!!");
    //   return;
    // }
    // console.log("ok ลูกพี่");
    // Send to Back
    try {
      // const res = await axios.post("http://localhost:5001/api/register", data);
      const res = await axios.post("https://ymc-shop-api.vercel.app/api/register", data);
      //console.log(res.data);
      // toast.success(res.data);
      toast.success(`${t("rgtRegisterSuccess")}`, {
        bodyClassName: "toastify-toast-modify",
      });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      // const errMsg = err.response?.data?.message;
      // toast.error(errMsg);
      //console.log(err);
      const msgNotif = err.response?.data?.msgnotif;
      let chgLngMsg = "";
      if (msgNotif === '1') {
        chgLngMsg = t("rgtEmailCheck");
      } else if (msgNotif === '2') {
        chgLngMsg = t("rgtServerError");
      }
      toast.error(`${chgLngMsg}`, {
        bodyClassName: "toastify-toast-modify",
      });
    }
  };

  // const tam = Array.from(Array(5))
  // console.log(tam)
  //console.log(passwordScore);
  return (

    <div className="div-wrap regist">
      <div className="div-head">{t("mRegister")}</div>
      <div className="div-content">

        <div className="div-content-box">

          <div className="regist-form">

            <div className="setdiv-3">

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="regist-div-with-space">
                  <div className="login-form-sign-in">{t("rgtSignUp")}</div>
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
                      autoComplete="new-password"
                      {...register("password")}
                      placeholder={t("rgtPassword")}
                      type="password"
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
                    <button className="bnt-mod regist-bttn">
                      {t("rgtRegister")}
                    </button>
                  </div>
                  <div className="check-box-mod regist-form-go-login">
                    <Link to="/login/" className="">{t("rgtGoLogin")}</Link>
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
