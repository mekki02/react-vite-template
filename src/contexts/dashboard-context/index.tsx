import {
    createContext,
    useState,
    type ReactNode,
} from "react";

export type DashboardContextType = {
    drawerOpen: boolean;
    setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const defaultContextValue: DashboardContextType = {
    drawerOpen: false,
    setDrawerOpen: () => { },
};

export const DashboardContext = createContext<DashboardContextType>(defaultContextValue);

type DashboardProviderProps = {
    children: ReactNode;
};

export const DashboardProvider = ({ children }: DashboardProviderProps) => {
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
    return (
        <DashboardContext.Provider value={{ drawerOpen, setDrawerOpen }}>
            {children}
        </DashboardContext.Provider>
    );
};
