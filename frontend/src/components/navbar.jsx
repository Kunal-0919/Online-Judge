import React from "react";
import { Link, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const Navbar = ({ backgroundcolor }) => {
  const location = useLocation();

  // Retrieve authentication status from the cookie
  const isAuthenticated = !!Cookies.get("authToken");

  const bgColorClass = backgroundcolor === true ? "bg-black" : "bg-white";
  const textColorClass =
    backgroundcolor === true ? "text-zinc-300" : "text-gray-700";
  const hoverTextColorClass =
    backgroundcolor === true ? "hover:text-white" : "hover:text-black";
  const activeTextColorClass =
    backgroundcolor === true ? "text-white" : "text-black";
  const activeBorderClass =
    backgroundcolor === true ? "border-white" : "border-black";

  const borderClass =
    backgroundcolor === true ? "border-gray-800" : "border-gray-200";

  const getLinkClass = (path) => {
    return location.pathname === path
      ? `border-b-2 ${activeBorderClass} ${activeTextColorClass}`
      : `${hoverTextColorClass} ${textColorClass}`;
  };

  return (
    <nav
      className={`${bgColorClass} flex justify-between items-center pl-12 ${borderClass}`}
    >
      <div className="flex items-center space-x-12">
        <Link
          to="/explore"
          className={`transition duration-200 font-semibold ${getLinkClass(
            "/explore"
          )} p-4`}
        >
          Explore
        </Link>
        <Link
          to="/problemset"
          className={`transition duration-200 font-semibold ${getLinkClass(
            "/problemset"
          )} p-4`}
        >
          Problem
        </Link>
        <Link
          to="/contest"
          className={`transition duration-200 font-semibold ${getLinkClass(
            "/contest"
          )} p-4`}
        >
          Contest
        </Link>
      </div>
      <div>
        {!isAuthenticated ? (
          <>
            <Link
              to="/login"
              className={`transition duration-200 font-semibold ${hoverTextColorClass} mx-5 ${textColorClass} p-4`}
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className={`transition duration-200 font-semibold ${hoverTextColorClass} mx-5 ${textColorClass} p-4`}
            >
              Sign in
            </Link>
          </>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
