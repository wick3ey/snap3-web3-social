// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://dasmmxusvezflknepfso.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhc21teHVzdmV6ZmxrbmVwZnNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxNDg4NDYsImV4cCI6MjA1OTcyNDg0Nn0.R3YhRkWfS-i3KBUYcU_xoghUnea3lubw8kUOigZykm0";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);