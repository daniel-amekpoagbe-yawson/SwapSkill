import { type FC } from "react";
import {
  MapPin,
  User,
  Clock,
  Tag,
  ArrowRight,
  Star,
} from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

// ==================== TYPE DEFINITIONS ====================

interface Skill {
  id: string;
  title: string;
  description: string;
  location: string;
  userName: string;
  category: string;
  tags?: string[];
  createdAt?: Date;
  level?: string;
  exchangeType?: string;
  imageUrl?: string;
  userAvatar?: string;
}

// ==================== SKILL CARD COMPONENT ====================

/**
 * SkillCard - Displays a skill offering in a card format
 * Matches the dark theme with #10B981 accent color
 */
export const SkillCard: FC<{ skill: Skill; onClick: () => void }> = ({
  skill,
  onClick,
}) => {
  // ==================== UTILITY FUNCTIONS ====================

  /**
   * Format date to relative time (e.g., "2 days ago")
   */
  const formatDate = (date?: Date) => {
    if (!date) return "";
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

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

  // ==================== RENDER ====================

  return (
    <Card
      onClick={onClick}
      className="group relative overflow-hidden bg-gray-900/80 backdrop-blur-xl border border-gray-800 hover:border-[#10B981]/20 hover:shadow-lg hover:shadow-[#10B981]/5 transition-all duration-300 cursor-pointer transform hover:-translate-y-1 h-full flex flex-col"
    >
      {/* Image/Header Section */}
      {skill.imageUrl ? (
        <div className="relative h-40 sm:h-48 overflow-hidden bg-gradient-to-br from-[#10B981]/20 to-emerald-400/20">
          <img
            src={skill.imageUrl}
            alt={skill.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute top-3 left-3">
            <Badge className="bg-[#10B981] text-white hover:bg-[#0ea371] font-medium text-xs px-2.5 py-1 belleza">
              {skill.category}
            </Badge>
          </div>
        </div>
      ) : (
        <div className="relative h-40 sm:h-48 bg-gradient-to-br from-[#10B981]/30 via-emerald-500/30 to-[#10B981]/20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute top-3 left-3">
            <Badge className="bg-[#10B981] text-white hover:bg-[#0ea371] font-medium text-xs px-2.5 py-1 belleza">
              {skill.category}
            </Badge>
          </div>
          {skill.level && (
            <div className="absolute bottom-3 right-3">
              <Badge
                variant="secondary"
                className="bg-white/10 backdrop-blur-md text-white border border-white/20 text-xs belleza"
              >
                {skill.level}
              </Badge>
            </div>
          )}
        </div>
      )}

      <CardContent className="p-4 sm:p-5 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="font-bold text-lg sm:text-xl text-white mb-2 line-clamp-2 group-hover:text-[#10B981] transition-colors min-h-[3rem] sm:min-h-[3.5rem] cinzel">
          {skill.title}
        </h3>

        {/* Description */}
        <p className="text-gray-300 text-sm leading-relaxed line-clamp-3 mb-4 flex-grow belleza">
          {skill.description}
        </p>

        {/* Tags */}
        {skill.tags && skill.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {skill.tags.slice(0, 3).map((tag, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-xs px-2 py-0.5 border-white/10 text-gray-300 bg-white/5 backdrop-blur-sm belleza"
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </Badge>
            ))}
            {skill.tags.length > 3 && (
              <Badge
                variant="outline"
                className="text-xs px-2 py-0.5 border-white/10 text-gray-300 bg-white/5 backdrop-blur-sm belleza"
              >
                +{skill.tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="mt-auto pt-4 border-t border-white/10">
          <div className="flex items-center justify-between gap-2">
            {/* User Info */}
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <Avatar className="w-8 h-8 border-2 border-white/20 flex-shrink-0">
                <AvatarImage src={skill.userAvatar} alt={skill.userName} />
                <AvatarFallback className="bg-gradient-to-br from-[#10B981] to-emerald-400 text-white text-xs">
                  {getInitials(skill.userName)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-white truncate belleza">
                  {skill.userName}
                </p>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <MapPin className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate belleza">{skill.location}</span>
                </div>
              </div>
            </div>

            {/* Arrow Icon */}
            <div className="ml-2 flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-[#10B981]/20 group-hover:bg-[#10B981]/30 flex items-center justify-center transition-colors">
                <ArrowRight className="w-4 h-4 text-[#10B981] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Exchange Type & Date */}
          {(skill.exchangeType || skill.createdAt) && (
            <div className="flex items-center justify-between mt-3 text-xs text-gray-400 gap-2">
              {skill.exchangeType && (
                <span className="flex items-center gap-1 belleza">
                  <Star className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">{skill.exchangeType}</span>
                </span>
              )}
              {skill.createdAt && (
                <span className="flex items-center gap-1 belleza">
                  <Clock className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">{formatDate(skill.createdAt)}</span>
                </span>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
