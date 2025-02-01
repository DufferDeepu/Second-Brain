
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
  size
}: ButtonProps){
  const baseClasses =
  "flex items-center justify-center font-normal ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

  const fullWidthClass = fullWidth ? "w-full text-center" : "";
  const bgLightClass = bgLight
    ? "bg-indigo-100 hover:bg-indigo-200 text-indigo-600 hover:text-indigo-800"
    : "";

  const variantClasses = {
    default: "bg-indigo-500 text-white hover:bg-indigo-600",
    secondary: "border text-indigo-600 border-slate-300 bg-indigo-100 hover:bg-indigo-200",
    outline: "border border-slate-300 bg-white hover:bg-slate-100",
    destructive: "bg-red-600 text-white hover:bg-red-700",
    ghost:
      "bg-transparent text-slate-600 hover:bg-slate-200 hover:text-slate-800 font-semibold",
    link: "text-blue-600 underline hover:text-blue-800",
  };

  const sizeClasses = {
    "lg": "px-6 py-3 text-lg  rounded-xl",
    "md": "px-4 py-2 text-sm  rounded-md",
    "sm": "px-2 py-1 text-md  rounded-sm",
  };

  const sizeClass = sizeClasses[size];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${fullWidthClass} ${bgLightClass} ${
        !bgLight && variantClasses[variant]
      } ${sizeClass}`}
    >
      {startIcon && <span className="mr-1.5">{startIcon}</span>}
      {label}
      {endIcon && <span className="ml-1.5">{endIcon}</span>}
    </button>
  );
};
