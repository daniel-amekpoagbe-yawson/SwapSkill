import type { FormFieldProps } from "@/types/Types";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { EyeOff, Eye } from "lucide-react";

// ==================== FORM FIELD ====================

/**
 * FormField - Reusable form field component with icon and error handling
 * Matches dark theme with proper styling
 */
export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = "text",
  placeholder,
  icon,
  error,
  register,
  showPassword,
  onTogglePassword,
}) => {
  return (
    <div className="space-y-2">
      <Label
        htmlFor={name}
        className="text-sm font-medium text-gray-300 belleza"
      >
        {label}
      </Label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <Input
          id={name}
          type={type}
          placeholder={placeholder}
          className={`${
            icon ? "pl-10" : ""
          } ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : "border-gray-700 focus:border-[#10B981] focus:ring-[#10B981]"
          } bg-gray-800/50 text-white placeholder:text-gray-500 belleza`}
          {...register(name)}
        />
        {/* Password visibility toggle */}
        {type === "password" && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
      {error && (
        <p className="text-sm text-red-400 mt-1 belleza">{error}</p>
      )}
    </div>
  );
};
