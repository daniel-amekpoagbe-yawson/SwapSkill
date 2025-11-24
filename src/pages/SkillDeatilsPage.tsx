import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchSkillById } from "@/services/FetchSkills";
import {
  MapPin,
  User,
  Tag,
  Clock,
  Star,
  ChevronLeft,
  Share2,
  Heart,
  BookOpen,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import LoadingSkeleton from "@/components/custom/LoadingSkeleton";

// ==================== SKILL DETAIL PAGE ====================

/**
 * SkillDetailPage - Display detailed information about a skill
 * Matches dark theme with proper responsiveness
 */
const SkillDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: skill,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["skill", id],
    queryFn: () => fetchSkillById(id!),
    enabled: !!id,
  });

  // ==================== UTILITY FUNCTIONS ====================

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
   * Format date to relative time
   */
  const formatDate = (date?: Date) => {
    if (!date) return "Recently";
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  // ==================== LOADING STATES ====================

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#101822]">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  if (isError || !skill) {
    return (
      <div className="min-h-screen bg-[#101822] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl sm:text-4xl">❌</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 cinzel">
            Skill Not Found
          </h2>
          <p className="text-gray-400 mb-6 belleza">
            The skill you're looking for doesn't exist or has been removed.
          </p>
          <Button
            onClick={() => navigate("/skills")}
            className="bg-[#10B981] hover:bg-[#0ea371]"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Skills
          </Button>
        </div>
      </div>
    );
  }

  // ==================== RENDER ====================

  return (
    <div className="min-h-screen bg-[#101822]">
      {/* Header */}
      <div className="bg-gray-900/80 backdrop-blur-xl border-b border-white/10 sticky top-16 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate("/skills")}
              className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-white/10"
            >
              <ChevronLeft size={20} />
              <span className="hidden sm:inline">Back to Skills</span>
            </Button>
            <div className="flex items-center gap-2 sm:gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-white/10"
              >
                <Share2 size={18} className="text-gray-300" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-white/10"
              >
                <Heart size={18} className="text-gray-300" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
        <Card className="rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden border-0 bg-gray-900/80 backdrop-blur-xl border-gray-800">
          {/* Hero Section */}
          <div className="relative h-40 sm:h-48 lg:h-64 bg-gradient-to-r from-[#10B981]/30 via-emerald-500/30 to-[#10B981]/20">
            {skill.imageUrl && (
              <img
                src={skill.imageUrl}
                alt={skill.title}
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 flex-wrap">
                <Badge className="bg-[#10B981] text-white hover:bg-[#0ea371] font-medium px-2.5 sm:px-3 py-1 text-xs sm:text-sm belleza">
                  {skill.category}
                </Badge>
                {skill.level && (
                  <Badge
                    variant="secondary"
                    className="bg-white/10 backdrop-blur-md text-white border border-white/20 text-xs sm:text-sm belleza"
                  >
                    <Award className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    {skill.level}
                  </Badge>
                )}
                {skill.exchangeType && (
                  <Badge
                    variant="secondary"
                    className="bg-white/10 backdrop-blur-md text-white border border-white/20 text-xs sm:text-sm belleza"
                  >
                    {skill.exchangeType}
                  </Badge>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-2 leading-tight cinzel">
                {skill.title}
              </h1>
            </div>
          </div>

          {/* Content */}
          <CardContent className="p-4 sm:p-6 lg:p-8">
            {/* Quick Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
              <Card className="bg-gray-800/50 hover:bg-gray-800/70 transition-colors border-0 border-gray-700">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#10B981]/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Tag className="text-[#10B981] w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-400 belleza">Category</p>
                      <p className="font-semibold text-white text-sm sm:text-base cinzel">
                        {skill.category}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 hover:bg-gray-800/70 transition-colors border-0 border-gray-700">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#10B981]/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="text-[#10B981] w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-400 belleza">Location</p>
                      <p className="font-semibold text-white text-sm sm:text-base cinzel">
                        {skill.location}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 hover:bg-gray-800/70 transition-colors border-0 border-gray-700">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#10B981]/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="text-[#10B981] w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-400 belleza">Posted</p>
                      <p className="font-semibold text-white text-sm sm:text-base cinzel">
                        {formatDate(skill.createdAt)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Description */}
            <div className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-2 cinzel">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-[#10B981]" />
                About This Skill
              </h2>
              <div className="prose max-w-none">
                <p className="text-gray-300 leading-relaxed text-base sm:text-lg belleza">
                  {skill.description}
                </p>
              </div>
            </div>

            {/* Tags */}
            {skill.tags && skill.tags.length > 0 && (
              <div className="mb-6 sm:mb-8">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 cinzel">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skill.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="px-3 py-1 text-sm border-white/10 bg-white/5 backdrop-blur-sm text-gray-300 belleza"
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Teacher Profile */}
            <Card className="bg-gradient-to-r from-gray-800/50 to-[#10B981]/10 rounded-2xl border-0 border-gray-700 mb-6 sm:mb-8">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
                  <Avatar className="w-14 h-14 sm:w-16 sm:h-16 border-2 border-white/20 shadow-md flex-shrink-0">
                    <AvatarImage src={skill.userAvatar} alt={skill.userName} />
                    <AvatarFallback className="bg-gradient-to-br from-[#10B981] to-emerald-400 text-white text-base sm:text-lg">
                      {getInitials(skill.userName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl font-bold text-white cinzel">
                      {skill.userName}
                    </h3>
                    <p className="text-gray-400 belleza">Skill Instructor</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="text-yellow-400 fill-current w-4 h-4" />
                    <span className="belleza">4.8 rating</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    <span className="belleza">Active teacher</span>
                  </div>
                </div>
                <div>
                  <Button
                    variant="outline"
                    onClick={() => navigate(`/profile/${skill.userId}`)}
                    className="gap-2 border-gray-700 text-gray-300 hover:text-white hover:bg-white/10"
                  >
                    <User className="w-4 h-4" />
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                className="flex-1 bg-[#10B981] hover:bg-[#0ea371] text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl transition-all transform hover:scale-105 shadow-lg hover:shadow-[#10B981]/30 belleza"
              >
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Start Learning
              </Button>
              <Button
                variant="outline"
                className="flex-1 sm:flex-none bg-gray-800/50 hover:bg-gray-800/70 text-gray-300 hover:text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl transition-colors border-gray-700 belleza"
              >
                Contact Teacher
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SkillDetailPage;
