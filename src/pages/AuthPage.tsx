
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmail, signUpWithEmail, sendMagicLink } from '@/services/AuthService';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

const AuthPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [magicLinkEmail, setMagicLinkEmail] = useState('');
  const [showMagicLinkForm, setShowMagicLinkForm] = useState(false);
  const { user, hasProfile } = useAuth();
  const navigate = useNavigate();

  // If user is already logged in, redirect appropriately
  useEffect(() => {
    if (user) {
      // If user has a profile, redirect to camera page
      // Otherwise, redirect to create-profile page
      navigate(hasProfile ? '/camera' : '/create-profile');
    }
  }, [user, hasProfile, navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signInWithEmail(email, password);
      toast.success("Successfully signed in!");
    } catch (error: any) {
      console.error("Sign in error:", error);
      toast.error(error.message || "Sign in failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signUpWithEmail(email, password, username);
      toast.success("Account created! Please check your email for verification.");
    } catch (error: any) {
      console.error("Sign up error:", error);
      toast.error(error.message || "Sign up failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await sendMagicLink(magicLinkEmail);
      toast.success("Magic link sent! Please check your email.");
    } catch (error: any) {
      console.error("Magic link error:", error);
      toast.error(error.message || "Failed to send magic link");
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
              src="/sol-logo.png" 
              alt="Logo" 
              className="w-16 h-16"
              onError={(e) => {
                // Fallback if image fails to load
                e.currentTarget.src = "/placeholder.svg";
              }}
            />
          </div>

          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">Welcome to Snap3</h1>
            <p className="text-gray-400 mb-8">
              Sign in or create an account to access the social experience
            </p>
          </div>

          {showMagicLinkForm ? (
            <div className="w-full">
              <form onSubmit={handleSendMagicLink} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="magic-email">Email</Label>
                  <Input 
                    id="magic-email" 
                    type="email" 
                    placeholder="Enter your email"
                    value={magicLinkEmail}
                    onChange={(e) => setMagicLinkEmail(e.target.value)}
                    required
                    className="bg-white/5 border-white/10"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full snap-button mt-6"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send Magic Link"}
                </Button>
                
                <Button 
                  type="button"
                  variant="link"
                  className="w-full text-gray-400"
                  onClick={() => setShowMagicLinkForm(false)}
                >
                  Back to regular login
                </Button>
              </form>
            </div>
          ) : (
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <Input 
                      id="signin-email" 
                      type="email" 
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-white/5 border-white/10"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <Input 
                      id="signin-password" 
                      type="password" 
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="bg-white/5 border-white/10"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full snap-button mt-6"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                  
                  <div className="mt-4">
                    <Separator className="my-4" />
                    <Button 
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => setShowMagicLinkForm(true)}
                    >
                      Sign in with Magic Link
                    </Button>
                  </div>
                </form>
              </TabsContent>
              
              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input 
                      id="signup-email" 
                      type="email" 
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-white/5 border-white/10"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-username">Username</Label>
                    <Input 
                      id="signup-username" 
                      type="text" 
                      placeholder="Choose a username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      className="bg-white/5 border-white/10"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input 
                      id="signup-password" 
                      type="password" 
                      placeholder="Choose a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="bg-white/5 border-white/10"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full snap-button mt-6"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          )}

          <p className="text-xs text-gray-500 text-center mt-4">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </Card>
    </div>
  );
};

export default AuthPage;
