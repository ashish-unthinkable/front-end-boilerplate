import React, { memo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { MenuItem } from '@/types/sidebar';

interface NavItemProps {
  item: MenuItem;
  isCollapsed: boolean;
  level?: number;
  expandedItems: string[];
  onToggleExpand: (label: string) => void;
  cn: (...inputs: any[]) => string;
}

export const NavItem: React.FC<NavItemProps> = memo(({
  item,
  isCollapsed,
  level = 0,
  expandedItems,
  onToggleExpand,
  cn
}) => {
  const location = useLocation();
  const isExpanded = expandedItems.includes(item.label);
  const hasChildren = !!(item.children && item.children.length > 0);
  const isChildActive = item.children?.some(child => location.pathname === child.path);
  const isExactlyActive = item.path ? location.pathname === item.path : false;
  const isParentOfActive = hasChildren && isChildActive;
  const isActive = isExactlyActive || isParentOfActive;

  const ItemWrapper = item.path ? NavLink : 'div';

  return (
    <div className="w-full">
      <ItemWrapper
        to={item.path || '#'}
        title={isCollapsed ? item.label : undefined}
        onClick={(e) => {
          if (hasChildren) {
            e.preventDefault();
            onToggleExpand(item.label);
          }
        }}
        className={cn(
          "flex items-center cursor-pointer group whitespace-nowrap overflow-hidden relative",
          isActive 
            ? "bg-white/10 text-white shadow-sm ring-1 ring-white/20" 
            : "text-gray-400 hover:text-white hover:bg-white/5",
          isCollapsed 
            ? "justify-center h-11 w-11 mx-auto rounded-xl"
            : cn("gap-3 px-4 py-2.5 my-1 rounded-xl", level > 0 && "ml-4")
        )}
      >
        {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
        {!isCollapsed && (
          <>
            <span className={cn("flex-1 text-sm font-medium", level > 0 && "text-xs")}>
              {item.label}
            </span>
            {hasChildren && (
              <ChevronDown 
                className={cn(
                  "w-4 h-4", 
                  isExpanded ? "rotate-180" : ""
                )} 
              />
            )}
          </>
        )}
        {isCollapsed && isActive && (
          <div className="absolute left-0 w-1 h-6 bg-white rounded-r-full" />
        )}
      </ItemWrapper>

      {hasChildren && isExpanded && !isCollapsed && (
        <div className="flex flex-col">
          {item.children?.map((child) => (
            <NavItem 
              key={child.label}
              item={child}
              isCollapsed={isCollapsed}
              level={level + 1}
              expandedItems={expandedItems}
              onToggleExpand={onToggleExpand}
              cn={cn}
            />
          ))}
        </div>
      )}
    </div>
  );
});

NavItem.displayName = 'SideMenuNavItem';
