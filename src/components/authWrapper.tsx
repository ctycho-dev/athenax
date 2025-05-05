// src/components/AuthWrapper.tsx
import { usePrivy } from '@privy-io/react-auth';
import { Navigate, Outlet } from 'react-router-dom';
import Loading from '@/components/layout/loading';


export function AuthWrapper() {
   const { ready, authenticated } = usePrivy();

   if (!ready) {
      return <Loading />
   }

   if (!authenticated) {
      return <Navigate to="/login" replace />;
   }

   return <Outlet />;
}