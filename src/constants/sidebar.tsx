import React from 'react';
import { LayoutDashboard, WalletCards } from 'lucide-react';
import { APP_ROUTES } from '@/constants/routes';
import { MenuItem } from '@/types/sidebar';

export const SIDEBAR_WIDTHS = {
  EXPANDED: '280px',
  COLLAPSED: '100px',
} as const;

export const MENU_CONFIG: MenuItem[] = [
  {
    label: 'Dashboard',
    path: APP_ROUTES.HOME,
    icon: <LayoutDashboard size={20} />,
  },
  {
    label: 'Income',
    icon: <WalletCards size={20} />,
    children: [
      { label: 'Earning', path: APP_ROUTES.INCOME.EARNING },
      { label: 'Refunds', path: APP_ROUTES.INCOME.REFUNDS },
    ],
  },
];
