import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Upload, Sparkles } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Alert, AlertDescription } from "../ui/alert";
import { useAuth } from "@/hooks/useAuth";
import { createSkill } from "@/services/SkillServices";
import { getCurrentUser } from "@/auth/AuthServices";
import { supabase } from "@/supabase/Supabase";

// ==================== TYPE DEFINITIONS ====================

interface SkillFormData {
  title: string;
  description: string;
  location: string;
  category: string;
  tags: string;
  level: string;
  exchangeType: string;
}

// ==================== SKILL UPLOAD FORM ====================

/**
 * SkillUploadForm - Form for users to post new skill offerings
 * Matches dark theme with proper responsiveness
 */
export const SkillUploadForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const [form, setForm] = useState<SkillFormData>({
    title: "",
    description: "",
    location: "",
    category: "",
    tags: "",
    level: "",
    exchangeType: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string>("");
  const [userName, setUserName] = useState<string>("");

  // ==================== EFFECTS ====================

  /**
   * Fetch user info when component mounts
   */
  useEffect(() => {
    const fetchUserInfo = async () => {
      if (isAuthenticated && user) {
        const currentUser = await getCurrentUser();
        if (currentUser) {
          const displayName =
            currentUser.user_metadata?.display_name ||
            currentUser.user_metadata?.full_name ||
            currentUser.email?.split("@")[0] ||
            "";
          setUserName(displayName);

          // Fetch user profile from database to get full_name
          const { data: userProfile } = await supabase
            .from("users")
            .select("full_name")
            .eq("uid", currentUser.id)
            .single();

          if (userProfile?.full_name) {
            setUserName(userProfile.full_name);
          }
        }
      }
    };

    if (!authLoading) {
      if (!isAuthenticated) {
        navigate("/login");
      } else {
        fetchUserInfo();
      }
    }
  }, [isAuthenticated, user, authLoading, navigate]);

  // ==================== HANDLERS ====================

  /**
   * Handle form field changes
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError("");

    if (!user) {
      setError("You must be logged in to post a skill");
      setLoading(false);
      return;
    }

    // Process tags
    const tagsArray = form.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    const skillData = {
      title: form.title.trim(),
      description: form.description.trim(),
      category: form.category.trim(),
      location: form.location.trim(),
      tags: tagsArray,
      level: form.level.trim() || "Beginner",
      exchangeType: form.exchangeType.trim() || "Free",
      userId: user.id,
      userName: userName || user.email?.split("@")[0] || "Anonymous",
      userAvatar: user.user_metadata?.avatar_url || "",
    };

    try {
      const result = await createSkill(skillData);

      if (result.success) {
        // Invalidate and refetch skills query to show new skill
        await queryClient.invalidateQueries({ queryKey: ["Skills"] });
        await queryClient.invalidateQueries({ queryKey: ["tags"] });

        // Reset form
        setForm({
          title: "",
          description: "",
          location: "",
          category: "",
          tags: "",
          level: "",
          exchangeType: "",
        });
        setSuccess(true);

        // Redirect to skills page after 2 seconds
        setTimeout(() => {
          navigate("/skills");
        }, 2000);
      } else {
        setError(result.error || "Failed to create skill");
      }
    } catch (error: unknown) {
      console.error("Error submitting skill:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ==================== LOADING STATES ====================

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#101822]">
        <div className="text-gray-300 belleza">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  // ==================== RENDER ====================

  return (
    <div className="min-h-screen bg-[#101822] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/skills")}
            className="mb-4 text-gray-300 hover:text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Back to Skills</span>
            <span className="sm:hidden">Back</span>
          </Button>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#10B981]/20 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-[#10B981]" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white cinzel">
                Share Your Skill
              </h1>
              <p className="text-gray-400 mt-1 text-sm sm:text-base belleza">
                Help others learn by sharing what you know
              </p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-800 shadow-xl overflow-hidden">
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 lg:p-8 xl:p-10">
            {/* Error Alert */}
            {error && (
              <Alert className="mb-4 sm:mb-6 border-red-500/50 bg-red-500/10">
                <AlertDescription className="text-red-300 belleza">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {/* Success Alert */}
            {success && (
              <Alert className="mb-4 sm:mb-6 border-[#10B981]/50 bg-[#10B981]/10">
                <AlertDescription className="text-[#10B981] belleza">
                  Skill submitted successfully! Redirecting...
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-4 sm:space-y-6">
              {/* Title */}
              <div>
                <Label
                  htmlFor="title"
                  className="text-white font-semibold text-sm mb-2 block belleza"
                >
                  Skill Title <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g., Digital Marketing, Web Development, Graphic Design"
                  required
                  className="h-11 sm:h-12 text-base border-gray-700 bg-gray-800/50 text-white placeholder:text-gray-500 focus:border-[#10B981] focus:ring-[#10B981]"
                />
              </div>

              {/* Description */}
              <div>
                <Label
                  htmlFor="description"
                  className="text-white font-semibold text-sm mb-2 block belleza"
                >
                  Description <span className="text-red-400">*</span>
                </Label>
                <textarea
                  id="description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe what you can teach, what students will learn, and any prerequisites..."
                  rows={5}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-700 rounded-lg bg-gray-800/50 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-[#10B981] resize-none text-base belleza"
                />
                <p className="mt-2 text-sm text-gray-400 belleza">
                  Be detailed and clear about what learners will gain
                </p>
              </div>

              {/* Category and Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <Label
                    htmlFor="category"
                    className="text-white font-semibold text-sm mb-2 block belleza"
                  >
                    Category <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    id="category"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    placeholder="e.g., Tech, Art, Trade, Business"
                    required
                    className="h-11 sm:h-12 text-base border-gray-700 bg-gray-800/50 text-white placeholder:text-gray-500 focus:border-[#10B981] focus:ring-[#10B981]"
                  />
                </div>

                <div>
                  <Label
                    htmlFor="location"
                    className="text-white font-semibold text-sm mb-2 block belleza"
                  >
                    Location <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    id="location"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="e.g., Accra, Ghana"
                    required
                    className="h-11 sm:h-12 text-base border-gray-700 bg-gray-800/50 text-white placeholder:text-gray-500 focus:border-[#10B981] focus:ring-[#10B981]"
                  />
                </div>
              </div>

              {/* Level and Exchange Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <Label
                    htmlFor="level"
                    className="text-white font-semibold text-sm mb-2 block belleza"
                  >
                    Skill Level
                  </Label>
                  <Input
                    id="level"
                    name="level"
                    value={form.level}
                    onChange={handleChange}
                    placeholder="e.g., Beginner, Intermediate, Advanced"
                    className="h-11 sm:h-12 text-base border-gray-700 bg-gray-800/50 text-white placeholder:text-gray-500 focus:border-[#10B981] focus:ring-[#10B981]"
                  />
                </div>

                <div>
                  <Label
                    htmlFor="exchangeType"
                    className="text-white font-semibold text-sm mb-2 block belleza"
                  >
                    Exchange Type
                  </Label>
                  <Input
                    id="exchangeType"
                    name="exchangeType"
                    value={form.exchangeType}
                    onChange={handleChange}
                    placeholder="e.g., Free, Skill Swap, Paid"
                    className="h-11 sm:h-12 text-base border-gray-700 bg-gray-800/50 text-white placeholder:text-gray-500 focus:border-[#10B981] focus:ring-[#10B981]"
                  />
                </div>
              </div>

              {/* Tags */}
              <div>
                <Label
                  htmlFor="tags"
                  className="text-white font-semibold text-sm mb-2 block belleza"
                >
                  Tags
                </Label>
                <Input
                  id="tags"
                  name="tags"
                  value={form.tags}
                  onChange={handleChange}
                  placeholder="e.g., UI Design, Photoshop, Branding, Marketing"
                  className="h-11 sm:h-12 text-base border-gray-700 bg-gray-800/50 text-white placeholder:text-gray-500 focus:border-[#10B981] focus:ring-[#10B981]"
                />
                <p className="mt-2 text-sm text-gray-400 belleza">
                  Separate multiple tags with commas. Tags help others find your
                  skill easily.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/10">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/skills")}
                disabled={loading}
                className="h-11 sm:h-12 px-6 border-gray-700 text-gray-300 hover:text-white hover:bg-white/10"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="h-11 sm:h-12 px-6 sm:px-8 bg-[#10B981] hover:bg-[#0ea371] text-white font-semibold shadow-lg hover:shadow-[#10B981]/30 transition-all belleza"
              >
                {loading ? (
                  <>
                    <Upload className="w-4 h-4 mr-2 animate-pulse" />
                    Posting...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Post Skill
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>

        {/* Help Text */}
        <div className="mt-4 sm:mt-6 p-4 bg-[#10B981]/10 rounded-lg border border-[#10B981]/20">
          <p className="text-sm text-[#10B981] belleza">
            <strong>Tip:</strong> Make your skill description clear and
            engaging. Include what learners will gain and any prerequisites.
            This helps others find and choose your skill!
          </p>
        </div>
      </div>
    </div>
  );
};

export default SkillUploadForm;
