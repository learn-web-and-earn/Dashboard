// App.jsx
import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Home from "./pages/user/Home";
import Login from "./pages/user/Login";
import Dashboard from "./pages/admin/Dashboard";
import { useFirebase } from "./context/Firebase";
import Users from "./pages/admin/AdminUsers";
import Error from "./pages/Error";
import Payment from "./pages/user/Payment"; // ✅ import payment page

// User pages (placeholders)
const UserProfile = () => <h1>User Profile</h1>;

// Auth pages
const Register = () => <h1>Register</h1>;

// User layout
const UserLayout = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="profile" element={<UserProfile />} />
    <Route path="payment" element={<Payment />} /> {/* ✅ added payment route */}
    <Route path="*" element={<Error />} />
  </Routes>
);

// Admin layout
const AdminLayout = () => (
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="users" element={<Users />} />
    <Route path="*" element={<Error />} />
  </Routes>
);

// Protected wrapper for admin-only routes
const ProtectedAdmin = ({ isAdmin, children }) => {
  return isAdmin ? children : <Navigate to="/" replace />;
};

const App = () => {
  const { user, userData, loading } = useFirebase();
  const navigate = useNavigate();

  const [holding, setHolding] = useState(true);

  useEffect(() => {
    if (loading) {
      setHolding(true);
      return;
    }

    if (!user) {
      const t = setTimeout(() => {
        setHolding(false);
        navigate("/login", { replace: true });
      }, 1000);
      return () => clearTimeout(t);
    }

    setHolding(false);
  }, [loading, user, navigate]);

  if (loading || holding) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-transparent" />
          <span>Checking authentication...</span>
        </div>
      </div>
    );
  }

  const isAdmin = userData?.isAdmin === true;

  return (
    <Routes>
      {/* Root route: redirect admin → dashboard, normal user → home */}
      <Route path="/" element={isAdmin ? <Navigate to="/admin" replace /> : <Home />} />

      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* User routes */}
      <Route path="/user/*" element={<UserLayout />} />

      {/* Admin routes (protected) */}
      <Route
        path="/admin/*"
        element={
          <ProtectedAdmin isAdmin={isAdmin}>
            <AdminLayout />
          </ProtectedAdmin>
        }
      />

      {/* Global catch-all */}
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default App;
