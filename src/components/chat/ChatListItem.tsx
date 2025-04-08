
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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
          hasStory ? "border-2 border-solana-purple p-0.5" : ""
        )}>
          <Avatar className="w-full h-full">
            <AvatarImage src={avatar} alt={name} className="object-cover" />
            <AvatarFallback className="bg-solana-purple/20 text-solana-purple">
              {name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          {hasNFTAvatar && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-solana-purple rounded-full flex items-center justify-center">
              <span className="text-white text-[8px] font-bold">NFT</span>
            </div>
          )}
        </div>
        {isOnline && (
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-snap-dark shadow-lg"></div>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <h3 className={cn(
            "font-medium truncate",
            unreadCount > 0 ? "font-semibold text-white" : "text-gray-200"
          )}>{name}</h3>
          <span className={cn(
            "text-xs",
            unreadCount > 0 ? "text-solana-purple font-medium" : "text-gray-400"
          )}>{time}</span>
        </div>
        <p className={cn(
          "text-sm truncate",
          unreadCount > 0 ? "text-gray-200 font-medium" : "text-gray-400"
        )}>{lastMessage}</p>
      </div>
      
      {unreadCount > 0 && (
        <Badge className="rounded-full bg-solana-purple text-white ml-1 min-w-[1.5rem] flex items-center justify-center">
          {unreadCount}
        </Badge>
      )}
    </div>
  );
};

export default ChatListItem;
