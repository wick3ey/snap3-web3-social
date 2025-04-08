
import React, { useState } from 'react';
import { Search, Filter, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '@/components/layout/MobileLayout';
import StoryPreview from '@/components/stories/StoryPreview';
import StoryViewer from '@/components/stories/StoryViewer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

// Define story types with proper type constraints
interface StoryItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  duration: number;
  caption?: string;
}

interface Story {
  id: string;
  name: string;
  avatar: string;
  hasUnviewed: boolean;
  isOfficial: boolean;
  hasNFT: boolean;
  items: StoryItem[];
}

const StoriesPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);
  
  // Dummy data for stories
  const stories: Story[] = [
    {
      id: '1',
      name: 'Your Story',
      avatar: '/placeholder.svg',
      hasUnviewed: false,
      isOfficial: false,
      hasNFT: false,
      items: [
        { id: '101', type: 'image', url: '/placeholder.svg', duration: 5, caption: 'Add to your story' }
      ]
    },
    {
      id: '2',
      name: 'SolanaFM',
      avatar: '/placeholder.svg',
      hasUnviewed: true,
      isOfficial: true,
      hasNFT: false,
      items: [
        { id: '201', type: 'image', url: '/placeholder.svg', duration: 5, caption: 'New Solana DeFi update coming soon!' },
        { id: '202', type: 'image', url: '/placeholder.svg', duration: 5, caption: 'Join us for an AMA tomorrow' }
      ]
    },
    {
      id: '3',
      name: 'Alex',
      avatar: '/placeholder.svg',
      hasUnviewed: true,
      isOfficial: false,
      hasNFT: true,
      items: [
        { id: '301', type: 'image', url: '/placeholder.svg', duration: 5, caption: 'Check out my new NFT!' },
        { id: '302', type: 'image', url: '/placeholder.svg', duration: 5, caption: 'Minting opens tomorrow!' }
      ]
    },
    {
      id: '4',
      name: 'Sarah',
      avatar: '/placeholder.svg',
      hasUnviewed: true,
      isOfficial: false,
      hasNFT: false,
      items: [
        { id: '401', type: 'image', url: '/placeholder.svg', duration: 5, caption: 'At the Solana Hackathon!' }
      ]
    },
    {
      id: '5',
      name: 'BAYC',
      avatar: '/placeholder.svg',
      hasUnviewed: true,
      isOfficial: true,
      hasNFT: false,
      items: [
        { id: '501', type: 'image', url: '/placeholder.svg', duration: 5, caption: 'New collection dropping soon' },
        { id: '502', type: 'image', url: '/placeholder.svg', duration: 5, caption: 'Limited edition items!' }
      ]
    },
    {
      id: '6',
      name: 'Michael',
      avatar: '/placeholder.svg',
      hasUnviewed: false,
      isOfficial: false,
      hasNFT: false,
      items: [
        { id: '601', type: 'image', url: '/placeholder.svg', duration: 5, caption: 'Web3 conference highlights' }
      ]
    },
  ];
  
  const [filteredStories, setFilteredStories] = useState<Story[]>(stories);

  // Dummy data for discover section
  const discoverContent = [
    {
      id: '1',
      title: 'Breaking: Solana DeFi Update',
      publisher: 'SolanaFM',
      image: '/placeholder.svg',
      isVerified: true,
      link: '/story/solana-defi',
    },
    {
      id: '2',
      title: 'Top 10 NFT Collections This Week',
      publisher: 'NFT Insider',
      image: '/placeholder.svg',
      isVerified: true,
      link: '/story/nft-collections',
    },
    {
      id: '3',
      title: 'Web3 Social: The Future is Here',
      publisher: 'Crypto Daily',
      image: '/placeholder.svg',
      isVerified: false,
      link: '/story/web3-social',
    },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setFilteredStories(stories);
    } else {
      const filtered = stories.filter(story => 
        story.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredStories(filtered);
    }
  };

  const handleFilter = () => {
    toast("Filtering options", {
      description: "You can filter by verified accounts, NFTs, or recent stories",
      action: {
        label: "Apply",
        onClick: () => {
          // This would apply filters in a real app
          toast.success("Filters applied");
        },
      },
    });
  };

  const handleOpenStory = (index: number) => {
    setActiveStoryIndex(index);
  };

  const handleCloseStory = () => {
    setActiveStoryIndex(null);
  };

  const handleCreateStory = () => {
    navigate('/camera', { state: { mode: 'story' } });
  };

  const handleDiscoverItemClick = (link: string) => {
    toast.info("Opening featured story");
    navigate(link);
  };

  return (
    <MobileLayout>
      <div className="flex flex-col h-full">
        <div className="p-4 glass-morphism sticky top-0 z-10">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold">Stories</h1>
            <div className="flex gap-2">
              <Button 
                size="icon" 
                variant="ghost" 
                className="rounded-full"
                onClick={handleFilter}
              >
                <Filter size={18} />
              </Button>
              <Button 
                size="icon" 
                className="rounded-full bg-snap-yellow text-black"
                onClick={handleCreateStory}
              >
                <Plus size={18} />
              </Button>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <Input 
              placeholder="Search stories" 
              className="pl-9 bg-white/5 border-none rounded-full"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          {/* Stories row */}
          <div className="px-2 py-4">
            <div className="flex gap-2 overflow-x-auto scrollbar-none pb-2">
              {filteredStories.map((story, index) => (
                <div key={story.id} onClick={() => handleOpenStory(index)}>
                  <StoryPreview
                    name={story.name}
                    avatar={story.avatar}
                    hasUnviewed={story.hasUnviewed}
                    isOfficial={story.isOfficial}
                    hasNFT={story.hasNFT}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Discover section */}
          <div className="px-4 py-2">
            <h2 className="text-lg font-semibold mb-4">Discover</h2>
            <div className="space-y-4">
              {discoverContent.map((item) => (
                <div 
                  key={item.id} 
                  className="snap-card overflow-hidden cursor-pointer"
                  onClick={() => handleDiscoverItemClick(item.link)}
                >
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
                <div 
                  key={item} 
                  className="snap-card overflow-hidden cursor-pointer"
                  onClick={() => toast.info(`Trending story #${item} opened`)}
                >
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

      {/* Story Viewer Modal */}
      {activeStoryIndex !== null && (
        <StoryViewer 
          stories={stories}
          initialStoryIndex={activeStoryIndex}
          onClose={handleCloseStory}
        />
      )}
    </MobileLayout>
  );
};

export default StoriesPage;
