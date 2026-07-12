import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="border-b border-gray-800">
      <nav className="max-w-7xl mx-auto h-16 flex items-center justify-between px-6">
        <div>
          <img src="im" alt="" />
        <h1 className="text-2xl font-bold text-violet-500">CyberVast Learn</h1>
        </div>

        <div className="flex gap-6">
          <NavLink to="/">Home</NavLink>

          <NavLink to="/courses">Courses</NavLink>

          <NavLink to="/dashboard">Dashboard</NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
