
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Share2, MessageSquare, Shield, User, UserPlus, UserMinus } from 'lucide-react';
import MobileLayout from '@/components/layout/MobileLayout';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import SingleNFTDisplay from '@/components/profile/SingleNFTDisplay';
import { toast } from 'sonner';

interface FriendData {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  walletAddress: string;
  followersCount: number;
  followingCount: number;
  nftCount: number;
  isOnline: boolean;
  isFollowing: boolean;
  verified: boolean;
}

const FriendProfilePage = () => {
  const navigate = useNavigate();
  const { friendId } = useParams<{ friendId: string }>();
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [friendData, setFriendData] = useState<FriendData | null>(null);

  // Simulate fetching friend data
  useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      const mockFriendData: FriendData = {
        id: friendId || '0',
        name: 'Alex Web3',
        username: 'alex_web3',
        avatar: '/placeholder.svg',
        bio: 'Solana developer & NFT collector | Building the future of web3 | Based in Singapore',
        walletAddress: '5FHt1KEbkPFZ9opJyh3hqoXDWnxhyBJ7eLGaFFPzJsqj',
        followersCount: 2463,
        followingCount: 871,
        nftCount: 28,
        isOnline: true,
        isFollowing: false,
        verified: true,
      };
      setFriendData(mockFriendData);
      setIsFollowing(mockFriendData.isFollowing);
      setIsLoading(false);
    }, 1000);
  }, [friendId]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
    if (!isFollowing) {
      toast.success(`You are now following ${friendData?.name}`);
    } else {
      toast.info(`You unfollowed ${friendData?.name}`);
    }
  };

  const handleMessage = () => {
    if (friendData) {
      navigate(`/chat/${friendData.id}`);
    }
  };

  const handleShare = () => {
    toast.info(`Share ${friendData?.name}'s profile`, {
      action: {
        label: "Copy Link",
        onClick: () => toast.success("Profile link copied to clipboard"),
      },
    });
  };

  if (isLoading || !friendData) {
    return (
      <MobileLayout hideNavigation>
        <div className="flex justify-center items-center h-full">
          <div className="glass-morphism p-8 rounded-xl animate-pulse w-20 h-20"></div>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout hideNavigation>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="glass-morphism sticky top-0 z-10 p-4 flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleGoBack}
            className="text-gray-400"
          >
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-lg font-semibold">Profile</h1>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleShare}
            className="text-gray-400"
          >
            <Share2 size={20} />
          </Button>
        </div>

        {/* Profile Banner */}
        <div className="w-full h-32 bg-gradient-to-r from-solana-purple/30 to-solana-blue/30 relative overflow-hidden">
          <div className="absolute inset-0 backdrop-blur-sm"></div>
        </div>

        {/* Profile Info */}
        <div className="px-4 -mt-16 relative z-10">
          <div className="flex flex-col items-center">
            <div className="relative">
              <Avatar className="h-24 w-24 border-4 border-snap-dark shadow-lg">
                <AvatarImage src={friendData.avatar} />
                <AvatarFallback>{friendData.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              {friendData.isOnline && (
                <div className="absolute bottom-2 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-snap-dark"></div>
              )}
            </div>
            
            <div className="mt-3 text-center">
              <div className="flex items-center justify-center">
                <h2 className="text-xl font-bold">{friendData.name}</h2>
                {friendData.verified && (
                  <Badge className="ml-1.5 bg-solana-purple text-white text-xs px-1.5 py-0.5 rounded-full">
                    ✓
                  </Badge>
                )}
              </div>
              <div className="text-sm text-gray-400 mt-1">@{friendData.username}</div>
              <div className="mt-2 text-sm max-w-xs mx-auto">{friendData.bio}</div>
              
              <div className="flex gap-3 mt-4 justify-center">
                <Button 
                  variant={isFollowing ? "outline" : "default"}
                  className="rounded-full" 
                  onClick={handleFollowToggle}
                >
                  {isFollowing ? <UserMinus size={16} className="mr-1" /> : <UserPlus size={16} className="mr-1" />}
                  {isFollowing ? 'Following' : 'Follow'}
                </Button>
                <Button 
                  variant="outline" 
                  className="rounded-full" 
                  onClick={handleMessage}
                >
                  <MessageSquare size={16} className="mr-1" />
                  Message
                </Button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="glass-morphism rounded-xl p-4 mt-6 grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-xl font-bold">{friendData.followersCount.toLocaleString()}</div>
              <div className="text-xs text-gray-400">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">{friendData.followingCount.toLocaleString()}</div>
              <div className="text-xs text-gray-400">Following</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">{friendData.nftCount}</div>
              <div className="text-xs text-gray-400">NFTs</div>
            </div>
          </div>

          {/* Wallet Info (Preview) */}
          <Card className="mt-6 p-4 bg-white/5 border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-solana-purple/20 flex items-center justify-center mr-3">
                  <User size={16} className="text-solana-purple" />
                </div>
                <div>
                  <div className="text-sm font-medium">Wallet</div>
                  <div className="text-xs text-gray-400 truncate max-w-[150px]">
                    {friendData.walletAddress.substring(0, 6)}...{friendData.walletAddress.substring(friendData.walletAddress.length - 4)}
                  </div>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs"
                onClick={() => toast.success("Wallet address copied to clipboard")}
              >
                View
              </Button>
            </div>
          </Card>

          {/* NFT Collection */}
          <div className="mt-6 mb-8">
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
        </div>
      </div>
    </MobileLayout>
  );
};

export default FriendProfilePage;
