import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/navbar";

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="container md:pt-12 mt-5 ">
        <Outlet></Outlet>
      </div>
      <Footer />
    </>
  );
}
