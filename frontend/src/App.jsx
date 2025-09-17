// App.jsx
import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Home from "./pages/user/Home";
import Login from "./pages/user/Login";
import Dashboard from "./pages/admin/Dashboard";
import { useFirebase } from "./context/Firebase";
import Users from "./pages/admin/AdminUsers";

// User pages (placeholders)
const UserProfile = () => <h1>User Profile</h1>;

// Admin pages (placeholders)
const AdminUsers = () => <h1>Manage Users</h1>;

// Auth pages
const Register = () => <h1>Register</h1>;

// Error page
const NotFound = () => <h1>404 - Page Not Found</h1>;

// User layout
const UserLayout = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="profile" element={<UserProfile />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

// Admin layout
const AdminLayout = () => (
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="users" element={<Users />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

// Protected wrapper for admin-only routes
const ProtectedAdmin = ({ isAdmin, children }) => {
  return isAdmin ? children : <Navigate to="/" replace />;
};

const App = () => {
  const { user, userData, loading } = useFirebase();
  const navigate = useNavigate();

  // State used to hold the UI for an extra 1 second when there's no user.
  const [holding, setHolding] = useState(true);

  // When `loading` completes, decide what to do next.
  useEffect(() => {
    // If still loading auth, keep holding UI
    if (loading) {
      setHolding(true);
      return;
    }

    // loading finished
    if (!user) {
      // No user: hold for 1s then redirect to /login
      const t = setTimeout(() => {
        setHolding(false);
        navigate("/login", { replace: true });
      }, 1000);
      return () => clearTimeout(t);
    }

    // We have a user: stop holding immediately (don't redirect)
    setHolding(false);

    // If user is admin, make sure root route goes to /admin.
    // We won't navigate automatically here; root rendering will handle it.
  }, [loading, user, navigate]);

  // While auth is loading or while we are "holding" the UI, show a loader
  if (loading || holding) {
    return (
      <div className="flex items-center justify-center h-screen">
        {/* Replace with your loader component if you want */}
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-transparent" />
          <span>Checking authentication...</span>
        </div>
      </div>
    );
  }

  // At this point: loading === false and holding === false.
  // If there's still no user, we've already navigated to /login in the effect.
  // So here we can safely compute isAdmin and render routes.
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
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
