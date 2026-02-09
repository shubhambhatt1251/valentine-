import React from 'react';
import { Navigate } from 'react-router-dom';
import { useValentine } from '../context/ValentineContext';

const ProtectedRoute = ({ children }) => {
  const { saidYes } = useValentine();
  if (!saidYes) return <Navigate to="/" replace />;
  return children;
};

export default ProtectedRoute;
