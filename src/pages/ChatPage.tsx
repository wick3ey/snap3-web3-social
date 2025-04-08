
import React from 'react';
import { Plus, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '@/components/layout/MobileLayout';
import ChatListItem from '@/components/chat/ChatListItem';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ChatPage = () => {
  const navigate = useNavigate();
  
  // Dummy data for chat list
  const chats = [
    {
      id: '1',
      name: 'Alex Web3',
      avatar: '/placeholder.svg',
      lastMessage: 'Check out this new NFT collection! 🔥',
      time: '10m',
      unreadCount: 2,
      isOnline: true,
      hasStory: true,
      hasNFTAvatar: true,
    },
    {
      id: '2',
      name: 'Sarah',
      avatar: '/placeholder.svg',
      lastMessage: 'Sent you 0.5 SOL',
      time: '1h',
      unreadCount: 0,
      isOnline: false,
      hasStory: true,
      hasNFTAvatar: false,
    },
    {
      id: '3',
      name: 'Crypto Group',
      avatar: '/placeholder.svg',
      lastMessage: 'John: Anyone joining the hackathon?',
      time: '3h',
      unreadCount: 5,
      isOnline: false,
      hasStory: false,
      hasNFTAvatar: false,
    },
    {
      id: '4',
      name: 'NFT Collectors',
      avatar: '/placeholder.svg',
      lastMessage: 'New drop this weekend!',
      time: '5h',
      unreadCount: 0,
      isOnline: false,
      hasStory: true,
      hasNFTAvatar: false,
    },
    {
      id: '5',
      name: 'Michael',
      avatar: '/placeholder.svg',
      lastMessage: 'How was the Solana event?',
      time: '1d',
      unreadCount: 0,
      isOnline: true,
      hasStory: false,
      hasNFTAvatar: false,
    },
  ];

  const handleCreateNewChat = () => {
    // In a real app, this would open a contact selection UI
    console.log('Create new chat');
  };

  const handleChatItemClick = (chatId: string) => {
    navigate(`/chat/${chatId}`);
  };

  return (
    <MobileLayout>
      <div className="flex flex-col h-full">
        <div className="p-4 glass-morphism sticky top-0 z-10">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold">Chat</h1>
            <Button size="icon" className="rounded-full bg-snap-yellow text-black" onClick={handleCreateNewChat}>
              <Plus size={18} />
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <Input 
              placeholder="Search friends & groups" 
              className="pl-9 bg-white/5 border-none rounded-full"
            />
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          {chats.map((chat) => (
            <div key={chat.id} onClick={() => handleChatItemClick(chat.id)}>
              <ChatListItem
                name={chat.name}
                avatar={chat.avatar}
                lastMessage={chat.lastMessage}
                time={chat.time}
                unreadCount={chat.unreadCount}
                isOnline={chat.isOnline}
                hasStory={chat.hasStory}
                hasNFTAvatar={chat.hasNFTAvatar}
              />
            </div>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
};

export default ChatPage;
