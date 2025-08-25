// src/components/AuthWrapper.tsx
import { usePrivy } from '@privy-io/react-auth';
import { Navigate, Outlet } from 'react-router-dom';
import Loading from '@/components/layout/loading';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { UserRole } from '@/enums';


interface AuthWrapperProps {
   allowedRoles: UserRole[]
}


const AuthWrapper: React.FC<AuthWrapperProps> = ({ allowedRoles }) => {
   const { ready, authenticated } = usePrivy();
   const { data: user, loading: userLoading } = useSelector((state: RootState) => state.user);

   if (!ready || userLoading) {
      return <Loading />
   }

   if (!authenticated || !user) {
      return <Navigate to="/login" replace />;
   }

   if (!user.has_profile) {
      return <Navigate to="/welcome" replace />;
   }

   if (allowedRoles.length && user.role && !allowedRoles.includes(user.role)) {
      return <div className='p-4 font-normal'>Not allowed</div>
   }

   return <Outlet />;
}

export default AuthWrapper