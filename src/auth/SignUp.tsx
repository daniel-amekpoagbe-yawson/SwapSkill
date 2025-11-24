import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Lock, Mail, User } from "lucide-react";

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
import type { AuthUser } from "@/types/Types";
import { signUpWithEmail } from "./AuthServices";
import { signUpSchema } from "@/types/AuthSchema";

// ==================== TYPE DEFINITIONS ====================

type SignUpFormData = z.infer<typeof signUpSchema>;

// ==================== SIGN UP FORM ====================

/**
 * SignUpForm - User registration form component
 * Matches dark theme with proper styling
 */
const SignUpForm: React.FC<{
  onSwitchToLogin: () => void;
  onSignUpSuccess: (user: AuthUser) => void;
}> = ({ onSwitchToLogin, onSignUpSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitError, setSubmitError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
  });

  // ==================== HANDLERS ====================

  /**
   * Handle Supabase sign up
   */
  const onSubmit = async (data: SignUpFormData) => {
    setIsLoading(true);
    setSubmitError("");

    try {
      // Use Supabase Auth Service
      const result = await signUpWithEmail({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
      });

      if (result.success && result.user) {
        // Sign up successful
        const authUser: AuthUser = {
          uid: result.user.id,
          email: result.user.email ?? "",
          displayName:
            result.user.user_metadata?.display_name ||
            result.user.user_metadata?.full_name ||
            undefined,
        };
        onSignUpSuccess(authUser);
      } else {
        // Sign up failed
        setSubmitError(
          result.error || "Account creation failed. Please try again."
        );
      }
    } catch (error: unknown) {
      setSubmitError("An unexpected error occurred. Please try again.");
      console.error("Sign up error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // ==================== RENDER ====================

  return (
    <Card className="w-full max-w-md mx-auto bg-gray-900/80 backdrop-blur-xl border-gray-800 shadow-xl">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl sm:text-3xl font-bold text-center text-white cinzel">
          Create Account
        </CardTitle>
        <CardDescription className="text-center text-gray-400 belleza">
          Enter your information to create a new account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Full Name Field */}
          <FormField
            label="Full Name"
            name="fullName"
            placeholder="Enter your full name"
            icon={<User size={20} />}
            error={errors.fullName?.message}
            register={register}
          />

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
            placeholder="Create a password"
            icon={<Lock size={20} />}
            error={errors.password?.message}
            register={register}
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
          />

          {/* Confirm Password Field */}
          <FormField
            label="Confirm Password"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            icon={<Lock size={20} />}
            error={errors.confirmPassword?.message}
            register={register}
            showPassword={showConfirmPassword}
            onTogglePassword={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
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
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>

          {/* Switch to Login */}
          <div className="text-center">
            <p className="text-sm text-gray-400 belleza">
              Already have an account?{" "}
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="text-[#10B981] hover:text-[#0ea371] font-medium transition-colors"
              >
                Sign in here
              </button>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignUpForm;
