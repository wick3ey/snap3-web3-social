import React from 'react';
import MobileLayout from '@/components/layout/MobileLayout';
import { toast } from 'sonner';

const MapPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNearby, setShowNearby] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showLayerOptions, setShowLayerOptions] = useState(false);
  const [mapType, setMapType] = useState<'standard' | 'satellite' | 'hybrid'>('standard');
  const [zoomLevel, setZoomLevel] = useState(5);
  const [showMyLocation, setShowMyLocation] = useState(true);
  const [showFriends, setShowFriends] = useState(true);
  const [showTrending, setShowTrending] = useState(true);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast.info(`Searching for "${searchQuery}"`);
    }
  };

  const handleMapTypeChange = (type: 'standard' | 'satellite' | 'hybrid') => {
    setMapType(type);
    setShowLayerOptions(false);
    toast.success(`Map type changed to ${type}`);
  };

  const handleZoomIn = () => {
    if (zoomLevel < 10) {
      setZoomLevel(prev => prev + 1);
    }
  };

  const handleZoomOut = () => {
    if (zoomLevel > 1) {
      setZoomLevel(prev => prev - 1);
    }
  };

  const handleToggleMyLocation = () => {
    setShowMyLocation(prev => !prev);
    toast.info(showMyLocation ? 'Your location is now hidden from others' : 'Your location is now visible to others');
  };

  const handleToggleFriends = () => {
    setShowFriends(prev => !prev);
    toast.info(showFriends ? 'Friends are now hidden on the map' : 'Friends are now visible on the map');
  };

  const handleToggleTrending = () => {
    setShowTrending(prev => !prev);
    toast.info(showTrending ? 'Trending locations are now hidden' : 'Trending locations are now visible');
  };

  const handleUserClick = (userId: string) => {
    toast({
      description: "Open chat or view profile?",
      action: {
        label: "Chat",
        onClick: () => {
          toast.success("Opening chat");
        },
      },
    });
  };

  const handleLocationClick = (locationId: string) => {
    toast.info("Showing location details");
  };

  const handleLocationPermission = () => {
    toast.info("Location permission required", {
      action: {
        label: "Allow",
        onClick: () => toast.success("Location access granted"),
      },
    });
  };

  return (
    <MobileLayout>
      <div className="relative h-full flex flex-col">
        {/* Map Area */}
        <div 
          className="flex-1 bg-gray-900 relative" 
          style={{ 
            backgroundImage: `url('/placeholder.svg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: mapType === 'satellite' ? 'brightness(1.2) contrast(1.1)' : 'none',
          }}
        >
          {/* Map content - would be replaced with actual map in a real app */}
          <div className="absolute inset-0 flex items-center justify-center text-5xl text-white/20 font-bold">
            MAP
          </div>
          
          {/* Friend pins on map (simplified) */}
          {showFriends && (
            <>
              <div className="absolute top-1/4 left-1/3 map-pin-animate">
                <div className="relative">
                  <MapPin size={30} className="text-snap-yellow" />
                  <div className="absolute -top-0.5 left-1.5 w-4 h-4">
                    <Avatar className="w-5 h-5 border border-snap-yellow">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              </div>
              
              <div className="absolute top-1/3 right-1/4 map-pin-animate">
                <div className="relative">
                  <MapPin size={30} className="text-snap-yellow" />
                  <div className="absolute -top-0.5 left-1.5 w-4 h-4">
                    <Avatar className="w-5 h-5 border border-snap-yellow">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>S</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              </div>
            </>
          )}
          
          {/* Trending location pins */}
          {showTrending && (
            <>
              <div className="absolute bottom-1/3 right-1/3 map-pin-animate">
                <div className="relative">
                  <MapPin size={30} className="text-blue-400" />
                  <div className="absolute -top-0.5 left-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center text-[8px] text-white font-bold">
                    230
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-1/4 left-1/4 map-pin-animate">
                <div className="relative">
                  <MapPin size={30} className="text-purple-400" />
                  <div className="absolute -top-0.5 left-1 w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center text-[8px] text-white font-bold">
                    75
                  </div>
                </div>
              </div>
            </>
          )}
          
          {/* My location pin */}
          {showMyLocation && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="absolute inset-0 bg-snap-yellow opacity-20 rounded-full animate-ping"></div>
                <div className="relative z-10 w-6 h-6 bg-snap-yellow rounded-full border-2 border-white"></div>
              </div>
            </div>
          )}
        </div>
        
        {/* Search bar overlay */}
        <div className="absolute top-4 left-4 right-4 z-10">
          <form onSubmit={handleSearch} className="relative">
            <Input
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search locations"
              className="pr-10 pl-9 py-6 rounded-full bg-white/10 backdrop-blur-md border-0 text-white placeholder:text-white/50"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70" size={18} />
            <Button 
              type="submit" 
              size="icon" 
              variant="ghost" 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 text-white/70"
            >
              <MapPin size={18} className="text-snap-yellow" />
            </Button>
          </form>
        </div>
        
        {/* Bottom controls */}
        <div className="absolute bottom-24 right-4 z-10 flex flex-col gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            className="w-10 h-10 rounded-full backdrop-blur-md bg-white/10 border-0"
            onClick={handleZoomIn}
          >
            <ZoomIn size={18} className="text-white" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="w-10 h-10 rounded-full backdrop-blur-md bg-white/10 border-0"
            onClick={handleZoomOut}
          >
            <ZoomOut size={18} className="text-white" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className={cn(
              "w-10 h-10 rounded-full backdrop-blur-md bg-white/10 border-0",
              showLayerOptions && "bg-white/20"
            )}
            onClick={() => setShowLayerOptions(!showLayerOptions)}
          >
            <Layers size={18} className={cn("text-white", showLayerOptions && "text-snap-yellow")} />
          </Button>
        </div>
        
        {/* Layer selection popover */}
        {showLayerOptions && (
          <div className="absolute bottom-36 right-16 z-10 p-3 rounded-lg backdrop-blur-md bg-white/10 animate-fade-in">
            <div className="flex flex-col gap-2 w-36">
              <Button 
                variant="ghost" 
                size="sm" 
                className={cn(
                  "justify-start px-2 py-1 h-auto text-sm text-white/70",
                  mapType === 'standard' && "bg-white/10 text-white"
                )}
                onClick={() => handleMapTypeChange('standard')}
              >
                Standard
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className={cn(
                  "justify-start px-2 py-1 h-auto text-sm text-white/70",
                  mapType === 'satellite' && "bg-white/10 text-white"
                )}
                onClick={() => handleMapTypeChange('satellite')}
              >
                Satellite
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className={cn(
                  "justify-start px-2 py-1 h-auto text-sm text-white/70",
                  mapType === 'hybrid' && "bg-white/10 text-white"
                )}
                onClick={() => handleMapTypeChange('hybrid')}
              >
                Hybrid
              </Button>
            </div>
          </div>
        )}
        
        {/* Control Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-20 glass-morphism z-10 px-4 flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            className="rounded-full flex items-center gap-1 px-3 py-1 text-white/90"
            onClick={() => setShowNearby(!showNearby)}
          >
            <span>Nearby</span>
            <ChevronDown 
              size={16} 
              className={cn(
                "transition-transform",
                showNearby && "transform rotate-180"
              )} 
            />
          </Button>
          
          <div className="flex-1" />
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white/90"
            onClick={() => setShowSettings(!showSettings)}
          >
            <Settings size={20} />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white/90"
          >
            <User size={20} />
          </Button>
        </div>
        
        {/* Nearby friends sheet */}
        {showNearby && (
          <div className="absolute bottom-20 left-0 right-0 bg-black/70 backdrop-blur-lg rounded-t-xl p-4 z-20 animate-slide-up">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Nearby Friends</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs"
                onClick={() => setShowNearby(false)}
              >
                Close
              </Button>
            </div>
            
            <div className="space-y-3">
              {nearbyUsers.map(user => (
                <div 
                  key={user.id} 
                  className="flex items-center justify-between bg-white/5 rounded-lg p-2 cursor-pointer"
                  onClick={() => handleUserClick(user.id)}
                >
                  <div className="flex items-center">
                    <div className="relative">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      {user.isOnline && (
                        <div className="absolute bottom-0 right-2 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{user.name}</p>
                      <p className="text-xs text-gray-400">{user.distance}</p>
                    </div>
                  </div>
                  <MapPin size={16} className="text-snap-yellow ml-2" />
                </div>
              ))}
            </div>
            
            <div className="mt-4">
              <h3 className="font-semibold text-lg mb-3">Trending Locations</h3>
              <div className="space-y-3">
                {trendingLocations.map(location => (
                  <div 
                    key={location.id} 
                    className="flex items-center justify-between bg-white/5 rounded-lg p-2 cursor-pointer"
                    onClick={() => handleLocationClick(location.id)}
                  >
                    <div>
                      <p className="font-medium text-sm">{location.name}</p>
                      <p className="text-xs text-gray-400">{location.address}</p>
                    </div>
                    <div className="bg-purple-500/20 rounded-full px-2 py-0.5 text-xs">
                      {location.attendees} people
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Settings sheet */}
        <Sheet open={showSettings} onOpenChange={setShowSettings}>
          <SheetContent side="bottom" className="rounded-t-xl max-h-[80vh]">
            <div className="py-2">
              <h2 className="text-xl font-bold mb-4">Map Settings</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label htmlFor="toggle-location" className="text-sm font-medium">
                    Show My Location
                  </label>
                  <input 
                    type="checkbox" 
                    id="toggle-location"
                    checked={showMyLocation}
                    onChange={handleToggleMyLocation}
                    className="toggle toggle-primary"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <label htmlFor="toggle-friends" className="text-sm font-medium">
                    Show Friends
                  </label>
                  <input 
                    type="checkbox" 
                    id="toggle-friends"
                    checked={showFriends}
                    onChange={handleToggleFriends}
                    className="toggle toggle-primary"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <label htmlFor="toggle-trending" className="text-sm font-medium">
                    Show Trending Locations
                  </label>
                  <input 
                    type="checkbox" 
                    id="toggle-trending"
                    checked={showTrending}
                    onChange={handleToggleTrending}
                    className="toggle toggle-primary"
                  />
                </div>
                
                <div className="pt-4">
                  <h3 className="text-sm font-medium mb-2">Map Type</h3>
                  <div className="grid grid-cols-3 gap-2">
                    <Button 
                      variant={mapType === 'standard' ? 'default' : 'outline'} 
                      size="sm"
                      onClick={() => handleMapTypeChange('standard')}
                      className={mapType === 'standard' ? 'bg-snap-yellow text-black' : ''}
                    >
                      Standard
                    </Button>
                    <Button 
                      variant={mapType === 'satellite' ? 'default' : 'outline'} 
                      size="sm"
                      onClick={() => handleMapTypeChange('satellite')}
                      className={mapType === 'satellite' ? 'bg-snap-yellow text-black' : ''}
                    >
                      Satellite
                    </Button>
                    <Button 
                      variant={mapType === 'hybrid' ? 'default' : 'outline'} 
                      size="sm"
                      onClick={() => handleMapTypeChange('hybrid')}
                      className={mapType === 'hybrid' ? 'bg-snap-yellow text-black' : ''}
                    >
                      Hybrid
                    </Button>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button className="w-full" onClick={() => setShowSettings(false)}>
                    Save Settings
                  </Button>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </MobileLayout>
  );
};

export default MapPage;
