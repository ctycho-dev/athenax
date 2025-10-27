// Updated AuthProvider.tsx
import { useEffect } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { useDispatch } from 'react-redux';
import { setCredentials, clearCredentials } from '@/store/authSlice';
import { clearUser, setUser, setLoading } from '@/store/userSlice';
import { useLazyGetMeQuery, useCreateUserMutation } from '@/services/userApi';


export const AuthProvider = () => {
   const { ready, authenticated, user, logout, getAccessToken } = usePrivy();
   const dispatch = useDispatch();

   const [fetchUser] = useLazyGetMeQuery();
   const [createUser] = useCreateUserMutation();

   useEffect(() => {
      if (!ready) return;

      const handleAuthFlow = async () => {
         try {
            dispatch(setLoading());
            if (authenticated) {
               const token = await getAccessToken();
               if (!token) throw new Error('No token received');
               dispatch(setCredentials({ token }));


               try {
                  const userResponse = await fetchUser(undefined, true).unwrap();
                  dispatch(setUser(userResponse));
               } catch (fetchError: any) {
                  if (fetchError && 'status' in fetchError && fetchError.status === 404) {
                     if (!user?.id) {
                        console.error('Missing required user data');
                        return;
                     }

                     try {
                        const userData = {
                           privy_id: user.id,
                           email: null,
                           linked_accounts: user.linkedAccounts,
                           has_accepted_terms: user.hasAcceptedTerms,
                           is_guest: user.isGuest
                        };

                        const newUser = await createUser(userData).unwrap();
                        dispatch(setUser(newUser));
                     } catch (creationError) {
                        console.error('User creation failed:', creationError);
                     }
                  } else {
                     throw fetchError;
                  }
               }
            } else {
               dispatch(clearCredentials());
               dispatch(clearUser());
            }
         } catch (error) {
            console.error('Auth flow error:', error);
            dispatch(clearCredentials());
            dispatch(clearUser());
            logout()
         }
      };

      handleAuthFlow();
   }, [ready, authenticated, user]);

   return null;
};