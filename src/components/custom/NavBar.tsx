import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

export const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Handle click outside drawer to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        setDrawerOpen(false);
      }
    };

    // Add event listener when drawer is open
    if (drawerOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Prevent body scroll when drawer is open
      document.body.style.overflow = "hidden";
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      // Restore body scroll when drawer is closed
      document.body.style.overflow = "unset";
    }

    // Cleanup function
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [drawerOpen]);

  // Navigation items configuration - DRY principle
  const navItems = [
    { path: "/", label: "Home" },
    { path: "/skills", label: "Find Skills" },
    { path: "/our-mission", label: "Our Mission" },
    { path: "/contact", label: "Contact" },
  ];

  // Handle navigation and close drawer - reusable function
  const handleNavigation = (path: string) => {
    navigate(path);
    setDrawerOpen(false);
  };

  // Close drawer function
  const closeDrawer = () => setDrawerOpen(false);

  return (
    <>
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 backdrop-blur-md bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Mobile: Hamburger Menu (Left) + Logo (Center) */}
            <div className="md:hidden flex items-center justify-between w-full">
              {/* Hamburger Menu - Left Side */}

              {/* Logo - Center on Mobile */}
              <Link
                to="/"
                className="text-xl font-bold text-gray-100 hover:text-gray-300 transition-colors belleza"
              >
                SwapSkill
              </Link>

              <button
                className="p-2 rounded-lg hover:bg-white/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/20"
                onClick={() => setDrawerOpen(true)}
                aria-label="Open navigation menu"
              >
                <Menu className="h-6 w-6 text-gray-100" />
              </button>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:flex items-center justify-between w-full">
              {/* Logo - Left Side on Desktop */}
              <Link
                to="/"
                className="text-xl font-bold belleza text-gray-100 hover:text-gray-300 transition-colors"
              >
                SwapSkill
              </Link>

              {/* Desktop Navigation - Center */}
              <nav className="flex items-center belleza space-x-8 absolute left-1/2 transform -translate-x-1/2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="text-gray-100 hover:text-gray-300 transition-colors font-medium text-sm lg:text-base"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* Desktop Action Buttons - Right Side */}
              <div className="flex items-center gap-3">
                {isAuthenticated ? (
                  <>
                    <Button
                      size="lg"
                      variant="ghost"
                      className="text-gray-100 hover:text-white hover:bg-white/10"
                      onClick={() => navigate("/profile")}
                    >
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </Button>
                    <Button
                      size="lg"
                      className="backdrop-blur-md bg-[#10B981]/50 border belleza border-white/20 text-white hover:bg-[#10B981]/80 transition-all duration-200 font-medium shadow-lg hover:shadow-xl rounded-xl"
                      onClick={() => navigate("/upload-skill")}
                    >
                      Share Skill
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      size="lg"
                      variant="ghost"
                      className="text-gray-100 hover:text-white hover:bg-white/10"
                      onClick={() => navigate("/login")}
                    >
                      Sign In
                    </Button>
                    <Button
                      size="lg"
                      className="backdrop-blur-md bg-[#10B981]/50 border belleza border-white/20 text-white hover:bg-[#10B981]/80 transition-all duration-200 font-medium shadow-lg hover:shadow-xl rounded-xl"
                      onClick={() => navigate("/signup")}
                    >
                      Sign Up
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className="md:hidden">
        {/* Overlay */}
        <div
          className={`fixed inset-0 z-50 transition-all duration-300 ease-in-out ${
            drawerOpen
              ? "bg-black/50 backdrop-blur-sm opacity-100 visible"
              : "bg-transparent opacity-0 invisible"
          }`}
          onClick={closeDrawer}
        />

        {/* Drawer Panel */}
        <div
          ref={drawerRef}
          className={`fixed left-0 top-0 h-full w-80 max-w-[85vw] z-50 bg-gradient-to-b from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl border-r border-white/10 shadow-2xl transform transition-all duration-300 ease-in-out ${
            drawerOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5">
            <Link
              to="/"
              className="text-2xl font-bold text-white hover:text-gray-300 transition-colors"
              onClick={closeDrawer}
            >
              SwapSkill
            </Link>
            <button
              onClick={closeDrawer}
              className="p-2 rounded-full hover:bg-white/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/20 hover:rotate-90"
              aria-label="Close navigation menu"
            >
              <X className="h-6 w-6 text-gray-300" />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="flex flex-col h-full">
            {/* Navigation Links */}
            <nav className="flex flex-col px-4 py-6 space-y-1">
              {navItems.map((item, index) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-gray-100 hover:text-white hover:bg-white/10 px-4 py-4 rounded-xl transition-all duration-200 font-medium group transform hover:translate-x-1 ${
                    drawerOpen ? "animate-fade-in" : ""
                  }`}
                  style={{
                    animationDelay: drawerOpen ? `${index * 50}ms` : "0ms",
                  }}
                  onClick={closeDrawer}
                >
                  <span className="flex items-center">{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* Drawer Footer with Action Buttons */}
            <div className="mt-auto p-6 border-t border-white/10 space-y-4 bg-white/5">
              {isAuthenticated ? (
                <>
                  <Button
                    className="w-full bg-[#10B981]/50 hover:bg-[#10B981]/80 border border-white/20 text-white font-medium transition-all duration-300 shadow-lg hover:shadow-xl rounded-xl transform hover:scale-105"
                    onClick={() => handleNavigation("/upload-skill")}
                  >
                    Share Skill
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-white/20 text-white hover:bg-white/10 font-medium transition-all duration-300 bg-transparent rounded-xl transform hover:scale-105"
                    onClick={() => handleNavigation("/profile")}
                  >
                    <User className="w-4 h-4 mr-2" />
                    My Profile
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    className="w-full bg-[#10B981]/50 hover:bg-[#10B981]/80 border border-white/20 text-white font-medium transition-all duration-300 shadow-lg hover:shadow-xl rounded-xl transform hover:scale-105"
                    onClick={() => handleNavigation("/signup")}
                  >
                    Sign Up
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-white/20 text-white hover:bg-white/10 font-medium transition-all duration-300 bg-transparent rounded-xl transform hover:scale-105"
                    onClick={() => handleNavigation("/login")}
                  >
                    Sign In
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
};
