
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MobileLayout from '@/components/layout/MobileLayout';
import CameraView from '@/components/camera/CameraView';
import { toast } from 'sonner';
import ContactSelector from '@/components/camera/ContactSelector';

const CameraPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mode, setMode] = useState<'regular' | 'story'>('regular');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [showContactSelector, setShowContactSelector] = useState(false);
  
  useEffect(() => {
    // Check if we're in story creation mode from the location state
    if (location.state && location.state.mode === 'story') {
      setMode('story');
      toast.info("Story creation mode activated");
    }
  }, [location]);

  const handleImageCaptured = (imageData: string) => {
    setCapturedImage(imageData);
    
    if (mode === 'story') {
      // In a real app, this would save to a stories database
      toast.success("Story created successfully!");
      navigate('/stories');
    } else {
      // Show contact selector for regular camera mode
      setShowContactSelector(true);
    }
  };

  const handleSendToContact = (contactId: string) => {
    // In a real app, this would save the message in a database
    toast.success(`Snap sent to ${contactId}!`);
    setShowContactSelector(false);
    setCapturedImage(null);
    navigate('/chat');
  };

  const handleCancelSend = () => {
    setShowContactSelector(false);
    setCapturedImage(null);
  };

  return (
    <MobileLayout>
      {showContactSelector ? (
        <ContactSelector 
          onSelectContact={handleSendToContact} 
          onCancel={handleCancelSend}
          image={capturedImage || undefined}
        />
      ) : (
        <CameraView 
          mode={mode} 
          onCapture={handleImageCaptured}
          onCancel={() => mode === 'story' ? navigate('/stories') : navigate(-1)}
        />
      )}
    </MobileLayout>
  );
};

export default CameraPage;
