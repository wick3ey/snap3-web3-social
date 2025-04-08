
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Save, X } from 'lucide-react';
import MobileLayout from '@/components/layout/MobileLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';

const EditProfilePage = () => {
  const navigate = useNavigate();
  const [showImagePicker, setShowImagePicker] = useState(false);
  
  // Dummy user data - this would typically come from a state management system or API
  const [profileData, setProfileData] = useState({
    name: 'Jane Doe',
    username: 'jane_web3',
    avatar: '/placeholder.svg',
    bio: 'Web3 enthusiast | Solana developer | NFT collector',
  });
  
  // Sample avatar options - in a real app, these might come from an API or user uploads
  const avatarOptions = [
    '/placeholder.svg',
    'https://source.unsplash.com/random/200x200?face-1',
    'https://source.unsplash.com/random/200x200?face-2',
    'https://source.unsplash.com/random/200x200?face-3',
    'https://source.unsplash.com/random/200x200?face-4',
  ];
  
  const handleSave = () => {
    // In a real app, this would send the data to an API
    toast.success('Profile updated successfully');
    navigate('/profile');
  };
  
  const handleChangeAvatar = (avatar: string) => {
    setProfileData(prev => ({ ...prev, avatar }));
    setShowImagePicker(false);
    toast.success('Profile picture updated');
  };
  
  return (
    <MobileLayout>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 flex justify-between items-center border-b border-white/10">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/profile')}
          >
            <X size={20} />
          </Button>
          <h1 className="text-xl font-bold">Edit Profile</h1>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleSave}
          >
            <Save size={20} />
          </Button>
        </div>
        
        {/* Profile Picture */}
        <div className="p-6 flex justify-center">
          <div className="relative">
            <Avatar className="h-24 w-24 border-2 border-snap-yellow">
              <AvatarImage src={profileData.avatar} />
              <AvatarFallback>{profileData.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <Button
              variant="ghost"
              size="icon"
              className="absolute bottom-0 right-0 bg-snap-yellow text-black rounded-full h-8 w-8"
              onClick={() => setShowImagePicker(true)}
            >
              <Camera size={16} />
            </Button>
          </div>
        </div>
        
        {/* Profile Form */}
        <div className="px-4 py-2 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Name</label>
            <Input 
              value={profileData.name}
              onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
              className="bg-gray-800 border-gray-700"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Username</label>
            <Input 
              value={profileData.username}
              onChange={(e) => setProfileData(prev => ({ ...prev, username: e.target.value }))}
              className="bg-gray-800 border-gray-700"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Bio</label>
            <textarea 
              value={profileData.bio}
              onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
              className="w-full h-24 px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-snap-yellow"
            />
          </div>
          
          <Button 
            onClick={handleSave}
            className="w-full bg-snap-yellow text-black hover:bg-snap-yellow/90"
          >
            Save Changes
          </Button>
        </div>
        
        {/* Profile Picture Picker Dialog */}
        <Dialog open={showImagePicker} onOpenChange={setShowImagePicker}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Choose Profile Picture</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-3 gap-2 py-4">
              {avatarOptions.map((avatar, index) => (
                <div 
                  key={index} 
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => handleChangeAvatar(avatar)}
                >
                  <Avatar className="h-20 w-20 mx-auto">
                    <AvatarImage src={avatar} />
                    <AvatarFallback>IMG</AvatarFallback>
                  </Avatar>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </MobileLayout>
  );
};

export default EditProfilePage;
