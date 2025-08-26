// AuthOnlyWrapper.tsx
import { usePrivy } from '@privy-io/react-auth';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loading from '@/components/layout/loading';
import { RootState } from '@/store/store';

const AuthOnlyWrapper: React.FC = () => {
  const { ready, authenticated } = usePrivy();
  const { data: user, loading } = useSelector((s: RootState) => s.user);

  if (!ready || loading) return <Loading />;
  if (!authenticated || !user) return <Navigate to="/login" replace />;
  return <Outlet />;
};

export default AuthOnlyWrapper;
