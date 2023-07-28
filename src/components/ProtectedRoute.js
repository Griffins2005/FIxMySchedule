// ProtectedRoute.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom

function ProtectedRoute() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const isAuthenticated = !!token;

  if (!isAuthenticated) {
    navigate('/');
    return null;
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}

export default ProtectedRoute;
