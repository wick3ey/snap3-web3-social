
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

const CreateProfilePage = () => {
  const { user, hasProfile, refreshProfile } = useAuth();
  const [username, setUsername] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // If user already has a profile, redirect to camera page
  useEffect(() => {
    if (hasProfile) {
      navigate('/camera');
    }
  }, [hasProfile, navigate]);

  // If no user, redirect to auth page
  useEffect(() => {
    if (!user) {
      navigate('/auth');
    } else if (user.user_metadata?.username) {
      // If user already has a username in metadata, pre-fill it
      setUsername(user.user_metadata.username);
    }
  }, [user, navigate]);

  // Check if username is available (debounced)
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
          .single();
          
        if (data) {
          setError('This username is already taken');
        }
      } catch (err) {
        // If error is "No rows found", username is available
        // Otherwise, log the error
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username) {
      setError('Username is required');
      return;
    }
    
    if (username.length < 3) {
      setError('Username must be at least 3 characters');
      return;
    }
    
    if (error) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      if (!user) {
        throw new Error('No user found');
      }
      
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          username,
          last_login: new Date().toISOString(),
        });
      
      if (error) {
        console.error('Error creating profile:', error);
        if (error.message.includes('unique constraint')) {
          setError('This username is already taken');
        } else {
          toast.error('Failed to create profile. Please try again.');
        }
        return;
      }
      
      // Refresh the profile data in context
      await refreshProfile();
      
      toast.success('Profile created successfully!');
      navigate('/camera');
    } catch (err) {
      console.error('Error creating profile:', err);
      toast.error('Failed to create profile. Please try again.');
    } finally {
      setIsSubmitting(false);
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
            <h1 className="text-3xl font-bold mb-2">Create Your Profile</h1>
            <p className="text-gray-400 mb-8">
              Choose a unique username to complete your account setup
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Choose a username"
                className="bg-white/5 border-white/10 text-white"
                disabled={isSubmitting}
              />
              {isChecking && (
                <p className="text-sm text-gray-400">Checking availability...</p>
              )}
              {error && (
                <p className="text-sm text-red-500">{error}</p>
              )}
              {username && username.length >= 3 && !error && !isChecking && (
                <p className="text-sm text-green-500">Username is available</p>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full snap-button"
              disabled={isSubmitting || isChecking || !!error || username.length < 3}
            >
              {isSubmitting ? 'Creating Profile...' : 'Create Profile'}
            </Button>
          </form>

          <p className="text-xs text-gray-500 text-center mt-4">
            Your username will be publicly visible
          </p>
        </div>
      </Card>
    </div>
  );
};

export default CreateProfilePage;
