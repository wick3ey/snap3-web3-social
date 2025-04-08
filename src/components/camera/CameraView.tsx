
import React, { useState } from 'react';
import { Camera, CameraIcon, Sparkles, Timer, X, Send, Download, User, Sticker, Text, FileImage, PencilLine } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CameraView: React.FC = () => {
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const filters = [
    { id: 'solana', name: 'Solana' },
    { id: 'nft', name: 'NFT' },
    { id: 'crypto', name: 'Crypto' },
    { id: 'web3', name: 'Web3' },
  ];

  const editingTools = [
    { id: 'text', icon: Text, label: 'Text' },
    { id: 'draw', icon: PencilLine, label: 'Draw' },
    { id: 'sticker', icon: Sticker, label: 'Sticker' },
    { id: 'nft', icon: FileImage, label: 'NFT' },
  ];

  const handleCapture = () => {
    setIsCapturing(true);
    // Simulate camera capture
    setTimeout(() => {
      setCapturedImage('/placeholder.svg');
      setIsCapturing(false);
    }, 500);
  };

  const handleDiscard = () => {
    setCapturedImage(null);
    setActiveFilter(null);
  };

  return (
    <div className="relative h-full w-full flex flex-col">
      {/* Camera Viewfinder */}
      <div className="absolute inset-0 bg-black">
        {capturedImage ? (
          <div className="relative h-full">
            <img 
              src={capturedImage} 
              alt="Captured" 
              className={`h-full w-full object-cover ${activeFilter ? `filter-${activeFilter}` : ''}`}
            />
            {activeFilter === 'solana' && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-4 right-4 bg-solana-purple text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                  Verified on Solana
                </div>
                <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 web3-gradient p-0.5 rounded-2xl">
                  <div className="bg-black/80 backdrop-blur-md px-4 py-2 rounded-2xl">
                    <p className="text-white text-sm font-medium">SOL Balance: 24.56</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="h-full w-full flex items-center justify-center">
            <Camera className="text-white opacity-20" size={48} />
          </div>
        )}
      </div>

      {/* Top Camera Controls */}
      {!capturedImage && (
        <div className="relative z-10 p-4 flex justify-between items-center">
          <Button variant="ghost" size="icon" className="rounded-full bg-black/20 text-white">
            <User size={18} />
          </Button>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="rounded-full bg-black/20 text-white">
              <CameraIcon size={18} />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full bg-black/20 text-white">
              <Timer size={18} />
            </Button>
          </div>
        </div>
      )}

      {/* Filter Carousel (only when not in captured state) */}
      {!capturedImage && (
        <div className="absolute top-20 left-0 right-0 z-10 px-4">
          <div className="flex gap-2 overflow-x-auto py-2 scrollbar-none">
            {filters.map(filter => (
              <button
                key={filter.id}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full ${
                  activeFilter === filter.id ? 'bg-snap-yellow text-black' : 'bg-black/30 text-white'
                }`}
                onClick={() => setActiveFilter(filter.id)}
              >
                <span className="text-sm font-medium">{filter.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Controls */}
      <div className="relative z-10 mt-auto mb-20 px-6 py-4">
        {capturedImage ? (
          <div className="flex flex-col">
            <div className="flex justify-between mb-4">
              {editingTools.map(tool => (
                <button
                  key={tool.id}
                  className="flex flex-col items-center gap-1"
                >
                  <div className="snap-icon-button">
                    <tool.icon size={20} className="text-white" />
                  </div>
                  <span className="text-xs text-white/70">{tool.label}</span>
                </button>
              ))}
            </div>
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                size="icon"
                className="rounded-full w-12 h-12 bg-white/10 border-0 text-white"
                onClick={handleDiscard}
              >
                <X size={24} />
              </Button>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full w-12 h-12 bg-white/10 border-0 text-white"
                >
                  <Download size={20} />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full w-12 h-12 bg-snap-yellow border-0 text-black"
                >
                  <Send size={20} />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <Button
              variant="outline"
              size="icon"
              className={`rounded-full w-16 h-16 border-4 ${isCapturing ? 'border-gray-500 bg-gray-700' : 'border-white bg-transparent'}`}
              onClick={handleCapture}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CameraView;
