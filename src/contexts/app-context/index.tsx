import {
  createContext,
  useState,
  type ReactNode,
} from "react";
import { useLogoutMutation } from "@pages/dashboard/redux/slices/auth/authSlice";
import { parseJwt } from "@utils/jwt";

export type AppContextType = {
  activeUser: Record<string, any>;
  setActiveUser: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  isAuthenticated: boolean;
  login: (token: string, refreshToken: string) => void;
  logout: () => void;
};

const defaultContextValue: AppContextType = {
  activeUser: {},
  setActiveUser: () => { },
  isAuthenticated: false,
  login: () => { },
  logout: () => { },
};

export const AppContext = createContext<AppContextType>(defaultContextValue);

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const [activeUser, setActiveUser] = useState<Record<string, any>>({});
  const [token, setToken] = useState<string | null>(
    sessionStorage.getItem('token')
  );
  const [, setRefreshToken] = useState<string | null>(
    sessionStorage.getItem('refreshToken')
  );

  const [logoutMutation] = useLogoutMutation();

  const isAuthenticated = !!token;

  const login = (newToken: string, newRefreshToken: string) => {
    setToken(newToken);
    setRefreshToken(newRefreshToken);
    setActiveUser(parseJwt(newToken));
    sessionStorage.setItem('token', newToken);
    sessionStorage.setItem('refreshToken', newRefreshToken);
  };

  const logout = async () => {
    try {
      if (token) {
        await logoutMutation().unwrap();
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setToken(null);
      setRefreshToken(null);
      setActiveUser({});
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('refreshToken');
    }
  };


  const value: AppContextType = {
    activeUser,
    setActiveUser,
    isAuthenticated,
    login,
    logout,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
