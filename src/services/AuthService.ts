
import { supabase } from '@/integrations/supabase/client';

// Sign up with email and password
export const signUpWithEmail = async (
  email: string, 
  password: string, 
  username: string
): Promise<any> => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username
        }
      }
    });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error during sign up:", error);
    throw error;
  }
};

// Sign in with email and password
export const signInWithEmail = async (
  email: string, 
  password: string
): Promise<any> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error during sign in:", error);
    throw error;
  }
};

// Set session after successful authentication
export const setSession = async (session: any): Promise<void> => {
  await supabase.auth.setSession({
    access_token: session.access_token,
    refresh_token: session.refresh_token
  });
};
