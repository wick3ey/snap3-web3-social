
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { verifySignIn } from "npm:@solana/wallet-standard-util@1.1.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const supabaseUrl = Deno.env.get("SUPABASE_URL") as string;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") as string;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { input, output } = await req.json();

    if (!input || !output) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing input or output" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Convert the data back to Uint8Array format
    const serializedOutput = {
      account: {
        ...output.account,
        publicKey: new Uint8Array(Object.values(output.account.publicKey)),
      },
      signature: new Uint8Array(Object.values(output.signature)),
      signedMessage: new Uint8Array(Object.values(output.signedMessage)),
    };

    // Verify the signed message
    const isValid = verifySignIn(input, serializedOutput);

    if (!isValid) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid signature" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Extract wallet address from output
    const walletAddress = output.account.address;

    // Check if user exists
    const { data: existingUser, error: fetchError } = await supabase
      .from("profiles")
      .select("*")
      .eq("wallet_address", walletAddress)
      .single();

    let userId: string;

    if (fetchError || !existingUser) {
      // Create a new user
      const { data: authUser, error: createAuthError } = await supabase.auth.admin.createUser({
        email: `${walletAddress.slice(0, 8)}@phantom.solana`,
        password: `${crypto.randomUUID()}${crypto.randomUUID()}`,
        email_confirm: true,
      });

      if (createAuthError) {
        console.error("Error creating auth user:", createAuthError);
        return new Response(
          JSON.stringify({ success: false, error: "Failed to create user" }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      userId = authUser.user.id;

      // Create profile entry
      const { error: profileError } = await supabase
        .from("profiles")
        .insert({
          id: userId,
          wallet_address: walletAddress,
          username: `solana_${walletAddress.slice(0, 6)}`,
          last_login: new Date().toISOString(),
        });

      if (profileError) {
        console.error("Error creating profile:", profileError);
        return new Response(
          JSON.stringify({ success: false, error: "Failed to create profile" }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
    } else {
      userId = existingUser.id;

      // Update last login
      await supabase
        .from("profiles")
        .update({ last_login: new Date().toISOString() })
        .eq("id", userId);
    }

    // Create a new session for the user
    const { data: session, error: sessionError } = await supabase.auth.admin.createSession({
      user_id: userId,
      expires_in: 60 * 60 * 24 * 7, // 1 week
    });

    if (sessionError) {
      console.error("Error creating session:", sessionError);
      return new Response(
        JSON.stringify({ success: false, error: "Failed to create session" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        session: session
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error handling SIWS:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
