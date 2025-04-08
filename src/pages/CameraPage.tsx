
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MobileLayout from '@/components/layout/MobileLayout';
import CameraView from '@/components/camera/CameraView';
import { toast } from 'sonner';

const CameraPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mode, setMode] = useState<'regular' | 'story'>('regular');
  
  useEffect(() => {
    // Check if we're in story creation mode from the location state
    if (location.state && location.state.mode === 'story') {
      setMode('story');
      toast.info("Story creation mode activated");
    }
  }, [location]);

  const handleImageCaptured = (imageData: string) => {
    if (mode === 'story') {
      // In a real app, this would save to a stories database
      toast.success("Story created successfully!");
      navigate('/stories');
    } else {
      // Regular camera mode
      toast.info("Choose who to send this to", {
        action: {
          label: "Send",
          onClick: () => navigate('/chat'),
        },
      });
    }
  };

  return (
    <MobileLayout>
      <CameraView 
        mode={mode} 
        onCapture={handleImageCaptured}
        onCancel={() => mode === 'story' ? navigate('/stories') : undefined}
      />
    </MobileLayout>
  );
};

export default CameraPage;
