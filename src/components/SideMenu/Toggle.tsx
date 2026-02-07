import React, { memo } from 'react';
import { ChevronLeft } from 'lucide-react';

interface ToggleProps {
  isCollapsed: boolean;
  onToggle: () => void;
  cn: (...inputs: any[]) => string;
}

export const Toggle: React.FC<ToggleProps> = memo(({ isCollapsed, onToggle, cn }) => {
  return (
    <button
      onClick={onToggle}
      title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      className={cn(
        "absolute z-[100] top-7 -right-4 h-8 w-8 rounded-full flex items-center justify-center cursor-pointer",
        "bg-white/10 hover:bg-white/20 border border-white/10 text-gray-300 hover:text-white shadow-lg"
      )}
    >
      <ChevronLeft
        className={cn("w-4 h-4", isCollapsed ? "rotate-180" : "")}
      />
    </button>
  );
});