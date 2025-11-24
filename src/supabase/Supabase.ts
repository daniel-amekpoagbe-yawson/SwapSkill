import { createClient } from "@supabase/supabase-js";

// ==================== SUPABASE CONFIGURATION ====================

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "⚠️ Supabase URL and Anon Key are required. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file"
  );
  console.warn(
    "The app will continue to run but database operations will fail."
  );
}

// ==================== INITIALIZE SUPABASE CLIENT ====================

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

