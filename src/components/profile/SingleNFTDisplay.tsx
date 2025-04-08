
import React from 'react';
import { ImageIcon } from 'lucide-react';

interface SingleNFTDisplayProps {
  image: string;
  name: string;
  collectionName: string;
  onClick?: () => void;
}

const SingleNFTDisplay: React.FC<SingleNFTDisplayProps> = ({ 
  image, 
  name, 
  collectionName, 
  onClick 
}) => {
  return (
    <div 
      className="snap-card overflow-hidden cursor-pointer" 
      onClick={onClick}
    >
      <div className="relative aspect-square">
        {image ? (
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-800">
            <ImageIcon size={24} className="text-gray-500" />
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
          <p className="text-xs font-medium truncate">{name}</p>
          <p className="text-xs text-gray-400 truncate">{collectionName}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleNFTDisplay;
