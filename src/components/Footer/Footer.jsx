import React from "react";
import payPal from "../../assets/images/PayPal.svg.png";
import amazonPay from "../../assets/images/Amazon_Pay_logo.svg.png";
import americanExpress from "../../assets/images/American-Express-Color.png";
import masterCard from "../../assets/images/MasterCard_Logo.svg.png";
import apple from "../../assets/images/apple.webp";
import googlePlay from "../../assets/images/en_badge_web_generic.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";

export default function Footer() {
  function sendData() {
    emailjs
      .send(
        "service_sm4r3rc",
        "template_7vx0ycr",
        { user_mail: formik.values.user_mail },
        {
          publicKey: "bd__HK1SGi_wtWEev",
        }
      )
      .then(
        () => {
          toast.success("Thanks for contacting us!");
        },
        (error) => {
          toast.error(error);
        }
      );
    setTimeout(() => {
      formik.handleReset();
    }, 1000);
  }

  let validationSchema = Yup.object().shape({
    user_mail: Yup.string().required().email(),
  });

  let formik = useFormik({
    initialValues: {
      user_mail: "",
    },
    onSubmit: sendData,
    validationSchema,
  });

  return (
    <div className="footer bg-gray-800 py-10 mt-8 text-white">
      <div className="container">
        <h2 className="text-4xl font-bold mb-6 text-center text-yellow-400">
          Get The Freshcart App
        </h2>
        <p className="text-center text-lg mb-8 text-gray-300">
          We will send you a link, open it on your phone to download the app.
        </p>

        <form
          onSubmit={formik.handleSubmit}
          className="input flex items-center justify-between flex-wrap md:flex-nowrap gap-4 px-6 mb-8 bg-gray-700 p-4 rounded-lg shadow-lg"
        >
          <input
            type="email"
            className="w-full md:w-[70%] p-3 rounded-lg text-black placeholder-gray-400"
            name="user_mail"
            placeholder="Enter your email..."
            value={formik.values.user_mail}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <button
            type="submit"
            className="w-full md:w-[25%] bg-green-500 hover:bg-green-600 transition-colors duration-300 text-white py-3 rounded-lg text-sm mt-4 md:mt-0"
          >
            Share App Link
          </button>
        </form>

        <div className="flex my-4 items-center justify-between flex-wrap border-gray-600 border-t pt-6">
          <div className="flex items-center justify-center w-full xl:w-auto gap-6 flex-wrap">
            <h3 className="text-2xl font-semibold capitalize mb-4 text-center text-gray-300">
              Payment Partners
            </h3>
            <div className="flex gap-6 justify-center items-center">
              <img src={amazonPay} className="w-20 hover:scale-110 transition-transform" alt="Amazon Pay" />
              <img src={americanExpress} className="w-20 hover:scale-110 transition-transform" alt="American Express" />
              <img src={masterCard} className="w-20 hover:scale-110 transition-transform" alt="MasterCard" />
              <img src={payPal} className="w-20 hover:scale-110 transition-transform" alt="PayPal" />
            </div>
          </div>

          <div className="flex items-center justify-center w-full xl:w-auto gap-6 flex-wrap">
            <h3 className="text-2xl font-semibold capitalize mb-4 text-center text-gray-300">
              Get Deliveries with FreshCart
            </h3>
            <div className="flex gap-6 justify-center items-center">
              <img src={apple} className="w-24 hover:scale-110 transition-transform" alt="Apple App Store" />
              <img src={googlePlay} className="w-24 hover:scale-110 transition-transform" alt="Google Play Store" />
            </div>
          </div>
        </div>

        <div className="flex space-x-6 text-gray-400 mt-8 justify-center">
          <a target="_blank" href="#" className="text-gray-400 hover:text-blue-500 transition-colors duration-300">
            <i className="fab fa-facebook-f text-xl"></i>
          </a>
          <a target="_blank" href="#" className="text-gray-400 hover:text-blue-600 transition-colors duration-300">
            <i className="fab fa-linkedin-in text-xl"></i>
          </a>
          <a target="_blank" href="#" className="text-gray-400 hover:text-red-500 transition-colors duration-300">
            <i className="fab fa-youtube text-xl"></i>
          </a>
          <a target="_blank" href="#" className="text-gray-400 hover:text-pink-500 transition-colors duration-300">
            <i className="fab fa-instagram text-xl"></i>
          </a>
        </div>
      </div>
    </div>
  );
}
