import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabase/Supabase";
import { Search } from "lucide-react";
import { useState, type FC, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FetchSkills } from "@/services/FetchSkills";

import CategorySidebar from "@/components/custom/CategorySidebar";
import { SkillCard } from "@/components/custom/SkillCard";
import SearchHeader from "@/components/custom/SearchHeader";
import LoadingSkeleton from "@/components/custom/LoadingSkeleton";

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

// ==================== FETCH UNIQUE TAGS FROM SKILL DOCUMENTS ====================

/**
 * Fetch all unique tags from approved skills
 * @returns Array of unique tag strings
 */
const fetchTagsFromSkills = async (): Promise<string[]> => {
  try {
    const { data, error } = await supabase
      .from("Skills")
      .select("tags")
      .eq("approved", true);

    if (error) {
      console.error("Error fetching tags:", error);
      return [];
    }

    if (!data) return [];

    // Collect all tags from each skill document
    const allTags = data.flatMap((skill) => skill.tags || []);

    // Remove duplicates using Set and sort alphabetically
    const uniqueTags = Array.from(new Set(allTags)).sort();

    return uniqueTags as string[];
  } catch (error) {
    console.error("Unexpected error fetching tags:", error);
    return [];
  }
};

// ==================== MAIN COMPONENT ====================

/**
 * SkillListingPage - Main page for browsing and searching skills
 * Matches dark theme with proper responsiveness
 */
const SkillListingPage: FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [locationFilter, setLocationFilter] = useState("");
  const [levelFilter, setLevelFilter] = useState("");

  // ==================== DATA FETCHING ====================

  // Fetch skills data
  const { data: skills, isLoading } = useQuery({
    queryKey: ["Skills"],
    queryFn: FetchSkills,
  });

  // Fetch tags/categories
  const { data: tags } = useQuery({
    queryKey: ["tags"],
    queryFn: fetchTagsFromSkills,
  });

  // ==================== FILTERING LOGIC ====================

  /**
   * Filter skills based on search term, category, location, and level
   */
  const filteredSkills = useMemo(() => {
    if (!skills) return [];

    return skills.filter((skill: Skill) => {
      // Category filtering - check both category field and tags array
      const matchesCategory =
        selectedCategory === "All" ||
        skill.category?.toLowerCase() === selectedCategory.toLowerCase() ||
        (skill.tags || []).some(
          (tag) => tag.toLowerCase() === selectedCategory.toLowerCase()
        );

      // Search filtering - search in title, description, category, and tags
      const matchesSearch =
        searchTerm === "" ||
        skill.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        skill.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        skill.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (skill.tags || []).some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );

      // Location filtering
      const matchesLocation =
        !locationFilter ||
        skill.location?.toLowerCase().includes(locationFilter.toLowerCase());

      // Level filtering
      const matchesLevel =
        !levelFilter ||
        skill.level?.toLowerCase() === levelFilter.toLowerCase();

      return (
        matchesCategory && matchesSearch && matchesLocation && matchesLevel
      );
    });
  }, [skills, selectedCategory, searchTerm, locationFilter, levelFilter]);

  // ==================== HANDLERS ====================

  /**
   * Handle skill card click - navigate to skill detail page
   */
  const handleSkillClick = (skillId: string) => {
    navigate(`/skills/${skillId}`);
  };

  // ==================== RENDER ====================

  return (
    <div className="flex flex-col sm:flex-row w-full bg-[#101822] min-h-[calc(100vh-4rem)]">
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 lg:w-80 bg-[#101822] border-r border-white/10 backdrop-blur-sm shadow-sm flex-shrink-0">
        <div className="p-4 lg:p-6 h-full overflow-y-auto sticky top-16">
          <CategorySidebar
            tags={tags}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Search Header */}
        <SearchHeader
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          tags={tags}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          locationFilter={locationFilter}
          onLocationChange={setLocationFilter}
          levelFilter={levelFilter}
          onLevelChange={setLevelFilter}
        />

        {/* Skills Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {isLoading ? (
            <LoadingSkeleton />
          ) : filteredSkills.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-4">
              <div className="w-16 h-16 bg-gray-800/50 rounded-full flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 cinzel">
                No skills found
              </h3>
              <p className="text-gray-400 max-w-md text-sm sm:text-base belleza">
                Try adjusting your search terms or filters to find what you're
                looking for.
              </p>
            </div>
          ) : (
            <>
              {/* Results count */}
              <div className="mb-4 sm:mb-6">
                <p className="text-sm sm:text-base text-gray-400 belleza">
                  Showing <span className="text-[#10B981] font-semibold">{filteredSkills.length}</span> skill
                  {filteredSkills.length !== 1 ? "s" : ""}
                  {selectedCategory !== "All" && (
                    <span className="text-gray-500"> in "{selectedCategory}"</span>
                  )}
                  {searchTerm && (
                    <span className="text-gray-500"> for "{searchTerm}"</span>
                  )}
                </p>
              </div>

              {/* Skills grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {filteredSkills.map((skill: Skill) => (
                  <SkillCard
                    key={skill.id}
                    skill={skill}
                    onClick={() => handleSkillClick(skill.id)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillListingPage;
