
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
import { Mail, Key, User, ArrowRight } from 'lucide-react';

const AuthPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [magicLinkEmail, setMagicLinkEmail] = useState('');
  const [showMagicLinkForm, setShowMagicLinkForm] = useState(false);
  const { user, hasProfile } = useAuth();
  const navigate = useNavigate();

  // Om användaren redan är inloggad, dirigera till lämplig sida
  useEffect(() => {
    if (user) {
      // Om användaren har en profil, dirigera till camera-sidan
      // Annars, dirigera till create-profile-sidan
      console.log('User already logged in, hasProfile:', hasProfile);
      navigate(hasProfile ? '/camera' : '/create-profile');
    }
  }, [user, hasProfile, navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signInWithEmail(email, password);
      toast.success("Inloggad!");
    } catch (error: any) {
      console.error("Sign in error:", error);
      toast.error(error.message || "Inloggning misslyckades");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !username) {
      toast.error("Fyll i alla obligatoriska fält");
      return;
    }
    
    if (username.length < 3) {
      toast.error("Användarnamnet måste vara minst 3 tecken");
      return;
    }
    
    if (password.length < 6) {
      toast.error("Lösenordet måste vara minst 6 tecken");
      return;
    }
    
    setIsLoading(true);

    try {
      await signUpWithEmail(email, password, username);
      toast.success("Konto skapat! Kontrollera din e-post för verifiering.");
    } catch (error: any) {
      console.error("Sign up error:", error);
      toast.error(error.message || "Registrering misslyckades");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!magicLinkEmail) {
      toast.error("Ange din e-postadress");
      return;
    }
    
    setIsLoading(true);

    try {
      await sendMagicLink(magicLinkEmail);
      toast.success("Magisk länk skickad! Kontrollera din e-post.");
    } catch (error: any) {
      console.error("Magic link error:", error);
      toast.error(error.message || "Kunde inte skicka magisk länk");
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
                e.currentTarget.src = "/placeholder.svg";
              }}
            />
          </div>

          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">Välkommen till Snap3</h1>
            <p className="text-gray-400 mb-8">
              Logga in eller skapa ett konto för att komma igång
            </p>
          </div>

          {showMagicLinkForm ? (
            <div className="w-full">
              <form onSubmit={handleSendMagicLink} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="magic-email">E-post</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input 
                      id="magic-email" 
                      type="email" 
                      placeholder="Ange din e-post"
                      value={magicLinkEmail}
                      onChange={(e) => setMagicLinkEmail(e.target.value)}
                      required
                      className="bg-white/5 border-white/10 pl-10"
                    />
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full snap-button mt-6"
                  disabled={isLoading}
                >
                  {isLoading ? "Skickar..." : "Skicka magisk länk"}
                  <ArrowRight size={16} className="ml-2" />
                </Button>
                
                <Button 
                  type="button"
                  variant="link"
                  className="w-full text-gray-400"
                  onClick={() => setShowMagicLinkForm(false)}
                >
                  Tillbaka till vanlig inloggning
                </Button>
              </form>
            </div>
          ) : (
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="signin">Logga in</TabsTrigger>
                <TabsTrigger value="signup">Skapa konto</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">E-post</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <Input 
                        id="signin-email" 
                        type="email" 
                        placeholder="Ange din e-post"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="bg-white/5 border-white/10 pl-10"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Lösenord</Label>
                    <div className="relative">
                      <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <Input 
                        id="signin-password" 
                        type="password" 
                        placeholder="Ange ditt lösenord"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="bg-white/5 border-white/10 pl-10"
                      />
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full snap-button mt-6"
                    disabled={isLoading}
                  >
                    {isLoading ? "Loggar in..." : "Logga in"}
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                  
                  <div className="mt-4">
                    <Separator className="my-4" />
                    <Button 
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => setShowMagicLinkForm(true)}
                    >
                      Logga in med magisk länk
                    </Button>
                  </div>
                </form>
              </TabsContent>
              
              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">E-post *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <Input 
                        id="signup-email" 
                        type="email" 
                        placeholder="Ange din e-post"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="bg-white/5 border-white/10 pl-10"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-username">Användarnamn *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <Input 
                        id="signup-username" 
                        type="text" 
                        placeholder="Välj ett användarnamn"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="bg-white/5 border-white/10 pl-10"
                      />
                    </div>
                    {username && username.length < 3 && (
                      <p className="text-sm text-red-500">Användarnamnet måste vara minst 3 tecken</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Lösenord *</Label>
                    <div className="relative">
                      <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <Input 
                        id="signup-password" 
                        type="password" 
                        placeholder="Välj ett lösenord"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="bg-white/5 border-white/10 pl-10"
                      />
                    </div>
                    {password && password.length < 6 && (
                      <p className="text-sm text-red-500">Lösenordet måste vara minst 6 tecken</p>
                    )}
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full snap-button mt-6"
                    disabled={isLoading || username.length < 3 || password.length < 6}
                  >
                    {isLoading ? "Skapar konto..." : "Skapa konto"}
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          )}

          <p className="text-xs text-gray-500 text-center mt-4">
            Genom att logga in godkänner du våra användarvillkor och sekretesspolicy
          </p>
        </div>
      </Card>
    </div>
  );
};

export default AuthPage;
