import { supabase } from "@/supabase/Supabase";
import type { AuthResult } from "./AuthServices";

export const signOutUser = async (): Promise<AuthResult> => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;

    return {
      success: true,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error?.message || "An error occurred during sign out",
    };
  }
};
