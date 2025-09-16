import React, { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react"; // icons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      {/* Top Navbar */}
      <nav className="w-full bg-teal-700 text-white px-4 py-3 flex justify-between items-center shadow-md">
        <h1 className="text-lg font-bold">My App</h1>
        <button onClick={toggleMenu} className="focus:outline-none">
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Sidebar Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={toggleMenu}
        ></div>
      )}

      {/* Sidebar Menu */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? "0%" : "-100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 h-full w-64 bg-teal-800 text-white shadow-lg z-50 p-6"
      >
        <h2 className="text-xl font-semibold mb-6">Menu</h2>
        <ul className="space-y-4">
          <li>
            <a href="/" className="hover:text-teal-300 transition">
              Dashboard
            </a>
          </li>
          <li>
            <a href="/profile" className="hover:text-teal-300 transition">
              Profile
            </a>
          </li>
          <li>
            <a href="/settings" className="hover:text-teal-300 transition">
              Settings
            </a>
          </li>
          <li>
            <a href="/logout" className="hover:text-red-400 transition">
              Logout
            </a>
          </li>
        </ul>
      </motion.div>
    </div>
  );
};

export default Navbar;
