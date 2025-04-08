import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, Share2, MessageSquare, Shield, User, UserPlus, UserMinus, 
  Globe, Link, Users, Wallet, Star, Clock, ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import MobileLayout from '@/components/layout/MobileLayout';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import SingleNFTDisplay from '@/components/profile/SingleNFTDisplay';
import FriendProfileStats from '@/components/profile/FriendProfileStats';
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
  location: string;
  website: string;
  joinedDate: string;
  lastActive: string;
  mutualFriends: Array<{id: string, name: string, avatar: string}>;
}

const FriendProfilePage = () => {
  const navigate = useNavigate();
  const { friendId } = useParams<{ friendId: string }>();
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [friendData, setFriendData] = useState<FriendData | null>(null);
  const [activeTab, setActiveTab] = useState("nfts");
  const [showWalletInfo, setShowWalletInfo] = useState(false);

  // Simulate fetching friend data
  useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      const mockFriendData: FriendData = {
        id: friendId || '0',
        name: 'Alex Web3',
        username: 'alex_web3',
        avatar: 'https://source.unsplash.com/random/200x200?face-1',
        bio: 'Solana developer & NFT collector | Building the future of web3 | Based in Singapore',
        walletAddress: '5FHt1KEbkPFZ9opJyh3hqoXDWnxhyBJ7eLGaFFPzJsqj',
        followersCount: 2463,
        followingCount: 871,
        nftCount: 28,
        isOnline: true,
        isFollowing: false,
        verified: true,
        location: 'Singapore',
        website: 'https://alexweb3.dev',
        joinedDate: 'January 2022',
        lastActive: '2 hours ago',
        mutualFriends: [
          {id: '1', name: 'Sarah Kim', avatar: 'https://source.unsplash.com/random/200x200?face-2'},
          {id: '2', name: 'Mike Chen', avatar: 'https://source.unsplash.com/random/200x200?face-3'},
          {id: '3', name: 'Emma Wilson', avatar: 'https://source.unsplash.com/random/200x200?face-4'},
        ]
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

  const handleSendGift = () => {
    toast.info("Send a gift to this user", {
      action: {
        label: "Select Gift",
        onClick: () => toast.success("Gift selection opened"),
      },
    });
  };

  const toggleWalletInfo = () => {
    setShowWalletInfo(!showWalletInfo);
  };

  const viewMutualFriends = () => {
    toast.info("View all mutual friends", {
      description: "This would open a full list of mutual friends",
    });
  };

  if (isLoading) {
    return (
      <MobileLayout hideNavigation>
        <div className="p-4 sticky top-0 z-10 glass-morphism flex items-center justify-between">
          <Button variant="ghost" size="icon" className="bg-white/5">
            <ArrowLeft size={20} />
          </Button>
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
        <div className="flex flex-col gap-4 p-4 mt-16">
          <div className="flex flex-col items-center">
            <Skeleton className="h-28 w-28 rounded-full" />
            <Skeleton className="h-6 w-40 mt-4" />
            <Skeleton className="h-4 w-32 mt-2" />
            <Skeleton className="h-16 w-full mt-4 rounded-lg" />
            <div className="flex gap-2 mt-4">
              <Skeleton className="h-10 w-28 rounded-full" />
              <Skeleton className="h-10 w-28 rounded-full" />
            </div>
          </div>
          <Skeleton className="h-24 w-full rounded-lg mt-4" />
          <Skeleton className="h-64 w-full rounded-lg mt-4" />
        </div>
      </MobileLayout>
    );
  }

  if (!friendData) {
    return (
      <MobileLayout hideNavigation>
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-snap-dark to-black">
          <div className="flex justify-center items-center h-full">
            <div className="text-center p-8">
              <h2 className="text-xl font-bold mb-2">User Not Found</h2>
              <p className="text-gray-400 mb-4">The profile you're looking for doesn't exist or has been removed.</p>
              <Button 
                onClick={() => navigate('/profile')}
                className="bg-solana-purple text-white"
              >
                Go to Your Profile
              </Button>
            </div>
          </div>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout hideNavigation>
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-snap-dark to-black">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="glass-morphism sticky top-0 z-10 p-4 flex items-center justify-between"
        >
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleGoBack}
            className="bg-white/5 hover:bg-white/10 transition-all"
          >
            <ArrowLeft size={20} />
          </Button>
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="text-lg font-semibold"
          >
            Profile
          </motion.h1>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleShare}
            className="bg-white/5 hover:bg-white/10 transition-all"
          >
            <Share2 size={20} />
          </Button>
        </motion.div>

        <div className="flex-1 overflow-auto pb-20">
          {/* Profile Banner */}
          <div className="w-full h-36 bg-gradient-to-r from-solana-purple/30 to-solana-blue/30 relative overflow-hidden">
            <div className="absolute inset-0 backdrop-blur-sm"></div>
          </div>

          {/* Profile Info */}
          <div className="px-4 -mt-16 relative z-10">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center"
            >
              <div className="relative">
                <Avatar className="h-28 w-28 border-4 border-snap-dark shadow-lg">
                  <AvatarImage src={friendData.avatar} />
                  <AvatarFallback>{friendData.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                {friendData.isOnline && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.2 }}
                    className="absolute bottom-2 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-snap-dark"
                  />
                )}
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="mt-3 text-center"
              >
                <div className="flex items-center justify-center">
                  <h2 className="text-xl font-bold">{friendData.name}</h2>
                  {friendData.verified && (
                    <Badge className="ml-1.5 bg-solana-purple text-white text-xs px-1.5 py-0.5 rounded-full">
                      ✓
                    </Badge>
                  )}
                </div>
                <div className="text-sm text-gray-400 mt-1">@{friendData.username}</div>
                
                {friendData.location && (
                  <div className="flex items-center justify-center mt-2 text-xs text-gray-400">
                    <Globe size={12} className="mr-1" />
                    <span>{friendData.location}</span>
                  </div>
                )}
                
                <div className="mt-2 text-sm max-w-xs mx-auto">{friendData.bio}</div>
                
                {friendData.website && (
                  <div className="mt-2">
                    <a href={friendData.website} target="_blank" rel="noopener noreferrer" className="text-xs text-solana-purple flex items-center justify-center">
                      <Link size={12} className="mr-1" />
                      <span>{friendData.website.replace(/(^\w+:|^)\/\//, '')}</span>
                    </a>
                  </div>
                )}
                
                <div className="flex gap-3 mt-4 justify-center">
                  <motion.div whileTap={{ scale: 0.95 }}>
                    <Button 
                      variant={isFollowing ? "outline" : "default"}
                      className={`rounded-full ${isFollowing ? 'border-white/20 bg-white/5' : 'bg-solana-purple hover:bg-solana-purple/90'}`}
                      onClick={handleFollowToggle}
                    >
                      {isFollowing ? <UserMinus size={16} className="mr-1" /> : <UserPlus size={16} className="mr-1" />}
                      {isFollowing ? 'Following' : 'Follow'}
                    </Button>
                  </motion.div>
                  <motion.div whileTap={{ scale: 0.95 }}>
                    <Button 
                      variant="outline" 
                      className="rounded-full border-white/20 bg-white/5 hover:bg-white/10" 
                      onClick={handleMessage}
                    >
                      <MessageSquare size={16} className="mr-1" />
                      Message
                    </Button>
                  </motion.div>
                </div>

                <div className="flex items-center justify-center mt-3 text-xs text-gray-400">
                  <Clock size={12} className="mr-1" />
                  <span>Last active {friendData.lastActive}</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <FriendProfileStats 
                followersCount={friendData.followersCount}
                followingCount={friendData.followingCount}
                nftCount={friendData.nftCount}
              />
            </motion.div>

            {/* Mutual Friends */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className="mt-6"
            >
              <Card className="p-4 bg-white/5 border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-solana-purple/20 flex items-center justify-center mr-3">
                      <Users size={18} className="text-solana-purple" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Mutual Friends</div>
                      <div className="text-xs text-gray-400">
                        {friendData.mutualFriends.length} friends in common
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-xs bg-white/5 hover:bg-white/10"
                    onClick={viewMutualFriends}
                  >
                    <ChevronRight size={16} />
                  </Button>
                </div>
                
                <div className="mt-3 flex -space-x-2 overflow-hidden">
                  {friendData.mutualFriends.map((friend, index) => (
                    <Avatar key={friend.id} className="border-2 border-snap-dark inline-block h-8 w-8">
                      <AvatarImage src={friend.avatar} alt={friend.name} />
                      <AvatarFallback>{friend.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                  ))}
                  {friendData.mutualFriends.length > 3 && (
                    <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-snap-dark bg-solana-purple/50 text-xs font-medium">
                      +{friendData.mutualFriends.length - 3}
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>

            {/* Wallet Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.3 }}
              className="mt-6"
            >
              <Card className="bg-white/5 border-white/10 overflow-hidden">
                <div 
                  className="p-4 flex items-center justify-between cursor-pointer"
                  onClick={toggleWalletInfo}
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-solana-purple/20 flex items-center justify-center mr-3">
                      <Wallet size={18} className="text-solana-purple" />
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
                    className="text-xs bg-white/5 hover:bg-white/10"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigator.clipboard.writeText(friendData.walletAddress);
                      toast.success("Wallet address copied to clipboard");
                    }}
                  >
                    Copy
                  </Button>
                </div>
                
                {showWalletInfo && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Separator className="bg-white/10" />
                    <div className="p-4 bg-white/3">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 rounded-lg bg-white/5">
                          <div className="text-xs text-gray-400 mb-1">Estimated Value</div>
                          <div className="text-lg font-bold">$12,540</div>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-white/5">
                          <div className="text-xs text-gray-400 mb-1">Transactions</div>
                          <div className="text-lg font-bold">143</div>
                        </div>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full mt-4 border-solana-purple/50 text-solana-purple"
                        onClick={() => toast.info("This would open Solana Explorer")}
                      >
                        View on Explorer
                      </Button>
                    </div>
                  </motion.div>
                )}
              </Card>
            </motion.div>

            {/* Tab Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.3 }}
              className="mt-6"
            >
              <Tabs defaultValue="nfts" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full grid grid-cols-2 bg-white/5">
                  <TabsTrigger value="nfts" className="data-[state=active]:bg-solana-purple">
                    NFTs
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
                  
                  <div className="grid grid-cols-3 gap-3">
                    <SingleNFTDisplay 
                      image="https://source.unsplash.com/random/400x400?abstract-1" 
                      name="BAYC #3429"
                      collectionName="Bored Ape YC"
                      onClick={() => toast.info("Viewing NFT details")}
                    />
                    <SingleNFTDisplay 
                      image="https://source.unsplash.com/random/400x400?abstract-2" 
                      name="Degen #892"
                      collectionName="DegenApes"
                      onClick={() => toast.info("Viewing NFT details")}
                    />
                    <SingleNFTDisplay 
                      image="https://source.unsplash.com/random/400x400?abstract-3" 
                      name="SMB #1432"
                      collectionName="Solana Monkeys"
                      onClick={() => toast.info("Viewing NFT details")}
                    />
                  </div>
                  
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    <SingleNFTDisplay 
                      image="https://source.unsplash.com/random/400x400?abstract-4" 
                      name="Pixel #532"
                      collectionName="PixelVerse"
                      onClick={() => toast.info("Viewing NFT details")}
                    />
                    <SingleNFTDisplay 
                      image="https://source.unsplash.com/random/400x400?abstract-5" 
                      name="Solana #281"
                      collectionName="SolPunks"
                      onClick={() => toast.info("Viewing NFT details")}
                    />
                    <SingleNFTDisplay 
                      image="https://source.unsplash.com/random/400x400?abstract-6" 
                      name="Droid #901"
                      collectionName="CryptoDroids"
                      onClick={() => toast.info("Viewing NFT details")}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="activity" className="mt-4">
                  <div className="space-y-3">
                    {[
                      { id: 1, type: 'purchase', title: 'Purchased NFT', description: 'Bought DegenApe #4531 for 2.5 SOL', time: '2 days ago' },
                      { id: 2, type: 'list', title: 'Listed NFT for sale', description: 'Listed Solana Monkey #2134 for 3.2 SOL', time: '3 days ago' },
                      { id: 3, type: 'mint', title: 'Minted new NFT', description: 'Minted PixelVerse #532', time: '5 days ago' },
                      { id: 4, type: 'transfer', title: 'Transferred SOL', description: 'Sent 5 SOL to @crypto_wizard', time: '1 week ago' },
                    ].map((item) => (
                      <motion.div 
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: item.id * 0.1, duration: 0.3 }}
                        className="p-3 rounded-lg border border-white/10 bg-white/5"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{item.title}</h4>
                            <p className="text-sm text-gray-400">{item.description}</p>
                          </div>
                          <span className="text-xs text-gray-500">{item.time}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default FriendProfilePage;
