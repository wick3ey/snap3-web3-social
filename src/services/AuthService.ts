
import { SolanaSignInInput, SolanaSignInOutput } from "@solana/wallet-standard-features";
import { supabase } from '@/integrations/supabase/client';

// Create sign-in data with proper formatting per SIWS specification
export const createSignInData = (): SolanaSignInInput => {
  const now = new Date();
  const currentDateTime = now.toISOString();
  
  // Get the domain without protocol or port - this is critical for Phantom wallet compatibility
  const domain = window.location.hostname;
  
  // Create a properly formatted SIWS input object - removing resources to avoid formatting issues
  return {
    domain: domain,
    statement: "Sign in to Snap3 with your Solana wallet",
    version: "1",
    nonce: crypto.randomUUID(),
    chainId: "solana:mainnet",
    issuedAt: currentDateTime,
  };
};

// Verify SIWS with Supabase edge function
export const verifySIWS = async (
  input: SolanaSignInInput,
  output: SolanaSignInOutput
): Promise<any> => {
  try {
    const { data, error } = await supabase.functions.invoke('siws', {
      body: { input, output },
    });

    if (error) {
      console.error("SIWS verification error:", error);
      throw new Error("Verification failed");
    }

    return data;
  } catch (error) {
    console.error("Error during SIWS verification:", error);
    throw error;
  }
};

// Set session after successful verification
export const setSession = async (session: any): Promise<void> => {
  await supabase.auth.setSession({
    access_token: session.access_token,
    refresh_token: session.refresh_token
  });
};
