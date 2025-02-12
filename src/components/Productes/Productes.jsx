import React from "react";
import AllProducts from "../AllProducts/AllProducts";

export default function Productes() {
  return (
    <>
     <h2 className="text-5xl font-extrabold text-center text-yellow-600 mb-8 text-shadow-lg">
  All products
</h2>
      <div className="py-4">
        <AllProducts />
      </div>
    </>
  );
}
