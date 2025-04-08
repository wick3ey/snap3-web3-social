
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Save, X, AtSign, User, FileText, Link } from 'lucide-react';
import MobileLayout from '@/components/layout/MobileLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
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
    website: 'https://janedoe.dev',
    location: 'San Francisco, CA',
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
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-snap-dark to-black">
        {/* Header */}
        <div className="p-4 flex justify-between items-center sticky top-0 z-10 bg-snap-dark/80 backdrop-blur-lg border-b border-white/5">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/profile')}
            className="bg-white/5 hover:bg-white/10 transition-all"
          >
            <X size={20} />
          </Button>
          <h1 className="text-xl font-bold">Edit Profile</h1>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleSave}
            className="bg-white/5 hover:bg-white/10 transition-all"
          >
            <Save size={20} />
          </Button>
        </div>
        
        <div className="flex-1 overflow-auto pb-20">
          {/* Profile Picture */}
          <div className="p-6 flex justify-center">
            <div className="relative">
              <Avatar className="h-28 w-28 border-2 border-solana-purple shadow-lg shadow-solana-purple/20">
                <AvatarImage src={profileData.avatar} />
                <AvatarFallback>{profileData.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <Button
                variant="ghost"
                size="icon"
                className="absolute bottom-0 right-0 bg-solana-purple text-white rounded-full h-10 w-10"
                onClick={() => setShowImagePicker(true)}
              >
                <Camera size={18} />
              </Button>
            </div>
          </div>
          
          {/* Profile Form */}
          <div className="px-4 py-2 space-y-5">
            <Card className="p-4 bg-white/5 border border-white/10">
              <div className="flex items-start mb-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 mr-3">
                  <User size={20} className="text-solana-purple" />
                </div>
                <div className="flex-1 space-y-2">
                  <label className="text-sm font-medium">Display Name</label>
                  <Input 
                    value={profileData.name}
                    onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                    className="bg-gray-800/50 border-gray-700"
                    placeholder="Your display name"
                  />
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 mr-3">
                  <AtSign size={20} className="text-solana-purple" />
                </div>
                <div className="flex-1 space-y-2">
                  <label className="text-sm font-medium">Username</label>
                  <Input 
                    value={profileData.username}
                    onChange={(e) => setProfileData(prev => ({ ...prev, username: e.target.value }))}
                    className="bg-gray-800/50 border-gray-700"
                    placeholder="Your username"
                  />
                </div>
              </div>
            </Card>
            
            <Card className="p-4 bg-white/5 border border-white/10">
              <div className="flex items-start mb-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 mr-3">
                  <FileText size={20} className="text-solana-purple" />
                </div>
                <div className="flex-1 space-y-2">
                  <label className="text-sm font-medium">Bio</label>
                  <Textarea 
                    value={profileData.bio}
                    onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                    className="w-full min-h-[100px] px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-solana-purple resize-none"
                    placeholder="Tell others about yourself"
                  />
                  <p className="text-xs text-gray-400">
                    {profileData.bio.length}/160 characters
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 mr-3">
                  <Link size={20} className="text-solana-purple" />
                </div>
                <div className="flex-1 space-y-2">
                  <label className="text-sm font-medium">Website</label>
                  <Input 
                    value={profileData.website}
                    onChange={(e) => setProfileData(prev => ({ ...prev, website: e.target.value }))}
                    className="bg-gray-800/50 border-gray-700"
                    placeholder="Your website URL"
                  />
                </div>
              </div>
            </Card>
            
            <Card className="p-4 bg-white/5 border border-white/10">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 mr-3">
                  <Globe size={20} className="text-solana-purple" />
                </div>
                <div className="flex-1 space-y-2">
                  <label className="text-sm font-medium">Location</label>
                  <Input 
                    value={profileData.location}
                    onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                    className="bg-gray-800/50 border-gray-700"
                    placeholder="Your location"
                  />
                </div>
              </div>
            </Card>
            
            <Button 
              onClick={handleSave}
              className="w-full bg-solana-purple text-white hover:bg-solana-purple/90 h-12 rounded-lg shadow-lg shadow-solana-purple/20"
            >
              Save Changes
            </Button>
          </div>
        </div>
        
        {/* Profile Picture Picker Dialog */}
        <Dialog open={showImagePicker} onOpenChange={setShowImagePicker}>
          <DialogContent className="sm:max-w-md bg-snap-dark border-white/10">
            <DialogHeader>
              <DialogTitle>Choose Profile Picture</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-3 gap-4 py-4">
              {avatarOptions.map((avatar, index) => (
                <div 
                  key={index} 
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => handleChangeAvatar(avatar)}
                >
                  <Avatar className="h-20 w-20 mx-auto border-2 border-transparent hover:border-solana-purple transition-all">
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
