// src/components/navbar/Navbar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-black p-4">
      <ul className="flex space-x-4">
        <li>
          <Link
            to="/"
            className={`text-white hover:text-gray-300 ${
              location.pathname === "/" ? "font-bold" : ""
            }`}
          >
            Inicio
          </Link>
        </li>
        <li>
          <Link
            to="/auth"
            className={`text-white hover:text-gray-300 ${
              location.pathname === "/auth" ? "font-bold" : ""
            }`}
          >
            Login
          </Link>
        </li>

        <li>
          <Link
            to="/secretPage"
            className={`text-white hover:text-gray-300 ${
              location.pathname === "/secretPage" ? "font-bold" : ""
            }`}
          >
            Secret Page
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
