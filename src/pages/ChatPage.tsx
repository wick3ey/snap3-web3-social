
import React, { useState, useEffect } from 'react';
import { Plus, Search, ChevronLeft, Filter, Users, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '@/components/layout/MobileLayout';
import ChatListItem from '@/components/chat/ChatListItem';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const ChatPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
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
      isGroup: true,
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
      isGroup: true,
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
    {
      id: '6',
      name: 'Web3 Devs',
      avatar: '/placeholder.svg',
      lastMessage: 'Lisa: Just deployed my new dApp!',
      time: '2d',
      unreadCount: 0,
      isOnline: false,
      hasStory: false,
      hasNFTAvatar: false,
      isGroup: true,
    },
  ];

  // Filter chats based on search query and active tab
  const filteredChats = chats.filter(chat => {
    const matchesSearch = chat.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = 
      activeTab === 'all' || 
      (activeTab === 'groups' && chat.isGroup) || 
      (activeTab === 'direct' && !chat.isGroup);
    
    return matchesSearch && matchesTab;
  });

  // Online contacts for quick access
  const onlineContacts = chats.filter(chat => chat.isOnline && !chat.isGroup);

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
        <div className="p-4 glass-morphism sticky top-0 z-10 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-gradient">Messages</h1>
              <Badge className="bg-solana-purple text-white text-xs py-0.5">
                {chats.reduce((count, chat) => count + chat.unreadCount, 0)}
              </Badge>
            </div>
            <div className="flex gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button size="icon" variant="ghost" className="rounded-full w-9 h-9 bg-white/5">
                    <Filter size={18} />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-snap-dark w-[280px] border-l border-white/10">
                  <div className="py-6">
                    <h3 className="text-lg font-semibold mb-4">Filter Messages</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2 text-gray-400">Message Type</h4>
                        <div className="space-y-2">
                          <Button variant="outline" className="w-full justify-start bg-white/5 border-white/10 hover:bg-white/10">
                            All Messages
                          </Button>
                          <Button variant="outline" className="w-full justify-start bg-white/5 border-white/10 hover:bg-white/10">
                            Unread
                          </Button>
                          <Button variant="outline" className="w-full justify-start bg-white/5 border-white/10 hover:bg-white/10">
                            Transactions
                          </Button>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-2 text-gray-400">Sort By</h4>
                        <div className="space-y-2">
                          <Button variant="outline" className="w-full justify-start bg-white/5 border-white/10 hover:bg-white/10">
                            Recent
                          </Button>
                          <Button variant="outline" className="w-full justify-start bg-white/5 border-white/10 hover:bg-white/10">
                            Online First
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
              
              <Button 
                size="icon" 
                className="rounded-full w-9 h-9 bg-solana-purple text-white" 
                onClick={handleCreateNewChat}
              >
                <Plus size={18} />
              </Button>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <Input 
              placeholder="Search messages" 
              className="pl-9 bg-white/5 border-none rounded-full text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 bg-white/5 rounded-full h-9">
              <TabsTrigger 
                value="all" 
                className="rounded-full data-[state=active]:bg-solana-purple data-[state=active]:text-white"
              >
                All
              </TabsTrigger>
              <TabsTrigger 
                value="direct" 
                className="rounded-full data-[state=active]:bg-solana-purple data-[state=active]:text-white"
              >
                <MessageCircle size={14} className="mr-1" />
                Direct
              </TabsTrigger>
              <TabsTrigger 
                value="groups" 
                className="rounded-full data-[state=active]:bg-solana-purple data-[state=active]:text-white"
              >
                <Users size={14} className="mr-1" />
                Groups
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {onlineContacts.length > 0 && (
          <div className="px-4 pt-2 pb-1">
            <p className="text-xs font-medium text-gray-400 mb-2">ONLINE CONTACTS</p>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
              {onlineContacts.map(contact => (
                <div 
                  key={contact.id} 
                  className="flex flex-col items-center min-w-[4rem]"
                  onClick={() => handleChatItemClick(contact.id)}
                >
                  <div className="relative mb-1">
                    <Avatar className="w-12 h-12 border-2 border-solana-purple p-0.5">
                      <AvatarImage src={contact.avatar} />
                      <AvatarFallback className="bg-solana-purple/20 text-solana-purple">
                        {contact.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-snap-dark"></div>
                  </div>
                  <span className="text-xs text-gray-200 truncate w-full text-center">{contact.name.split(' ')[0]}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex-1 overflow-auto">
          {filteredChats.length > 0 ? (
            filteredChats.map((chat) => (
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
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-[200px] p-4">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                <MessageCircle size={24} className="text-gray-400" />
              </div>
              <p className="text-gray-400 text-center">No conversations found</p>
              <Button 
                variant="link" 
                className="text-solana-purple mt-2"
                onClick={handleCreateNewChat}
              >
                Start a new chat
              </Button>
            </div>
          )}
        </div>
      </div>
    </MobileLayout>
  );
};

export default ChatPage;

import { Badge } from '@/components/ui/badge';
