import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../Loading/Loading";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [subCategories, setSubCategories] = useState(null);
  const [category, setCategory] = useState(null);
  const [subLoading, setSubLoading] = useState(false);

  async function getCategories() {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/categories"
      );
      setCategories(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function getSubCategories(categoryId) {
    try {
      setSubLoading(true);
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`
      );
      setSubCategories(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setSubLoading(false);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <h2 className="text-5xl font-extrabold text-center text-yellow-600 mb-8 text-shadow-lg">
        All Categories
      </h2>
      {loading ? (
        <Loading />
      ) : categories ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              onClick={() => {
                getSubCategories(category._id);
                setCategory(category.name);
              }}
              key={category._id}
              className="w-full bg-gray-200 border border-gray-700 rounded-lg shadow-lg cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl  hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700"
            >
              <div>
                <img
                  loading="lazy"
                  className="rounded-t-lg w-full h-[400px] object-cover transition-all duration-500 hover:opacity-90"
                  src={category.image}
                  alt="category image"
                />
              </div>
              <div className="p-5">
                <h5 className="text-xl font-semibold tracking-tight text-green-600 dark:text-white text-center">
                  {category.name}
                </h5>
              </div>
            </div>
          ))}
        </div>
      ) : (
        ""
      )}

      {subCategories ? (
        <h2 className="text-3xl py-4 my-8 text-center text-green-600 border-t">
          {category}
        </h2>
      ) : (
        ""
      )}

      {subLoading ? (
        <Loading />
      ) : subCategories ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {subCategories.map((subcategory) => (
            <p
              key={subcategory._id}
              className="flex justify-center items-center shadow p-4 rounded-lg text-lg hover:shadow-2xl hover:scale-[1.01] duration-500 dark:bg-gray-700 dark:text-white"
            >
              {subcategory.name}
            </p>
          ))}
        </div>
      ) : (
        ""
      )}
    </>
  );
}
