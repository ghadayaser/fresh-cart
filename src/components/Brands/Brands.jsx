import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { XCircleIcon } from "@heroicons/react/24/outline";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [brand, setBrand] = useState(null);
  const [open, setOpen] = useState(false);
  const [brandLoading, setBrandLoading] = useState(false);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
        setBrands(data.data);
      } catch (error) {
        console.error("Error fetching brands:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBrands();
  }, []);

  const handleBrandClick = async (brandId) => {
    try {
      setBrandLoading(true);
      setOpen(true);
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${brandId}`);
      setBrand(data.data);
    } catch (error) {
      console.error("Error fetching brand details:", error);
    } finally {
      setBrandLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-10 bg-gray-200 text-white">
      <h2 className="text-5xl font-extrabold text-center text-yellow-500 mb-10 drop-shadow-lg">
        Our Featured Brands
      </h2>
      {loading ? (
        <Loading />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {brands.map((brand) => (
            <div
              key={brand._id}
              className="bg-gray-900 border border-gray-700 rounded-xl shadow-lg cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:bg-gray-800"
              onClick={() => handleBrandClick(brand._id)}
            >
              <img
                loading="lazy"
                className="rounded-t-xl w-full h-48 object-cover transition-all duration-500 hover:opacity-90"
                src={brand.image}
                alt={brand.name}
              />
              <div className="p-5 text-center">
                <h5 className="text-2xl font-semibold text-gray-300 transition-all duration-300 hover:text-green-500">
                  {brand.name}
                </h5>
              </div>
            </div>
          ))}
        </div>
      )}

      {brand && (
        <Modal open={open} onClose={() => setOpen(false)} center animationDuration={400} closeIcon={<XCircleIcon className='w-8 h-8 text-gray-700 hover:text-red-500 transition-all duration-300' />}>          
          {brandLoading ? (
            <Loading />
          ) : (
            <div className="flex flex-col items-center space-y-6 p-6 transition-all duration-500 ease-in-out transform scale-95 hover:scale-100 dark:bg-gray-900 dark:text-white">
              <h2 className="text-3xl font-bold text-yellow-400">{brand.name}</h2>
              <p className="text-lg text-gray-300">{brand.slug}</p>
              <img src={brand.image} className="w-64 rounded-lg shadow-lg transition-all duration-500 hover:shadow-2xl" alt={brand.name} />
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}
