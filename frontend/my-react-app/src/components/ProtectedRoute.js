// src/components/ProtectedRoute.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { userId } = useSelector((state) => state.user);
  // If no userId exists, redirect to login
  return userId ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

