import React, { memo } from 'react';
import { LogOut } from 'lucide-react';

interface UserSectionProps {
  user: any;
  isCollapsed: boolean;
  onLogout: () => void;
  cn: (...inputs: any[]) => string;
}

export const UserSection: React.FC<UserSectionProps> = memo(({
  user,
  isCollapsed,
  onLogout,
  cn
}) => {
  return (
    <div className={cn(
      "border-t border-white/10 bg-gray-900/50 backdrop-blur-md relative z-10 shadow-[0_-4px_20px_rgba(0,0,0,0.2)]",
      isCollapsed ? "p-4" : "p-6"
    )}>
      <div className={cn(
        "flex items-center",
        isCollapsed ? "justify-center" : "gap-4"
      )}>
        <div className="w-10 h-10 flex-shrink-0 rounded-full bg-gradient-to-tr from-gray-700 to-gray-600 p-0.5 shadow-md">
          <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center text-white font-semibold text-lg border border-white/10 uppercase">
            {user?.email?.charAt(0) || 'U'}
          </div>
        </div>
        {!isCollapsed && (
          <>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">
                {user?.email?.split('@')[0] || 'User'}
              </p>
              <p className="text-xs text-gray-500 truncate">Administrator</p>
            </div>
            <button 
              onClick={onLogout}
              className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors flex-shrink-0 cursor-pointer"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </>
        )}
      </div>
      {isCollapsed && (
        <button 
          onClick={onLogout}
          className="mt-4 mx-auto block p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
          title="Logout"
        >
          <LogOut size={20} />
        </button>
      )}
    </div>
  );
});

UserSection.displayName = 'SideMenuUserSection';
