
import React from 'react';
import { Check, Clock, MessageSquare, Download, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ChatMessageProps {
  content: string;
  isOwn: boolean;
  timestamp: string;
  status?: 'sent' | 'delivered' | 'read' | 'pending';
  type?: 'text' | 'image' | 'transaction';
  senderAvatar?: string;
  senderName?: string;
  senderId?: string;
  transactionAmount?: number;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  content,
  isOwn,
  timestamp,
  status = 'sent',
  type = 'text',
  senderAvatar,
  senderName,
  senderId = '1',
  transactionAmount,
}) => {
  const navigate = useNavigate();

  const renderStatus = () => {
    switch(status) {
      case 'pending':
        return <Clock size={12} className="text-gray-400" />;
      case 'sent':
        return <Check size={12} className="text-gray-400" />;
      case 'delivered':
        return (
          <div className="flex">
            <Check size={12} className="text-gray-400" />
            <Check size={12} className="text-gray-400 -ml-1" />
          </div>
        );
      case 'read':
        return (
          <div className="flex">
            <Check size={12} className="text-solana-purple" />
            <Check size={12} className="text-solana-purple -ml-1" />
          </div>
        );
      default:
        return null;
    }
  };

  const renderContent = () => {
    switch(type) {
      case 'image':
        return (
          <div className="relative rounded-lg overflow-hidden max-w-[240px] group">
            <img src={content} alt="Shared image" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity">
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-8 w-8 rounded-full bg-black/30 text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  toast.success("Image saved to gallery");
                }}
              >
                <Download size={16} />
              </Button>
            </div>
          </div>
        );
      case 'transaction':
        return (
          <div className="flex flex-col items-center p-4 bg-solana-purple/20 backdrop-blur-sm rounded-lg border border-solana-purple/30">
            <div className="text-sm font-medium mb-1 text-solana-purple">Transaction</div>
            <div className="text-lg font-bold">{transactionAmount} SOL</div>
            <div className="text-xs text-gray-400 mt-1">{content}</div>
            <Button 
              variant="link" 
              size="sm" 
              className="text-solana-purple mt-2 text-xs"
              onClick={(e) => {
                e.stopPropagation();
                toast.success("Transaction details copied to clipboard");
              }}
            >
              <Copy size={12} className="mr-1" />
              Copy transaction details
            </Button>
          </div>
        );
      case 'text':
      default:
        return (
          <div className="text-sm whitespace-pre-wrap break-words">
            {content}
          </div>
        );
    }
  };

  const handleProfileClick = () => {
    if (!isOwn && senderName) {
      navigate(`/profile/friend/${senderId}`);
    }
  };

  const handleCopyMessage = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(content);
    toast.success("Message copied to clipboard");
  };

  return (
    <div 
      className={cn(
        "flex mb-4 max-w-[80%] group",
        isOwn ? "ml-auto" : "mr-auto"
      )}
    >
      {!isOwn && (
        <div 
          className="mr-2 mt-1 cursor-pointer"
          onClick={handleProfileClick}
        >
          <Avatar className="w-8 h-8">
            <AvatarImage src={senderAvatar} />
            <AvatarFallback className="bg-solana-purple/20 text-solana-purple">
              {senderName?.substring(0, 2) || "UN"}
            </AvatarFallback>
          </Avatar>
        </div>
      )}
      
      <div className="flex flex-col">
        {!isOwn && senderName && (
          <span 
            className="text-xs text-gray-400 mb-1 cursor-pointer hover:text-solana-purple transition-colors"
            onClick={handleProfileClick}
          >
            {senderName}
          </span>
        )}
        
        <div 
          className={cn(
            "rounded-2xl p-3 relative",
            type === 'text' && isOwn 
              ? "bg-solana-purple text-white rounded-tr-none" 
              : type === 'text' && !isOwn
                ? "bg-white/10 rounded-tl-none" 
                : ""
          )}
        >
          {renderContent()}
          
          {type === 'text' && (
            <div className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-7 w-7 text-gray-400 hover:text-white hover:bg-black/20"
                onClick={handleCopyMessage}
              >
                <Copy size={14} />
              </Button>
            </div>
          )}
        </div>
        
        <div className={cn(
          "flex items-center mt-1 text-xs text-gray-400",
          isOwn ? "justify-end" : "justify-start"
        )}>
          <span>{timestamp}</span>
          {isOwn && (
            <span className="ml-1">
              {renderStatus()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
