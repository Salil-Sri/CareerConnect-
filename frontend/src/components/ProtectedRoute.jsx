// src/components/ProtectedRoute.jsx

import React from "react";
import { Navigate } from "react-router-dom";
import { getRoleFromToken } from "../utils/tokenHelper";

// `allowedRoles` (array) optionally restricts access to particular user roles
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const token = localStorage.getItem("token");

  // If no token -> send to auth
  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  // If allowedRoles provided, validate role in token
  if (allowedRoles && allowedRoles.length > 0) {
    const role = getRoleFromToken(token);
    if (!role || !allowedRoles.includes(role)) {
      return <Navigate to="/auth" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
