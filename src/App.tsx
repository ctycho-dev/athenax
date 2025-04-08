// import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { MantineProvider, Radio, createTheme } from '@mantine/core';
import { Home } from '@/pages/home';
import { Audit } from '@/pages/audit';
import { AuditForm } from '@/pages/auditForm';
import { ResearchForm } from '@/pages/researchForm';
import { AuditDashborad } from '@/pages/auditDashboard';
import { Submited } from '@/pages/submited';
import { CryptoList } from '@/pages/cryptoList';
import Layout from './components/layout';

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
        dropdown: {
          background: '#0F1011',
        },
        calendar: {
          background: '#0F1011',
        },
      },
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



function App() {

  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/audit" element={<Audit />} />
          <Route path="/audit-form" element={<AuditForm />} />
          <Route path="/research-form" element={<ResearchForm />} />
          <Route path="/audit-dashboard" element={<AuditDashborad />} />
          <Route path="/submited" element={<Submited />} />
          <Route path="/" element={<Layout />}>
            <Route path="/top_cryptos" element={<CryptoList />} />
          </Route>
        </Routes>
      </Router>
    </MantineProvider>
  )
}

export default App
