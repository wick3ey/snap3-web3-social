
import React from 'react';
import { ArrowLeft, Video, Phone, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface ChatHeaderProps {
  name: string;
  avatar: string;
  isOnline?: boolean;
  isGroup?: boolean;
  memberCount?: number;
  onProfileClick: () => void;
  onVideoCall?: () => void;
  onVoiceCall?: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  name,
  avatar,
  isOnline = false,
  isGroup = false,
  memberCount,
  onProfileClick,
  onVideoCall,
  onVoiceCall,
}) => {
  const navigate = useNavigate();

  return (
    <div className="glass-morphism sticky top-0 z-10 p-3">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-gray-400 mr-2"
          onClick={() => navigate('/chat')}
        >
          <ArrowLeft size={20} />
        </Button>
        
        <Avatar 
          className="h-9 w-9 mr-3 cursor-pointer"
          onClick={onProfileClick}
        >
          <AvatarImage src={avatar} />
          <AvatarFallback className="bg-solana-purple/20 text-solana-purple">
            {name.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        
        <div 
          className="flex-1 cursor-pointer"
          onClick={onProfileClick}
        >
          <h2 className="font-semibold">{name}</h2>
          <div className="flex items-center">
            {isGroup ? (
              <span className="text-xs text-gray-400">
                {memberCount} members
              </span>
            ) : (
              <>
                <span className={cn(
                  "h-2 w-2 rounded-full mr-1.5",
                  isOnline ? "bg-green-500" : "bg-gray-400"
                )}></span>
                <span className="text-xs text-gray-400">
                  {isOnline ? 'Online' : 'Offline'}
                </span>
              </>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          {onVoiceCall && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-gray-400 hover:text-solana-purple"
              onClick={onVoiceCall}
            >
              <Phone size={18} />
            </Button>
          )}
          
          {onVideoCall && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-gray-400 hover:text-solana-purple"
              onClick={onVideoCall}
            >
              <Video size={18} />
            </Button>
          )}
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-gray-400 hover:text-solana-purple"
              >
                <MoreVertical size={18} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[180px] bg-snap-dark-blue border border-white/10">
              <DropdownMenuItem className="hover:bg-white/5">
                View profile
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-white/5">
                Search in conversation
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-white/5">
                Mute notifications
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-500 hover:bg-white/5 hover:text-red-500">
                Block user
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
