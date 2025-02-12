import React from "react";
import Login from "../Login/Login";
import { Navigate } from "react-router-dom";

export default function ProtectedComponent({ children }) {
  if (localStorage.getItem("userToken")) {
    return children;
  } else {
    return <Navigate to={"/login"}/>;
  }
}
