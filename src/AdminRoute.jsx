import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

const AdminRoute = () => {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin h-10 w-10 border-2 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!user || user.role !== "admin") return <Navigate to="/" replace />;

  return <Outlet />;
};

export default AdminRoute;
