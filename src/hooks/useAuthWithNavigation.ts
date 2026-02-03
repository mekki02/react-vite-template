import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '@hooks/context/context';

export const useAuthWithNavigation = () => {
  const { ...authContext } = useAppContext();
  const navigate = useNavigate();

  const logout = useCallback(async () => {
    await authContext.logout();
    navigate('/login');
  }, [authContext.logout, navigate]);

  return {
    ...authContext,
    logout,
  };
};
