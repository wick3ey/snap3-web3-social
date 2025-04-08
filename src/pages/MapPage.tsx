
import React, { useState, useEffect } from 'react';
import { Search, MapPin, User, Users, Zap, Info, Plus, Minus, MessageCircle } from 'lucide-react';
import MobileLayout from '@/components/layout/MobileLayout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface NearbyUser {
  id: string;
  name: string;
  avatar: string;
  distance: string;
  isOnline: boolean;
  hasStory: boolean;
  hasNFT: boolean;
  location: { x: number; y: number };
}

interface Event {
  id: string;
  title: string;
  image: string;
  location: string;
  date: string;
  attendees: number;
  verified: boolean;
  coordinates: { x: number; y: number };
}

const MapPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [mapMode, setMapMode] = useState<'users' | 'events'>('users');
  const [selectedPin, setSelectedPin] = useState<string | null>(null);
  const [mapZoom, setMapZoom] = useState(1);
  const [userLocation, setUserLocation] = useState({ x: 50, y: 50 });
  
  // Dummy users nearby
  const nearbyUsers: NearbyUser[] = [
    {
      id: '1',
      name: 'Alex',
      avatar: '/placeholder.svg',
      distance: '0.5 mi',
      isOnline: true,
      hasStory: true,
      hasNFT: true,
      location: { x: 30, y: 40 }
    },
    {
      id: '2',
      name: 'Sarah',
      avatar: '/placeholder.svg',
      distance: '1.2 mi',
      isOnline: true,
      hasStory: true,
      hasNFT: false,
      location: { x: 60, y: 30 }
    },
    {
      id: '3',
      name: 'Michael',
      avatar: '/placeholder.svg',
      distance: '2.5 mi',
      isOnline: false,
      hasStory: false,
      hasNFT: false,
      location: { x: 70, y: 70 }
    },
    {
      id: '4',
      name: 'Jessica',
      avatar: '/placeholder.svg',
      distance: '3.1 mi',
      isOnline: true,
      hasStory: false,
      hasNFT: true,
      location: { x: 20, y: 65 }
    },
  ];
  
  // Dummy events
  const events: Event[] = [
    {
      id: 'e1',
      title: 'Solana Hackathon',
      image: '/placeholder.svg',
      location: 'Tech Hub Downtown',
      date: 'Tomorrow, 9 AM',
      attendees: 120,
      verified: true,
      coordinates: { x: 35, y: 45 }
    },
    {
      id: 'e2',
      title: 'NFT Art Exhibition',
      image: '/placeholder.svg',
      location: 'Digital Gallery',
      date: 'Today, 7 PM',
      attendees: 75,
      verified: true,
      coordinates: { x: 65, y: 25 }
    },
    {
      id: 'e3',
      title: 'Web3 Meetup',
      image: '/placeholder.svg',
      location: 'Crypto Café',
      date: 'Friday, 6 PM',
      attendees: 35,
      verified: false,
      coordinates: { x: 75, y: 60 }
    },
  ];

  // Simulate getting user's location
  useEffect(() => {
    // In a real app, this would use geolocation API
    const locationTimer = setTimeout(() => {
      setUserLocation({ x: 50, y: 50 });
      toast.success("Location updated");
    }, 2000);
    
    return () => clearTimeout(locationTimer);
  }, []);

  const handleZoomIn = () => {
    setMapZoom(prev => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setMapZoom(prev => Math.max(prev - 0.5, 0.5));
  };

  const handlePinClick = (id: string) => {
    setSelectedPin(id);
  };

  const handleViewProfile = (userId: string) => {
    navigate(`/profile/${userId}`);
  };

  const handleSendMessage = (userId: string) => {
    navigate(`/chat/${userId}`);
  };

  const handleViewEvent = (eventId: string) => {
    toast({
      title: "Event details",
      description: "Opening event information",
      action: {
        label: "RSVP",
        onClick: () => toast.success("You're going to this event!"),
      },
    });
  };

  const handleSearchLocation = () => {
    if (searchQuery.trim()) {
      toast.info(`Searching for "${searchQuery}"`);
    }
  };

  return (
    <MobileLayout>
      <div className="flex flex-col h-full">
        <div className="p-4 glass-morphism sticky top-0 z-10">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold">Map</h1>
            <Tabs 
              defaultValue="users" 
              value={mapMode} 
              onValueChange={(value) => setMapMode(value as 'users' | 'events')}
              className="h-9"
            >
              <TabsList className="grid grid-cols-2 w-[200px]">
                <TabsTrigger value="users" className="flex items-center gap-1">
                  <Users size={14} />
                  <span>Friends</span>
                </TabsTrigger>
                <TabsTrigger value="events" className="flex items-center gap-1">
                  <Zap size={14} />
                  <span>Events</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="relative mb-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <Input 
              placeholder="Search location" 
              className="pl-9 pr-10 bg-white/5 border-none rounded-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearchLocation()}
            />
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
              onClick={handleSearchLocation}
            >
              <MapPin size={16} className="text-gray-400" />
            </Button>
          </div>
        </div>

        <div className="relative flex-1 overflow-hidden bg-gray-900">
          {/* Simulated map background */}
          <div 
            className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-50"
            style={{
              transform: `scale(${mapZoom})`,
              transition: 'transform 0.3s ease-out'
            }}
          ></div>
          
          {/* User's location */}
          <div 
            className="absolute z-20 w-4 h-4 bg-blue-500 rounded-full animate-pulse"
            style={{
              left: `${userLocation.x}%`,
              top: `${userLocation.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-75"></div>
          </div>
          
          {/* Map pins */}
          {mapMode === 'users' && nearbyUsers.map(user => (
            <div 
              key={user.id}
              className={`absolute z-10 transition-transform duration-300 ${selectedPin === user.id ? 'scale-125' : 'scale-100'}`}
              style={{
                left: `${user.location.x}%`,
                top: `${user.location.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              onClick={() => handlePinClick(user.id)}
            >
              <div className={`relative ${user.hasStory ? 'ring-2 ring-snap-yellow p-0.5 rounded-full' : ''}`}>
                <Avatar className="h-10 w-10 border-2 border-white">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                {user.isOnline && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></span>
                )}
                {user.hasNFT && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center text-[8px] font-bold text-white">NFT</span>
                )}
              </div>
              
              {selectedPin === user.id && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-40 p-2 rounded-lg bg-black/80 backdrop-blur-sm animate-fade-in">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="text-sm font-medium truncate">{user.name}</p>
                    <span className="text-xs bg-gray-700 px-1.5 py-0.5 rounded">{user.distance}</span>
                  </div>
                  <div className="flex justify-between gap-1">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="flex-1 h-8 text-xs"
                      onClick={() => handleViewProfile(user.id)}
                    >
                      <User size={12} className="mr-1" />
                      Profile
                    </Button>
                    <Button 
                      size="sm"
                      className="flex-1 h-8 text-xs bg-snap-yellow text-black hover:bg-snap-yellow/90"
                      onClick={() => handleSendMessage(user.id)}
                    >
                      <MessageCircle size={12} className="mr-1" />
                      Chat
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {mapMode === 'events' && events.map(event => (
            <div 
              key={event.id}
              className={`absolute z-10 transition-transform duration-300 ${selectedPin === event.id ? 'scale-125' : 'scale-100'}`}
              style={{
                left: `${event.coordinates.x}%`,
                top: `${event.coordinates.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              onClick={() => handlePinClick(event.id)}
            >
              <div className="relative">
                <div className="h-12 w-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                  <Zap size={20} className="text-snap-yellow" />
                </div>
                {event.verified && (
                  <span className="absolute bottom-0 right-0 w-5 h-5 bg-snap-yellow rounded-full border-2 border-gray-900 flex items-center justify-center text-black text-[10px] font-bold">✓</span>
                )}
              </div>
              
              {selectedPin === event.id && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-56 rounded-lg bg-black/80 backdrop-blur-sm animate-fade-in overflow-hidden">
                  <div className="relative h-20">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-2">
                      <div>
                        <p className="text-sm font-bold truncate">{event.title}</p>
                        <p className="text-xs text-gray-300">{event.location}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs bg-gray-700 px-1.5 py-0.5 rounded">{event.date}</span>
                      <span className="text-xs">
                        <Users size={10} className="inline mr-1" />
                        {event.attendees}
                      </span>
                    </div>
                    <Button 
                      size="sm"
                      className="w-full h-8 text-xs bg-snap-yellow text-black hover:bg-snap-yellow/90"
                      onClick={() => handleViewEvent(event.id)}
                    >
                      <Info size={12} className="mr-1" />
                      View Details
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {/* Zoom controls */}
          <div className="absolute bottom-4 right-4 z-10">
            <div className="flex flex-col gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-10 w-10 rounded-full bg-black/40 backdrop-blur-sm"
                onClick={handleZoomIn}
              >
                <Plus size={20} />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-10 w-10 rounded-full bg-black/40 backdrop-blur-sm"
                onClick={handleZoomOut}
              >
                <Minus size={20} />
              </Button>
            </div>
          </div>
          
          {/* User list (when map is zoomed out) */}
          {mapZoom < 1 && (
            <div className="absolute bottom-4 left-4 right-20 z-10 bg-black/60 backdrop-blur-md rounded-lg overflow-hidden animate-fade-in">
              <div className="p-2 border-b border-white/10">
                <p className="text-sm font-medium">
                  {mapMode === 'users' ? 'Nearby Friends' : 'Upcoming Events'}
                </p>
              </div>
              <div className="max-h-48 overflow-y-auto">
                {mapMode === 'users' ? (
                  nearbyUsers.map(user => (
                    <div 
                      key={user.id}
                      className="flex items-center gap-2 p-2 hover:bg-white/5 cursor-pointer"
                      onClick={() => handlePinClick(user.id)}
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{user.name}</p>
                        <p className="text-xs text-gray-400">{user.distance}</p>
                      </div>
                      <Badge className="bg-gray-700 hover:bg-gray-600">
                        {user.isOnline ? 'Online' : 'Offline'}
                      </Badge>
                    </div>
                  ))
                ) : (
                  events.map(event => (
                    <div 
                      key={event.id}
                      className="flex items-center gap-2 p-2 hover:bg-white/5 cursor-pointer"
                      onClick={() => handlePinClick(event.id)}
                    >
                      <div className="h-8 w-8 bg-yellow-500/20 rounded-full flex items-center justify-center">
                        <Zap size={16} className="text-snap-yellow" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{event.title}</p>
                        <p className="text-xs text-gray-400">{event.date}</p>
                      </div>
                      {event.verified && (
                        <Badge className="bg-snap-yellow text-black">Verified</Badge>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </MobileLayout>
  );
};

export default MapPage;
