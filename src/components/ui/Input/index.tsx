// components/Input.tsx
import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label className="text-sm font-medium text-foreground">{label}</label>
        )}
        <input
          ref={ref}
          className={`
            w-full px-4 py-3 rounded-lg border border-gray-600 
            bg-gray-800 text-foreground placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent
            transition-all duration-200
            ${error ? "border-red-500 focus:ring-red-500" : ""}
            ${className || ""}
          `}
          {...props}
        />
        {error && <span className="text-sm text-red-500">{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
