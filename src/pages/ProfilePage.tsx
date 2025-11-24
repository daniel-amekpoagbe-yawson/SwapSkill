import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  User,
  Mail,
  MapPin,
  Calendar,
  Edit2,
  Save,
  X,
  BookOpen,
  Award,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import {
  getUserProfile,
  updateUserProfile,
  getUserSkills,
} from "@/services/UserServices";
import { signOutUser } from "@/auth/LogOut";
import { SkillCard } from "@/components/custom/SkillCard";
import type { Skill } from "@/types/Types";

// ==================== PROFILE PAGE ====================

/**
 * ProfilePage - Display and edit user profile
 * Shows user info, stats, and skills they're teaching
 * Matches dark theme with proper responsiveness
 */
const ProfilePage = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const queryClient = useQueryClient();
  const { user: currentUser, isAuthenticated } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  // Determine which user's profile to show
  const profileUserId = userId || currentUser?.id;

  // ==================== DATA FETCHING ====================

  // Fetch profile
  const {
    data: profileData,
    isLoading: profileLoading,
    refetch: refetchProfile,
  } = useQuery({
    queryKey: ["userProfile", profileUserId],
    queryFn: () => getUserProfile(profileUserId!),
    enabled: !!profileUserId && isAuthenticated,
  });

  // Fetch user skills
  const { data: skillsData } = useQuery({
    queryKey: ["userSkills", profileUserId],
    queryFn: () => getUserSkills(profileUserId!),
    enabled: !!profileUserId,
  });

  const [editForm, setEditForm] = useState({
    full_name: "",
    bio: "",
    location: "",
  });

  // ==================== EFFECTS ====================

  /**
   * Initialize edit form when profile loads
   */
  useEffect(() => {
    if (profileData?.success && profileData.profile) {
      setEditForm({
        full_name: profileData.profile.full_name || "",
        bio: profileData.profile.bio || "",
        location: profileData.profile.location || "",
      });
    }
  }, [profileData]);

  // ==================== UTILITY FUNCTIONS ====================

  const isOwnProfile = currentUser?.id === profileUserId;

  /**
   * Get user initials for avatar fallback
   */
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  /**
   * Format date string
   */
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // ==================== HANDLERS ====================

  /**
   * Handle edit button click
   */
  const handleEdit = () => {
    setIsEditing(true);
    setError("");
    setSuccess("");
  };

  /**
   * Handle cancel edit
   */
  const handleCancel = () => {
    setIsEditing(false);
    if (profileData?.success && profileData.profile) {
      setEditForm({
        full_name: profileData.profile.full_name || "",
        bio: profileData.profile.bio || "",
        location: profileData.profile.location || "",
      });
    }
    setError("");
    setSuccess("");
  };

  /**
   * Handle save profile changes
   */
  const handleSave = async () => {
    if (!profileUserId) return;

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const result = await updateUserProfile(profileUserId, {
        full_name: editForm.full_name,
        bio: editForm.bio,
        location: editForm.location,
      });

      if (result.success) {
        setSuccess("Profile updated successfully!");
        setIsEditing(false);
        await refetchProfile();
        await queryClient.invalidateQueries({
          queryKey: ["userProfile", profileUserId],
        });
      } else {
        setError(result.error || "Failed to update profile");
      }
    } catch (error: unknown) {
      setError("An unexpected error occurred");
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle logout
   */
  const handleLogout = async () => {
    await signOutUser();
    navigate("/");
  };

  // ==================== LOADING STATES ====================

  if (profileLoading) {
    return (
      <div className="min-h-screen bg-[#101822] flex items-center justify-center">
        <div className="text-gray-300 belleza">Loading profile...</div>
      </div>
    );
  }

  if (!profileData?.success || !profileData.profile) {
    return (
      <div className="min-h-screen bg-[#101822] flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2 cinzel">
            Profile Not Found
          </h2>
          <p className="text-gray-400 mb-4 belleza">
            The profile you're looking for doesn't exist.
          </p>
          <Button
            onClick={() => navigate("/")}
            className="bg-[#10B981] hover:bg-[#0ea371]"
          >
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  const profile = profileData.profile;
  const skills = skillsData?.skills || [];

  // ==================== RENDER ====================

  return (
    <div className="min-h-screen bg-[#101822] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Card */}
        <Card className="mb-6 border-0 shadow-xl overflow-hidden bg-gray-900/80 backdrop-blur-xl border-gray-800">
          <div className="bg-gradient-to-r from-[#10B981]/30 via-emerald-500/30 to-[#10B981]/20 h-24 sm:h-32"></div>
          <CardContent className="p-4 sm:p-6 lg:p-8 -mt-12 sm:-mt-16 lg:-mt-20">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 sm:gap-6">
              {/* Avatar */}
              <Avatar className="w-20 h-20 sm:w-24 sm:h-32 border-4 border-[#101822] shadow-lg flex-shrink-0">
                <AvatarImage src={profile.avatar_url} alt={profile.full_name} />
                <AvatarFallback className="bg-gradient-to-br from-[#10B981] to-emerald-400 text-white text-xl sm:text-2xl lg:text-3xl">
                  {getInitials(profile.full_name)}
                </AvatarFallback>
              </Avatar>

              {/* Profile Info */}
              <div className="flex-1 w-full min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 cinzel truncate">
                      {profile.full_name}
                    </h1>
                    {profile.bio && (
                      <p className="text-gray-300 text-base sm:text-lg mb-3 sm:mb-4 belleza">
                        {profile.bio}
                      </p>
                    )}
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate belleza">{profile.email}</span>
                      </div>
                      {profile.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 flex-shrink-0" />
                          <span className="truncate belleza">{profile.location}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate belleza">
                          Joined {formatDate(profile.created_at)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {isOwnProfile && (
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {!isEditing ? (
                        <>
                          <Button
                            onClick={handleEdit}
                            variant="outline"
                            className="gap-2 border-gray-700 text-gray-300 hover:text-white hover:bg-white/10"
                          >
                            <Edit2 className="w-4 h-4" />
                            <span className="hidden sm:inline">Edit Profile</span>
                            <span className="sm:hidden">Edit</span>
                          </Button>
                          <Button
                            onClick={handleLogout}
                            variant="outline"
                            className="gap-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 border-red-500/50"
                          >
                            <LogOut className="w-4 h-4" />
                            <span className="hidden sm:inline">Logout</span>
                            <span className="sm:hidden">Out</span>
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            onClick={handleCancel}
                            variant="outline"
                            disabled={loading}
                            className="gap-2 border-gray-700 text-gray-300 hover:text-white hover:bg-white/10"
                          >
                            <X className="w-4 h-4" />
                            Cancel
                          </Button>
                          <Button
                            onClick={handleSave}
                            disabled={loading}
                            className="gap-2 bg-[#10B981] hover:bg-[#0ea371]"
                          >
                            <Save className="w-4 h-4" />
                            {loading ? "Saving..." : "Save"}
                          </Button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Edit Form */}
        {isEditing && isOwnProfile && (
          <Card className="mb-6 border-0 shadow-lg bg-gray-900/80 backdrop-blur-xl border-gray-800">
            <CardContent className="p-4 sm:p-6">
              {error && (
                <Alert className="mb-4 border-red-500/50 bg-red-500/10">
                  <AlertDescription className="text-red-300 belleza">
                    {error}
                  </AlertDescription>
                </Alert>
              )}
              {success && (
                <Alert className="mb-4 border-[#10B981]/50 bg-[#10B981]/10">
                  <AlertDescription className="text-[#10B981] belleza">
                    {success}
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-4">
                <div>
                  <Label htmlFor="full_name" className="font-semibold text-white belleza">
                    Full Name *
                  </Label>
                  <Input
                    id="full_name"
                    value={editForm.full_name}
                    onChange={(e) =>
                      setEditForm({ ...editForm, full_name: e.target.value })
                    }
                    className="mt-1 border-gray-700 bg-gray-800/50 text-white placeholder:text-gray-500 focus:border-[#10B981]"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="bio" className="font-semibold text-white belleza">
                    Bio
                  </Label>
                  <textarea
                    id="bio"
                    value={editForm.bio}
                    onChange={(e) =>
                      setEditForm({ ...editForm, bio: e.target.value })
                    }
                    rows={4}
                    className="mt-1 w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-800/50 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-[#10B981] resize-none belleza"
                    placeholder="Tell others about yourself..."
                  />
                </div>

                <div>
                  <Label htmlFor="location" className="font-semibold text-white belleza">
                    Location
                  </Label>
                  <Input
                    id="location"
                    value={editForm.location}
                    onChange={(e) =>
                      setEditForm({ ...editForm, location: e.target.value })
                    }
                    className="mt-1 border-gray-700 bg-gray-800/50 text-white placeholder:text-gray-500 focus:border-[#10B981]"
                    placeholder="e.g., Accra, Ghana"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats and Skills Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
          {/* Stats Card */}
          <Card className="border-0 shadow-lg bg-gray-900/80 backdrop-blur-xl border-gray-800">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#10B981]/20 flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6 text-[#10B981]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white cinzel">
                    {skills.length}
                  </p>
                  <p className="text-sm text-gray-400 belleza">Skills Taught</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gray-900/80 backdrop-blur-xl border-gray-800">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#10B981]/20 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-[#10B981]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white cinzel">0</p>
                  <p className="text-sm text-gray-400 belleza">Skills Learned</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gray-900/80 backdrop-blur-xl border-gray-800 sm:col-span-2 lg:col-span-1">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#10B981]/20 flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 sm:w-6 sm:h-6 text-[#10B981]" />
                </div>
                <div>
                  <p className="text-sm sm:text-base font-bold text-white cinzel">
                    {formatDate(profile.last_login_at)}
                  </p>
                  <p className="text-sm text-gray-400 belleza">Last Active</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Skills Section */}
        <Card className="border-0 shadow-lg bg-gray-900/80 backdrop-blur-xl border-gray-800">
          <CardContent className="p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white cinzel">
                Skills I'm Teaching
              </h2>
              {isOwnProfile && (
                <Button
                  onClick={() => navigate("/upload-skill")}
                  className="gap-2 bg-[#10B981] hover:bg-[#0ea371] w-full sm:w-auto"
                >
                  <Settings className="w-4 h-4" />
                  Add Skill
                </Button>
              )}
            </div>

            {skills.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 mb-4 belleza">No skills posted yet</p>
                {isOwnProfile && (
                  <Button
                    onClick={() => navigate("/upload-skill")}
                    variant="outline"
                    className="border-gray-700 text-gray-300 hover:text-white hover:bg-white/10"
                  >
                    Share Your First Skill
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {skills.map((skill: any) => (
                  <SkillCard
                    key={skill.id}
                    skill={{
                      id: skill.id,
                      title: skill.title,
                      description: skill.description,
                      location: skill.location,
                      userName: skill.user_name || skill.userName,
                      category: skill.category,
                      tags: skill.tags || [],
                      createdAt: skill.created_at
                        ? new Date(skill.created_at)
                        : undefined,
                      level: skill.level,
                      exchangeType: skill.exchange_type || skill.exchangeType,
                      imageUrl: skill.image_url || skill.imageUrl,
                      userAvatar: skill.user_avatar || skill.userAvatar,
                    }}
                    onClick={() => navigate(`/skills/${skill.id}`)}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
