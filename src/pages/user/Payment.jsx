import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { payment } from "../../api/stripe";
import useEcomStore from "../../store/ecom-store";
import CheckoutForm from "../../components/CheckoutForm";
import LoaderDiv from "../../components/LoaderDiv";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const Payment = () => {
  const token = useEcomStore((s) => s.token);
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true); // เพิ่มตัวแปร Loading

  useEffect(() => {
    // setLoading(true); // เริ่มโหลด
    payment(token)
      .then((res) => {
        // console.log(res); 
        setClientSecret(res.data.clientSecret);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false); // โหลดเสร็จ
      });
  }, []);

  const appearance = {
    theme: "stripe",
  };
  // Enable the skeleton loader UI for optimal loading.
  const loader = "auto";

  return (
    <div>
      {loading ? (
        // ✅ แสดง Loading
        <div className="div-wrap loading-to-redirect">
          <div className="div-content div-content-radius-full div-content-box">
            <div className="loader">
              <LoaderDiv />
            </div>
          </div>
        </div>
      ) : (
        clientSecret && (
          <Elements options={{ clientSecret, appearance, loader }} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )
      )}
    </div>
  );
};

export default Payment;
