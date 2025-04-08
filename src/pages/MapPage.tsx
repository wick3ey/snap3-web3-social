
import React from 'react';
import { Search, MapPin } from 'lucide-react';
import MobileLayout from '@/components/layout/MobileLayout';
import StoryPreview from '@/components/stories/StoryPreview';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const MapPage = () => {
  // Dummy data for nearby friends
  const nearbyFriends = [
    {
      id: '1',
      name: 'Alex',
      avatar: '/placeholder.svg',
      hasUnviewed: true,
      isOfficial: false,
      hasNFT: true,
    },
    {
      id: '2',
      name: 'Sarah',
      avatar: '/placeholder.svg',
      hasUnviewed: true,
      isOfficial: false,
      hasNFT: false,
    },
    {
      id: '3',
      name: 'Michael',
      avatar: '/placeholder.svg',
      hasUnviewed: false,
      isOfficial: false,
      hasNFT: false,
    },
  ];

  return (
    <MobileLayout>
      <div className="flex flex-col h-full">
        <div className="p-4 glass-morphism sticky top-0 z-10">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold">Map</h1>
            <Button size="icon" variant="ghost" className="rounded-full">
              <MapPin size={18} />
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <Input 
              placeholder="Search locations" 
              className="pl-9 bg-white/5 border-none rounded-full"
            />
          </div>
        </div>

        <div className="flex-1 relative">
          {/* Map placeholder */}
          <div className="h-full w-full bg-snap-dark-blue">
            <div className="h-full w-full flex items-center justify-center">
              <div className="text-gray-400">
                <MapPin size={48} className="mx-auto mb-2 opacity-20" />
                <p>Interactive map will appear here</p>
              </div>
            </div>
            
            {/* Friend pins would be positioned absolutely here in a real implementation */}
          </div>
          
          {/* Nearby friends bar */}
          <div className="absolute bottom-4 left-0 right-0 px-4">
            <div className="glass-morphism rounded-xl p-3">
              <h3 className="text-sm font-medium mb-3 px-2">Friends Nearby</h3>
              <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
                {nearbyFriends.map((friend) => (
                  <StoryPreview
                    key={friend.id}
                    name={friend.name}
                    avatar={friend.avatar}
                    hasUnviewed={friend.hasUnviewed}
                    isOfficial={friend.isOfficial}
                    hasNFT={friend.hasNFT}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default MapPage;
