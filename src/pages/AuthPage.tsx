
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { createSignInData, verifySIWS, setSession } from '@/services/AuthService';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const AuthPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { wallet, signIn, connected, connecting, disconnect } = useWallet();
  const { user } = useAuth();
  const navigate = useNavigate();

  // If user is already logged in, redirect to camera page
  React.useEffect(() => {
    if (user) {
      navigate('/camera');
    }
  }, [user, navigate]);

  const handleSignIn = async () => {
    if (!wallet || !signIn) {
      toast.error("Please connect your wallet first");
      return;
    }

    if (!("signIn" in wallet.adapter)) {
      toast.error("Your wallet doesn't support Sign In With Solana");
      return;
    }

    setIsLoading(true);

    try {
      console.log("Creating sign in data...");
      // Create sign in data
      const input = createSignInData();
      console.log("Sign in data:", input);

      // Request wallet to sign in
      const output = await signIn(input);
      console.log("Sign output received:", output);

      // Verify the signature with our backend
      const result = await verifySIWS(input, output);

      if (result.success) {
        // Set the session in Supabase
        await setSession(result.session);
        toast.success("Successfully signed in!");
        navigate('/camera');
      } else {
        toast.error(result.error || "Sign in failed");
        await disconnect();
      }
    } catch (error: any) {
      console.error("Sign in error:", error);
      
      // Provide more specific error messages based on the error type
      if (error.name === 'WalletSignInError') {
        toast.error("Wallet sign-in failed. Please try again with a supported wallet.");
      } else if (error.message && error.message.includes("invalid formatting")) {
        toast.error("Sign-in request format error. Please try again or use a different wallet.");
      } else {
        toast.error(error.message || "Sign in failed");
      }
      
      await disconnect();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-snap-dark-purple p-4">
      <Card className="w-full max-w-md p-8 bg-black/30 backdrop-blur-sm border-white/10">
        <div className="flex flex-col items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-snap-yellow flex items-center justify-center">
            <img 
              src="https://cryptologos.cc/logos/solana-sol-logo.png" 
              alt="Solana" 
              className="w-16 h-16"
            />
          </div>

          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">Welcome to Snap3</h1>
            <p className="text-gray-400 mb-8">
              Sign in with your Solana wallet to access the Web3 social experience
            </p>
          </div>

          <div className="w-full space-y-4">
            {!connected && !connecting ? (
              <div className="flex flex-col gap-4">
                <WalletMultiButton className="wallet-button-custom w-full" />
                <p className="text-xs text-center text-gray-500">
                  Connect your Phantom wallet to continue
                </p>
              </div>
            ) : (
              <>
                <Button 
                  onClick={handleSignIn} 
                  disabled={isLoading} 
                  className="w-full snap-button"
                >
                  {isLoading ? "Signing in..." : "Sign in with Solana"}
                </Button>
                <p className="text-xs text-center text-gray-500">
                  Connected as {wallet?.adapter.publicKey?.toString().slice(0, 6)}...{wallet?.adapter.publicKey?.toString().slice(-4)}
                </p>
              </>
            )}
          </div>

          <p className="text-xs text-gray-500 text-center mt-4">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </Card>
    </div>
  );
};

export default AuthPage;
