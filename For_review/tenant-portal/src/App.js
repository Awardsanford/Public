import './App.css';
import TenantApplicationForm from './components/TenantApplicationForm';
import React, {Fragment} from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';
import ForgotPassword from './components/ForgotPassword';
import Dashboard from './components/Dashboard'; 
import { AuthProvider } from './contexts/AuthContext';

function App() {
  

  return (    
    <AuthProvider>
      <Fragment>
      <Routes>
      
        <Route path="/" element={<Login />} />
        <Route path="" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<ProtectedRoute />}>
          <Route path="" element={<Dashboard />} />
          <Route path="tenant-application" element={<TenantApplicationForm />} />
        </Route>
      </Routes>
    </Fragment>
    </AuthProvider>
  );
}

export default App;
