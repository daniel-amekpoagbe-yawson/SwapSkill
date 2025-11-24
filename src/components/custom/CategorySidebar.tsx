import { Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import React from "react";

// ==================== TYPE DEFINITIONS ====================

interface CategorySidebarProps {
  tags: string[] | undefined;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

// ==================== CATEGORY SIDEBAR ====================

/**
 * CategorySidebar - Sidebar component for filtering skills by category/tags
 * Matches dark theme with proper styling
 */
const CategorySidebar: React.FC<CategorySidebarProps> = ({
  tags,
  selectedCategory,
  onCategoryChange,
}) => (
  <div className="belleza space-y-3 relative">
    {/* Header */}
    <div className="flex items-center gap-2 mb-4 sm:mb-6">
      <Tag className="w-5 h-5 text-[#10B981] flex-shrink-0" />
      <h2 className="text-lg sm:text-xl font-bold text-white cinzel">Categories</h2>
    </div>

    {/* All Categories Button */}
    <Button
      variant={selectedCategory === "All" ? "default" : "ghost"}
      className={`w-full justify-start mb-2 font-medium text-base sm:text-lg text-gray-300 belleza transition-all ${
        selectedCategory === "All"
          ? "bg-[#10B981] hover:bg-[#0ea371] text-white"
          : "bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 text-gray-300 hover:text-white"
      }`}
      onClick={() => onCategoryChange("All")}
    >
      All Categories
      {selectedCategory === "All" && (
        <Badge
          variant="secondary"
          className="ml-auto text-white bg-white/20 backdrop-blur-md text-xs"
        >
          Active
        </Badge>
      )}
    </Button>

    {/* Background Glow Effect */}
    <div className="absolute inset-0 flex justify-center items-center pointer-events-none -z-10">
      <div className="w-96 h-96 bg-[#10B981]/10 blur-3xl rounded-full animate-pulse" />
    </div>

    {/* Category Tags */}
    <div className="space-y-1">
      {tags?.map((tag) => (
        <Button
          key={tag}
          variant={selectedCategory === tag ? "default" : "ghost"}
          className={`w-full justify-start capitalize font-semibold text-sm sm:text-base text-gray-300 belleza transition-all ${
            selectedCategory === tag
              ? "bg-[#10B981] hover:bg-[#0ea371] text-white"
              : "bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 text-gray-300 hover:text-white"
          }`}
          onClick={() => onCategoryChange(tag)}
        >
          {tag}
          {selectedCategory === tag && (
            <Badge
              variant="secondary"
              className="ml-auto bg-white/20 text-white text-xs backdrop-blur-md"
            >
              Active
            </Badge>
          )}
        </Button>
      ))}
    </div>

    {/* Empty State */}
    {tags && tags.length === 0 && (
      <div className="text-center py-8">
        <p className="text-gray-400 text-sm belleza">No categories available</p>
      </div>
    )}
  </div>
);

export default CategorySidebar;
