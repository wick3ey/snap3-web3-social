
import React from 'react';
import { Check, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ChatMessageProps {
  content: string;
  isOwn: boolean;
  timestamp: string;
  status?: 'sent' | 'delivered' | 'read' | 'pending';
  type?: 'text' | 'image' | 'transaction';
  senderAvatar?: string;
  senderName?: string;
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
  transactionAmount,
}) => {
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
            <Check size={12} className="text-snap-blue" />
            <Check size={12} className="text-snap-blue -ml-1" />
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
          <div className="rounded-lg overflow-hidden max-w-[240px]">
            <img src={content} alt="Shared image" className="w-full h-full object-cover" />
          </div>
        );
      case 'transaction':
        return (
          <div className="flex flex-col items-center p-3 bg-solana-purple/20 rounded-lg">
            <div className="text-sm font-medium mb-1">Transaction</div>
            <div className="text-lg font-bold">{transactionAmount} SOL</div>
            <div className="text-xs text-gray-400 mt-1">{content}</div>
          </div>
        );
      case 'text':
      default:
        return <p className="text-sm">{content}</p>;
    }
  };

  return (
    <div className={cn(
      "flex mb-3 max-w-[80%]",
      isOwn ? "ml-auto" : "mr-auto"
    )}>
      {!isOwn && (
        <div className="mr-2 mt-1">
          <Avatar className="w-8 h-8">
            <AvatarImage src={senderAvatar} />
            <AvatarFallback>{senderName?.substring(0, 2) || "UN"}</AvatarFallback>
          </Avatar>
        </div>
      )}
      
      <div className="flex flex-col">
        {!isOwn && senderName && (
          <span className="text-xs text-gray-400 mb-1">{senderName}</span>
        )}
        
        <div className={cn(
          "rounded-2xl p-3",
          isOwn 
            ? "bg-snap-yellow text-black rounded-tr-none" 
            : "bg-white/10 rounded-tl-none"
        )}>
          {renderContent()}
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
