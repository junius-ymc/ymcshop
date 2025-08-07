import { useState } from "react";
import { forgotPwd } from "../../api/auth";
import LoaderDiv from "../../components/LoaderDiv";
import { useTranslation } from "react-i18next";
import { createNofity } from "../../utils/createAlert";
import { useNavigate } from "react-router-dom";
import IconRegister from "../../components/icon/IconRegister";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await forgotPwd({ email });
      console.log(res.data.message);
      setMessage(res.data.message);
      createNofity("success",
        `${email}`,
        `${t("liForgotPwdSent")}`,
        `${t("ttClose")}`,
        `20000`);
        navigate("/login");
    } catch (err) {
      // console.log(err);
      console.log(err.response.data.message);
      setMessage(err.response.data.message);
      createNofity("error",
        `${email}`,
        `${t("liForgotPwdUnF")}`,
        `${t("ttClose")}`);
    } finally {
      setLoading(false);
    }
  };

  // console.log("test", email);

  return (
    <div className="div-wrap">
      <div className="div-head">
        <span className="setdiv-3">
          <IconRegister className="icon-register" />
          {t("liForgotPwd")}
        </span>
      </div>
      <div className="div-content">
        <div className="div-content-box flex items-center justify-center">
          {loading && (<div className="loader-on-top"><LoaderDiv /></div>)}
          <form onSubmit={handleSubmit} className="justify-items-center mb-2">
            <div className="text-center mb-8">{t("liForgotPwdTitle")}</div>
            <div className="input-group">
              <input
                autoComplete="new-email"
                value={email}
                placeholder=""
                className="form-input"
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                type="email"
                required
              />
              <label>{t("liEmail")}</label>
              {message && <p className="text-xs text-center">{message}</p>}
            </div>
            <button className="bttn btn-mod" type="submit">
              {t("liForgotPwdBtn")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default ForgotPassword;