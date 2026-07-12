import React from "react";
import { NavLink } from "react-router-dom";

import logo from "../../assets/images/cybervast-logo-1536x1536 (1).png";

import { User } from "lucide-react";

const Navbar = () => {
  const learnerName = "Mahmuda";
  const navLinkStyle = ({ isActive }) =>
    isActive
      ? "text-violet-500 font-medium"
      : "text-gray-300 hover:text-violet-400 transition";
  return (
    <header className="sticky top-0 z-50 bg-[#0A0A0C] border-b border-gray-800">
      <nav className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="CyberVast Logo"
            className="w-10 h-10 object-contain"
          />

          <h1 className="text-xl font-bold text-white">
            Cyber<span className="text-violet-500">Vast</span> Learn
          </h1>
        </div>

        {/* Center */}

        <div className="flex items-center gap-10">
          <NavLink to="/" className={navLinkStyle}>
            Home
          </NavLink>

          <NavLink to="/courses" className={navLinkStyle}>
            Courses
          </NavLink>

          <NavLink to="/dashboard" className={navLinkStyle}>
            Dashboard
          </NavLink>
        </div>

        {/* Right */}

        <div className="flex items-center gap-2 bg-[#1D1D24] px-4 py-2 rounded-lg">
          <User size={18} />
          <span>{learnerName}</span>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
