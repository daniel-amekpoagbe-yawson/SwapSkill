/**
 * Design Constants for SwapSkill
 * Centralized color scheme and design tokens matching the homepage theme
 */

// ==================== COLOR CONSTANTS ====================

export const COLORS = {
  // Primary accent color (emerald green)
  primary: "#10B981",
  primaryHover: "#0ea371",
  primaryLight: "#059669",
  
  // Background colors
  background: "#101822", // Main dark background
  backgroundAlt: "#101828", // Alternative dark background
  cardBackground: "rgba(17, 24, 39, 0.8)", // gray-900/80
  cardBackgroundLight: "rgba(255, 255, 255, 0.05)", // white/5
  
  // Border colors
  border: "rgba(255, 255, 255, 0.1)", // white/10
  borderLight: "rgba(255, 255, 255, 0.2)", // white/20
  borderDark: "rgba(31, 41, 55, 1)", // gray-800
  
  // Text colors
  textPrimary: "#ffffff",
  textSecondary: "rgba(209, 213, 219, 1)", // gray-300
  textTertiary: "rgba(156, 163, 175, 1)", // gray-400
  
  // Gradient colors
  gradientPrimary: "from-[#10B981] to-emerald-400",
  gradientBackground: "from-black to-gray-900",
} as const;

// ==================== TYPOGRAPHY ====================

export const TYPOGRAPHY = {
  fontHeading: "cinzel",
  fontBody: "belleza",
  fontAccent: "bellefair",
} as const;

// ==================== SPACING ====================

export const SPACING = {
  section: "py-12 sm:py-16 lg:py-20",
  container: "px-4 sm:px-6 lg:px-8",
  card: "p-6 sm:p-8",
} as const;

// ==================== UTILITY CLASSES ====================

export const CLASSES = {
  // Card styles
  card: "bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-800",
  cardHover: "hover:border-[#10B981]/20 transition-all duration-300",
  
  // Button styles
  buttonPrimary: "backdrop-blur-md bg-[#10B981] hover:bg-[#0ea371] text-white",
  buttonSecondary: "backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10",
  
  // Text styles
  textHeading: "text-white cinzel",
  textBody: "text-gray-300 belleza",
  textAccent: "text-[#10B981]",
  
  // Background styles
  backgroundDark: "bg-[#101822]",
  backgroundGradient: "bg-gradient-to-b from-black to-gray-900",
} as const;

