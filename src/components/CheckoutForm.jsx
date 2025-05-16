import React, { useState } from "react";
import { PaymentElement, useStripe, useElements, } from "@stripe/react-stripe-js";
import "../stripe.css";
import { saveOrder } from "../api/user";
import useEcomStore from "../store/ecom-store";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // ✅ เพิ่มตัวช่วยแปลภาษา
import LoaderDiv from "./LoaderDiv";
import { createAlert, createNofity } from "../utils/createAlert";

export default function CheckoutForm() {
  const token = useEcomStore((state) => state.token);
  const clearCart = useEcomStore((state) => state.clearCart);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation(); // ✅ ใช้ตัวช่วยแปลภาษา
  const [loading, setLoading] = useState(false); // เพิ่มตัวแปร Loading

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    setLoading(true); // เริ่มโหลด
    const payload = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });
    // console.log("payload", payload);
    if (payload.error) {
      setMessage(payload.error.message);
      console.log("error");
      createAlert("error",
        `${payload.error.message}`,
        `${t("ttClose")}`);
    } else if (payload.paymentIntent.status === "succeeded") {
      // console.log("Ready or Saveorder");
      setLoading(true); // เริ่มโหลด
      // Create Order
      saveOrder(token, payload)
        .then((res) => {
          // console.log(res);
          clearCart()
          createNofity("success",
            `<p>${t("pmPaymentSuccess")}</p>`,
            `${t("pmPaymentThkMsg")}`,
            `${t("ttClose")}`)
          navigate("/user/history");
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false); // โหลดเสร็จ
        });
    } else {
      console.log("Something wrong!!!");
      // toast.warning("ชำระเงินไม่สำเร็จ");
      createAlert("warning",
        `${t("pmPaymentFailed")}`,
        `${t("ttClose")}`);
    }
    setIsLoading(false);
    setLoading(false); // โหลดเสร็จ
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <>
      <div className="div-wrap">
        <div className="div-head">{t("pmPayment")}</div>
        <div className="div-content">
          <div className="div-content-box">

            {/* ✅ เริ่ม แสดง Loader */}
            {loading && (<div className="loader-on-top"><LoaderDiv /></div>)}
            {/* ✅ จบ แสดง Loader */}
            <form className="space-y-6" id="payment-form" onSubmit={handleSubmit}>
              <PaymentElement id="payment-element" options={paymentElementOptions} />
              <button
                className="stripe-button"
                disabled={isLoading || !stripe || !elements}
                id="submit"
              >
                <span id="button-text">
                  {isLoading ? (
                    <div className="spinner" id="spinner"></div>
                  ) : (
                    t("pmPayNow")
                  )}
                </span>
              </button>
              {/* Show any error or success messages */}
              {message && <div id="payment-message">{message}</div>}
            </form>

          </div>
        </div>

      </div>
    </>
  );
}
