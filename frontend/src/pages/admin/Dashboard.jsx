import React from "react";
import Navbar from "@/components/custom/Navbar";

const Dashboard = () => {
  return (
    <div>
      <Navbar />

      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
        <p>Welcome to your dashboard! 🎉</p>
      </div>
    </div>
  );
};

export default Dashboard;
