import { createContext } from "react";

export type SidebarContextType = {
  onPageItemClick: (id: string, hasNestedNavigation: boolean) => void;
  mini: boolean;
  fullyExpanded: boolean;
  fullyCollapsed: boolean;
  hasDrawerTransitions: boolean;
};

export const SidebarContext = createContext<SidebarContextType | null>(null);