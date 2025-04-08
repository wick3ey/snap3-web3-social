
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Wallet } from 'lucide-react';

interface WalletConnectButtonProps {
  onConnect: () => void;
}

const WalletConnectButton: React.FC<WalletConnectButtonProps> = ({ onConnect }) => {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = () => {
    setIsConnecting(true);
    // This would actually connect to Phantom wallet in a real implementation
    setTimeout(() => {
      setIsConnecting(false);
      onConnect();
    }, 1500);
  };

  return (
    <Button
      onClick={handleConnect}
      className="snap-button flex items-center gap-2 w-full"
      disabled={isConnecting}
    >
      {isConnecting ? (
        <>
          <div className="animate-spin h-4 w-4 border-2 border-black border-t-transparent rounded-full" />
          <span>Connecting...</span>
        </>
      ) : (
        <>
          <Wallet size={20} />
          <span>Connect Phantom Wallet</span>
        </>
      )}
    </Button>
  );
};

export default WalletConnectButton;
