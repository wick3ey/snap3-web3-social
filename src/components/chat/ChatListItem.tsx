
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ChatListItemProps {
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unreadCount?: number;
  isOnline?: boolean;
  hasStory?: boolean;
  hasNFTAvatar?: boolean;
}

const ChatListItem: React.FC<ChatListItemProps> = ({
  name,
  avatar,
  lastMessage,
  time,
  unreadCount = 0,
  isOnline = false,
  hasStory = false,
  hasNFTAvatar = false,
}) => {
  return (
    <div className="flex items-center p-3 gap-3 hover:bg-white/5 rounded-lg transition-colors">
      <div className="relative">
        <div className={cn(
          "w-12 h-12 rounded-full overflow-hidden",
          hasStory ? "border-2 border-snap-purple p-0.5" : ""
        )}>
          <img src={avatar} alt={name} className="w-full h-full object-cover rounded-full" />
          {hasNFTAvatar && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-solana-purple rounded-full flex items-center justify-center">
              <span className="text-white text-[8px] font-bold">NFT</span>
            </div>
          )}
        </div>
        {isOnline && (
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border border-snap-dark"></div>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <h3 className="font-medium truncate">{name}</h3>
          <span className="text-xs text-gray-400">{time}</span>
        </div>
        <p className="text-sm text-gray-400 truncate">{lastMessage}</p>
      </div>
      
      {unreadCount > 0 && (
        <Badge className="rounded-full bg-snap-yellow text-black">{unreadCount}</Badge>
      )}
    </div>
  );
};

export default ChatListItem;
