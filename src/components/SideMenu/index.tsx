import React, { useState, useEffect, useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { logout as logoutAction } from '@/features/auth/authSlice';
import { baseApi } from '@/services/baseApi';
import { useLogoutMutation } from '@/services/authApi';
import { useAuth } from '@/hooks/useAuth';
import { APP_ROUTES } from '@/constants/routes';

import { MENU_CONFIG, SIDEBAR_WIDTHS } from '@/constants/sidebar';
import { Logo } from './Logo';
import { NavItem } from './NavItem';
import { UserSection } from './UserSection';
import { Toggle } from './Toggle';

/**
 * Utility for tailwind class merging
 */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const SideMenu: React.FC = memo(() => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useAuth();
  const [logoutMutation] = useLogoutMutation();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Sync sidebar width with layout using CSS variable
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--sidebar-width', 
      isCollapsed ? SIDEBAR_WIDTHS.COLLAPSED : SIDEBAR_WIDTHS.EXPANDED
    );
  }, [isCollapsed]);

  const handleToggleExpand = useCallback((label: string) => {
    if (isCollapsed) return;
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  }, [isCollapsed]);

  const handleToggleCollapse = useCallback(() => {
    setIsCollapsed(prev => !prev);
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      await logoutMutation().unwrap();
    } catch (err) {
      // Ignore API errors for logout
    } finally {
      dispatch(logoutAction());
      dispatch(baseApi.util.resetApiState());
      navigate(APP_ROUTES.LOGIN, { replace: true });
    }
  }, [dispatch, logoutMutation, navigate]);

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 h-screen transition-all duration-300 bg-gray-900 flex flex-col border-r border-white/10 z-20 shadow-2xl backdrop-blur-md",
        isCollapsed ? "w-[100px]" : "w-[280px]"
      )}
      style={{ width: isCollapsed ? SIDEBAR_WIDTHS.COLLAPSED : SIDEBAR_WIDTHS.EXPANDED }}
    >
      <Toggle isCollapsed={isCollapsed} onToggle={handleToggleCollapse} cn={cn} />

      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />
      
      <Logo isCollapsed={isCollapsed} />

      <nav className="flex-1 overflow-y-auto px-4 pt-4 pb-6 relative z-10 scrollbar-hide">
        {MENU_CONFIG.map((item) => (
          <NavItem 
            key={item.label}
            item={item}
            isCollapsed={isCollapsed}
            expandedItems={expandedItems}
            onToggleExpand={handleToggleExpand}
            cn={cn}
          />
        ))}
      </nav>

      <UserSection 
        user={user}
        isCollapsed={isCollapsed}
        onLogout={handleLogout}
        cn={cn}
      />
    </aside>
  );
});

SideMenu.displayName = 'SideMenu';

export default SideMenu;
