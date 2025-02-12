import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";

export default function CheckOut() {
  let { id } = useParams();
  const [loading, setLoading] = useState(false);

  let validationSchema = Yup.object().shape({
    details: Yup.string().required("Details is required"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^(002|\+20)?01[0125][0-9]{8}$/, "Ex:(01111111111)"),
    city: Yup.string().required("Ex:(cairo)"),
  });

  let headers = {
    token: localStorage.getItem("userToken"),
  };

  async function PayNow(shippingAddress) {
    try {
      setLoading(true);
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=https://fresh-cart-test-five.vercel.app/`,
        {
          shippingAddress,
        },
        { headers }
      );

      console.log(data);
      location.href = data.session.url;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema,
    onSubmit: PayNow,
  });

  return (
    <>
      <div className="md:w-1/2 mx-auto my-8 py-7 p-6 rounded-lg shadow-lg bg-gray-200 text-white">
        <h3 className="text-3xl font-semibold mb-6 text-yellow-600 text-center">Check Out</h3>

        <form className="mx-auto space-y-6" onSubmit={formik.handleSubmit}>
          <div className="relative">
            <input
              type="text"
              name="details"
              id="details"
              value={formik.values.details}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block py-3 px-4 w-full text-sm text-gray-900 bg-gray-100 border-2 border-green-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
              placeholder="Enter details"
            />
          </div>
          {formik.errors.details && formik.touched.details && (
            <div className="text-red-400 text-sm">{formik.errors.details}</div>
          )}

          <div className="relative">
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block py-3 px-4 w-full text-sm text-gray-900 bg-gray-100 border-2 border-green-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
              placeholder="Enter phone number"
            />
          </div>
          {formik.errors.phone && formik.touched.phone && (
            <div className="text-red-400 text-sm">{formik.errors.phone}</div>
          )}

          <div className="relative">
            <input
              type="text"
              name="city"
              id="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block py-3 px-4 w-full text-sm text-gray-800 bg-gray-100 border-2 border-green-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
              placeholder="Enter city"
            />
          </div>
          {formik.errors.city && formik.touched.city && (
            <div className="text-red-400 text-sm">{formik.errors.city}</div>
          )}

          <button
            type="submit"
            className="w-full text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-3 text-center transition duration-200"
          >
            {loading ? <i className="fas fa-spinner fa-spin"></i> : "Pay Now"}
          </button>
        </form>
      </div>
    </>
  );
}
