
import { SolanaSignInInput, SolanaSignInOutput } from "@solana/wallet-standard-features";
import { supabase } from '@/integrations/supabase/client';

// Create sign-in data with proper formatting
export const createSignInData = (): SolanaSignInInput => {
  const now = new Date();
  const currentDateTime = now.toISOString();
  
  // Get the domain without port for compatibility
  const domain = window.location.host.split(':')[0];
  
  return {
    domain: domain,
    statement: "Sign in to Snap3 with your Solana wallet",
    version: "1",
    nonce: crypto.randomUUID(),
    chainId: "solana:mainnet",
    issuedAt: currentDateTime,
    // Resources should be full URLs
    resources: [
      `https://${domain}/terms`,
      `https://${domain}/privacy`
    ]
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
