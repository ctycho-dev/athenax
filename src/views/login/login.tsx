import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
   usePrivy,
} from '@privy-io/react-auth';
import { Toaster } from 'sonner';
import {
   FaGoogle,
   FaGithub,
   FaDiscord,
} from "react-icons/fa";
import { usePreloginPath } from '@/hooks/usePreloginPath';
import EmailLoginButton from './components/emailLoginButton';
import SocialLoginButton from './components/socialLoginButton';
import WalletConnectButton from './components/walletConnectButton';
import { Divider } from './components/divider';
import { LuWallet } from "react-icons/lu";
import { FaXTwitter } from "react-icons/fa6";
import { usePageColorScheme } from '@/hooks/usePageTheme';
import { getLastPath, clearLastPath } from '@/utils/storage';


const DEFAULT_REDIRECT = '/submit_materials';

export const Login: React.FC = () => {
   usePageColorScheme('light');
   const navigate = useNavigate();
   const { ready, authenticated } = usePrivy();
   const { ensureStored, resolve } = usePreloginPath();
   const disableLogin = !ready || (ready && authenticated);


   useEffect(() => {
   console.log('🔑 Login useEffect:', { ready, authenticated, path: window.location.pathname });
   
   if (ready && authenticated) {
      const lastPath = getLastPath();
      clearLastPath();
      console.log('🔄 Login: Redirecting to:', lastPath || DEFAULT_REDIRECT);
      navigate(lastPath || DEFAULT_REDIRECT, { replace: true });
   }
}, [ready, authenticated, navigate]) // Add proper dependencies

   const onAuthComplete = (isNewUser: boolean) => {
      const lastPath = getLastPath();
      clearLastPath();
      navigate(lastPath || DEFAULT_REDIRECT, { replace: true });
   };

   return (
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center">
         <div className="relative w-[32rem] bg-slate-900 border border-slate-700 rounded-2xl max-h-full overflow-auto box-border p-6 text-white">
            <div className='flex justify-center'>
               <h2 className="text-2xl font-semibold mb-4">Connect</h2>
            </div>

            {/* Email form */}

            <EmailLoginButton
               onComplete={onAuthComplete}
               ensurePreloginStored={ensureStored}
               disabled={disableLogin}
            />

            <Divider>or continue with</Divider>

            {/* Social login buttons */}
            <div className="grid grid-cols-2 gap-3">
               <SocialLoginButton
                  provider="google"
                  label="Google"
                  icon={<FaGoogle className="h-5 w-5" />}
                  onComplete={onAuthComplete}
                  ensurePreloginStored={ensureStored}
                  disabled={disableLogin}
               />
               <SocialLoginButton
                  provider="github"
                  label="GitHub"
                  icon={<FaGithub className="h-5 w-5" />}
                  onComplete={onAuthComplete}
                  ensurePreloginStored={ensureStored}
                  disabled={disableLogin}
               />
               <SocialLoginButton
                  provider="twitter"
                  label="Twitter"
                  icon={<FaXTwitter className="h-5 w-5" />}
                  onComplete={onAuthComplete}
                  ensurePreloginStored={ensureStored}
                  disabled={disableLogin}
               />
               <SocialLoginButton
                  provider="discord"
                  label="Discord"
                  icon={<FaDiscord className="h-5 w-5" />}
                  onComplete={onAuthComplete}
                  ensurePreloginStored={ensureStored}
                  disabled={disableLogin}
               />
            </div>

            <Divider><LuWallet />Web3 Wallets</Divider>

            {/* Web3 */}
            <div className="grid grid-cols-2 gap-3">
               <WalletConnectButton
                  walletId="metamask"
                  label="Metamask"
                  icon={<img src="https://scholarx.mypinx.store/metamask_logo.svg" className="h-5 w-5" />}
                  ensurePreloginStored={ensureStored}
                  onAuthComplete={(/* isNew */) => navigate(resolve(DEFAULT_REDIRECT), { replace: true })}
                  disabled={disableLogin}
               />
               <WalletConnectButton
                  walletId="coinbase_wallet"
                  label="Coinbase"
                  icon={<img src="https://scholarx.mypinx.store/coinbase_icon.svg" className="h-5 w-5" />}
                  ensurePreloginStored={ensureStored}
                  onAuthComplete={(/* isNew */) => navigate(resolve(DEFAULT_REDIRECT), { replace: true })}
                  disabled={disableLogin}
               />
               <WalletConnectButton
                  walletId="wallet_connect"
                  label="Wallet Connect"
                  icon={<img src="https://scholarx.mypinx.store/walletconnect-seeklogo.png" className="h-5 w-5" />}
                  ensurePreloginStored={ensureStored}
                  onAuthComplete={(/* isNew */) => navigate(resolve(DEFAULT_REDIRECT), { replace: true })}
                  disabled={disableLogin}
               />
               <WalletConnectButton
                  walletId="phantom"
                  label="Phantom"
                  icon={<img src="https://scholarx.mypinx.store/phantom-icon.svg" className="h-5 w-5" />}
                  ensurePreloginStored={ensureStored}
                  onAuthComplete={(/* isNew */) => navigate(resolve(DEFAULT_REDIRECT), { replace: true })}
                  disabled={disableLogin}
               />
            </div>
         </div>
         <Toaster richColors position="top-right" />
      </div>
   );

   async function checkNeedsOnboarding(): Promise<boolean> {
      // API calls commented out per request. Assume first-time for now.
      return true;
   }

};
