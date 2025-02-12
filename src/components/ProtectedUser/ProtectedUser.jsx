import React from "react";
import Home from "../Home/Home";
import { Navigate } from "react-router-dom";

export default function ProtectedUser({children}) {

  if (localStorage.getItem("userToken")) {
    return <Navigate to={"/"}/>;
  } else {
    return children;
  }
}
