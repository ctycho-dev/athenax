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

   // console.log('🔍 AuthWrapper render:', { 
   //   ready, 
   //   authenticated, 
   //   userLoading, 
   //   hasProfile: user?.hasProfile,
   //   userId: user?.id,
   //   currentPath: window.location.pathname 
   // });

   if (!ready || userLoading) {
      // console.log('⏳ AuthWrapper: Loading state');
      return <Loading />
   }

   if (!authenticated || !user) {
      // console.log('🚫 AuthWrapper: Not authenticated, redirecting to login');
      return <Navigate to="/login" replace />;
   }

   if (!user.hasProfile) {
      // console.log('👋 AuthWrapper: No profile, redirecting to welcome');
      return <Navigate to="/welcome" replace />;
   }

   if (allowedRoles.length && user.role && !allowedRoles.includes(user.role)) {
      return <div className='p-4 font-normal'>Not allowed</div>
   }

   // console.log('✅ AuthWrapper: All checks passed, rendering outlet');
   return <Outlet />;
}

export default AuthWrapper