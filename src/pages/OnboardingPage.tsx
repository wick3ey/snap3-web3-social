
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WalletConnectButton from '@/components/auth/WalletConnectButton';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';

const OnboardingPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [walletConnected, setWalletConnected] = useState(false);
  const [username, setUsername] = useState('');
  
  const handleWalletConnect = () => {
    setWalletConnected(true);
    toast.success('Wallet connected successfully');
    setStep(1);
  };
  
  const handleComplete = () => {
    if (!username.trim()) {
      toast.error('Please enter a username');
      return;
    }
    
    // In a real app, we would save the user profile here
    toast.success('Profile created successfully');
    navigate('/camera');
  };
  
  const steps = [
    // Step 0: Connect Wallet
    <div key="connect-wallet" className="flex flex-col items-center gap-8 px-6">
      <div className="w-36 h-36 rounded-full bg-snap-yellow flex items-center justify-center">
        <img 
          src="https://cryptologos.cc/logos/solana-sol-logo.png" 
          alt="Solana" 
          className="w-20 h-20"
        />
      </div>
      
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Welcome to Snap3</h1>
        <p className="text-gray-400 mb-8">
          Connect your Phantom wallet to get started with the Web3 social experience
        </p>
      </div>
      
      <WalletConnectButton onConnect={handleWalletConnect} />
      
      <p className="text-xs text-gray-500 text-center mt-4">
        By connecting your wallet, you agree to our Terms of Service and Privacy Policy
      </p>
    </div>,
    
    // Step 1: Create Profile
    <div key="create-profile" className="flex flex-col gap-6 px-6">
      <h1 className="text-2xl font-bold text-center">Create Your Profile</h1>
      
      <div className="flex flex-col items-center gap-4 mb-4">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gray-800 flex items-center justify-center">
            <img src="/placeholder.svg" alt="Profile" className="w-full h-full object-cover rounded-full" />
          </div>
          <button className="absolute bottom-0 right-0 bg-snap-yellow text-black p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9"></path>
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
            </svg>
          </button>
        </div>
        <p className="text-center text-sm text-gray-400">Tap to upload profile picture<br />or select an NFT</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-400 mb-1">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Choose a username"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-snap-yellow/50"
          />
        </div>
      </div>
      
      <div className="mt-auto pt-8">
        <Button onClick={handleComplete} className="snap-button w-full">
          Complete Setup
        </Button>
      </div>
    </div>
  ];
  
  return (
    <div className="flex flex-col justify-between h-screen bg-snap-dark-purple">
      <div className="flex-1 flex items-center">
        {steps[step]}
      </div>
      
      {step > 0 && (
        <div className="p-4">
          <Button 
            variant="ghost" 
            onClick={() => setStep(step - 1)}
            className="text-gray-400"
          >
            Back
          </Button>
        </div>
      )}
    </div>
  );
};

export default OnboardingPage;
