import { FormField } from "@/components/custom/FormField";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { loginSchema } from "@/types/AuthSchema";
import type { AuthUser } from "@/types/Types";
import { Lock, Mail } from "lucide-react";
import type { z } from "zod";
import { signInWithEmail } from "./AuthServices";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";

// ==================== TYPE DEFINITIONS ====================

type LoginFormData = z.infer<typeof loginSchema>;

// ==================== LOGIN FORM ====================

/**
 * LoginForm - User login form component
 * Matches dark theme with proper styling
 */
const LoginForm: React.FC<{
  onSwitchToSignUp: () => void;
  onLoginSuccess: (user: AuthUser) => void;
}> = ({ onSwitchToSignUp, onLoginSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [submitError, setSubmitError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  // ==================== HANDLERS ====================

  /**
   * Handle Supabase login
   */
  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setSubmitError("");

    try {
      // Use Supabase Auth Service
      const result = await signInWithEmail({
        email: data.email,
        password: data.password,
      });

      if (result.success && result.user) {
        // Login successful
        const authUser: AuthUser = {
          uid: result.user.id,
          email: result.user.email ?? "",
          displayName:
            result.user.user_metadata?.display_name ||
            result.user.user_metadata?.full_name ||
            undefined,
        };
        onLoginSuccess(authUser);
      } else {
        // Login failed
        setSubmitError(result.error || "Login failed. Please try again.");
      }
    } catch (error: unknown) {
      setSubmitError("An unexpected error occurred. Please try again.");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // ==================== RENDER ====================

  return (
    <Card className="w-full max-w-md mx-auto bg-gray-900/80 backdrop-blur-xl border-gray-800 shadow-xl">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl sm:text-3xl font-bold text-center text-white cinzel">
          Welcome back
        </CardTitle>
        <CardDescription className="text-center text-gray-400 belleza">
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Email Field */}
          <FormField
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            icon={<Mail size={20} />}
            error={errors.email?.message}
            register={register}
          />

          {/* Password Field */}
          <FormField
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            icon={<Lock size={20} />}
            error={errors.password?.message}
            register={register}
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
          />

          {/* Submit Error Alert */}
          {submitError && (
            <Alert className="border-red-500/50 bg-red-500/10">
              <AlertDescription className="text-red-300 belleza">
                {submitError}
              </AlertDescription>
            </Alert>
          )}

          {/* Submit Button */}
          <Button
            type="button"
            className="w-full bg-[#10B981] hover:bg-[#0ea371] text-white font-semibold h-11 belleza"
            disabled={!isValid || isLoading}
            onClick={handleSubmit(onSubmit)}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>

          {/* Switch to Sign Up */}
          <div className="text-center">
            <p className="text-sm text-gray-400 belleza">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={onSwitchToSignUp}
                className="text-[#10B981] hover:text-[#0ea371] font-medium transition-colors"
              >
                Sign up here
              </button>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
