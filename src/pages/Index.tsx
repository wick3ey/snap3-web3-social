
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { user, isLoading } = useAuth();

  // If loading, show a loading spinner
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-8 w-8 border-4 border-snap-yellow border-t-transparent rounded-full" />
      </div>
    );
  }

  // If user is logged in, redirect to camera page, otherwise to auth page
  return user ? <Navigate to="/camera" replace /> : <Navigate to="/auth" replace />;
};

export default Index;
