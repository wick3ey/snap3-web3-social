
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
  onClick?: () => void;
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
  onClick,
}) => {
  return (
    <div 
      className="flex items-center p-3 gap-3 hover:bg-white/5 active:bg-white/10 rounded-lg transition-colors cursor-pointer"
      onClick={onClick}
    >
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
          <h3 className={cn(
            "font-medium truncate",
            unreadCount > 0 ? "font-semibold" : ""
          )}>{name}</h3>
          <span className={cn(
            "text-xs text-gray-400",
            unreadCount > 0 ? "text-solana-purple font-medium" : ""
          )}>{time}</span>
        </div>
        <p className={cn(
          "text-sm text-gray-400 truncate",
          unreadCount > 0 ? "text-gray-200 font-medium" : ""
        )}>{lastMessage}</p>
      </div>
      
      {unreadCount > 0 && (
        <Badge className="rounded-full bg-solana-purple text-white ml-1">{unreadCount}</Badge>
      )}
    </div>
  );
};

export default ChatListItem;
