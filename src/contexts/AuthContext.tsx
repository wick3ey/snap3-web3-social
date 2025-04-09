
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { toast } from 'sonner';
import type { Database } from '@/integrations/supabase/types';

// Define the Profile type using the generated Database types
type Profile = Database['public']['Tables']['profiles']['Row'];

interface AuthContextProps {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  hasProfile: boolean;
}

const AuthContext = createContext<AuthContextProps>({
  session: null,
  user: null,
  profile: null,
  isLoading: true,
  signOut: async () => {},
  refreshProfile: async () => {},
  hasProfile: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasProfile, setHasProfile] = useState(false);
  const navigate = useNavigate();

  // Fetch user profile data
  const fetchProfile = async (userId: string) => {
    try {
      console.log('Fetching profile for user ID:', userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching profile:', error);
        setHasProfile(false);
        return;
      }

      console.log('Profile data:', data);
      setProfile(data);
      setHasProfile(!!data && !!data.username);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setHasProfile(false);
    }
  };

  // Refresh profile - can be called after profile creation
  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id);
    }
  };

  // Sign out function
  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setSession(null);
      setUser(null);
      setProfile(null);
      setHasProfile(false);
      navigate('/auth');
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Error signing out');
    }
  };

  useEffect(() => {
    // Check for OTP or auth tokens in URL hash
    const handleHashParams = async () => {
      // Check for access token in the URL (from OTP verification)
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = hashParams.get('access_token');
      const refreshToken = hashParams.get('refresh_token');
      const type = hashParams.get('type');
      
      if (accessToken && refreshToken) {
        try {
          console.log('Found tokens in URL, setting session');
          // Set the session with the token from URL
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken
          });
          
          if (error) throw error;
          
          // If this was a signup, show welcome message
          if (type === 'signup') {
            toast.success('Account verified successfully! Welcome!');
          } else {
            toast.success('Logged in successfully!');
          }
          
          // Clear the hash params from the URL (for security)
          window.history.replaceState(null, '', window.location.pathname);
        } catch (error) {
          console.error('Error setting session from URL:', error);
          toast.error('Authentication failed. Please try again.');
        }
      }
    };
    
    // Check for OTP verification when the component mounts
    handleHashParams();

    // Check for existing session
    const initializeAuth = async () => {
      setIsLoading(true);
      
      try {
        console.log('Initializing auth state...');
        // Set up auth state listener FIRST
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (event, newSession) => {
            console.log('Auth state changed:', event);
            
            setSession(newSession);
            setUser(newSession?.user ?? null);

            if (newSession?.user) {
              // On sign in, fetch profile
              console.log('User is signed in, fetching profile');
              await fetchProfile(newSession.user.id);
            } else if (event === 'SIGNED_OUT') {
              // On sign out, clear profile
              console.log('User signed out, clearing profile');
              setProfile(null);
              setHasProfile(false);
            }
          }
        );

        // THEN check for existing session
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        console.log('Got current session:', currentSession ? 'exists' : 'none');
        
        setSession(currentSession);
        setUser(currentSession?.user ?? null);

        if (currentSession?.user) {
          // Fetch user profile
          console.log('Found existing session, fetching profile');
          await fetchProfile(currentSession.user.id);
        }

        return () => {
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ 
      session, 
      user, 
      profile, 
      isLoading, 
      signOut, 
      refreshProfile,
      hasProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};
