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
            className={`text-white hover:text-gray-300 ${location.pathname === "/" ? "font-bold" : ""}`}
          >
            Inicio
          </Link>
        </li>
        <li>
          <Link
            to="/login"
            className={`text-white hover:text-gray-300 ${location.pathname === "/login" ? "font-bold" : ""}`}
          >
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

