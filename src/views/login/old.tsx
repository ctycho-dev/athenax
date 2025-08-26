import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin, usePrivy, useLoginWithOAuth } from '@privy-io/react-auth';
import { TextInput } from '@mantine/core';
import userService from "@/api/userService";

import logoWithName from '@/assets/logo-with-name.svg'
import { FaGoogle } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { BsDiscord } from "react-icons/bs";
import { usePageColorScheme } from '@/hooks/usePageTheme';


interface LoginProps { }


export const Login: React.FC<LoginProps> = ({ }) => {
  usePageColorScheme('light')
   const navigate = useNavigate();
   const {
      ready,
      authenticated,
      user,
      login,
      logout,
   } = usePrivy();
   const [email, setEmail] = useState('');

  //  const { initOAuth } = useLoginWithOAuth({
  //     onComplete: ({ user, isNewUser }) => {
  //        console.log('User logged in successfully', user);
  //        if (isNewUser) {
  //           console.log(isNewUser)
  //           // Perform actions for new users
  //        }
  //     },
  //     onError: (error) => {
  //        console.error('Login failed', error);
  //     }
  //  });

   const disableLogin = !ready || (ready && authenticated);

   useEffect(() => {
      if (!ready) return;
    
      if (!authenticated) {
        // Store the current location before login
        localStorage.setItem('preLoginPath', location.pathname);
        login();
      } else {
        const preLoginPath = localStorage.getItem('preLoginPath');
        localStorage.removeItem('preLoginPath');
    
        // Default to dashboard if no previous path or if it was the login page
        const redirectTo = preLoginPath && !preLoginPath.startsWith('/login') 
          ? preLoginPath 
          : '/submit_materials';
    
        navigate(redirectTo, { replace: true });
      }
    }, [ready, authenticated, navigate, location]);



   return (
      <></>
      // <main className="bg-black p-4 flex h-screen gap-2">
      //    <aside className="bg-gray-1 rounded-2xl w-xl flex flex-col">
      //       <div className="mt-14 flex justify-center" onClick={logout}>
      //          <img src={logoWithName} alt="Company Logo" className="w-[156px]" />
      //       </div>
      //       <div className="flex-1 px-20 flex flex-col justify-center">
      //          <h1 className="font-medium text-[32px] mb-4 text-center">Welcome!</h1>
      //          <h2 className="text-ia-gray-text leading-[28px] text-center mb-8">Manage audits, research, and project insights<br />
      //             in one place and showcase transparency<br />
      //             to the Web3 community</h2>
      //          <div>
      //             {/* <form ref={formRef} id="wishlist" onSubmit={form.onSubmit(handleSubmit)} className="relative grid"> */}
      //             <div className="relative">
      //                <TextInput
      //                   name="email"
      //                   autoComplete="email"
      //                   required
      //                   placeholder="Email"
      //                   value={email}
      //                   onChange={(event) => setEmail(event.currentTarget.value)}
      //                   className={`mb-2.5 text-ia-gray-text`}
      //                   size='md'
      //                />
      //                <button className={`absolute top-1/2 -translate-y-1/2 right-4 ${!!email ? 'text-light-1' : 'text-ia-gray-text'} transition-colors duration-150 hover:cursor-pointer`}>Submit</button>
      //             </div>
      //             {/* </form> */}
      //             <div className="grid grid-cols-4 gap-2">
      //                <button
      //                   onClick={() => initOAuth({ provider: 'google' })}
      //                   className="bg-card-gray h-16 rounded-medium-plus flex items-center justify-center hover:cursor-pointer"
      //                ><FaGoogle className="text-white text-xl" /></button>
      //                <button
      //                   onClick={() => initOAuth({ provider: 'apple' })}
      //                   className="bg-card-gray h-16 rounded-medium-plus flex items-center justify-center hover:cursor-pointer"
      //                ><FaApple className="text-white text-xl" /></button>
      //                <button
      //                   onClick={() => initOAuth({ provider: 'twitter' })}
      //                   className="bg-card-gray h-16 rounded-medium-plus flex items-center justify-center hover:cursor-pointer"
      //                ><FaXTwitter className="text-white text-xl" /></button>
      //                <button
      //                   onClick={() => initOAuth({ provider: 'discord' })}
      //                   className="bg-card-gray h-16 rounded-medium-plus flex items-center justify-center hover:cursor-pointer"
      //                ><BsDiscord className="text-white text-xl" /></button>
      //             </div>
      //             <div className="my-8 flex items-center">
      //                <div className="flex-1 bg-ia-gray-text h-[0.5px]"></div>
      //                <div className="text-sm font-normal text-ia-gray-text px-4 whitespace-nowrap">OR</div>
      //                <div className="flex-1 bg-ia-gray-text h-[0.5px]"></div>
      //             </div>
      //             <div className="grid gap-2">
      //                <button className="bg-card-gray rounded-medium-plus text-ia-gray-text py-5 px-6 hover:cursor-pointer">
      //                   <div className="flex gap-4 items-center">
      //                      <img src={'https://link.storjshare.io/raw/jx2h446kdd5e6qf46wet3btfzeia/athenax/login/metamask_logo.png.svg'} alt="" />
      //                      <span className="text-gray-3 font-medium">Metamask Wallet</span>
      //                   </div>
      //                </button>
      //                <button className="bg-card-gray rounded-medium-plus text-ia-gray-text py-5 px-6 hover:cursor-pointer">
      //                   <div className="flex gap-4 items-center">
      //                      <img src={'https://link.storjshare.io/raw/jwqsibdim3fwlu2ssuddngco6mbq/athenax/login/walletconnect-seeklogo.png'} alt="" className="w-6" />
      //                      <span className="text-gray-3 font-medium text-base">WalletConnect</span>
      //                   </div>
      //                </button>
      //                <button
      //                   // disabled={disableLogin}
      //                   onClick={() => login({
      //                      loginMethods: ['wallet'],
      //                      walletChainType: 'ethereum-and-solana',
      //                      disableSignup: false
      //                   })}
      //                   className="bg-card-gray rounded-medium-plus text-ia-gray-text py-5 px-6 hover:cursor-pointer">
      //                   <div className="flex gap-4 items-center">
      //                      <img src={'https://link.storjshare.io/raw/juvc6ugwjlvsarpeat4lf4mhhz7q/athenax/login/coinbase_icon.png.svg'} alt="" />
      //                      <span className="text-gray-3 font-medium">Coinbase</span>
      //                   </div>
      //                </button>
      //                <button
      //                   // onClick={linkWallet(walletList=['phantom'])}
      //                   // onClick={() => login({ loginMethods: ['wallet'], walletClient: 'coinbase' })}
      //                   className="bg-card-gray rounded-medium-plus text-ia-gray-text py-5 px-6 hover:cursor-pointer">
      //                   <div className="flex gap-4 items-center">
      //                      <img src={'https://link.storjshare.io/raw/jwz3ycu772ttibrurrza5rqwdzda/athenax/login/phantom-icon.svg'} alt="" className="w-6 rounded-[4px]" />
      //                      <span className="text-gray-3 font-medium">Phantom</span>
      //                   </div>
      //                </button>
      //             </div>
      //          </div>
      //       </div>
      //       <div className="px-8 pb-6 flex justify-between items-center">
      //          <div className="flex items-center gap-6">
      //             <Link to={'/'} className="text-ia-gray-text text-sm font-normal">Privacy Policy</Link>
      //             <Link to={'/'} className="text-ia-gray-text text-sm font-normal">Terms of use</Link>
      //          </div>
      //          <div className="flex items-center gap-6">
      //             <Link to={'/'} className="text-ia-gray-text text-sm font-normal">x.com</Link>
      //             <Link to={'/'} className="text-ia-gray-text text-sm font-normal">linkedIn</Link>
      //          </div>
      //       </div>
      //    </aside>

      //    <div className="flex-1 overflow-hidden">
      //       <picture className="h-full w-full">
      //          <source
      //             srcSet="https://link.storjshare.io/raw/jwpwfaudiloqol76yh5ezjaqvfma/athenax/login/login.webp"
      //             type="image/webp"
      //          />
      //          <source
      //             srcSet="https://link.storjshare.io/raw/jvakujdti437x5g7siehsvns3oja/athenax/login/login2x.png 2x, https://link.storjshare.io/raw/jucuthaemuillr7zxm2tvspeswoq/athenax/login/login3x.png 3x"
      //             type="image/png"
      //          />
      //          <img
      //             src="https://link.storjshare.io/raw/jucuthaemuillr7zxm2tvspeswoq/athenax/login/login3x.png"
      //             alt="Login background"
      //             className="h-full w-full object-cover object-center rounded-2xl"
      //          />
      //       </picture>
      //    </div>
      // </main>
   );
} 
