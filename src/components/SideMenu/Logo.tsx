import React, { memo } from 'react';

interface LogoProps {
  isCollapsed: boolean;
}

export const Logo: React.FC<LogoProps> = memo(({ isCollapsed }) => {
  return (
    <div className={`relative z-10 h-[88px] px-6 flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
      <div className="w-10 h-10 flex-shrink-0 rounded-xl bg-white/10 flex items-center justify-center shadow-lg ring-1 ring-white/20">
        <div className="w-5 h-5 bg-white rounded-md flex items-center justify-center">
          <div className="w-2 h-2 bg-gray-900 rounded-full" />
        </div>
      </div>
      {!isCollapsed && (
        <span className="text-xl font-bold text-white tracking-tight flex-1 truncate">
          Antigravity
        </span>
      )}
    </div>
  );
});

Logo.displayName = 'SideMenuLogo';
