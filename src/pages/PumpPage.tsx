
import { useState } from 'react';
import MobileLayout from '@/components/layout/MobileLayout';
import { toast } from 'sonner';
import { 
  TrendingUp, Search, DollarSign, Rocket, 
  Plus, Settings, Sparkles, Bitcoin, Zap
} from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
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
    supply: '1000000000'
  });
  
  const [showDetails, setShowDetails] = useState<string | null>(null);
  const [selectedChain, setSelectedChain] = useState('solana');

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

  const handleCreateToken = () => {
    if (!newToken.name || !newToken.symbol) {
      toast.error("Please fill all required fields");
      return;
    }
    
    toast.success(`Creating ${newToken.name} (${newToken.symbol}) token on ${selectedChain}...`);
    
    // In a real app, here we would interact with an API to create the token
    setTimeout(() => {
      toast.success("Token created successfully! 🚀");
      setShowCreateDialog(false);
      setNewToken({
        name: '',
        symbol: '',
        description: '',
        supply: '1000000000'
      });
    }, 2000);
  };

  const filteredTokens = trendingTokens.filter(token => 
    token.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    token.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MobileLayout>
      <div className="relative flex flex-col h-full">
        {/* Header */}
        <div className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 p-4 pb-16">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold text-white">Pump.fun</h1>
              <p className="text-white/80 text-sm">Create & Discover Meme Tokens</p>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="bg-white/20 text-white rounded-full"
              onClick={() => setShowCreateDialog(true)}
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
        
        {/* Trending List */}
        <div className="relative -mt-10 mx-4 z-10">
          <div className="bg-black/40 backdrop-blur-lg rounded-2xl p-4 border border-white/10">
            <div className="flex items-center mb-4">
              <TrendingUp size={20} className="text-snap-yellow mr-2" />
              <h2 className="text-lg font-semibold">Top 10 Trending</h2>
            </div>
            
            {filteredTokens.length > 0 ? (
              <div className="space-y-3">
                {filteredTokens.map((token) => (
                  <div 
                    key={token.id} 
                    className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                    onClick={() => handleTokenClick(token.id)}
                  >
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3 bg-gradient-to-br from-purple-500 to-pink-500">
                        <AvatarImage src={token.logo} />
                        <AvatarFallback>{token.symbol.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-medium">{token.name}</h3>
                          <span className="ml-2 text-xs px-2 py-0.5 bg-white/10 rounded-full">
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
        
        {/* Create Token Dialog */}
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Meme Token</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Token Name*</label>
                <Input 
                  value={newToken.name}
                  onChange={(e) => setNewToken({...newToken, name: e.target.value})}
                  placeholder="e.g. Super Doge"
                  className="bg-background"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Token Symbol*</label>
                <Input 
                  value={newToken.symbol}
                  onChange={(e) => setNewToken({...newToken, symbol: e.target.value.toUpperCase()})}
                  placeholder="e.g. SDOGE"
                  className="bg-background uppercase"
                  maxLength={6}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <textarea 
                  value={newToken.description}
                  onChange={(e) => setNewToken({...newToken, description: e.target.value})}
                  placeholder="What makes your token special?"
                  className="w-full h-20 px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Initial Supply</label>
                <Input 
                  type="number"
                  value={newToken.supply}
                  onChange={(e) => setNewToken({...newToken, supply: e.target.value})}
                  className="bg-background"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Blockchain</label>
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    type="button"
                    variant={selectedChain === 'solana' ? 'default' : 'outline'} 
                    className={cn(
                      selectedChain === 'solana' && "bg-gradient-to-r from-purple-500 to-purple-700"
                    )}
                    onClick={() => setSelectedChain('solana')}
                  >
                    Solana
                  </Button>
                  <Button 
                    type="button"
                    variant={selectedChain === 'ethereum' ? 'default' : 'outline'} 
                    onClick={() => setSelectedChain('ethereum')}
                  >
                    Ethereum
                  </Button>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowCreateDialog(false)}
              >
                Cancel
              </Button>
              <Button 
                type="button" 
                onClick={handleCreateToken}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                Create Token
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Token Details Sheet */}
        {showDetails && (
          <Sheet open={!!showDetails} onOpenChange={() => setShowDetails(null)}>
            <SheetContent side="bottom" className="rounded-t-xl max-h-[80vh]">
              {(() => {
                const token = trendingTokens.find(t => t.id === showDetails);
                if (!token) return null;
                
                return (
                  <div className="py-4">
                    <div className="flex items-center space-x-4 mb-6">
                      <Avatar className="h-16 w-16 bg-gradient-to-br from-purple-500 to-pink-500">
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
                    
                    <div className="flex justify-between items-center p-4 rounded-xl bg-white/5 mb-4">
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
                      <Button className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700">
                        <DollarSign size={16} />
                        Buy
                      </Button>
                      <Button variant="outline" className="flex items-center justify-center gap-2">
                        <Rocket size={16} />
                        Share
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium mb-2">About {token.name}</h3>
                        <p className="text-sm text-gray-400">
                          {token.name} is a community-driven meme token that aims to bring fun and engagement to the crypto space. The token has no utility, just pure memetic value and community power.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-2">Token Info</h3>
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
