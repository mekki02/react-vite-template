import {
  createContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { useGetCurrentUserQuery, useLogoutMutation } from "@pages/dashboard/redux/slices/auth/authSlice";
import type { User } from "@pages/dashboard/types";

export type AppContextType = {
  activeUser: Record<string, any>;
  setActiveUser: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (token: string, refreshToken: string) => void;
  logout: () => void;
};

const defaultContextValue: AppContextType = {
  activeUser: {},
  setActiveUser: () => { },
  user: null,
  isLoading: false,
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
    localStorage.getItem('token')
  );
  const [, setRefreshToken] = useState<string | null>(
    localStorage.getItem('refreshToken')
  );
  
  const {
    data: user,
    isLoading,
    error,
  } = useGetCurrentUserQuery(undefined, {
    skip: !token,
  });

  const [logoutMutation] = useLogoutMutation();

  const isAuthenticated = !!token && !!user && !error;

  const login = (newToken: string, newRefreshToken: string) => {
    setToken(newToken);
    setRefreshToken(newRefreshToken);
    localStorage.setItem('token', newToken);
    localStorage.setItem('refreshToken', newRefreshToken);
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
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      setActiveUser({});
      // Navigation will be handled by the component that calls logout
    }
  };

  // Auto logout on token expiry or error
  useEffect(() => {
    if (error && token) {
      logout();
    }
  }, [error, token]);

  // Update activeUser when user data changes
  useEffect(() => {
    if (user) {
      setActiveUser(user);
    }
  }, [user]);

  const value: AppContextType = {
    activeUser,
    setActiveUser,
    user: user || null,
    isLoading,
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
