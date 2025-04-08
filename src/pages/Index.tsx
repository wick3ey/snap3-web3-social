
import React from 'react';
import { Navigate } from 'react-router-dom';

const Index = () => {
  // For demo purposes, we'll redirect to the camera page which is our main interface
  return <Navigate to="/camera" replace />;
};

export default Index;
