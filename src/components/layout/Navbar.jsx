import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, User } from "lucide-react";

import logo from "../../assets/images/cybervast-logo-1536x1536 (1).png";
import { useApp } from "../../context/AppContext";

const Navbar = () => {
  const { state } = useApp();

  // ------Mobile menu open / close-------
  const [isOpen, setIsOpen] = useState(false);

  const navLinkStyle = ({ isActive }) =>
    isActive
      ? "text-violet-500 font-medium"
      : "text-gray-300 hover:text-violet-400 transition";

  return (
    <header className="sticky top-0 z-50 border-b border-gray-800 bg-[#0A0A0C]">
      <nav className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 lg:px-6">
        {/* ------Left Logo------- */}

        <NavLink to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="CyberVast Learn Logo"
            className="h-10 w-10 object-contain"
          />

          <h1 className="text-lg md:text-xl font-bold text-white">
            Cyber<span className="text-violet-500">Vast</span> Learn
          </h1>
        </NavLink>

        {/* ------Desktop Menu-------*/}

        <div className="hidden md:flex items-center gap-8">
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

        {/* -------- Desktop Profile---------- */}

        <div className="hidden md:flex items-center gap-2 rounded-lg bg-[#1D1D24] px-4 py-2 hover:bg-violet-700 ">
          <User size={18} />

          <span>{state.learnerName || "Learner"}</span>
        </div>

        {/* -----------Mobile Menu Button---------- */}

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/*---------Mobile Menu----------- */}

      {isOpen && (
        <div className="border-t border-gray-800 bg-[#141419] md:hidden">
          <div className="flex flex-col p-5 gap-5">
            <NavLink
              to="/"
              className={navLinkStyle}
              onClick={() => setIsOpen(false)}
            >
              Home
            </NavLink>

            <NavLink
              to="/courses"
              className={navLinkStyle}
              onClick={() => setIsOpen(false)}
            >
              Courses
            </NavLink>

            <NavLink
              to="/dashboard"
              className={navLinkStyle}
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </NavLink>

            <div className="mt-2 flex items-center gap-2 rounded-lg bg-[rgb(29,29,36)] px-4 py-3">
              <User size={18} />

              <span>{state.learnerName || "Learner"}</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
