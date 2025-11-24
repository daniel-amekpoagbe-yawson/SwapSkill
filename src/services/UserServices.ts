import { supabase } from "@/supabase/Supabase";

// ==================== TYPE DEFINITIONS ====================

export interface UserProfile {
  uid: string;
  full_name: string;
  email: string;
  created_at: string;
  last_login_at?: string;
  updated_at?: string;
  bio?: string;
  location?: string;
  avatar_url?: string;
  skill_tags?: string[];
}

export interface UpdateProfileData {
  full_name?: string;
  bio?: string;
  location?: string;
  avatar_url?: string;
  skill_tags?: string[];
}

export interface ProfileResult {
  success: boolean;
  profile?: UserProfile;
  error?: string;
}

// ==================== GET USER PROFILE ====================

/**
 * Get user profile by user ID
 */
export const getUserProfile = async (
  userId: string
): Promise<ProfileResult> => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("uid", userId)
      .single();

    if (error) throw error;
    if (!data) {
      return {
        success: false,
        error: "Profile not found",
      };
    }

    return {
      success: true,
      profile: data as UserProfile,
    };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch profile";

    return {
      success: false,
      error: errorMessage,
    };
  }
};

// ==================== UPDATE USER PROFILE ====================

/**
 * Update user profile
 */
export const updateUserProfile = async (
  userId: string,
  profileData: UpdateProfileData
): Promise<ProfileResult> => {
  try {
    const { data, error } = await supabase
      .from("users")
      .update(profileData)
      .eq("uid", userId)
      .select()
      .single();

    if (error) throw error;
    if (!data) {
      throw new Error("Failed to update profile");
    }

    return {
      success: true,
      profile: data as UserProfile,
    };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to update profile";

    return {
      success: false,
      error: errorMessage,
    };
  }
};

// ==================== GET USER SKILLS ====================

/**
 * Get skills posted by a user
 */
export const getUserSkills = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from("Skills")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return {
      success: true,
      skills: data || [],
    };
  } catch (error: unknown) {
    console.error("Error fetching user skills:", error);
    return {
      success: false,
      skills: [],
      error: error instanceof Error ? error.message : "Failed to fetch skills",
    };
  }
};

