import { useContext, useEffect } from "react";
import AllProducts from "../AllProducts/AllProducts";
import MainSlider from "../MainSlider/MainSlider";
import PopularCategories from "../PopularCategories/PopularCategories";
import { CartContext } from "../context/CartContext";

export default function Home() {
  let { setTokenStatus  } = useContext(CartContext);

  useEffect(() => {
    setTokenStatus(true);
  }, []);

  return (
    <>
      <div className="my-4"><MainSlider /></div>
      <div className="my-8">
        <PopularCategories />
      </div>
      <div className="my-3">
        <AllProducts />
      </div>
    </>
  );
}
