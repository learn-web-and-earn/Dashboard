import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/user/Home";
import Login from "./pages/user/Login";
import Dashboard from "./pages/admin/Dashboard";
import { useFirebase } from "./context/Firebase";

// User pages
const UserProfile = () => <h1>User Profile</h1>;

// Admin pages
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
    <Route path="users" element={<AdminUsers />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

// Protected wrapper for admin-only routes
const ProtectedAdmin = ({ isAdmin, children }) => {
  return isAdmin ? children : <Navigate to="/" replace />;
};

const App = () => {
  const { userData, loading } = useFirebase();

  if (loading) {
    return <p>Loading...</p>; // ✅ show loading state
  }

  const isAdmin = userData?.isAdmin === true;

  return (
    <Routes>
      {/* Root route: redirect admin → dashboard, normal user → home */}
      <Route path="/" element={isAdmin ? <Navigate to="/admin" /> : <Home />} />

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
