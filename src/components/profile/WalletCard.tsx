
import React, { useState } from 'react';
import { Copy, ExternalLink, Send, ArrowUpDown, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface WalletCardProps {
  solBalance: number;
  address: string;
  onCopy?: () => void;
}

const WalletCard = ({ solBalance, address, onCopy }: WalletCardProps) => {
  const [depositOpen, setDepositOpen] = useState(false);
  const [swapOpen, setSwapOpen] = useState(false);
  const [sendOpen, setSendOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [swapFrom, setSwapFrom] = useState('SOL');
  const [swapTo, setSwapTo] = useState('USDC');
  const [swapAmount, setSwapAmount] = useState('');
  
  const shortAddress = `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  
  const handleCopy = () => {
    navigator.clipboard.writeText(address)
      .then(() => {
        if (onCopy) {
          onCopy();
        } else {
          toast.success("Wallet address copied to clipboard");
        }
      })
      .catch(err => {
        console.error("Failed to copy: ", err);
        toast.error("Failed to copy address");
      });
  };
  
  const handleOpenExplorer = () => {
    toast.info("Opening in Solana Explorer");
    window.open(`https://explorer.solana.com/address/${address}`, '_blank');
  };

  const handleDepositSubmit = () => {
    toast.success(`Deposit of ${amount} SOL initiated`);
    setAmount('');
    setDepositOpen(false);
  };

  const handleSwapSubmit = () => {
    toast.success(`Swapped ${swapAmount} ${swapFrom} to ${swapTo}`);
    setSwapAmount('');
    setSwapOpen(false);
  };

  const handleSendSubmit = () => {
    if (!recipient.trim()) {
      toast.error("Please enter a recipient address");
      return;
    }
    
    toast.success(`Sent ${amount} SOL to ${recipient.substring(0, 6)}...`);
    setAmount('');
    setRecipient('');
    setSendOpen(false);
  };

  return (
    <>
      <div className="snap-card overflow-hidden">
        <div className="bg-gradient-to-r from-solana-purple to-snap-blue p-4 rounded-t-lg">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-sm text-white/80">SOL Balance</p>
              <p className="text-2xl font-bold text-white">{solBalance} SOL</p>
              <p className="text-sm text-white/80">≈ ${(solBalance * 50).toFixed(2)}</p>
            </div>
            <div className="h-12 w-12 flex items-center justify-center">
              <img 
                src="https://cryptologos.cc/logos/solana-sol-logo.png" 
                alt="Solana" 
                className="h-full object-contain"
              />
            </div>
          </div>

          <div className="flex items-center justify-between bg-black/20 rounded-lg p-2 mt-2">
            <p className="text-sm text-white truncate" title={address}>{shortAddress}</p>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-white/70 hover:text-white hover:bg-white/10"
                onClick={handleCopy}
              >
                <Copy size={14} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-white/70 hover:text-white hover:bg-white/10"
                onClick={handleOpenExplorer}
              >
                <ExternalLink size={14} />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="p-3 bg-white/5 rounded-b-lg flex justify-between">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-solana-purple"
            onClick={() => setDepositOpen(true)}
          >
            Deposit
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-solana-purple"
            onClick={() => setSwapOpen(true)}
          >
            Swap
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-solana-purple"
            onClick={() => setSendOpen(true)}
          >
            Send
          </Button>
        </div>
      </div>

      {/* Deposit Dialog */}
      <Dialog open={depositOpen} onOpenChange={setDepositOpen}>
        <DialogContent className="bg-snap-dark-blue text-white border-white/10">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">Deposit SOL</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 bg-white/10 rounded-full flex items-center justify-center">
                <PlusCircle className="h-8 w-8 text-solana-purple" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Deposit Amount (SOL)</label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-white/5 border-white/10"
                placeholder="0.00"
              />
            </div>
            
            <div className="p-3 bg-white/5 rounded-lg">
              <p className="text-sm text-gray-400">Your Wallet Address</p>
              <div className="flex items-center justify-between">
                <p className="text-sm font-mono">{shortAddress}</p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={handleCopy}
                >
                  <Copy size={14} />
                </Button>
              </div>
            </div>
            
            <div className="text-sm text-gray-400">
              <p>To deposit SOL:</p>
              <ol className="list-decimal ml-4 mt-1 space-y-1">
                <li>Copy your wallet address</li>
                <li>Send SOL from an external wallet to this address</li>
                <li>Wait for the transaction to confirm on the Solana network</li>
              </ol>
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handleDepositSubmit}
              className="w-full bg-solana-purple text-white hover:bg-solana-purple/90"
            >
              I've Sent SOL
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Swap Dialog */}
      <Dialog open={swapOpen} onOpenChange={setSwapOpen}>
        <DialogContent className="bg-snap-dark-blue text-white border-white/10">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">Swap Tokens</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 bg-white/10 rounded-full flex items-center justify-center">
                <ArrowUpDown className="h-8 w-8 text-solana-purple" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-gray-400">From</label>
              <div className="flex gap-2">
                <div className="bg-white/5 border border-white/10 rounded-md px-3 py-2 flex-1 flex items-center justify-between">
                  <span>{swapFrom}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-7 text-xs"
                    onClick={() => setSwapFrom(swapFrom === 'SOL' ? 'USDC' : 'SOL')}
                  >
                    Change
                  </Button>
                </div>
                <Input
                  type="number"
                  value={swapAmount}
                  onChange={(e) => setSwapAmount(e.target.value)}
                  className="bg-white/5 border-white/10 w-32"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="flex justify-center">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 rounded-full bg-white/10"
                onClick={() => {
                  const temp = swapFrom;
                  setSwapFrom(swapTo);
                  setSwapTo(temp);
                }}
              >
                <ArrowUpDown size={16} />
              </Button>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-gray-400">To</label>
              <div className="bg-white/5 border border-white/10 rounded-md px-3 py-2 flex items-center justify-between">
                <span>{swapTo}</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-7 text-xs"
                  onClick={() => setSwapTo(swapTo === 'SOL' ? 'USDC' : 'SOL')}
                >
                  Change
                </Button>
              </div>
              {swapAmount && (
                <p className="text-sm text-gray-400">
                  You will receive approximately {swapAmount} {swapTo}
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handleSwapSubmit}
              disabled={!swapAmount || parseFloat(swapAmount) <= 0}
              className="w-full bg-solana-purple text-white hover:bg-solana-purple/90"
            >
              Swap Tokens
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Send Dialog */}
      <Dialog open={sendOpen} onOpenChange={setSendOpen}>
        <DialogContent className="bg-snap-dark-blue text-white border-white/10">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">Send SOL</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 bg-white/10 rounded-full flex items-center justify-center">
                <Send className="h-8 w-8 text-solana-purple" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Recipient Address</label>
              <Input
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="bg-white/5 border-white/10 font-mono text-sm"
                placeholder="Enter wallet address"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Amount (SOL)</label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-white/5 border-white/10"
                placeholder="0.00"
              />
              <p className="text-xs text-gray-400">
                Available: {solBalance} SOL
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400">Recent Contacts</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: '1', name: 'Alex', avatar: '/placeholder.svg' },
                  { id: '2', name: 'Sarah', avatar: '/placeholder.svg' },
                  { id: '3', name: 'Mike', avatar: '/placeholder.svg' },
                ].map((contact) => (
                  <button 
                    key={contact.id}
                    className="flex flex-col items-center p-2 bg-white/5 rounded-lg hover:bg-white/10"
                    onClick={() => setRecipient(`recipient-${contact.id}-address`)}
                  >
                    <Avatar className="h-10 w-10 mb-1">
                      <AvatarImage src={contact.avatar} />
                      <AvatarFallback>{contact.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs">{contact.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handleSendSubmit}
              disabled={!amount || parseFloat(amount) <= 0 || !recipient}
              className="w-full bg-solana-purple text-white hover:bg-solana-purple/90"
            >
              Send SOL
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WalletCard;
