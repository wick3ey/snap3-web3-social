import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Camera, ArrowLeft, Paperclip, Send, Smile, Plus, CreditCard } from 'lucide-react';
import MobileLayout from '@/components/layout/MobileLayout';
import ChatMessage from '@/components/chat/ChatMessage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import TokenTransactionModal from '@/components/chat/TokenTransactionModal';

interface ChatMessageData {
  id: string;
  content: string;
  isOwn: boolean;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read' | 'pending';
  type: 'text' | 'image' | 'transaction';
  senderAvatar?: string;
  senderName?: string;
  transactionAmount?: number;
}

const dummyMessages: ChatMessageData[] = [
  {
    id: '1',
    content: 'Hey there! How are you?',
    isOwn: false,
    timestamp: '10:30 AM',
    status: 'read',
    type: 'text',
    senderAvatar: '/placeholder.svg',
    senderName: 'Alex',
  },
  {
    id: '2',
    content: "I'm doing well, thanks! Just checked out that new NFT collection you mentioned.",
    isOwn: true,
    timestamp: '10:32 AM',
    status: 'read',
    type: 'text',
  },
  {
    id: '3',
    content: 'Nice! What did you think of it?',
    isOwn: false,
    timestamp: '10:33 AM',
    status: 'read',
    type: 'text',
    senderAvatar: '/placeholder.svg',
    senderName: 'Alex',
  },
  {
    id: '4',
    content: '/placeholder.svg',
    isOwn: true,
    timestamp: '10:35 AM',
    status: 'read',
    type: 'image',
  },
  {
    id: '5',
    content: 'Thanks for sending 0.5 SOL',
    isOwn: false,
    timestamp: '10:38 AM',
    status: 'delivered',
    type: 'transaction',
    transactionAmount: 0.5,
    senderAvatar: '/placeholder.svg',
    senderName: 'Alex',
  },
  {
    id: '6',
    content: 'No problem! Let me know if you need anything else.',
    isOwn: true,
    timestamp: '10:40 AM',
    status: 'delivered',
    type: 'text',
  },
];

const ChatConversationPage: React.FC = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessageData[]>(dummyMessages);
  const [isOnline, setIsOnline] = useState(true);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: ChatMessageData = {
        id: Date.now().toString(),
        content: message,
        isOwn: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'sent',
        type: 'text',
      };
      
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendToken = (amount: number, note: string) => {
    const newMessage: ChatMessageData = {
      id: Date.now().toString(),
      content: note || `Sent ${amount} SOL`,
      isOwn: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
      type: 'transaction',
      transactionAmount: amount,
    };
    
    setMessages([...messages, newMessage]);
  };

  return (
    <MobileLayout hideNavigation>
      <div className="flex flex-col h-full">
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
            
            <Avatar className="h-9 w-9 mr-3">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>AL</AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <h2 className="font-semibold">Alex Web3</h2>
              <div className="flex items-center">
                <span className={cn(
                  "h-2 w-2 rounded-full mr-1.5",
                  isOnline ? "bg-green-500" : "bg-gray-400"
                )}></span>
                <span className="text-xs text-gray-400">
                  {isOnline ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="text-gray-400">
                <Camera size={20} />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 scrollbar-none">
          {messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              content={msg.content}
              isOwn={msg.isOwn}
              timestamp={msg.timestamp}
              status={msg.status}
              type={msg.type}
              senderAvatar={msg.senderAvatar}
              senderName={msg.senderName}
              transactionAmount={msg.transactionAmount}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="glass-morphism p-3">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full text-gray-400">
              <Plus size={20} />
            </Button>
            
            <div className="relative flex-1">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type a message"
                className="pl-3 pr-10 py-2 bg-white/5 border-none rounded-full w-full focus:ring-0"
              />
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-400 h-8 w-8"
              >
                <Smile size={18} />
              </Button>
            </div>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full text-gray-400"
              onClick={handleSendMessage}
            >
              {message.trim() ? (
                <Send size={20} className="text-snap-yellow" />
              ) : (
                <div className="flex space-x-1">
                  <Paperclip size={20} />
                </div>
              )}
            </Button>
          </div>
          
          <div className="flex justify-center mt-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="rounded-full text-xs flex items-center gap-1 px-3 py-1 bg-white/10 text-gray-300"
              onClick={() => setShowTransactionModal(true)}
            >
              <CreditCard size={14} />
              <span>Send SOL</span>
            </Button>
          </div>
        </div>
      </div>
      
      {showTransactionModal && (
        <TokenTransactionModal
          recipient={{
            name: 'Alex Web3',
            avatar: '/placeholder.svg',
            walletAddress: '5FHt1KEbkPFZ9opJyh3hqoXDWnxhyBJ7eLGaFFPzJsqj',
          }}
          onClose={() => setShowTransactionModal(false)}
          onSend={handleSendToken}
          currentBalance={4.5}
        />
      )}
    </MobileLayout>
  );
};

export default ChatConversationPage;
