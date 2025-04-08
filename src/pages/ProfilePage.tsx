
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Camera, Wallet, LogOut, Copy, Bell, Shield, Moon, CircleHelp, Gift, Pencil, Users, Globe, Award, BookMarked, Lock, MessageSquare } from 'lucide-react';
import MobileLayout from '@/components/layout/MobileLayout';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import WalletCard from '@/components/profile/WalletCard';
import NFTDisplay from '@/components/profile/NFTDisplay';
import SingleNFTDisplay from '@/components/profile/SingleNFTDisplay';
import ProfileStats from '@/components/profile/ProfileStats';
import ProfileHeader from '@/components/profile/ProfileHeader';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [showSettings, setShowSettings] = useState(false);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [activeTab, setActiveTab] = useState("nfts");
  
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
    level: 8,
    joinedDate: 'March 2023',
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

  // Dummy achievements data
  const achievements = [
    { id: 1, name: 'Early Adopter', icon: <Award size={18} className="text-yellow-400" />, completed: true },
    { id: 2, name: 'NFT Collector', icon: <BookMarked size={18} className="text-purple-400" />, completed: true },
    { id: 3, name: 'Social Butterfly', icon: <Users size={18} className="text-blue-400" />, completed: false },
    { id: 4, name: 'Diamond Hands', icon: <Lock size={18} className="text-cyan-400" />, completed: true },
  ];

  // Dummy activity data
  const activities = [
    { id: 1, type: 'purchase', title: 'Purchased NFT', description: 'Bought DegenApe #4531', time: '2 hours ago' },
    { id: 2, type: 'follow', title: 'New Follower', description: 'Alex started following you', time: '5 hours ago' },
    { id: 3, type: 'sale', title: 'NFT Sold', description: 'Sold Solana Monkey #2134 for 3.2 SOL', time: '1 day ago' },
    { id: 4, type: 'message', title: 'New Message', description: 'Sarah sent you a message', time: '2 days ago' },
  ];

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

  const handleSendMessage = (contactId: string) => {
    navigate(`/chat/${contactId}`);
  };

  return (
    <MobileLayout>
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-snap-dark to-black">
        {/* Header */}
        <div className="p-4 flex justify-between items-center sticky top-0 z-10 bg-snap-dark/80 backdrop-blur-lg border-b border-white/5">
          <h1 className="text-xl font-bold text-gradient">Profile</h1>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setShowSettings(true)}
            className="bg-white/5 hover:bg-white/10 transition-all"
          >
            <Settings size={20} />
          </Button>
        </div>

        <div className="flex-1 overflow-auto pb-20">
          {/* Profile Header with Avatar and Info */}
          <ProfileHeader 
            user={user}
            onEditProfile={handleEditProfile}
            onChangeProfilePicture={handleChangeProfilePicture}
            onVerify={handleRequestVerification}
          />

          {/* Stats Section */}
          <ProfileStats 
            followersCount={user.followersCount}
            followingCount={user.followingCount}
            nftCount={wallet.nftCount}
            level={user.level}
          />
          
          {/* Wallet Section */}
          <div className="px-4 py-4">
            <h3 className="text-lg font-semibold mb-3">Wallet</h3>
            <WalletCard 
              solBalance={wallet.solBalance} 
              address={user.walletAddress}
              onCopy={handleCopyAddress}
            />
          </div>

          {/* Tabs Section */}
          <div className="px-4 py-2">
            <Tabs defaultValue="nfts" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full grid grid-cols-3 bg-white/5">
                <TabsTrigger value="nfts" className="data-[state=active]:bg-solana-purple">
                  NFTs
                </TabsTrigger>
                <TabsTrigger value="achievements" className="data-[state=active]:bg-solana-purple">
                  Badges
                </TabsTrigger>
                <TabsTrigger value="activity" className="data-[state=active]:bg-solana-purple">
                  Activity
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="nfts" className="mt-4">
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
              </TabsContent>
              
              <TabsContent value="achievements" className="mt-4">
                <div className="grid grid-cols-2 gap-3">
                  {achievements.map(achievement => (
                    <div 
                      key={achievement.id} 
                      className={`p-3 rounded-lg border ${achievement.completed ? 'border-solana-purple bg-solana-purple/10' : 'border-white/10 bg-white/5'}`}
                    >
                      <div className="flex items-center mb-2">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/10 mr-2">
                          {achievement.icon}
                        </div>
                        <span className="font-medium">{achievement.name}</span>
                      </div>
                      <div className="text-xs text-gray-400">
                        {achievement.completed ? 
                          'Achievement unlocked' : 
                          'In progress'}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="activity" className="mt-4">
                <div className="space-y-3">
                  {activities.map(activity => (
                    <div key={activity.id} className="p-3 rounded-lg border border-white/10 bg-white/5">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{activity.title}</h4>
                          <p className="text-sm text-gray-400">{activity.description}</p>
                        </div>
                        <span className="text-xs text-gray-500">{activity.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
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
                  <Lock size={18} className="mr-2" />
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
