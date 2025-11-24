import { supabase } from "@/supabase/Supabase";
import type { Skill } from "@/types/Types";

// ==================== TYPE DEFINITIONS ====================

export interface CreateSkillData {
  title: string;
  description: string;
  category: string;
  location: string;
  tags: string[];
  level?: string;
  exchangeType?: string;
  imageUrl?: string;
  userId: string;
  userName: string;
  userAvatar?: string;
}

export interface CreateSkillResult {
  success: boolean;
  skill?: Skill;
  error?: string;
}

// ==================== CREATE SKILL ====================

/**
 * Create a new skill offering
 */
export const createSkill = async (
  skillData: CreateSkillData
): Promise<CreateSkillResult> => {
  try {
    const { data, error } = await supabase.from("Skills").insert({
      title: skillData.title,
      description: skillData.description,
      category: skillData.category,
      location: skillData.location,
      tags: skillData.tags,
      level: skillData.level || "",
      exchange_type: skillData.exchangeType || "",
      image_url: skillData.imageUrl || "",
      user_id: skillData.userId,
      user_name: skillData.userName,
      user_avatar: skillData.userAvatar || "",
      approved: true, // Auto-approve for MVP (can add admin approval later)
    }).select().single();

    if (error) throw error;
    if (!data) {
      throw new Error("Failed to create skill");
    }

    // Map database response to Skill type
    const skill: Skill = {
      id: data.id,
      title: data.title || "Untitled",
      description: data.description || "",
      category: data.category || "",
      userId: data.user_id || data.userId,
      userName: data.user_name || data.userName,
      userAvatar: data.user_avatar || data.userAvatar || "",
      createdAt: data.created_at || data.createdAt
        ? new Date(data.created_at || data.createdAt)
        : new Date(),
      price: data.price || 0,
      level: data.level || "",
      location: data.location || "",
      tags: data.tags || [],
      exchangeType: data.exchange_type || data.exchangeType || "",
      imageUrl: data.image_url || data.imageUrl || "",
      approved: data.approved || false,
    };

    return {
      success: true,
      skill: skill,
    };
  } catch (error: any) {
    let errorMessage = "An error occurred while creating the skill";

    if (error?.message) {
      if (error.message.includes("duplicate")) {
        errorMessage = "A skill with this title already exists";
      } else if (error.message.includes("permission")) {
        errorMessage = "You don't have permission to create skills";
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

