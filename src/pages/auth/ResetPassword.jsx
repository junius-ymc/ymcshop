import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import IconLogin from "../../components/icon/IconLogin";
import { useTranslation } from "react-i18next";
import LoaderDiv from "../../components/LoaderDiv";
import { resetPwd } from "../../api/auth";
import { createAlert } from "../../utils/createAlert";

function ResetPassword() {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (password.length < 6) {
      createAlert("warning",
        `${t("rgtPassChk")}`,
        `${t("ttClose")}`);
        // console.log(password.length);
        return setLoading(false);
    }

    try {
      const res = await resetPwd({ token, password });
      console.log(res.data.message);
      setMessage(res.data.message);
      createAlert("success",
        `${t("liResetPwdSuccess")}`,
        `${t("ttClose")}`,
        `4000`);
      navigate("/login");
    } catch (err) {
      // console.log(err);
      console.log(err.response.data.message);
      setMessage(err.response.data.message);
      createAlert("error",
        `${t("liResetPwdErr")}`,
        `${t("ttClose")}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="div-wrap">
      <div className="div-head">
        <span className="setdiv-3">
          <IconLogin className="icon-register" />
          {t("liResetPwd")}
        </span>
      </div>
      <div className="div-content">
        <div className="div-content-box flex items-center justify-center">
          {loading && (<div className="loader-on-top"><LoaderDiv /></div>)}
          <form onSubmit={handleSubmit} className="justify-items-center mb-2">
            <div className="text-center mb-8">{t("liResetPwdTitle")}</div>
            <div className="input-group">
              <input
                autoComplete="off"
                // autoComplete="new-password"
                value={password}
                placeholder=""
                className="form-input"
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                required
                type="text"
              />
              <label>{t("liResetNewPwd")}</label>
              {message && <p className="text-xs text-center">{message}</p>}
            </div>
            <button className="bttn btn-mod" type="submit">
              {t("liResetPwd")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;