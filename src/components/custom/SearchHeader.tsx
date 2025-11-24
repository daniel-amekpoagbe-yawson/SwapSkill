import { type FC, useState } from "react";
import { Menu, Search, MapPin, Filter, X } from "lucide-react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import CategorySidebar from "./CategorySidebar";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

// ==================== TYPE DEFINITIONS ====================

interface SearchHeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  tags: string[] | undefined;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  locationFilter?: string;
  onLocationChange?: (location: string) => void;
  levelFilter?: string;
  onLevelChange?: (level: string) => void;
}

// ==================== SEARCH HEADER ====================

/**
 * SearchHeader - Search and filter header for skills listing
 * Matches dark theme with proper responsiveness
 */
const SearchHeader: FC<SearchHeaderProps> = ({
  searchTerm,
  onSearchChange,
  tags,
  selectedCategory,
  onCategoryChange,
  locationFilter = "",
  onLocationChange,
  levelFilter = "",
  onLevelChange,
}) => {
  const [showFilters, setShowFilters] = useState(false);

  // ==================== UTILITY FUNCTIONS ====================

  /**
   * Clear all active filters
   */
  const clearFilters = () => {
    onSearchChange("");
    onCategoryChange("All");
    onLocationChange?.("");
    onLevelChange?.("");
  };

  /**
   * Count active filters
   */
  const hasActiveFilters =
    searchTerm ||
    selectedCategory !== "All" ||
    locationFilter ||
    levelFilter;

  const activeFilterCount = [
    searchTerm && "1",
    selectedCategory !== "All" && "1",
    locationFilter && "1",
    levelFilter && "1",
  ].filter(Boolean).length;

  // ==================== RENDER ====================

  return (
    <div className="sticky top-16 z-40 bg-gray-900/80 backdrop-blur-xl border-b border-white/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex flex-col gap-3 sm:gap-4">
          {/* Top Row: Title and Mobile Menu */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              {/* Mobile menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="md:hidden flex-shrink-0 border-gray-700 text-gray-300 hover:text-white hover:bg-white/10"
                  >
                    <Menu className="w-4 h-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="w-[300px] sm:w-80 bg-gray-900/95 backdrop-blur-xl border-gray-800"
                >
                  <SheetHeader>
                    <SheetTitle className="text-white cinzel">Filter by Category</SheetTitle>
                  </SheetHeader>
                  <CategorySidebar
                    tags={tags}
                    selectedCategory={selectedCategory}
                    onCategoryChange={onCategoryChange}
                  />
                </SheetContent>
              </Sheet>

              {/* Page title */}
              <div className="min-w-0 flex-1">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white cinzel truncate">
                  Discover Skills
                </h1>
                <p className="text-xs sm:text-sm text-gray-400 mt-1 hidden sm:block belleza">
                  Find and connect with skilled professionals
                </p>
              </div>
            </div>

            {/* Filter Toggle Button */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2 flex-shrink-0 border-gray-700 text-gray-300 hover:text-white hover:bg-white/10"
            >
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Filters</span>
              {hasActiveFilters && (
                <span className="ml-1 px-1.5 py-0.5 bg-[#10B981] text-white text-xs rounded-full">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            <Input
              placeholder="Search by title, description, category, or tags..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9 sm:pl-10 pr-10 sm:pr-12 py-2 sm:py-2.5 h-11 sm:h-12 text-sm sm:text-base border-gray-700 bg-gray-800/50 text-white placeholder:text-gray-500 focus:border-[#10B981] focus:ring-[#10B981]"
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 sm:h-9 sm:w-9 text-gray-400 hover:text-white hover:bg-white/10"
                onClick={() => onSearchChange("")}
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-800/50 rounded-lg border border-gray-700">
              <div>
                <label className="text-xs sm:text-sm font-medium text-gray-300 mb-2 block belleza">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                  <Input
                    placeholder="e.g., Accra, Ghana"
                    value={locationFilter}
                    onChange={(e) => onLocationChange?.(e.target.value)}
                    className="pl-8 sm:pl-9 h-9 sm:h-10 text-sm border-gray-700 bg-gray-900/50 text-white placeholder:text-gray-500 focus:border-[#10B981]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs sm:text-sm font-medium text-gray-300 mb-2 block belleza">
                  Skill Level
                </label>
                <Select
                  value={levelFilter}
                  onValueChange={(value) => onLevelChange?.(value)}
                >
                  <SelectTrigger className="h-9 sm:h-10 text-sm border-gray-700 bg-gray-900/50 text-white">
                    <SelectValue placeholder="All Levels" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700">
                    <SelectItem value="" className="text-white hover:bg-gray-800">
                      All Levels
                    </SelectItem>
                    <SelectItem
                      value="Beginner"
                      className="text-white hover:bg-gray-800"
                    >
                      Beginner
                    </SelectItem>
                    <SelectItem
                      value="Intermediate"
                      className="text-white hover:bg-gray-800"
                    >
                      Intermediate
                    </SelectItem>
                    <SelectItem
                      value="Advanced"
                      className="text-white hover:bg-gray-800"
                    >
                      Advanced
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-xs sm:text-sm font-medium text-gray-300 mb-2 block belleza">
                  Exchange Type
                </label>
                <Select
                  value={selectedCategory}
                  onValueChange={onCategoryChange}
                >
                  <SelectTrigger className="h-9 sm:h-10 text-sm border-gray-700 bg-gray-900/50 text-white">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700">
                    <SelectItem value="All" className="text-white hover:bg-gray-800">
                      All Types
                    </SelectItem>
                    <SelectItem
                      value="Free"
                      className="text-white hover:bg-gray-800"
                    >
                      Free
                    </SelectItem>
                    <SelectItem
                      value="Skill Swap"
                      className="text-white hover:bg-gray-800"
                    >
                      Skill Swap
                    </SelectItem>
                    <SelectItem
                      value="Paid"
                      className="text-white hover:bg-gray-800"
                    >
                      Paid
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                {hasActiveFilters && (
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="w-full gap-2 h-9 sm:h-10 border-gray-700 text-gray-300 hover:text-white hover:bg-white/10"
                  >
                    <X className="w-4 h-4" />
                    Clear All
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;
