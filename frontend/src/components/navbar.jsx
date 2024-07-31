import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode"; // Use the correct import
import PersonPinIcon from "@mui/icons-material/PersonPin";
const Navbar = ({ backgroundcolor }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Decode the token
        const adminStatus = decodedToken.role === "admin";
        setIsAdmin(adminStatus);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const isAuthenticated = !!Cookies.get("token");

  const bgColorClass = backgroundcolor === true ? "bg-secblack" : "bg-white";
  const textColorClass =
    backgroundcolor === true ? "text-zinc-300" : "text-gray-700";
  const hoverTextColorClass =
    backgroundcolor === true ? "hover:text-white" : "hover:text-secblack";
  const activeTextColorClass =
    backgroundcolor === true ? "text-white" : "text-secblack";
  const activeBorderClass =
    backgroundcolor === true ? "border-white" : "border-secblack";
  const borderClass =
    backgroundcolor === true ? "border-gray-800" : "border-gray-600";

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
        {isAdmin && (
          <Link
            to="/addproblem"
            className={`transition duration-200 font-semibold ${getLinkClass(
              "/addproblem"
            )} p-4`}
          >
            Add Problem
          </Link>
        )}
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
              Sign up
            </Link>
          </>
        ) : (
          <div className="text-white mr-5">
            <Link to={"/profile"}>
              <PersonPinIcon />
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
