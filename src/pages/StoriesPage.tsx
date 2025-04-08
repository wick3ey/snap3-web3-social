
import React from 'react';
import { Search, Filter } from 'lucide-react';
import MobileLayout from '@/components/layout/MobileLayout';
import StoryPreview from '@/components/stories/StoryPreview';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const StoriesPage = () => {
  // Dummy data for stories
  const stories = [
    {
      id: '1',
      name: 'Your Story',
      avatar: '/placeholder.svg',
      hasUnviewed: false,
      isOfficial: false,
      hasNFT: false,
    },
    {
      id: '2',
      name: 'SolanaFM',
      avatar: '/placeholder.svg',
      hasUnviewed: true,
      isOfficial: true,
      hasNFT: false,
    },
    {
      id: '3',
      name: 'Alex',
      avatar: '/placeholder.svg',
      hasUnviewed: true,
      isOfficial: false,
      hasNFT: true,
    },
    {
      id: '4',
      name: 'Sarah',
      avatar: '/placeholder.svg',
      hasUnviewed: true,
      isOfficial: false,
      hasNFT: false,
    },
    {
      id: '5',
      name: 'BAYC',
      avatar: '/placeholder.svg',
      hasUnviewed: true,
      isOfficial: true,
      hasNFT: false,
    },
    {
      id: '6',
      name: 'Michael',
      avatar: '/placeholder.svg',
      hasUnviewed: false,
      isOfficial: false,
      hasNFT: false,
    },
  ];

  // Dummy data for discover section
  const discoverContent = [
    {
      id: '1',
      title: 'Breaking: Solana DeFi Update',
      publisher: 'SolanaFM',
      image: '/placeholder.svg',
      isVerified: true,
    },
    {
      id: '2',
      title: 'Top 10 NFT Collections This Week',
      publisher: 'NFT Insider',
      image: '/placeholder.svg',
      isVerified: true,
    },
    {
      id: '3',
      title: 'Web3 Social: The Future is Here',
      publisher: 'Crypto Daily',
      image: '/placeholder.svg',
      isVerified: false,
    },
  ];

  return (
    <MobileLayout>
      <div className="flex flex-col h-full">
        <div className="p-4 glass-morphism sticky top-0 z-10">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold">Stories</h1>
            <Button size="icon" variant="ghost" className="rounded-full">
              <Filter size={18} />
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <Input 
              placeholder="Search stories" 
              className="pl-9 bg-white/5 border-none rounded-full"
            />
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          {/* Stories row */}
          <div className="px-2 py-4">
            <div className="flex gap-2 overflow-x-auto scrollbar-none pb-2">
              {stories.map((story) => (
                <StoryPreview
                  key={story.id}
                  name={story.name}
                  avatar={story.avatar}
                  hasUnviewed={story.hasUnviewed}
                  isOfficial={story.isOfficial}
                  hasNFT={story.hasNFT}
                />
              ))}
            </div>
          </div>

          {/* Discover section */}
          <div className="px-4 py-2">
            <h2 className="text-lg font-semibold mb-4">Discover</h2>
            <div className="space-y-4">
              {discoverContent.map((item) => (
                <div key={item.id} className="snap-card overflow-hidden">
                  <div className="relative aspect-video">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent">
                      <div className="absolute bottom-0 p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-medium">{item.publisher}</span>
                          {item.isVerified && (
                            <div className="bg-snap-yellow text-black text-[10px] font-bold px-1 py-0.5 rounded-full">
                              ✓
                            </div>
                          )}
                        </div>
                        <h3 className="text-base font-semibold">{item.title}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trending section */}
          <div className="px-4 py-6">
            <h2 className="text-lg font-semibold mb-4">Trending in Web3</h2>
            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="snap-card overflow-hidden">
                  <div className="aspect-square relative">
                    <img 
                      src="/placeholder.svg" 
                      alt="Trending content" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/50 backdrop-blur-sm rounded-full px-2 py-0.5 text-xs">
                      # {Math.floor(Math.random() * 500) + 1}K
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default StoriesPage;
