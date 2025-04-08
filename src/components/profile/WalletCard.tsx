
import React from 'react';
import { Copy, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface WalletCardProps {
  solBalance: number;
  address: string;
  onCopy?: () => void;
}

const WalletCard = ({ solBalance, address, onCopy }: WalletCardProps) => {
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

  return (
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
          className="text-snap-yellow"
          onClick={() => toast.info("Opening deposit screen")}
        >
          Deposit
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-snap-yellow"
          onClick={() => toast.info("Opening swap screen")}
        >
          Swap
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-snap-yellow"
          onClick={() => toast.info("Opening send screen")}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default WalletCard;
