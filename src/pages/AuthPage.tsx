import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LoginForm from "@/auth/Login";
import SignUpForm from "@/auth/SignUp";
import type { AuthUser } from "@/types/Types";
import { useAuth } from "@/hooks/useAuth";

// ==================== AUTH PAGE ====================

/**
 * AuthPage - Container for login and signup forms
 * Matches dark theme with proper responsiveness
 */
const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const [isLogin, setIsLogin] = useState(true);

  // ==================== EFFECTS ====================

  /**
   * Check if we're on signup route
   */
  useEffect(() => {
    if (location.pathname === "/signup") {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [location.pathname]);

  /**
   * Redirect if already authenticated
   */
  useEffect(() => {
    if (isAuthenticated) {
      const from = (location.state as any)?.from?.pathname || "/";
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  // ==================== HANDLERS ====================

  /**
   * Handle successful login
   */
  const handleLoginSuccess = (user: AuthUser) => {
    // Redirect to previous page or home
    const from = (location.state as any)?.from?.pathname || "/";
    navigate(from, { replace: true });
  };

  /**
   * Handle successful signup
   */
  const handleSignUpSuccess = (user: AuthUser) => {
    // Redirect to home after signup
    navigate("/", { replace: true });
  };

  // ==================== RENDER ====================

  return (
    <div className="relative min-h-screen bg-[#101822] flex items-center justify-center py-8 sm:py-12 px-4 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
        <div className="w-[500px] h-[500px] bg-[#10B981]/10 blur-[100px] rounded-full animate-pulse" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {isLogin ? (
          <LoginForm
            onSwitchToSignUp={() => navigate("/signup")}
            onLoginSuccess={handleLoginSuccess}
          />
        ) : (
          <SignUpForm
            onSwitchToLogin={() => navigate("/login")}
            onSignUpSuccess={handleSignUpSuccess}
          />
        )}
      </div>
    </div>
  );
};

export default AuthPage;
