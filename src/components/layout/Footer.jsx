import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, Globe } from "lucide-react";
import logo from "../../assets/images/cybervast-logo-1536x1536 (1).png";

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-gray-800 bg-[#0a0a0c]">
      <div className="mx-auto max-w-7xl px-6 py-14">
        {/* Footer Top */}
        <div className="grid gap-10 text-center md:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div className="flex flex-col items-center">
            <img
              src={logo}
              alt="CyberVast Learn Logo"
              className="h-10 w-10 object-contain"
            />

            <h2 className="mt-4 text-xl font-bold">CyberVast Learn</h2>

            <p className="mt-4 max-w-xs text-sm leading-7 text-gray-400">
              Empower your future through practical, industry-focused learning.
              Build skills, complete courses, and earn certificates that
              showcase your achievements.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center">
            <h3 className="mb-5 text-xl font-semibold">Quick Links</h3>

            <div className="flex flex-col gap-3">
              <Link to="/" className="transition hover:text-violet-400">
                Home
              </Link>

              <Link to="/courses" className="transition hover:text-violet-400">
                Courses
              </Link>

              <Link
                to="/dashboard"
                className="transition hover:text-violet-400"
              >
                Dashboard
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center">
            <h3 className="mb-5 text-xl font-semibold">Contact</h3>

            <div className="space-y-4 text-gray-400">
              <div className="flex items-center justify-center gap-2">
                <Phone size={18} />
                <span>+2349123039135</span>
              </div>

              <div className="flex items-center justify-center gap-2">
                <Mail size={18} />
                <span>info@cybervast.ng</span>
              </div>

              <div className="flex items-center justify-center gap-2">
                <Globe size={18} />
                <span>cybervast.ng</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
          © 2026 CyberVast Learn. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
