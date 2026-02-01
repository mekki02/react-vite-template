import { useContext } from "react";
import { AppContext } from "../../contexts/app-context";
import { DashboardContext } from "../../contexts/dashboard-context";
import { ThemeContext } from "../../contexts/theme-context";

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
}

export const useDashboardContext = () => {
    const context = useContext(DashboardContext);
    if (!context) {
        throw new Error("useDashboardContext must be used within a DashboardProvider");
    }
    return context;
}

export const useThemeContext = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useThemeContext must be used within a CustomThemeProvider");
    }
    return context;
}