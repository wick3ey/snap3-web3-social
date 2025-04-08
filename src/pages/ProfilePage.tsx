
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Camera, Wallet, LogOut, Copy, Bell, Shield, Moon, CircleHelp, Gift, Pencil } from 'lucide-react';
import MobileLayout from '@/components/layout/MobileLayout';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import WalletCard from '@/components/profile/WalletCard';
import NFTDisplay from '@/components/profile/NFTDisplay';
import SingleNFTDisplay from '@/components/profile/SingleNFTDisplay';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [showSettings, setShowSettings] = useState(false);
  const [showImagePicker, setShowImagePicker] = useState(false);

  // Dummy user data
  const [user, setUser] = useState({
    name: 'Jane Doe',
    username: 'jane_web3',
    avatar: '/placeholder.svg',
    bio: 'Web3 enthusiast | Solana developer | NFT collector',
    walletAddress: '8ZpHx2Ajs3tbRXEWTc9SLVHy4ELK2ERFy2Sq7KpnN5xE',
    followersCount: 1258,
    followingCount: 432,
    verified: true,
  });

  // Sample avatar options - in a real app, these might come from an API or user uploads
  const avatarOptions = [
    '/placeholder.svg',
    'https://source.unsplash.com/random/200x200?face-1',
    'https://source.unsplash.com/random/200x200?face-2',
    'https://source.unsplash.com/random/200x200?face-3',
    'https://source.unsplash.com/random/200x200?face-4',
  ];

  // Dummy wallet data
  const wallet = {
    solBalance: 24.56,
    nftCount: 17,
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(user.walletAddress)
      .then(() => {
        toast.success('Wallet address copied to clipboard');
      })
      .catch(() => {
        toast.error('Failed to copy address');
      });
  };

  const handleChangeProfilePicture = () => {
    setShowImagePicker(true);
  };

  const handleSelectAvatar = (avatar: string) => {
    setUser(prev => ({ ...prev, avatar }));
    setShowImagePicker(false);
    toast.success('Profile picture updated');
  };

  const handleEditProfile = () => {
    navigate('/profile/edit');
  };

  const handleVerifyProfile = () => {
    toast.info("Verify your profile with Solana", {
      action: {
        label: "Verify",
        onClick: () => {
          toast.info("Verification process would start here");
        },
      },
    });
  };

  const handleRequestVerification = () => {
    toast.info("Request verified status for your account", {
      action: {
        label: "Request",
        onClick: () => {
          toast.success("Verification request submitted");
        },
      },
    });
  };

  const handleLogout = () => {
    toast.info("Are you sure you want to log out?", {
      action: {
        label: "Log Out",
        onClick: () => {
          toast.success("You have been logged out");
          navigate("/");
        },
      },
    });
  };

  return (
    <MobileLayout>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Profile</h1>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setShowSettings(true)}
          >
            <Settings size={20} />
          </Button>
        </div>

        {/* Profile Header */}
        <div className="px-4 py-2">
          <div className="flex items-start">
            <div className="relative">
              <Avatar className="h-20 w-20 border-2 border-solana-purple">
                <AvatarImage src={user.avatar} />
                <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <Button
                variant="ghost"
                size="icon"
                className="absolute bottom-0 right-0 bg-solana-purple text-white rounded-full h-6 w-6"
                onClick={handleChangeProfilePicture}
              >
                <Camera size={14} />
              </Button>
            </div>
            
            <div className="ml-4 flex-1">
              <div className="flex items-center">
                <h2 className="text-lg font-bold">{user.name}</h2>
                {user.verified && (
                  <div className="ml-1.5 bg-solana-purple text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                    ✓
                  </div>
                )}
              </div>
              <div className="text-sm text-gray-400 mb-2">@{user.username}</div>
              <div className="text-sm">{user.bio}</div>
              
              <div className="flex mt-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 px-2 text-sm"
                  onClick={handleEditProfile}
                >
                  <Pencil size={14} className="mr-1" />
                  Edit
                </Button>
                {!user.verified && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 px-2 text-sm"
                    onClick={handleRequestVerification}
                  >
                    <Shield size={14} className="mr-1" />
                    Verify
                  </Button>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-around mt-4 pb-4 border-b border-white/10">
            <div className="text-center">
              <div className="font-bold">{user.followersCount}</div>
              <div className="text-xs text-gray-400">Followers</div>
            </div>
            <div className="text-center">
              <div className="font-bold">{user.followingCount}</div>
              <div className="text-xs text-gray-400">Following</div>
            </div>
            <div className="text-center">
              <div className="font-bold">{wallet.nftCount}</div>
              <div className="text-xs text-gray-400">NFTs</div>
            </div>
          </div>
        </div>

        {/* Wallet Section */}
        <div className="px-4 py-4">
          <h3 className="text-lg font-semibold mb-3">Wallet</h3>
          <WalletCard 
            solBalance={wallet.solBalance} 
            address={user.walletAddress}
            onCopy={handleCopyAddress}
          />
        </div>

        {/* NFT Section */}
        <div className="px-4 py-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold">NFT Collection</h3>
            <Button 
              variant="link" 
              className="h-auto p-0 text-sm text-solana-purple"
              onClick={() => toast.info("Viewing all NFTs")}
            >
              View All
            </Button>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            <SingleNFTDisplay 
              image="/placeholder.svg" 
              name="BAYC #3429"
              collectionName="Bored Ape YC"
              onClick={() => toast.info("Viewing NFT details")}
            />
            <SingleNFTDisplay 
              image="/placeholder.svg" 
              name="Degen #892"
              collectionName="DegenApes"
              onClick={() => toast.info("Viewing NFT details")}
            />
            <SingleNFTDisplay 
              image="/placeholder.svg" 
              name="SMB #1432"
              collectionName="Solana Monkeys"
              onClick={() => toast.info("Viewing NFT details")}
            />
          </div>
        </div>

        {/* Settings Sheet */}
        <Sheet open={showSettings} onOpenChange={setShowSettings}>
          <SheetContent className="w-[85%] sm:max-w-md bg-snap-dark border-white/10">
            <div className="py-4">
              <h2 className="text-xl font-bold mb-4">Settings</h2>
              
              <div className="space-y-4">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-base font-normal"
                  onClick={() => {
                    setShowSettings(false);
                    navigate('/profile/edit');
                  }}
                >
                  <Pencil size={18} className="mr-2" />
                  Edit Profile
                </Button>
                
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-base font-normal"
                  onClick={() => {
                    setShowSettings(false);
                    handleVerifyProfile();
                  }}
                >
                  <Shield size={18} className="mr-2" />
                  Verification
                </Button>
                
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-base font-normal"
                  onClick={() => {
                    setShowSettings(false);
                    toast.info("Notifications settings would open here");
                  }}
                >
                  <Bell size={18} className="mr-2" />
                  Notifications
                </Button>
                
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-base font-normal"
                  onClick={() => {
                    setShowSettings(false);
                    toast.info("Privacy settings would open here");
                  }}
                >
                  <Shield size={18} className="mr-2" />
                  Privacy
                </Button>
                
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-base font-normal"
                  onClick={() => {
                    setShowSettings(false);
                    toast.info("Appearance settings would open here");
                  }}
                >
                  <Moon size={18} className="mr-2" />
                  Appearance
                </Button>
                
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-base font-normal"
                  onClick={() => {
                    setShowSettings(false);
                    toast.info("Help center would open here");
                  }}
                >
                  <CircleHelp size={18} className="mr-2" />
                  Help
                </Button>
                
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-base font-normal"
                  onClick={() => {
                    setShowSettings(false);
                    toast.info("Gift a subscription");
                  }}
                >
                  <Gift size={18} className="mr-2" />
                  Gift Subscription
                </Button>
                
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-red-500"
                  onClick={() => {
                    setShowSettings(false);
                    handleLogout();
                  }}
                >
                  <LogOut size={18} className="mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Profile Picture Picker Dialog */}
        <Dialog open={showImagePicker} onOpenChange={setShowImagePicker}>
          <DialogContent className="sm:max-w-md bg-snap-dark border-white/10">
            <DialogHeader>
              <DialogTitle>Choose Profile Picture</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-3 gap-2 py-4">
              {avatarOptions.map((avatar, index) => (
                <div 
                  key={index} 
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => handleSelectAvatar(avatar)}
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

export default ProfilePage;
