
import React from 'react';
import { MessageCircle, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface ChatEmptyStateProps {
  onStartChat: () => void;
}

const ChatEmptyState: React.FC<ChatEmptyStateProps> = ({ onStartChat }) => {
  const navigate = useNavigate();
  
  const handleOpenCamera = () => {
    navigate('/camera');
  };

  return (
    <div className="flex flex-col items-center justify-center h-[300px] p-4">
      <div className="w-16 h-16 rounded-full bg-solana-purple/20 flex items-center justify-center mb-4">
        <MessageCircle size={24} className="text-solana-purple" />
      </div>
      <h3 className="text-lg font-medium mb-1">No messages yet</h3>
      <p className="text-gray-400 text-center text-sm mb-4">
        Start a conversation with your friends
      </p>
      <div className="flex flex-col gap-3 w-full max-w-[240px]">
        <Button 
          className="bg-solana-purple hover:bg-solana-purple/90 text-white w-full"
          onClick={onStartChat}
        >
          Start a new chat
        </Button>
        <Button 
          variant="outline"
          className="w-full border-white/10 hover:bg-white/5 text-white"
          onClick={handleOpenCamera}
        >
          <Camera size={16} className="mr-2" />
          Send a snap
        </Button>
      </div>
    </div>
  );
};

export default ChatEmptyState;
