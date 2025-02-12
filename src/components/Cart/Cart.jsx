import React, { useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import Loading from "../Loading/Loading";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  let {
    cart,
    getCartItems,
    loading,
    updateProductCount,
    removeProduct,
    totalPrise,
    cartId,
  } = useContext(CartContext);
  let navigate = useNavigate();

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : cart ? (
        <div className="relative overflow-x-auto shadow-xl sm:rounded-lg max-w-6xl mx-auto p-6 bg-white border-2 border-gray-200 rounded-lg">
          {cart.length > 0 ? (
            <>
              <table className="w-full text-sm text-left rtl:text-right text-gray-700 dark:text-gray-300">
                <thead className="text-xs text-gray-500 uppercase bg-gray-100 dark:bg-gray-900 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-8 py-3">Image</th>
                    <th scope="col" className="px-6 py-3">Product</th>
                    <th scope="col" className="px-6 py-3">Qty</th>
                    <th scope="col" className="px-6 py-3">Price</th>
                    <th scope="col" className="px-6 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((product) => (
                    <tr key={product._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out">
                      <td className="p-4">
                        <img
                          src={product.product.imageCover}
                          className="w-16 md:w-24 max-w-full max-h-full rounded-lg shadow-md"
                          alt={product.product.title}
                        />
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-800 dark:text-white">
                        {product.product.title}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => updateProductCount(product.product.id, product.count - 1)}
                            className="text-xl text-gray-600 dark:text-gray-400 hover:text-green-600 transition duration-300 transform hover:scale-125"
                          >
                            <svg className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 2">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                            </svg>
                          </button>
                          <span className="text-gray-800 dark:text-white font-medium text-lg">{product.count}</span>
                          <button
                            onClick={() => updateProductCount(product.product.id, product.count + 1)}
                            className="text-xl text-gray-600 dark:text-gray-400 hover:text-green-600 transition duration-300 transform hover:scale-125"
                          >
                            <svg className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-800 dark:text-white">
                        {product.price} EGP
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => removeProduct(product.product.id)}
                          className="font-bold text-red-600 dark:text-red-500 hover:text-red-500 transition duration-300 ease-in-out"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                  {/* Total Price Row */}
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <td colSpan={4} className="py-4 text-lg text-center text-gray-800 dark:text-white font-semibold">
                      Total Price
                    </td>
                    <td className="py-4 text-xl text-center text-green-500 font-semibold">
                      {totalPrise} EGP
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="mt-6">
                <button
                  onClick={() => navigate(`/checkout/${cartId}`)}
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-400 to-green-600 hover:from-green-600 hover:to-green-800 focus:ring-4 focus:ring-green-300 text-white font-semibold rounded-lg text-lg px-8 py-3 duration-300 ease-in-out shadow-md hover:shadow-lg transition-all"
                >
                  Proceed to Checkout
                </button>
              </div>
            </>
          ) : (
            <h3 className="text-3xl text-center my-36 text-yellow-700">Your Cart Is Empty</h3>
          )}
        </div>
      ) : (
        <h3 className="text-5xl text-center my-36 text-yellow-500">Your Cart Is Empty</h3>
      )}
    </>
  );
}
