import React from 'react';
import { ViewState } from '../../types';

interface FloatingDockProps {
  currentView?: ViewState;
  onNavigate?: (view: ViewState) => void;
  onOpenSearch?: () => void;
}

/**
 * FloatingDock has been retired to ensure zero mobile content obstruction.
 * All primary quick-actions (Visit, Watch, Give, Prayer, Search) are directly
 * integrated into the top sticky Navbar and accessible mobile slide-out drawer.
 */
export const FloatingDock: React.FC<FloatingDockProps> = () => {
  return null;
};
