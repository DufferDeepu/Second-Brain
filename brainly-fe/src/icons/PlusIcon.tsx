interface PlusIconProps {
    size?: "sm" | "md" | "lg";
  }
  
  const sizeVariants = {
    sm: "size-2",
    md: "size-4.5",
    lg: "size-6"
  };
  
  export const PlusIcon = (props: PlusIconProps) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        className={sizeVariants[props.size || "sm"]}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
    );
  }
  