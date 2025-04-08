
import React from 'react';
import { ImageIcon } from 'lucide-react';

export interface NFT {
  id: string;
  name: string;
  image: string;
  collection: string;
}

interface NFTDisplayProps {
  nfts: NFT[];
}

const NFTDisplay: React.FC<NFTDisplayProps> = ({ nfts }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Your NFTs</h2>
        <button className="text-sm text-snap-yellow">View All</button>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {nfts.map((nft) => (
          <div key={nft.id} className="snap-card overflow-hidden">
            <div className="relative aspect-square">
              {nft.image ? (
                <img 
                  src={nft.image} 
                  alt={nft.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-800">
                  <ImageIcon size={32} className="text-gray-500" />
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
  );
};

export default NFTDisplay;
