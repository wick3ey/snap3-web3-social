
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { user, isLoading, hasProfile } = useAuth();

  // If loading, show a loading spinner
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-8 w-8 border-4 border-snap-yellow border-t-transparent rounded-full" />
      </div>
    );
  }

  // If user is not logged in, redirect to auth page
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  // If user is logged in but has no profile, redirect to profile creation
  if (user && !hasProfile) {
    return <Navigate to="/create-profile" replace />;
  }
  
  // If user is logged in and has a profile, redirect to camera page
  return <Navigate to="/camera" replace />;
};

export default Index;
