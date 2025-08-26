import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  usePrivy,
  useLoginWithOAuth,
  useLoginWithEmail,
  useConnectWallet,
  useWallets,
  Captcha
} from '@privy-io/react-auth';
import { TextInput, NumberInput, Select } from '@mantine/core';
import { FaGoogle, FaApple } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { BsDiscord } from 'react-icons/bs';
import logoWithName from '@/assets/logo-with-name.svg';
import { usePageColorScheme } from '@/hooks/usePageTheme';
// import userService from '@/api/userService';

/**
 * This file exposes two components:
 *  1) <Login /> – a fully custom Privy login (email OTP + OAuth + wallets) with no Privy modal
 *  2) <Onboarding /> – first‑time user form (role + teammates) required when `isNewUser`
 *
 * Key ideas
 *  - We DO NOT call `login()` (the built-in Privy widget). Instead, we use whitelabeled hooks:
 *      • useLoginWithEmail  -> sendCode/loginWithCode
 *      • useLoginWithOAuth  -> initOAuth({ provider })
 *      • useConnectWallet   -> connectWallet + wallet.loginOrLink()
 *  - After auth, we detect first-time users via `isNewUser` (from onComplete/onSuccess) and route to /onboarding.
 *  - For wallet login, we immediately call wallet.loginOrLink() after connect to authenticate the session.
 *  - We preserve and restore `preLoginPath` so users return to where they started after onboarding.
 */

const PRE_LOGIN_KEY = 'preLoginPath';
const DEFAULT_REDIRECT = '/submit_materials';

