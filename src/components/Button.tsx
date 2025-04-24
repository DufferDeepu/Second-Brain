import { ReactElement } from "react";

interface ButtonProps {
  onClick?: (() => void) | undefined;
  label: string;
  size: "sm" | "md" | "lg";
  fullWidth?: boolean;
  bgLight?: boolean;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  disabled?: boolean;
  loading?: boolean;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  className?: string;
}

export function Button({
  onClick,
  label,
  fullWidth = false,
  variant = "default",
  bgLight = false,
  disabled = false,
  startIcon,
  endIcon,
  size,
  className
}: ButtonProps) {
  const baseClasses =
    "flex items-center justify-center font-normal ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer";

  const fullWidthClass = fullWidth ? "w-full text-center" : "";
  const bgLightClass = bgLight
    ? "bg-indigo-100 hover:bg-indigo-200 text-indigo-600 hover:text-indigo-800"
    : "";

  const variantClasses = {
    default: "bg-indigo-500 text-white hover:bg-indigo-600 shadow-sm",
    secondary: "border text-indigo-600 border-indigo-200 bg-white hover:bg-indigo-50 shadow-sm",
    outline: "border border-indigo-200 bg-white hover:bg-indigo-50 text-indigo-600 shadow-sm",
    destructive: "bg-red-600 text-white hover:bg-red-700 shadow-sm",
    ghost: "bg-transparent text-indigo-600 hover:bg-indigo-50 hover:text-indigo-800",
    link: "text-indigo-600 underline hover:text-indigo-800"
  };

  const sizeClasses = {
    lg: "px-6 py-3 text-lg rounded-xl gap-2",
    md: "px-5 py-2.5 text-base rounded-lg gap-2",
    sm: "px-4 py-2 text-sm rounded-md gap-1.5"
  };
  

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${fullWidthClass} ${bgLightClass} ${
        !bgLight && variantClasses[variant]
      } ${sizeClasses[size]} ${className}`}
    >
      {startIcon && <span className="inline-flex">{startIcon}</span>}
      {label}
      {endIcon && <span className="inline-flex">{endIcon}</span>}
    </button>
  );
}