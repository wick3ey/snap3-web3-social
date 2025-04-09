
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Upload, User } from 'lucide-react';

const CreateProfilePage = () => {
  const { user, hasProfile, refreshProfile } = useAuth();
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  // Om användaren redan har en profil, dirigera till camera-sidan
  useEffect(() => {
    if (hasProfile) {
      console.log('User already has profile, redirecting to camera');
      navigate('/camera');
    }
  }, [hasProfile, navigate]);

  // Om ingen användare finns, dirigera till auth-sidan
  useEffect(() => {
    if (!user) {
      console.log('No user found, redirecting to auth');
      navigate('/auth');
    } else if (user.user_metadata?.username) {
      // Om användaren redan har ett användarnamn i metadata, fyll i det
      console.log('Found username in metadata:', user.user_metadata.username);
      setUsername(user.user_metadata.username);
    }
    
    if (user?.user_metadata?.display_name) {
      setDisplayName(user.user_metadata.display_name);
    }
  }, [user, navigate]);

  // Kontrollera om användarnamnet är tillgängligt (debounced)
  useEffect(() => {
    if (!username || username.length < 3) return;

    const checkUsername = async () => {
      setIsChecking(true);
      setError(null);
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('username')
          .eq('username', username)
          .maybeSingle();
          
        if (data && data.username) {
          setError('Detta användarnamn är redan taget');
        }
      } catch (err) {
        // Om felet är "No rows found", är användarnamnet tillgängligt
        // Annars, logga felet
        if (err instanceof Error && !err.message.includes('No rows found')) {
          console.error('Error checking username:', err);
        }
      } finally {
        setIsChecking(false);
      }
    };

    const timer = setTimeout(checkUsername, 500);
    return () => clearTimeout(timer);
  }, [username]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      setAvatarUrl(URL.createObjectURL(file));
    }
  };

  const uploadAvatar = async (userId: string): Promise<string | null> => {
    if (!avatarFile) return null;
    
    try {
      setIsUploading(true);
      
      // Skapa en unik filnamn baserat på användarens ID och tidsstämpel
      const fileExt = avatarFile.name.split('.').pop();
      const fileName = `${userId}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;
      
      // Ladda upp filen till Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('profile-images')
        .upload(filePath, avatarFile);
        
      if (uploadError) {
        throw uploadError;
      }
      
      // Hämta den publika URL:en för filen
      const { data } = supabase.storage
        .from('profile-images')
        .getPublicUrl(filePath);
        
      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast.error('Kunde inte ladda upp profilbild');
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username) {
      setError('Användarnamn är obligatoriskt');
      return;
    }
    
    if (username.length < 3) {
      setError('Användarnamn måste vara minst 3 tecken');
      return;
    }
    
    if (error) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      if (!user) {
        throw new Error('Ingen användare hittades');
      }
      
      console.log('Creating profile for user:', user.id);
      
      // Ladda upp avatar om det finns
      let avatarPublicUrl = null;
      if (avatarFile) {
        avatarPublicUrl = await uploadAvatar(user.id);
      }
      
      // Uppdatera profilen i databasen
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          username,
          display_name: displayName || username,
          bio: bio || null,
          avatar_url: avatarPublicUrl,
          wallet_address: null,  // Explicit null för TypeScript
          last_login: new Date().toISOString(),
        });
      
      if (error) {
        console.error('Error creating profile:', error);
        if (error.message.includes('unique constraint')) {
          setError('Detta användarnamn är redan taget');
        } else {
          toast.error('Kunde inte skapa profil. Försök igen.');
        }
        return;
      }
      
      // Uppdatera profildata i context
      console.log('Profile created, refreshing profile data');
      await refreshProfile();
      
      toast.success('Profil skapad!');
      navigate('/camera');
    } catch (err) {
      console.error('Error creating profile:', err);
      toast.error('Kunde inte skapa profil. Försök igen.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-snap-dark-purple p-4">
      <Card className="w-full max-w-md p-8 bg-black/30 backdrop-blur-sm border-white/10">
        <div className="flex flex-col items-center gap-6">
          <div className="w-24 h-24 relative">
            <Avatar className="w-24 h-24 border-2 border-snap-yellow">
              {avatarUrl ? (
                <AvatarImage src={avatarUrl} alt="Profilbild" />
              ) : (
                <AvatarFallback className="bg-solana-purple text-white">
                  <User size={32} />
                </AvatarFallback>
              )}
            </Avatar>
            <label 
              htmlFor="avatar-upload" 
              className="absolute bottom-0 right-0 bg-snap-yellow text-black p-2 rounded-full cursor-pointer"
            >
              <Upload size={16} />
              <input 
                id="avatar-upload" 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleFileChange}
                disabled={isSubmitting}
              />
            </label>
          </div>

          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">Skapa din profil</h1>
            <p className="text-gray-400 mb-8">
              Fyll i dina profiluppgifter för att slutföra ditt konto
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">Användarnamn *</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Välj ett unikt användarnamn"
                className="bg-white/5 border-white/10 text-white"
                disabled={isSubmitting}
              />
              {isChecking && (
                <p className="text-sm text-gray-400">Kontrollerar tillgänglighet...</p>
              )}
              {error && (
                <p className="text-sm text-red-500">{error}</p>
              )}
              {username && username.length >= 3 && !error && !isChecking && (
                <p className="text-sm text-green-500">Användarnamnet är tillgängligt</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="displayName">Visningsnamn</Label>
              <Input
                id="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Ditt namn eller smeknamn"
                className="bg-white/5 border-white/10 text-white"
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Berätta lite om dig själv"
                className="bg-white/5 border-white/10 text-white min-h-[80px]"
                disabled={isSubmitting}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full snap-button"
              disabled={isSubmitting || isUploading || isChecking || !!error || username.length < 3}
            >
              {isSubmitting ? 'Skapar profil...' : 'Skapa profil'}
            </Button>
          </form>

          <p className="text-xs text-gray-500 text-center mt-4">
            Ditt användarnamn och profil kommer att vara synlig för andra användare
          </p>
        </div>
      </Card>
    </div>
  );
};

export default CreateProfilePage;
