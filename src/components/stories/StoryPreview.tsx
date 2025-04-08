
import React from 'react';
import { cn } from '@/lib/utils';

interface StoryPreviewProps {
  name: string;
  avatar: string;
  hasUnviewed?: boolean;
  isOfficial?: boolean;
  hasNFT?: boolean;
}

const StoryPreview: React.FC<StoryPreviewProps> = ({
  name,
  avatar,
  hasUnviewed = false,
  isOfficial = false,
  hasNFT = false,
}) => {
  return (
    <div className="flex flex-col items-center w-20">
      <div className="relative mb-1">
        <div 
          className={cn(
            "w-16 h-16 rounded-full p-[2px]",
            hasUnviewed 
              ? "bg-gradient-to-br from-snap-yellow to-snap-blue" 
              : "bg-gray-600"
          )}
        >
          <div className="bg-snap-dark rounded-full p-[2px]">
            <img 
              src={avatar} 
              alt={name} 
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
        
        {isOfficial && (
          <div className="absolute -bottom-1 -right-1 bg-snap-yellow text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full">
            ✓
          </div>
        )}
        
        {hasNFT && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-solana-purple rounded-full flex items-center justify-center">
            <span className="text-white text-[8px] font-bold">NFT</span>
          </div>
        )}
      </div>
      <p className="text-xs text-center truncate w-full">{name}</p>
    </div>
  );
};

export default StoryPreview;
