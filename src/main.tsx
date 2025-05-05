import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { PrivyProvider } from '@privy-io/react-auth';
import { MantineProvider, createTheme } from '@mantine/core';
import { AuthProvider } from '@/components/authProvider.tsx';

import { toSolanaWalletConnectors } from "@privy-io/react-auth/solana";

import App from './App.tsx'

import './index.css'
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';



const theme = createTheme({
   fontFamily: 'Inter, sans-serif',
   headings: { fontFamily: 'Inter, sans-serif' },
   components: {
      Input: {
         styles: {
            input: {
               background: '#0F1011',
               height: '48px',
               border: 'none',
               color: 'white',
               // minWidth: '335px'
            }
         }
      },
      InputWrapper: {
         styles: {
            label: {
               color: '#949FA8',
               marginBottom: '12px'
            }
         }
      },
      DateInput: {
         styles: {
            day: {
               color: '#C1C2C5',
               '&[data-selected]': {
                  backgroundColor: '#228be6',
                  color: '#fff',
               },
               '&:hover': {
                  backgroundColor: 'red',
               },
            },
            month: {
               color: '#C1C2C5',
               '&[data-selected]': {
                  backgroundColor: '#228be6',
                  color: '#fff',
               },
               '&:hover': {
                  backgroundColor: 'red',
               },
            },
            yearsList: {
               color: '#C1C2C5',
               '&[data-selected]': {
                  backgroundColor: '#228be6',
                  color: '#fff',
               },
               '&:hover': {
                  backgroundColor: 'red',
               },
            },
            dropdown: {
               background: '#23232B',
            },
            calendar: {
               background: '#23232B',
            },
         }
      },
      Select: {
         styles: {
            dropdown: {
               background: '#0F1011',
            }
         }
      },
      Textarea: {
         styles: {
            input: {
               minHeight: '150px',
               maxWidth: '560px',
               background: '#0F1011',
               border: 'none',
               padding: '16px',
               color: 'white',
               fontSize: '14px',
            }
         }
      },
      Radio: {
         styles: {
            radio: {
               backgroundColor: 'transparent',
               borderColor: '#949FA8',
               '&:checked': {
                  backgroundColor: 'green',
                  borderColor: 'green',
               },
            },
         }
      }
   }
});


createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <PrivyProvider
         appId={import.meta.env.VITE_PRIVY_APP_ID}
         config={{
            loginMethods: ['email', 'google', 'discord', 'twitter', 'wallet'],
            externalWallets: {
               solana: { connectors: toSolanaWalletConnectors() }
            },
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
   </StrictMode>,
)
