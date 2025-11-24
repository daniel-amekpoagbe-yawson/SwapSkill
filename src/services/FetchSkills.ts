import { supabase } from "@/supabase/Supabase";
import type { Skill } from "@/types/Types";

// ==================== FETCH ALL SKILLS ====================

export const FetchSkills = async (): Promise<Skill[]> => {
  try {
    const { data, error } = await supabase
      .from("Skills")
      .select("*")
      .eq("approved", true);

    if (error) {
      console.error("Error fetching skills:", error);
      return [];
    }

    if (!data) return [];

    return data
      .map((skill: any) => {
        // Only return approved skills
        if (!skill.approved) return null;

        return {
          id: skill.id,
          title: skill.title || "Untitled",
          description: skill.description || "",
          category: skill.category || "",
          userId: skill.user_id || skill.userId,
          userName: skill.user_name || skill.userName,
          userAvatar: skill.user_avatar || skill.userAvatar,
          createdAt: skill.created_at || skill.createdAt
            ? new Date(skill.created_at || skill.createdAt)
            : new Date(),
          price: skill.price || 0,
          level: skill.level || "",
          location: skill.location || "",
          tags: skill.tags || [],
          exchangeType: skill.exchange_type || skill.exchangeType || "",
          imageUrl: skill.image_url || skill.imageUrl || "",
          approved: skill.approved || false,
        };
      })
      .filter(Boolean) as Skill[];
  } catch (error) {
    console.error("Unexpected error fetching skills:", error);
    return [];
  }
};

// ==================== FETCH SKILL BY ID ====================

export const fetchSkillById = async (id: string): Promise<Skill | null> => {
  try {
    const { data, error } = await supabase
      .from("Skills")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching skill by ID:", error);
      return null;
    }

    if (!data) return null;

    return {
      id: data.id,
      title: data.title || "Untitled",
      description: data.description || "",
      category: data.category || "",
      userId: data.user_id || data.userId,
      userName: data.user_name || data.userName,
      userAvatar: data.user_avatar || data.userAvatar,
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
    } as Skill;
  } catch (error) {
    console.error("Error fetching skill by ID:", error);
    throw new Error("Failed to fetch skill");
  }
};
