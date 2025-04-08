import { useState, useRef } from 'react';
import MobileLayout from '@/components/layout/MobileLayout';
import { toast } from 'sonner';
import { 
  TrendingUp, Search, Rocket, 
  Plus, Sparkles, Upload, Star, 
  ArrowRight, Image, Zap
} from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface MemeToken {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  marketCap: string;
  logo: string;
}

const trendingTokens: MemeToken[] = [
  {
    id: '1',
    name: 'Pepe',
    symbol: 'PEPE',
    price: 0.0000089,
    change24h: 12.4,
    marketCap: '1.2B',
    logo: '/placeholder.svg',
  },
  {
    id: '2',
    name: 'Dogecoin',
    symbol: 'DOGE',
    price: 0.12,
    change24h: -3.2,
    marketCap: '15.8B',
    logo: '/placeholder.svg',
  },
  {
    id: '3',
    name: 'Shiba Inu',
    symbol: 'SHIB',
    price: 0.000022,
    change24h: 5.6,
    marketCap: '12.9B',
    logo: '/placeholder.svg',
  },
  {
    id: '4',
    name: 'Floki',
    symbol: 'FLOKI',
    price: 0.00024,
    change24h: 28.5,
    marketCap: '2.4B',
    logo: '/placeholder.svg',
  },
  {
    id: '5',
    name: 'Bonk',
    symbol: 'BONK',
    price: 0.000012,
    change24h: 45.2,
    marketCap: '700M',
    logo: '/placeholder.svg',
  },
  {
    id: '6',
    name: 'WIF',
    symbol: 'WIF',
    price: 0.28,
    change24h: -8.3,
    marketCap: '1.8B',
    logo: '/placeholder.svg',
  },
  {
    id: '7',
    name: 'Mog',
    symbol: 'MOG',
    price: 0.00046,
    change24h: 16.7,
    marketCap: '850M',
    logo: '/placeholder.svg',
  },
  {
    id: '8',
    name: 'Brett',
    symbol: 'BRETT',
    price: 0.12,
    change24h: 132.5,
    marketCap: '450M',
    logo: '/placeholder.svg',
  },
  {
    id: '9',
    name: 'Turbo',
    symbol: 'TURBO',
    price: 0.0052,
    change24h: -12.3,
    marketCap: '320M',
    logo: '/placeholder.svg',
  },
  {
    id: '10',
    name: 'Book of Meme',
    symbol: 'BOME',
    price: 0.0182,
    change24h: 23.4,
    marketCap: '1.5B',
    logo: '/placeholder.svg',
  },
];

const PumpPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newToken, setNewToken] = useState({
    name: '',
    symbol: '',
    description: '',
    logo: null as File | null
  });
  
  const [showDetails, setShowDetails] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewLogo, setPreviewLogo] = useState<string | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast.info(`Searching for "${searchQuery}"`);
    }
  };

  const handleTokenClick = (tokenId: string) => {
    setShowDetails(tokenId);
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewToken({...newToken, logo: file});
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewLogo(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateToken = () => {
    if (!newToken.name || !newToken.symbol) {
      toast.error("Please fill all required fields");
      return;
    }
    
    toast.success(`Creating ${newToken.name} (${newToken.symbol}) token on Solana...`);
    
    setTimeout(() => {
      toast.success("Token created successfully! 🚀");
      setShowCreateDialog(false);
      setNewToken({
        name: '',
        symbol: '',
        description: '',
        logo: null
      });
      setPreviewLogo(null);
    }, 2000);
  };

  const resetCreateForm = () => {
    setNewToken({
      name: '',
      symbol: '',
      description: '',
      logo: null
    });
    setPreviewLogo(null);
  };

  const filteredTokens = trendingTokens.filter(token => 
    token.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    token.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MobileLayout>
      <div className="relative flex flex-col h-full">
        <div className="w-full bg-gradient-to-r from-solana-purple via-snap-purple to-solana-blue p-4 pb-16">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold text-white">Pump.fun</h1>
              <p className="text-white/80 text-sm">Create & Discover Meme Tokens</p>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="bg-white/20 text-white rounded-full"
              onClick={() => {
                setShowCreateDialog(true);
                resetCreateForm();
              }}
            >
              <Plus size={20} />
            </Button>
          </div>
          
          <form onSubmit={handleSearch} className="relative mt-4">
            <Input
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search tokens..."
              className="pr-10 pl-9 py-6 rounded-full bg-white/10 backdrop-blur-md border-0 text-white placeholder:text-white/50"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70" size={18} />
          </form>
        </div>
        
        <div className="relative -mt-10 mx-4 z-10">
          <div className="neo-blur rounded-2xl p-4 bg-gray-900/50">
            <div className="flex items-center mb-4">
              <TrendingUp size={20} className="text-solana-purple mr-2" />
              <h2 className="text-lg font-semibold">Top 10 Trending</h2>
            </div>
            
            {filteredTokens.length > 0 ? (
              <div className="space-y-3">
                {filteredTokens.map((token) => (
                  <div 
                    key={token.id} 
                    className="flex items-center justify-between p-3 rounded-xl bg-gray-800/50 hover:bg-gray-700/50 transition-colors cursor-pointer"
                    onClick={() => handleTokenClick(token.id)}
                  >
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3 bg-gradient-to-br from-solana-purple to-solana-blue">
                        <AvatarImage src={token.logo} />
                        <AvatarFallback>{token.symbol.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-medium">{token.name}</h3>
                          <span className="ml-2 text-xs px-2 py-0.5 bg-gray-700/70 rounded-full">
                            {token.symbol}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400">MC: {token.marketCap}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-mono font-medium">${token.price.toFixed(token.price < 0.001 ? 7 : 4)}</p>
                      <p className={token.change24h >= 0 ? "text-green-400 text-xs" : "text-red-400 text-xs"}>
                        {token.change24h >= 0 ? "+" : ""}{token.change24h}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-gray-400">
                <Sparkles className="mx-auto mb-2 text-gray-500" size={28} />
                <p>No tokens found matching "{searchQuery}"</p>
              </div>
            )}
          </div>
        </div>
        
        <Dialog open={showCreateDialog} onOpenChange={(open) => {
          setShowCreateDialog(open);
          if (!open) resetCreateForm();
        }}>
          <DialogContent className="sm:max-w-md bg-gradient-to-b from-gray-900 to-black/90 backdrop-blur-lg border-solana-purple/20">
            <DialogHeader>
              <DialogTitle className="text-center text-xl font-bold bg-gradient-to-r from-solana-purple to-solana-blue bg-clip-text text-transparent">
                Create New Meme Token
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-5 py-4">
              <div className="flex flex-col items-center justify-center">
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className={cn(
                    "w-24 h-24 rounded-full flex items-center justify-center cursor-pointer border-2 border-dashed transition-all",
                    previewLogo 
                      ? "border-transparent" 
                      : "border-solana-purple/50 hover:border-solana-purple"
                  )}
                  style={previewLogo ? {
                    backgroundImage: `url(${previewLogo})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  } : {}}
                >
                  {!previewLogo && (
                    <div className="flex flex-col items-center">
                      <Image size={24} className="opacity-50 mb-1" />
                      <span className="text-xs text-center opacity-50">Upload logo</span>
                    </div>
                  )}
                </div>
                <input 
                  type="file"
                  ref={fileInputRef}
                  onChange={handleLogoChange}
                  accept="image/*"
                  className="hidden"
                />
                <p className="mt-2 text-xs text-muted-foreground">Recommended: 512x512px PNG</p>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Token Name*</label>
                <Input 
                  value={newToken.name}
                  onChange={(e) => setNewToken({...newToken, name: e.target.value})}
                  placeholder="e.g. Super Doge"
                  className="bg-gray-800/40 border-white/10 focus-visible:ring-solana-purple"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Token Symbol*</label>
                <Input 
                  value={newToken.symbol}
                  onChange={(e) => setNewToken({...newToken, symbol: e.target.value.toUpperCase()})}
                  placeholder="e.g. SDOGE"
                  className="bg-gray-800/40 border-white/10 uppercase focus-visible:ring-solana-purple"
                  maxLength={6}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Description</label>
                <Textarea 
                  value={newToken.description}
                  onChange={(e) => setNewToken({...newToken, description: e.target.value})}
                  placeholder="What makes your token special?"
                  className="bg-gray-800/40 border-white/10 h-20 focus-visible:ring-solana-purple"
                />
              </div>
            </div>
            
            <DialogFooter className="flex-col sm:flex-col gap-2">
              <Button 
                type="button" 
                onClick={handleCreateToken}
                className="w-full bg-gradient-to-r from-solana-purple to-solana-blue hover:opacity-90 font-semibold"
              >
                Create Token on Solana
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowCreateDialog(false)}
                className="w-full border-white/10 text-white/80 hover:bg-white/5"
              >
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {showDetails && (
          <Sheet open={!!showDetails} onOpenChange={() => setShowDetails(null)}>
            <SheetContent side="bottom" className="rounded-t-xl max-h-[80vh] bg-gradient-to-b from-gray-900 to-black/90 backdrop-blur-lg border-t border-solana-purple/20">
              {(() => {
                const token = trendingTokens.find(t => t.id === showDetails);
                if (!token) return null;
                
                return (
                  <div className="py-4">
                    <div className="flex items-center space-x-4 mb-6">
                      <Avatar className="h-16 w-16 bg-gradient-to-br from-solana-purple to-solana-blue">
                        <AvatarImage src={token.logo} />
                        <AvatarFallback>{token.symbol.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h2 className="text-xl font-bold flex items-center">
                          {token.name}
                          <span className="ml-2 text-xs px-2 py-0.5 bg-white/10 rounded-full">
                            {token.symbol}
                          </span>
                        </h2>
                        <p className="text-sm text-gray-400">Market Cap: {token.marketCap}</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 rounded-xl neo-blur mb-4 bg-gray-800/30">
                      <div>
                        <p className="text-sm text-gray-400">Current Price</p>
                        <p className="text-2xl font-bold">${token.price.toFixed(token.price < 0.001 ? 7 : 4)}</p>
                      </div>
                      <div className={cn(
                        "px-3 py-1 rounded-full flex items-center",
                        token.change24h >= 0 ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                      )}>
                        {token.change24h >= 0 ? (
                          <TrendingUp size={16} className="mr-1" />
                        ) : (
                          <TrendingUp size={16} className="mr-1 transform rotate-180" />
                        )}
                        {token.change24h >= 0 ? "+" : ""}{token.change24h}%
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <Button className="flex items-center justify-center gap-2 bg-gradient-to-r from-solana-purple to-solana-blue hover:opacity-90">
                        <Zap size={16} />
                        Buy
                      </Button>
                      <Button variant="outline" className="flex items-center justify-center gap-2 border-white/10 hover:bg-white/5">
                        <Rocket size={16} />
                        Share
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium mb-2 flex items-center">
                          <Star size={16} className="mr-2 text-solana-purple" />
                          About {token.name}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {token.name} is a community-driven meme token that aims to bring fun and engagement to the crypto space. The token has no utility, just pure memetic value and community power.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-2 flex items-center">
                          <Zap size={16} className="mr-2 text-solana-purple" />
                          Token Info
                        </h3>
                        <div className="space-y-2">
                          <div className="flex justify-between py-2 border-b border-white/10">
                            <span className="text-sm text-gray-400">Chain</span>
                            <span className="text-sm font-medium">Solana</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-white/10">
                            <span className="text-sm text-gray-400">24h Volume</span>
                            <span className="text-sm font-medium">$28.5M</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-white/10">
                            <span className="text-sm text-gray-400">Holders</span>
                            <span className="text-sm font-medium">42,157</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-white/10">
                            <span className="text-sm text-gray-400">Launch Date</span>
                            <span className="text-sm font-medium">Apr 4, 2025</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </SheetContent>
          </Sheet>
        )}
      </div>
    </MobileLayout>
  );
};

export default PumpPage;
