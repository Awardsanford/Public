// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate, Outlet, Route } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = () => {               
  const auth = useAuth();  
  return auth ? <Outlet /> : <Navigate to="/login" />};  

export default ProtectedRoute;