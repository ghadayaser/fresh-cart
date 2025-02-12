import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

export default function AllProducts() {
  let { addProductToCart, loading } = useContext(CartContext);
  const { addToWishlist, wishlistCheck, removeFromWishlist } =
    useContext(WishlistContext);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState([]);
  const [load, setLoad] = useState(false);

  async function getProducts() {
    try {
      setLoad(true);
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/products"
      );
      setProducts(data.data);
      setSearch(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoad(false);
    }
  }

  function searchProducts(value) {
    if (value) {
      setSearch(
        products.filter((product) =>
          product.title.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setSearch(products);
    }
  }

  useEffect(() => {
    getProducts();
  }, [wishlistCheck]);

  return (
    <>
      {!load ? (
        <>
          <form className="mx-auto md:w-1/2 mb-4">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                onChange={(e) => searchProducts(e.target.value)}
                type="search"
                id="search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-green-800 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                placeholder="Search products"
              />
            </div>
          </form>

          <div className="products">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {search.map((product) => (
                <div
                  key={product.id}
                  className="product relative duration-500 cursor-pointer flex flex-col justify-between bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <i
                    onClick={() => {
                      wishlistCheck.some((i) => i === product.id)
                        ? removeFromWishlist(product.id)
                        : addToWishlist(product.id);
                    }}
                    className={`fa-solid fa-heart ${
                      wishlistCheck.some((i) => i == product.id)
                        ? "text-red-500"
                        : "hover:text-red-500"
                    } absolute top-2 right-2 duration-300 text-2xl`}
                  ></i>
                  <Link to={`details/${product.id}`}>
                    <div>
                      <img
                        loading="lazy"
                        src={product.imageCover}
                        className="w-full block rounded-t-lg object-cover transition-all duration-500 hover:opacity-90"
                        alt={product.title}
                      />
                    </div>
                    <div className="p-2">
                      <h2 className="text-green-600 dark:text-white">
                        {product.category.name}
                      </h2>
                      <p className="text-sm text-gray-500 dark:text-gray-300">
                        {product.description.split(" ").slice(0, 3).join(" ")}
                      </p>
                      <div className="rating flex justify-between items-center my-2">
                        <span className="text-green-600">{product.price} EGP</span>
                        <span>
                          <i className="fa-solid fa-star text-yellow-400"></i>
                          {product.ratingsAverage}
                        </span>
                      </div>
                    </div>
                  </Link>
                  <div className="p-2 pt-0">
                    {loading ? (
                      <button
                        type="button"
                        className="bg-green-500 w-full p-2 rounded text-white btn"
                      >
                        <i className="fas fa-spinner fa-spin-pulse"></i>
                      </button>
                    ) : (
                      <button
                        onClick={() => addProductToCart(product.id)}
                        className="bg-green-500 w-full p-2 rounded text-white btn hover:bg-green-600 duration-300"
                      >
                        Add to cart
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