// ----------
// Login Page
// ----------
export const Login: React.FC = () => {
  usePageColorScheme('light');

  const navigate = useNavigate();
  const location = useLocation();

  const { ready, authenticated } = usePrivy();
  const { wallets } = useWallets();

  // Store where the user was before we start any login flow
  const ensurePreloginStored = () => {
    const path = location?.pathname || '/';
    if (!path.startsWith('/login')) {
      localStorage.setItem(PRE_LOGIN_KEY, path);
    }
  };

  const resolvePostAuthRedirect = () => {
    const pre = localStorage.getItem(PRE_LOGIN_KEY);
    localStorage.removeItem(PRE_LOGIN_KEY);
    if (pre && !pre.startsWith('/login')) return pre;
    return DEFAULT_REDIRECT;
  };

  // -----------------------
  // Email (OTP) custom flow
  // -----------------------
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [emailStep, setEmailStep] = useState<'enter' | 'code'>('enter');

  const [sendingEmailCode, setSendingEmailCode] = useState(false);
  const [verifyingEmailCode, setVerifyingEmailCode] = useState(false);

  const { sendCode, loginWithCode } = useLoginWithEmail({
    onComplete: ({ isNewUser }: { isNewUser: boolean }) => {
      // Route based on first-time status
      if (isNewUser) {
        navigate('/onboarding?new=1', { replace: true });
      } else {
        navigate(resolvePostAuthRedirect(), { replace: true });
      }
    },
    onError: (error) => {
      console.error('Email login error', error);
      alert(String((error as any)?.message ?? error) || 'Email login failed');
    },
  });

  const handleSendEmailCode = async () => {
    if (!email) return;
    ensurePreloginStored();
    try {
      setSendingEmailCode(true);
      await sendCode({ email });
      setEmailStep('code');
    } finally {
      setSendingEmailCode(false);
    }
  };

  const handleEmailLogin = async () => {
    if (!code) return;
    try {
      setVerifyingEmailCode(true);
      await loginWithCode({ code });
    } finally {
      setVerifyingEmailCode(false);
    }
  };

  // --------------------------
  // OAuth (Google/Apple/X/Disc)
  // --------------------------
  const { initOAuth } = useLoginWithOAuth({
    onComplete: ({ isNewUser }: { isNewUser: boolean }) => {
      if (isNewUser) {
        navigate('/onboarding?new=1', { replace: true });
      } else {
        navigate(resolvePostAuthRedirect(), { replace: true });
      }
    },
    onError: (error) => {
      console.error('OAuth error', error);
      alert(String((error as any)?.message ?? error) || 'OAuth login failed');
    },
  });

  const handleOAuth = async (provider: 'google' | 'apple' | 'twitter' | 'discord') => {
    ensurePreloginStored();
    await initOAuth({ provider });
  };

  // ----------------
  // External wallets
  // ----------------
  const { connectWallet } = useConnectWallet({
    onSuccess: async () => {
      try {
        await wallets[0]?.loginOrLink?.();
        const needsOnboarding = await checkNeedsOnboarding();
        navigate(needsOnboarding ? '/onboarding?new=1' : resolvePostAuthRedirect(), { replace: true });
      } catch (err: any) {
        console.error('Wallet auth error', err);
        alert(err?.message || 'Wallet sign-in failed');
      }
    },
    onError: (error) => {
      console.error('Connect wallet error', error);
    },
  });

  const connectSpecificWallet = async (
    walletId: 'metamask' | 'coinbase_wallet' | 'wallet_connect' | 'phantom'
  ) => {
    ensurePreloginStored();
    // Filter the Privy wallet picker to just the provider we want, and allow both chains when relevant
    connectWallet({
      walletList: [walletId],
      walletChainType: 'ethereum-and-solana',
    });
  };


  // If user is already authenticated (e.g., re-visiting /login), send them onward
  useEffect(() => {
    if (!ready) return;
    if (authenticated) {
      navigate(resolvePostAuthRedirect(), { replace: true });
    }
  }, [ready, authenticated]);

  return (
    <main className="bg-black p-4 flex h-screen gap-2">
      <aside className="bg-gray-1 rounded-2xl w-xl flex flex-col">
        <div className="mt-14 flex justify-center">
          <img src={logoWithName} alt="Company Logo" className="w-[156px]" />
        </div>

        <div className="flex-1 px-20 flex flex-col justify-center">
          <h1 className="font-medium text-[32px] mb-4 text-center">Welcome!</h1>
          <h2 className="text-ia-gray-text leading-[28px] text-center mb-8">
            Manage audits, research, and project insights in one place and showcase transparency to the Web3 community
          </h2>

          {/* Email OTP */}
          <div className="mb-6">
            {emailStep === 'enter' ? (
              <div className="relative">
                <TextInput
                  name="email"
                  autoComplete="email"
                  required
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.currentTarget.value)}
                  className={`mb-2.5 text-ia-gray-text`}
                  size="md"
                />
                <button
                  onClick={handleSendEmailCode}
                  disabled={!email || sendingEmailCode}
                  className={`absolute top-1/2 -translate-y-1/2 right-4 ${!!email ? 'text-light-1' : 'text-ia-gray-text'
                    } transition-colors duration-150 hover:cursor-pointer`}
                >
                  {sendingEmailCode ? 'Sending…' : 'Send code'}
                </button>
              </div>
            ) : (
              <div className="relative">
                <TextInput
                  name="otp"
                  inputMode="numeric"
                  placeholder="Enter 6‑digit code"
                  value={code}
                  onChange={(e) => setCode(e.currentTarget.value)}
                  className={`mb-2.5 text-ia-gray-text`}
                  size="md"
                />
                <button
                  onClick={handleEmailLogin}
                  disabled={!code || verifyingEmailCode}
                  className={`absolute top-1/2 -translate-y-1/2 right-4 text-light-1 transition-colors duration-150 hover:cursor-pointer`}
                >
                  {verifyingEmailCode ? 'Verifying…' : 'Submit'}
                </button>
              </div>
            )}
          </div>

          {/* OAuth providers */}
          <div className="grid grid-cols-4 gap-2 mb-8">
            <button
              onClick={() => handleOAuth('google')}
              className="bg-card-gray h-16 rounded-medium-plus flex items-center justify-center hover:cursor-pointer"
              aria-label="Continue with Google"
            >
              <FaGoogle className="text-white text-xl" />
            </button>
            <button
              onClick={() => handleOAuth('apple')}
              className="bg-card-gray h-16 rounded-medium-plus flex items-center justify-center hover:cursor-pointer"
              aria-label="Continue with Apple"
            >
              <FaApple className="text-white text-xl" />
            </button>
            <button
              onClick={() => handleOAuth('twitter')}
              className="bg-card-gray h-16 rounded-medium-plus flex items-center justify-center hover:cursor-pointer"
              aria-label="Continue with X"
            >
              <FaXTwitter className="text-white text-xl" />
            </button>
            <button
              onClick={() => handleOAuth('discord')}
              className="bg-card-gray h-16 rounded-medium-plus flex items-center justify-center hover:cursor-pointer"
              aria-label="Continue with Discord"
            >
              <BsDiscord className="text-white text-xl" />
            </button>
          </div>

          <div className="my-6 flex items-center">
            <div className="flex-1 bg-ia-gray-text h-[0.5px]" />
            <div className="text-sm font-normal text-ia-gray-text px-4 whitespace-nowrap">OR</div>
            <div className="flex-1 bg-ia-gray-text h-[0.5px]" />
          </div>

          {/* Specific wallet buttons -> connect then loginOrLink */}
          <div className="grid gap-2">
            <button
              onClick={() => connectSpecificWallet('metamask')}
              className="bg-card-gray rounded-medium-plus text-ia-gray-text py-5 px-6 hover:cursor-pointer"
            >
              <div className="flex gap-4 items-center">
                <img src={'https://link.storjshare.io/raw/jx2h446kdd5e6qf46wet3btfzeia/athenax/login/metamask_logo.png.svg'} alt="" />
                <span className="text-gray-3 font-medium">MetaMask</span>
              </div>
            </button>
            <button
              onClick={() => connectSpecificWallet('wallet_connect')}
              className="bg-card-gray rounded-medium-plus text-ia-gray-text py-5 px-6 hover:cursor-pointer"
            >
              <div className="flex gap-4 items-center">
                <img src={'https://link.storjshare.io/raw/jwqsibdim3fwlu2ssuddngco6mbq/athenax/login/walletconnect-seeklogo.png'} alt="" className="w-6" />
                <span className="text-gray-3 font-medium text-base">WalletConnect</span>
              </div>
            </button>
            <button
              onClick={() => connectSpecificWallet('coinbase_wallet')}
              className="bg-card-gray rounded-medium-plus text-ia-gray-text py-5 px-6 hover:cursor-pointer"
            >
              <div className="flex gap-4 items-center">
                <img src={'https://link.storjshare.io/raw/juvc6ugwjlvsarpeat4lf4mhhz7q/athenax/login/coinbase_icon.png.svg'} alt="" />
                <span className="text-gray-3 font-medium">Coinbase</span>
              </div>
            </button>
            <button
              onClick={() => connectSpecificWallet('phantom')}
              className="bg-card-gray rounded-medium-plus text-ia-gray-text py-5 px-6 hover:cursor-pointer"
            >
              <div className="flex gap-4 items-center">
                <img src={'https://link.storjshare.io/raw/jwz3ycu772ttibrurrza5rqwdzda/athenax/login/phantom-icon.svg'} alt="" className="w-6 rounded-[4px]" />
                <span className="text-gray-3 font-medium">Phantom</span>
              </div>
            </button>
          </div>
        </div>

        <div className="px-8 pb-6 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Link to={'/'} className="text-ia-gray-text text-sm font-normal">Privacy Policy</Link>
            <Link to={'/'} className="text-ia-gray-text text-sm font-normal">Terms of use</Link>
          </div>
          <div className="flex items-center gap-6">
            <Link to={'/'} className="text-ia-gray-text text-sm font-normal">x.com</Link>
            <Link to={'/'} className="text-ia-gray-text text-sm font-normal">linkedIn</Link>
          </div>
        </div>
      </aside>

      <div className="flex-1 overflow-hidden">
        <picture className="h-full w-full">
          <source
            srcSet="https://link.storjshare.io/raw/jwpwfaudiloqol76yh5ezjaqvfma/athenax/login/login.webp"
            type="image/webp"
          />
          <source
            srcSet="https://link.storjshare.io/raw/jvakujdti437x5g7siehsvns3oja/athenax/login/login2x.png 2x, https://link.storjshare.io/raw/jucuthaemuillr7zxm2tvspeswoq/athenax/login/login3x.png 3x"
            type="image/png"
          />
          <img
            src="https://link.storjshare.io/raw/jucuthaemuillr7zxm2tvspeswoq/athenax/login/login3x.png"
            alt="Login background"
            className="h-full w-full object-cover object-center rounded-2xl"
          />
        </picture>
      </div>
      {/* Invisible captcha executes on mount when enabled in dashboard */}
      <Captcha />
    </main>
  );

  async function checkNeedsOnboarding(): Promise<boolean> {
    // API calls commented out per request. Assume first-time for now.
    return true;
  }

};
