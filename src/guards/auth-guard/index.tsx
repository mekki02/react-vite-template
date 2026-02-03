import { type FC, type PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthWithNavigation } from '../../hooks/useAuthWithNavigation';

const AuthGuard: FC<PropsWithChildren> = ({ children }) => {

  const { isAuthenticated, isLoading } = useAuthWithNavigation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  return <>{children}</>;
};

export default AuthGuard;