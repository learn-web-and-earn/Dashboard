import React, { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, LayoutDashboard, User, Settings, LogOut, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useFirebase } from "@/context/Firebase";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false); // ✅ loading state
  const { logout } = useFirebase();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true); // start loading
      await logout(); // sign out user
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false); // stop loading
      setIsOpen(false); // close sidebar
    }
  };

  return (
    <div className="relative">
      {/* Top Navbar */}
      <nav className="w-full bg-teal-700 text-white px-4 py-3 flex justify-between items-center shadow-md">
        <h1 className="text-lg font-bold">Parent Control App</h1>
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
        className="fixed top-0 left-0 h-full w-64 bg-teal-800 text-white shadow-lg z-50 p-6 flex flex-col justify-between"
      >
        {/* Top Section */}
        <div>
          <h2 className="text-xl font-semibold mb-6">Menu</h2>
          <ul className="space-y-4">
            <li>
              <Link
                to="/"
                className="flex items-center gap-3 hover:text-teal-300 transition"
                onClick={() => setIsOpen(false)}
              >
                <LayoutDashboard className="h-5 w-5" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/admin/users"
                className="flex items-center gap-3 hover:text-teal-300 transition"
                onClick={() => setIsOpen(false)}
              >
                <User className="h-5 w-5" />
                Users
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                className="flex items-center gap-3 hover:text-teal-300 transition"
                onClick={() => setIsOpen(false)}
              >
                <Settings className="h-5 w-5" />
                Settings
              </Link>
            </li>
          </ul>
        </div>

        {/* Bottom Section */}
        <div>
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full flex items-center gap-3 text-left hover:text-red-400 transition disabled:opacity-70"
          >
            {isLoggingOut ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Logging out...
              </>
            ) : (
              <>
                <LogOut className="h-5 w-5" />
                Logout
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Navbar;
