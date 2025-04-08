
import React, { useState } from 'react';
import { X, Send, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';

interface TokenTransactionModalProps {
  recipient: {
    name: string;
    avatar: string;
    walletAddress: string;
  };
  onClose: () => void;
  onSend: (amount: number, note: string) => void;
  currentBalance: number;
}

const TokenTransactionModal: React.FC<TokenTransactionModalProps> = ({
  recipient,
  onClose,
  onSend,
  currentBalance
}) => {
  const [amount, setAmount] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers and one decimal point
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const handleSend = () => {
    const amountNum = parseFloat(amount);
    
    if (isNaN(amountNum) || amountNum <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    
    if (amountNum > currentBalance) {
      toast.error('Insufficient balance');
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate transaction processing
    setTimeout(() => {
      onSend(amountNum, note);
      setIsProcessing(false);
      onClose();
      toast.success(`Sent ${amountNum} SOL to ${recipient.name}`);
    }, 1500);
  };

  const shortAddress = `${recipient.walletAddress.substring(0, 6)}...${recipient.walletAddress.substring(recipient.walletAddress.length - 4)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-sm bg-snap-dark-blue rounded-2xl overflow-hidden animate-fade-in">
        <div className="p-4 flex justify-between items-center border-b border-white/10">
          <h3 className="text-lg font-semibold">Send SOL</h3>
          <Button size="icon" variant="ghost" onClick={onClose} className="h-8 w-8">
            <X size={18} />
          </Button>
        </div>
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src={recipient.avatar} />
                <AvatarFallback>{recipient.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{recipient.name}</p>
                <p className="text-xs text-gray-400">{shortAddress}</p>
              </div>
            </div>
            <ArrowRight className="text-gray-400" size={20} />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm text-gray-400 mb-2">Amount (SOL)</label>
            <div className="relative">
              <Input
                type="text"
                value={amount}
                onChange={handleAmountChange}
                className="text-2xl font-bold text-center h-14 bg-white/5 border-white/10 focus:border-solana-purple"
                placeholder="0.00"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                SOL
              </div>
            </div>
            <p className="text-xs text-right mt-1 text-gray-400">
              Balance: {currentBalance} SOL
            </p>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm text-gray-400 mb-2">Note (optional)</label>
            <Input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="bg-white/5 border-white/10"
              placeholder="What's this for?"
            />
          </div>
          
          <Button 
            className="w-full bg-solana-purple text-white hover:bg-solana-purple/90"
            onClick={handleSend}
            disabled={isProcessing || !amount || parseFloat(amount) <= 0}
          >
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                <span>Processing...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Send size={16} />
                <span>Send {amount ? `${amount} SOL` : ''}</span>
              </div>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TokenTransactionModal;
