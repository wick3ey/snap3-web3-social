
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MobileLayout from '@/components/layout/MobileLayout';
import ChatMessage from '@/components/chat/ChatMessage';
import ChatHeader from '@/components/chat/ChatHeader';
import MessageInput from '@/components/chat/MessageInput';
import TokenTransactionModal from '@/components/chat/TokenTransactionModal';
import { toast } from 'sonner';

interface ChatMessageData {
  id: string;
  content: string;
  isOwn: boolean;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read' | 'pending';
  type: 'text' | 'image' | 'transaction';
  senderAvatar?: string;
  senderName?: string;
  senderId?: string;
  transactionAmount?: number;
}

const ChatConversationPage: React.FC = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessageData[]>([]);
  const [isOnline, setIsOnline] = useState(true);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Get chat details based on chatId
  const chatDetails = {
    id: chatId,
    name: 'Alex Web3',
    avatar: '/placeholder.svg',
    isOnline: true,
    isGroup: false,
    memberCount: 0,
  };
  
  // Load initial messages
  useEffect(() => {
    // This would be an API call in a real app
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
        senderId: '1',
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
        senderId: '1',
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
        senderId: '1',
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
    
    setMessages(dummyMessages);
  }, [chatId]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Simulate typing indicator
  useEffect(() => {
    if (isOnline && messages.length > 0) {
      const typingTimeout = setTimeout(() => {
        const simulatedResponse: ChatMessageData = {
          id: Date.now().toString(),
          content: 'By the way, have you seen the latest Solana updates?',
          isOwn: false,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'sent',
          type: 'text',
          senderAvatar: '/placeholder.svg',
          senderName: 'Alex',
          senderId: chatId,
        };
        
        setMessages(prev => [...prev, simulatedResponse]);
      }, 30000);
      
      return () => clearTimeout(typingTimeout);
    }
  }, [messages.length, isOnline, chatId]);

  const handleSendMessage = (message: string) => {
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
      
      // Simulate message status updates
      setTimeout(() => {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === newMessage.id 
              ? { ...msg, status: 'delivered' as const } 
              : msg
          )
        );
        
        setTimeout(() => {
          setMessages(prev => 
            prev.map(msg => 
              msg.isOwn && (msg.status === 'sent' || msg.status === 'delivered')
                ? { ...msg, status: 'read' as const } 
                : msg
            )
          );
        }, 3000);
      }, 1500);
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
    setShowTransactionModal(false);
    
    setTimeout(() => {
      const responseMessage: ChatMessageData = {
        id: (Date.now() + 1).toString(),
        content: `Thank you for sending ${amount} SOL!`,
        isOwn: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'sent',
        type: 'text',
        senderAvatar: '/placeholder.svg',
        senderName: 'Alex',
        senderId: chatId,
      };
      
      setMessages(prev => [...prev, responseMessage]);
    }, 3000);
  };

  const handleSendImage = () => {
    toast.info("Opening image selector");
    
    setTimeout(() => {
      const imageMessage: ChatMessageData = {
        id: Date.now().toString(),
        content: '/placeholder.svg',
        isOwn: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'sent',
        type: 'image',
      };
      
      setMessages(prev => [...prev, imageMessage]);
    }, 2000);
  };

  const handleOpenCamera = () => {
    navigate('/camera');
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    toast.info("Recording audio...");
    
    setTimeout(() => {
      setIsRecording(false);
      toast.success("Audio message sent");
      
      const audioMessage: ChatMessageData = {
        id: Date.now().toString(),
        content: "Audio message (0:05)",
        isOwn: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'sent',
        type: 'text',
      };
      
      setMessages(prev => [...prev, audioMessage]);
    }, 5000);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    toast.info("Recording canceled");
  };

  const handleVideoCall = () => {
    toast("Calling Alex...", {
      action: {
        label: "Cancel",
        onClick: () => toast.error("Call canceled"),
      },
    });
  };
  
  const handleVoiceCall = () => {
    toast("Voice calling Alex...", {
      action: {
        label: "Cancel",
        onClick: () => toast.error("Call canceled"),
      },
    });
  };

  const handleContactProfileClick = () => {
    navigate(`/profile/friend/${chatId}`);
  };

  // Group messages by date
  const groupedMessages: { date: string; messages: ChatMessageData[] }[] = [];
  let currentDate = '';
  
  messages.forEach(message => {
    // In a real app, you would format the timestamp properly
    const messageDate = 'Today'; // For demo purposes
    
    if (messageDate !== currentDate) {
      currentDate = messageDate;
      groupedMessages.push({
        date: currentDate,
        messages: [message]
      });
    } else {
      groupedMessages[groupedMessages.length - 1].messages.push(message);
    }
  });

  return (
    <MobileLayout hideNavigation>
      <div className="flex flex-col h-full">
        <ChatHeader 
          name={chatDetails.name}
          avatar={chatDetails.avatar}
          isOnline={chatDetails.isOnline}
          isGroup={chatDetails.isGroup}
          memberCount={chatDetails.memberCount}
          onProfileClick={handleContactProfileClick}
          onVideoCall={handleVideoCall}
          onVoiceCall={handleVoiceCall}
        />
        
        <div className="flex-1 overflow-y-auto p-4 scrollbar-none">
          {groupedMessages.map((group, groupIndex) => (
            <div key={groupIndex}>
              <div className="flex justify-center mb-4">
                <div className="text-xs px-2 py-1 rounded-full bg-white/10 text-gray-400">
                  {group.date}
                </div>
              </div>
              
              {group.messages.map((msg) => (
                <ChatMessage
                  key={msg.id}
                  content={msg.content}
                  isOwn={msg.isOwn}
                  timestamp={msg.timestamp}
                  status={msg.status}
                  type={msg.type}
                  senderAvatar={msg.senderAvatar}
                  senderName={msg.senderName}
                  senderId={msg.senderId || chatId}
                  transactionAmount={msg.transactionAmount}
                />
              ))}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        <MessageInput 
          onSendMessage={handleSendMessage}
          onStartRecording={handleStartRecording}
          onStopRecording={handleStopRecording}
          onAttachmentClick={handleSendImage}
          onCameraClick={handleOpenCamera}
          onTransactionClick={() => setShowTransactionModal(true)}
          isRecording={isRecording}
        />
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
