import { supabase } from "@/supabase/Supabase";
import type { User } from "@supabase/supabase-js";

// ==================== TYPE DEFINITIONS ====================

export interface SignUpData {
  fullName: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResult {
  success: boolean;
  user?: User;
  error?: string;
}

// ==================== AUTH FUNCTIONS ====================

/**
 * Sign up a new user with email and password
 * Also creates a user document in Supabase database
 */
export const signUpWithEmail = async (
  userData: SignUpData
): Promise<AuthResult> => {
  try {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: {
        data: {
          full_name: userData.fullName,
          display_name: userData.fullName,
        },
      },
    });

    if (authError) throw authError;
    if (!authData.user) {
      throw new Error("User creation failed");
    }

    const user = authData.user;

    // Create user document in Supabase database
    const { error: dbError } = await supabase.from("users").insert({
      uid: user.id,
      full_name: userData.fullName,
      email: userData.email,
      created_at: new Date().toISOString(),
      last_login_at: new Date().toISOString(),
    });

    if (dbError) {
      console.error("Error creating user document:", dbError);
    }

    return {
      success: true,
      user: user,
    };
  } catch (error: any) {
    let errorMessage = "An error occurred during sign up";

    if (error?.message) {
      if (error.message.includes("already registered")) {
        errorMessage = "An account with this email already exists";
      } else if (error.message.includes("Password")) {
        errorMessage = "Password is too weak";
      } else if (error.message.includes("email")) {
        errorMessage = "Invalid email address";
      } else {
        errorMessage = error.message;
      }
    }

    return {
      success: false,
      error: errorMessage,
    };
  }
};

// ==================== GET CURRENT USER ====================

export const getCurrentUser = async (): Promise<User | null> => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
};

// ==================== SIGN IN ====================

/**
 * Sign in an existing user with email and password
 */
export const signInWithEmail = async (
  loginData: LoginData
): Promise<AuthResult> => {
  try {
    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password,
      });

    if (authError) throw authError;
    if (!authData.user) {
      throw new Error("Sign in failed");
    }

    const user = authData.user;

    // Update last login time in Supabase database
    const { error: dbError } = await supabase
      .from("users")
      .update({
        last_login_at: new Date().toISOString(),
      })
      .eq("uid", user.id);

    if (dbError) {
      console.error("Error updating last login:", dbError);
    }

    return {
      success: true,
      user: user,
    };
  } catch (error: any) {
    let errorMessage = "An error occurred during sign in";

    if (error?.message) {
      if (error.message.includes("Invalid login credentials")) {
        errorMessage = "Incorrect email or password";
      } else if (error.message.includes("email")) {
        errorMessage = "Invalid email address";
      } else if (error.message.includes("Email not confirmed")) {
        errorMessage = "Please verify your email address";
      } else {
        errorMessage = error.message;
      }
    }

    return {
      success: false,
      error: errorMessage,
    };
  }
};
