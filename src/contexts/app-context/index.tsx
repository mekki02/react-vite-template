import {
  createContext,
  useState,
  type ReactNode,
} from "react";

export type AppContextType = {
  activeUser: Record<string, any>;
  setActiveUser: React.Dispatch<React.SetStateAction<Record<string, any>>>;
};

const defaultContextValue: AppContextType = {
  activeUser: {},
  setActiveUser: () => { },
};

export const AppContext = createContext<AppContextType>(defaultContextValue);

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const [activeUser, setActiveUser] = useState<Record<string, any>>({});

  return (
    <AppContext.Provider value={{ activeUser, setActiveUser }}>
      {children}
    </AppContext.Provider>
  );
};
