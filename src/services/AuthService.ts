
import { SolanaSignInInput, SolanaSignInOutput } from "@solana/wallet-standard-features";
import { supabase } from '@/integrations/supabase/client';

// Create sign-in data
export const createSignInData = (): SolanaSignInInput => {
  const now = new Date();
  const currentDateTime = now.toISOString();
  
  return {
    domain: window.location.host,
    statement: "Sign in to Snap3 to prove you own this wallet",
    version: "1",
    nonce: crypto.randomUUID(),
    chainId: "mainnet",
    issuedAt: currentDateTime,
    resources: [`https://${window.location.host}/terms`, `https://${window.location.host}/privacy`]
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
