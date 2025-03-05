import React from 'react';

interface SidebarItemProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; // Updated to accept icon component
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

export const SidebarItem = ({
  icon: Icon,
  label,
  isActive = false,
  onClick,
}: SidebarItemProps) => {
  return ( 
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-6 py-3 transition-colors duration-200 cursor-pointer
        ${
          isActive
            ? 'bg-indigo-50 text-indigo-600'
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
        }`}
    >
      <Icon className="h-5 w-5" /> {/* Render the icon component */}
      <span className="font-medium">{label}</span>
    </button>
  );
};
