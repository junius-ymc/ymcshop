// rafce
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import useEcomStore from "../../store/ecom-store";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  // Javascript
  const navigate = useNavigate();
  const actionLogin = useEcomStore((state) => state.actionLogin);
  // const user = useEcomStore((state) => state.user);
  // console.log("user form zustand", user);

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
    e.preventDefault();
    try {
      const res = await actionLogin(form);
      const role = res.data.payload.role;
      roleRedirect(role);
      toast.success(`${chgLng.liWelcomeBack}`, {
        bodyClassName: "toastify-toast-modify",
        // icon: <img src="/src/img/icon/ic-cart.png"/>,
        // icon: false,
      });
    } catch (err) {
      console.log(err);
      // const errMsg = err.response?.data?.message;
      // toast.error(errMsg);
      const erRr = err.response?.data?.errrr;
      let chgLngMsg = erRr === "1" ? chgLng.liErrMsg
        : erRr === "2" ? chgLng.liPasswordInvalid
          : chgLng.liServerError;
      toast.error(`${chgLngMsg}`, {
        bodyClassName: "toastify-toast-modify",
      });
    }

  };

  const roleRedirect = (role) => {
    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate(-1);
    }
  };

  return (

    <div className="div-wrap login">
      <div className="div-head">{chgLng.mLogin}</div>
      <div className="div-content">
        <div className="div-content-box">

          <div className="login-form">
            <div className="setdiv-3">

              <form onSubmit={handleSubmit}>
                <div className="login-form-sign-in">{chgLng.liSignin}</div>
                <div className="login-form-input">
                  <div>
                    <input
                      autoComplete="off"
                      placeholder={chgLng.liEmail}
                      className="form-input login-input"
                      onChange={handleOnChange}
                      name="email"
                      type="email"
                    />
                  </div>
                  <div>
                    <input
                      autoComplete="new-password"
                      placeholder={chgLng.liPassword}
                      className="form-input login-input"
                      onChange={handleOnChange}
                      name="password"
                      type="password"
                    />
                  </div>
                
                  <div>
                    <button className="bnt-mod login-bttn">
                      {chgLng.mLogin}
                    </button>
                  </div>
                  <div className="check-box-mod login-form-go-register">
                     <Link to="/register/" className="">{chgLng.liGoRegister}</Link>
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
