import React from "react";
import { Routes, Route } from "react-router-dom";

// User pages
const UserHome = () => <h1>User Home</h1>;
const UserProfile = () => <h1>User Profile</h1>;

// Admin pages
const AdminDashboard = () => <h1>Admin Dashboard</h1>;
const AdminUsers = () => <h1>Manage Users</h1>;

// Auth pages
const Login = () => <h1>Login</h1>;
const Register = () => <h1>Register</h1>;

// Error page
const NotFound = () => <h1>404 - Page Not Found</h1>;

// Layouts
const UserLayout = () => (
  <Routes>
    <Route path="/" element={<UserHome />} />
    <Route path="profile" element={<UserProfile />} />
    <Route path="*" element={<NotFound />} /> {/* catch-all for user */}
  </Routes>
);

const AdminLayout = () => (
  <Routes>
    <Route path="dashboard" element={<AdminDashboard />} />
    <Route path="users" element={<AdminUsers />} />
    <Route path="*" element={<NotFound />} /> {/* catch-all for admin */}
  </Routes>
);

const App = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<h1>Welcome</h1>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* User routes */}
      <Route path="/user/*" element={<UserLayout />} />

      {/* Admin routes */}
      <Route path="/admin/*" element={<AdminLayout />} />

      {/* Global catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
