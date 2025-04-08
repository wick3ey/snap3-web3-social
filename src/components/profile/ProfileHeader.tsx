
import React from 'react';
import { Pencil, Camera, Shield } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface User {
  name: string;
  username: string;
  avatar: string;
  bio: string;
  verified: boolean;
  joinedDate: string;
}

interface ProfileHeaderProps {
  user: User;
  onEditProfile: () => void;
  onChangeProfilePicture: () => void;
  onVerify: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  user,
  onEditProfile,
  onChangeProfilePicture,
  onVerify
}) => {
  return (
    <div className="px-4 py-6 relative">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-solana-purple/20 to-solana-blue/20 -z-10"></div>
      
      <div className="flex items-start">
        <div className="relative">
          <Avatar className="h-24 w-24 border-2 border-solana-purple shadow-lg shadow-solana-purple/20">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <Button
            variant="ghost"
            size="icon"
            className="absolute bottom-0 right-0 bg-solana-purple text-white rounded-full h-8 w-8"
            onClick={onChangeProfilePicture}
          >
            <Camera size={16} />
          </Button>
        </div>
        
        <div className="ml-4 flex-1">
          <div className="flex items-center">
            <h2 className="text-xl font-bold">{user.name}</h2>
            {user.verified && (
              <Badge className="ml-1.5 bg-solana-purple text-white text-xs px-1.5 py-0.5 rounded-full">
                ✓
              </Badge>
            )}
          </div>
          <div className="text-sm text-gray-400">@{user.username}</div>
          <div className="text-xs text-gray-500 mt-1">Joined {user.joinedDate}</div>
          <div className="text-sm mt-2">{user.bio}</div>
          
          <div className="flex mt-3 space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="h-9 px-4 border-white/10 bg-white/5 hover:bg-white/10"
              onClick={onEditProfile}
            >
              <Pencil size={14} className="mr-1" />
              Edit Profile
            </Button>
            {!user.verified && (
              <Button 
                variant="outline" 
                size="sm" 
                className="h-9 px-4 border-white/10 bg-white/5 hover:bg-white/10"
                onClick={onVerify}
              >
                <Shield size={14} className="mr-1" />
                Verify
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
