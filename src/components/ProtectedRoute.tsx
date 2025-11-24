import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

// ==================== TYPE DEFINITIONS ====================

interface ProtectedRouteProps {
  children: React.ReactNode;
}

// ==================== PROTECTED ROUTE ====================

/**
 * Protected route component that redirects to login if user is not authenticated
 */
export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login with return URL
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

