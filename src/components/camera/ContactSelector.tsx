
import React, { useState } from 'react';
import { ArrowLeft, Search, X, User, Send, UsersRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';

interface ContactSelectorProps {
  onSelectContact: (contactId: string) => void;
  onCancel: () => void;
  image?: string;
}

const ContactSelector: React.FC<ContactSelectorProps> = ({ 
  onSelectContact, 
  onCancel,
  image 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);

  // Dummy contacts data
  const contacts = [
    { id: '1', name: 'Alex Web3', avatar: '/placeholder.svg', username: 'alex_web3', isOnline: true },
    { id: '2', name: 'Sarah', avatar: '/placeholder.svg', username: 'sarah_crypto', isOnline: false },
    { id: '3', name: 'Michael', avatar: '/placeholder.svg', username: 'michael_dev', isOnline: true },
    { id: '4', name: 'Jessica', avatar: '/placeholder.svg', username: 'jessica_nft', isOnline: false },
    { id: '5', name: 'David', avatar: '/placeholder.svg', username: 'david_blockchain', isOnline: true },
  ];

  // Filter contacts based on search query
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleContactSelect = (contactId: string) => {
    if (selectedContacts.includes(contactId)) {
      setSelectedContacts(selectedContacts.filter(id => id !== contactId));
    } else {
      setSelectedContacts([...selectedContacts, contactId]);
    }
  };

  const handleSend = () => {
    if (selectedContacts.length === 0) {
      toast.error("Please select at least one contact");
      return;
    }
    
    // For simplicity, we'll just send to the first selected contact
    // In a real app, you might want to handle multiple recipients
    onSelectContact(selectedContacts[0]);
  };

  const getContactById = (id: string) => {
    return contacts.find(contact => contact.id === id);
  };

  return (
    <div className="flex flex-col h-full bg-snap-dark">
      {/* Header */}
      <div className="p-4 flex justify-between items-center glass-morphism sticky top-0 z-10">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onCancel}
            className="mr-2"
          >
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-lg font-medium">Send To</h1>
        </div>
        
        {selectedContacts.length > 0 && (
          <Button 
            onClick={handleSend}
            className="bg-snap-yellow text-black hover:bg-snap-yellow/90"
          >
            <Send size={16} className="mr-1" />
            Send
          </Button>
        )}
      </div>

      {/* Preview image */}
      {image && (
        <div className="px-4 pt-2 flex justify-center">
          <div className="w-16 h-16 relative overflow-hidden rounded-lg border border-white/20">
            <img src={image} alt="Preview" className="w-full h-full object-cover" />
          </div>
        </div>
      )}
      
      {/* Search input */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <Input 
            placeholder="Search friends" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-white/5 border-none rounded-full"
          />
        </div>
      </div>

      {/* Selected contacts */}
      {selectedContacts.length > 0 && (
        <div className="px-4 pb-2">
          <h2 className="text-sm text-gray-400 mb-2">Selected</h2>
          <div className="flex flex-wrap gap-2">
            {selectedContacts.map(contactId => {
              const contact = getContactById(contactId);
              if (!contact) return null;
              
              return (
                <div key={contactId} className="flex items-center bg-white/10 rounded-full pr-2 pl-1 py-1">
                  <Avatar className="h-6 w-6 mr-1">
                    <AvatarImage src={contact.avatar} />
                    <AvatarFallback>{contact.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{contact.name}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-5 w-5 ml-1"
                    onClick={() => handleContactSelect(contactId)}
                  >
                    <X size={12} />
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      )}
      
      {/* Suggested section */}
      <div className="px-4 py-2">
        <h2 className="text-sm text-gray-400 mb-2">Quick Add</h2>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
          <button className="flex flex-col items-center w-16">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-1">
              <UsersRound size={20} />
            </div>
            <span className="text-xs">New Group</span>
          </button>
          
          {contacts.filter(c => c.isOnline).slice(0, 3).map(contact => (
            <button 
              key={contact.id}
              className="flex flex-col items-center w-16"
              onClick={() => handleContactSelect(contact.id)}
            >
              <div className="relative">
                <Avatar className="w-12 h-12 border border-white/10">
                  <AvatarImage src={contact.avatar} />
                  <AvatarFallback>{contact.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border border-snap-dark"></div>
              </div>
              <span className="text-xs truncate w-full text-center">{contact.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Contact list */}
      <div className="flex-1 overflow-auto">
        <div className="px-4 py-2">
          <h2 className="text-sm text-gray-400 mb-2">Friends</h2>
          <div className="space-y-1">
            {filteredContacts.map(contact => (
              <div 
                key={contact.id}
                className={`flex items-center p-2 rounded-lg cursor-pointer ${
                  selectedContacts.includes(contact.id) ? 'bg-white/20' : 'hover:bg-white/10'
                }`}
                onClick={() => handleContactSelect(contact.id)}
              >
                <div className="relative">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={contact.avatar} />
                    <AvatarFallback>{contact.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  {contact.isOnline && (
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-snap-dark"></div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{contact.name}</h3>
                  <p className="text-xs text-gray-400">@{contact.username}</p>
                </div>
                <div>
                  {selectedContacts.includes(contact.id) ? (
                    <div className="w-6 h-6 bg-snap-yellow rounded-full flex items-center justify-center">
                      <Check size={14} className="text-black" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center">
                      <Send size={12} className="text-white" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Need to add the Check icon to our imports
import { Check } from 'lucide-react';

export default ContactSelector;
