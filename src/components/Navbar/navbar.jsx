import React, { useContext, useState } from "react";
import logo from "../../assets/images/freshcart-logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { NameContext } from "../context/NameContext";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

export default function Navbar() {
  const { cartCount, setTokenStatus, tokenStatus } = useContext(CartContext);
  const { wishlistCount } = useContext(WishlistContext);
  const { userData, setUserData } = useContext(NameContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="py-3 z-50 bg-gray-200 shadow-md text-gray-700 fixed top-0 w-full transition-all ease-in-out duration-300">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-8">
       
        <div className="flex items-center space-x-3">
          <img src={logo} className="w-36" alt="FreshCart Logo" />
        </div>

        <div
          className="md:hidden cursor-pointer text-2xl"
          onClick={() => setOpen(!open)}
          aria-label="Toggle Navigation Menu"
        >
          <i className={`fa-solid fa-bars ${open ? 'text-gray-800' : 'text-gray-600'}`}></i>
        </div>

      
        <div
          className={`${
            open ? "flex" : "hidden"
          } md:flex flex-col md:flex-row items-center w-full md:w-auto space-y-4 md:space-y-0 md:space-x-6 mt-4 md:mt-0 transition-all ease-in-out duration-300 absolute md:relative bg-gray-200 md:bg-transparent top-16 left-0 md:left-auto md:top-auto p-4 md:p-0`}
        >
          {userData && (
            <ul className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-6">
              <li><NavLink className="hover:text-mainColor transition-all duration-200" to="/">Home</NavLink></li>
              <li><NavLink className="hover:text-mainColor transition-all duration-200" to="/products">Products</NavLink></li>
              <li><NavLink className="hover:text-mainColor transition-all duration-200" to="/categories">Categories</NavLink></li>
              <li><NavLink className="hover:text-mainColor transition-all duration-200" to="/brands">Brands</NavLink></li>
              <li><NavLink className="hover:text-mainColor transition-all duration-200" to="/allorders">AllOrders</NavLink></li>
            </ul>
          )}

          <ul className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-4">
            {userData && (
              <>
              
                <li className="relative">
                  <NavLink to="/cart">
                    <i className="fa-solid fa-cart-shopping text-xl text-mainColor hover:text-green-600 transition-all duration-200"></i>
                    {tokenStatus && cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">{cartCount}</span>
                    )}
                  </NavLink>
                </li>

                <li className="relative">
                  <NavLink to="/wishlist">
                    <i className="fa-solid fa-heart text-xl text-red-500 hover:text-red-700 transition-all duration-200"></i>
                    {tokenStatus && wishlistCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">{wishlistCount}</span>
                    )}
                  </NavLink>
                </li>
              </>
            )}

            {userData ? (
              <li>
                <span
                  className="cursor-pointer text-red-600 hover:text-red-800 transition-all duration-200"
                  onClick={() => {
                    setOpen(false);
                    localStorage.removeItem("userToken");
                    setUserData(null);
                    navigate("/login");
                    setTokenStatus(false);
                  }}
                >
                  Logout
                </span>
              </li>
            ) : (
              <>
                <li><NavLink className="hover:text-mainColor transition-all duration-200" to="/login">Login</NavLink></li>
                <li><NavLink className="hover:text-mainColor transition-all duration-200" to="/register">Register</NavLink></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
