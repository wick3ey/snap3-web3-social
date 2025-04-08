
import React, { useState } from 'react';
import { 
  Settings, Image, Clock, Wallet, QrCode, Edit, LogOut, Share2, Plus,
  HelpCircle, Lock, Sun
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '@/components/layout/MobileLayout';
import WalletCard from '@/components/profile/WalletCard';
import NFTDisplay from '@/components/profile/NFTDisplay';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { toast } from 'sonner';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('nfts');
  const [showQrDialog, setShowQrDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  
  // Mock user data
  const user = {
    name: 'Alex Web3',
    username: '@alexweb3',
    avatar: '/placeholder.svg',
    bio: 'Web3 enthusiast | NFT collector | Developer',
    solBalance: 24.56,
    walletAddress: '8xn3WHv2KpCGU1bicqmVyfkZfgXcHWZQbW9sMU9D2eu2',
  };

  // Mock NFT data
  const nfts = [
    { id: '1', name: 'Degen Ape #1234', image: '/placeholder.svg', collection: 'Degen Ape Academy' },
    { id: '2', name: 'Solana Monkey #5678', image: '/placeholder.svg', collection: 'SMB' },
    { id: '3', name: 'Okay Bear #9101', image: '/placeholder.svg', collection: 'Okay Bears' },
    { id: '4', name: 'Claynosaurz #1121', image: '/placeholder.svg', collection: 'Claynosaurz' },
  ];

  const handleEditProfile = () => {
    toast({
      title: "Edit Profile",
      description: "Edit your profile information and settings",
      action: {
        label: "Open",
        onClick: () => setShowSettingsDialog(true),
      },
    });
  };

  const handleShareProfile = () => {
    toast({
      title: "Share Profile",
      description: "Your profile link has been copied to clipboard",
    });
  };

  const handleViewAllNFTs = () => {
    toast.info("Viewing all NFTs in collection");
  };

  const handleNFTClick = (nftId: string) => {
    toast({
      title: "NFT Details",
      description: `Viewing details for ${nfts.find(nft => nft.id === nftId)?.name}`,
      action: {
        label: "View on Marketplace",
        onClick: () => toast.success("Opening marketplace"),
      },
    });
  };

  const handleAddToken = () => {
    toast({
      title: "Add Token",
      description: "Import a new token to your wallet",
      action: {
        label: "Import",
        onClick: () => toast.success("Token added successfully"),
      },
    });
  };

  const handleWalletCopy = () => {
    toast.success("Wallet address copied to clipboard");
  };

  const handleLogout = () => {
    toast({
      title: "Log out?",
      description: "You'll need to connect your wallet again to log back in",
      action: {
        label: "Log out",
        onClick: () => {
          toast.success("Logged out successfully");
          navigate("/");
        },
      },
    });
  };

  return (
    <MobileLayout>
      <div className="flex flex-col h-full">
        <div className="p-4 glass-morphism sticky top-0 z-10 flex justify-between items-center">
          <h1 className="text-xl font-bold">Profile</h1>
          <div className="flex gap-2">
            <Button 
              size="icon" 
              variant="ghost" 
              className="rounded-full"
              onClick={() => setShowQrDialog(true)}
            >
              <QrCode size={18} />
            </Button>
            <Button 
              size="icon" 
              variant="ghost" 
              className="rounded-full"
              onClick={() => setShowSettingsDialog(true)}
            >
              <Settings size={18} />
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <div className="p-4">
            {/* Profile Header */}
            <div className="snap-card p-4 mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-snap-purple">
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-solana-purple rounded-full flex items-center justify-center">
                    <span className="text-white text-[10px] font-bold">NFT</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-bold">{user.name}</h2>
                  <p className="text-sm text-gray-400">{user.username}</p>
                  <p className="text-xs text-gray-500 mt-1">{user.bio}</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 gap-1"
                  onClick={handleEditProfile}
                >
                  <Edit size={14} />
                  Edit Profile
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 gap-1"
                  onClick={handleShareProfile}
                >
                  <Share2 size={14} />
                  Share
                </Button>
              </div>
            </div>

            {/* Wallet */}
            <div className="mb-6">
              <WalletCard 
                solBalance={user.solBalance} 
                address={user.walletAddress}
                onCopy={handleWalletCopy}
              />
            </div>

            {/* Tabs */}
            <Tabs 
              defaultValue="nfts" 
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="w-full bg-white/5 p-1">
                <TabsTrigger value="nfts" className="flex items-center gap-1 flex-1">
                  <Image size={16} />
                  <span>NFTs</span>
                </TabsTrigger>
                <TabsTrigger value="transactions" className="flex items-center gap-1 flex-1">
                  <Clock size={16} />
                  <span>Activity</span>
                </TabsTrigger>
                <TabsTrigger value="tokens" className="flex items-center gap-1 flex-1">
                  <Wallet size={16} />
                  <span>Tokens</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="nfts" className="mt-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Your NFTs</h2>
                    <button 
                      className="text-sm text-snap-yellow"
                      onClick={handleViewAllNFTs}
                    >
                      View All
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {nfts.map((nft) => (
                      <div 
                        key={nft.id} 
                        className="snap-card overflow-hidden cursor-pointer"
                        onClick={() => handleNFTClick(nft.id)}
                      >
                        <div className="relative aspect-square">
                          {nft.image ? (
                            <img 
                              src={nft.image} 
                              alt={nft.name} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-800">
                              <Image size={32} className="text-gray-500" />
                            </div>
                          )}
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                            <p className="text-xs font-medium truncate">{nft.name}</p>
                            <p className="text-xs text-gray-400 truncate">{nft.collection}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="transactions" className="mt-4">
                <div className="snap-card p-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                            <path d="M12 5l0 14M5 12l7-7 7 7"></path>
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium">Received SOL</p>
                          <p className="text-xs text-gray-400">From: Sara</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-green-500">+0.5 SOL</p>
                        <p className="text-xs text-gray-400">2h ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                            <path d="M12 19l0 -14M5 12l7 7 7-7"></path>
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium">Sent SOL</p>
                          <p className="text-xs text-gray-400">To: Michael</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-red-500">-1.2 SOL</p>
                        <p className="text-xs text-gray-400">1d ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500">
                            <path d="M4 17 L10 11 L4 5"></path>
                            <path d="M12 19 L20 19"></path>
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium">NFT Purchase</p>
                          <p className="text-xs text-gray-400">Okay Bear #9101</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-red-500">-5.0 SOL</p>
                        <p className="text-xs text-gray-400">3d ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="tokens" className="mt-4">
                <div className="snap-card p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-base font-semibold">Your Tokens</h2>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 gap-1"
                      onClick={handleAddToken}
                    >
                      <Plus size={14} />
                      Add Token
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden">
                          <img src="https://cryptologos.cc/logos/solana-sol-logo.png" alt="SOL" className="w-full h-full object-contain" />
                        </div>
                        <div>
                          <p className="font-medium">Solana</p>
                          <p className="text-xs text-gray-400">SOL</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{user.solBalance} SOL</p>
                        <p className="text-xs text-gray-400">$1,200.45</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden">
                          <img src="/placeholder.svg" alt="Token" className="w-full h-full object-contain" />
                        </div>
                        <div>
                          <p className="font-medium">Bonk</p>
                          <p className="text-xs text-gray-400">BONK</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">20,000,000 BONK</p>
                        <p className="text-xs text-gray-400">$24.50</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden">
                          <img src="/placeholder.svg" alt="Token" className="w-full h-full object-contain" />
                        </div>
                        <div>
                          <p className="font-medium">Fida</p>
                          <p className="text-xs text-gray-400">FIDA</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">42.5 FIDA</p>
                        <p className="text-xs text-gray-400">$76.50</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      {/* QR Code Dialog */}
      <Dialog open={showQrDialog} onOpenChange={setShowQrDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Your QR Code</DialogTitle>
            <DialogDescription>
              Share this QR code to connect with friends
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center py-4">
            <div className="bg-white p-4 rounded-lg">
              <img src="/placeholder.svg" alt="QR Code" className="w-56 h-56" />
            </div>
          </div>
          <div className="text-center mb-4">
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-gray-400">{user.username}</p>
            <p className="text-xs text-gray-400 mt-2">{user.walletAddress.substring(0, 6)}...{user.walletAddress.substring(user.walletAddress.length - 4)}</p>
          </div>
          <DialogFooter className="flex justify-between sm:justify-between">
            <Button variant="outline" className="flex-1 mr-2" onClick={handleShareProfile}>
              <Share2 size={16} className="mr-2" />
              Share
            </Button>
            <DialogClose asChild>
              <Button variant="default" className="flex-1">Done</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Settings Dialog */}
      <Dialog open={showSettingsDialog} onOpenChange={setShowSettingsDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
            <DialogDescription>
              Manage your account settings and preferences
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="snap-card p-3 hover:bg-white/5 cursor-pointer" onClick={handleEditProfile}>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center mr-3">
                  <Edit size={16} className="text-blue-400" />
                </div>
                <div>
                  <p className="font-medium">Edit Profile</p>
                  <p className="text-xs text-gray-400">Change your profile information</p>
                </div>
              </div>
            </div>
            
            <div className="snap-card p-3 hover:bg-white/5 cursor-pointer" onClick={() => toast.info("Theme options")}>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center mr-3">
                  <Sun size={16} className="text-purple-400" />
                </div>
                <div>
                  <p className="font-medium">Appearance</p>
                  <p className="text-xs text-gray-400">Dark mode and theme options</p>
                </div>
              </div>
            </div>
            
            <div className="snap-card p-3 hover:bg-white/5 cursor-pointer" onClick={() => toast.info("Privacy settings")}>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center mr-3">
                  <Lock size={16} className="text-green-400" />
                </div>
                <div>
                  <p className="font-medium">Privacy & Security</p>
                  <p className="text-xs text-gray-400">Manage permissions and security</p>
                </div>
              </div>
            </div>
            
            <div className="snap-card p-3 hover:bg-white/5 cursor-pointer" onClick={() => toast.info("Help and support")}>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center mr-3">
                  <HelpCircle size={16} className="text-yellow-400" />
                </div>
                <div>
                  <p className="font-medium">Help & Support</p>
                  <p className="text-xs text-gray-400">Get help and contact support</p>
                </div>
              </div>
            </div>
            
            <div className="snap-card p-3 hover:bg-white/5 cursor-pointer" onClick={handleLogout}>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center mr-3">
                  <LogOut size={16} className="text-red-400" />
                </div>
                <div>
                  <p className="font-medium">Log Out</p>
                  <p className="text-xs text-gray-400">Sign out of your account</p>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="default">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MobileLayout>
  );
};

export default ProfilePage;
