import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ShoppingCartIcon,
  HeartIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "text-blue-600" : "text-gray-600";
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-gray-800">
            ECommerce
          </Link>

          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className={`flex items-center space-x-1 ${isActive("/")}`}
            >
              <HomeIcon className="h-6 w-6" />
              <span>Products</span>
            </Link>

            <Link
              to="/cart"
              className={`flex items-center space-x-1 ${isActive("/cart")}`}
            >
              <ShoppingCartIcon className="h-6 w-6" />
              <span>Cart</span>
            </Link>

            <Link
              to="/favorites"
              className={`flex items-center space-x-1 ${isActive(
                "/favorites"
              )}`}
            >
              <HeartIcon className="h-6 w-6" />
              <span>Favorites</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
