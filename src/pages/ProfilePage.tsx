
import React from 'react';
import { Settings, Image, Clock, Wallet, QrCode } from 'lucide-react';
import MobileLayout from '@/components/layout/MobileLayout';
import WalletCard from '@/components/profile/WalletCard';
import NFTDisplay from '@/components/profile/NFTDisplay';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ProfilePage = () => {
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

  return (
    <MobileLayout>
      <div className="flex flex-col h-full">
        <div className="p-4 glass-morphism sticky top-0 z-10 flex justify-between items-center">
          <h1 className="text-xl font-bold">Profile</h1>
          <div className="flex gap-2">
            <Button size="icon" variant="ghost" className="rounded-full">
              <QrCode size={18} />
            </Button>
            <Button size="icon" variant="ghost" className="rounded-full">
              <Settings size={18} />
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <div className="p-4">
            {/* Profile Header */}
            <div className="flex items-center gap-4 mb-6">
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
              <div>
                <h2 className="text-lg font-bold">{user.name}</h2>
                <p className="text-sm text-gray-400">{user.username}</p>
                <p className="text-xs text-gray-500 mt-1">{user.bio}</p>
              </div>
            </div>

            {/* Wallet */}
            <div className="mb-6">
              <WalletCard 
                solBalance={user.solBalance} 
                address={user.walletAddress} 
              />
            </div>

            {/* Tabs */}
            <Tabs defaultValue="nfts" className="w-full">
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
                <NFTDisplay nfts={nfts} />
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
    </MobileLayout>
  );
};

export default ProfilePage;
