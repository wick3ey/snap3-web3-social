
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
        },
        emailRedirectTo: `${window.location.origin}/auth`
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

// Send magic link (passwordless login)
export const sendMagicLink = async (
  email: string
): Promise<any> => {
  try {
    console.log("Sending magic link to:", email);
    console.log("Redirect URL:", `${window.location.origin}/auth`);
    
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth`,
      }
    });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error sending magic link:", error);
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

// Create or update user profile
export const updateProfile = async (
  userId: string,
  profileData: {
    username?: string;
    display_name?: string;
    avatar_url?: string;
    bio?: string;
  }
): Promise<any> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update(profileData)
      .eq('id', userId)
      .select('*')
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

// Upload profile image to storage
export const uploadProfileImage = async (
  userId: string,
  file: File
): Promise<string> => {
  try {
    // Create a unique file path
    const fileExt = file.name.split('.').pop();
    const fileName = `avatars/${userId}-${Math.random().toString(36).substring(2)}.${fileExt}`;

    // Upload the file
    const { error: uploadError } = await supabase.storage
      .from('profile-images')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (uploadError) {
      throw uploadError;
    }

    // Get the public URL
    const { data } = supabase.storage
      .from('profile-images')
      .getPublicUrl(fileName);

    return data.publicUrl;
  } catch (error) {
    console.error("Error uploading profile image:", error);
    throw error;
  }
};
