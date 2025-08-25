import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { PrivyProvider, Captcha } from '@privy-io/react-auth';
import { MantineProvider } from '@mantine/core';
import { AuthProvider } from '@/components/authProvider.tsx';
import { theme } from './theme.ts';

import { toSolanaWalletConnectors } from "@privy-io/react-auth/solana";

import App from './App.tsx'

import './index.css'
import './assets/styles/mantine.custom.css'
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';


createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <PrivyProvider
         appId={import.meta.env.VITE_PRIVY_APP_ID}
         config={{
            loginMethods: ['email', 'google', 'discord', 'twitter', 'wallet'],
            // externalWallets: {
            //    solana: { connectors: toSolanaWalletConnectors() }
            // },
            appearance: { theme: 'dark' }
         }}
      >
         <Provider store={store}>
            <MantineProvider theme={theme} defaultColorScheme="dark">
               <AuthProvider />
               <App />
            </MantineProvider>
         </Provider>
      </PrivyProvider>
      <Captcha />
   </StrictMode>,
)
