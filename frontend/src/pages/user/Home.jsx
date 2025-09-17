import React, { useEffect } from "react";
import { useFirebase } from "@/context/Firebase"; // adjust path
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/custom/Navbar";

const Home = () => {
  const { user, loading, logout } = useFirebase(); // ✅ use context
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login"); // redirect if no user
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        <span className="ml-4 text-lg">Checking authentication...</span>
      </div>
    );
  }

  return (
    <>
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h2 className="text-xl font-semibold">Welcome, {user?.email}</h2>
      <button
        onClick={logout}
        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
    </>
    
  );
};

export default Home;
