
import React from 'react';
import { ArrowUpRight, Copy, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface WalletCardProps {
  solBalance: number;
  address: string;
}

const WalletCard: React.FC<WalletCardProps> = ({ solBalance, address }) => {
  const shortenedAddress = `${address.substring(0, 4)}...${address.substring(address.length - 4)}`;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address);
    toast.success('Address copied to clipboard');
  };

  return (
    <div className="rounded-2xl overflow-hidden">
      <div className="web3-gradient p-0.5">
        <div className="bg-snap-dark-blue rounded-2xl p-4">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-sm font-medium text-gray-400">Wallet Balance</h3>
              <div className="flex items-baseline mt-1">
                <span className="text-2xl font-bold">{solBalance}</span>
                <span className="ml-1 text-sm font-medium">SOL</span>
              </div>
            </div>
            <div className="p-2 rounded-full bg-white/5 border border-white/10">
              <img src="https://cryptologos.cc/logos/solana-sol-logo.png" alt="Solana" className="w-6 h-6" />
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm bg-black/20 rounded-lg p-2">
            <span className="text-gray-400">{shortenedAddress}</span>
            <button onClick={handleCopyAddress} className="ml-auto p-1 hover:bg-white/5 rounded">
              <Copy size={14} className="text-gray-400" />
            </button>
            <a href={`https://explorer.solana.com/address/${address}`} target="_blank" rel="noopener noreferrer" className="p-1 hover:bg-white/5 rounded">
              <ExternalLink size={14} className="text-gray-400" />
            </a>
          </div>
          
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Button size="sm" className="rounded-lg bg-white/10 hover:bg-white/15">
              <span>Receive</span>
            </Button>
            <Button size="sm" className="rounded-lg bg-snap-yellow text-black hover:bg-snap-yellow/90">
              <span>Send</span>
              <ArrowUpRight size={14} className="ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletCard;
