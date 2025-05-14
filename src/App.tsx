// import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { usePrivy } from '@privy-io/react-auth';

import { Home } from '@/views/home/home';
import { Login } from '@/views/login/login';
import { Dashboard } from '@/views/dashboard/dashboard';
import { AuditForm } from '@/views/auditForm/auditForm';
import { ResearchForm } from '@/views/researchForm/researchForm';
import { AuditDashborad } from '@/views/auditDashboard/auditDashboard';
import { Submited } from '@/views/submited/submited';
import { CryptoList } from '@/views/cryptoList/cryptoList';
import Layout from '@/components/layout/projectLayout';
import UserLayout from '@/components/layout/userLayout';
import AuthWrapper from '@/components/authWrapper';
import Loading from '@/components/layout/loading';
import { UserRole } from './types/user';
import { AuthProvider } from './components/authProvider';


function App() {
    // const { ready } = usePrivy();

    // if (!ready) {
    //     return <Loading />
    // }

    return (

        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                {/* <Route path="/login" element={<Login />} />
                <Route path="/" element={<Layout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                </Route>
                <Route path="/" element={<UserLayout />}>
                    <Route path="/top-cryptos" element={<CryptoList />} />
                </Route> */}

                {/* Private Routes */}
                {/* <Route path="/" element={<AuthWrapper allowedRoles={[]} />}>
                    <Route path="/audit-form" element={<AuditForm />} />
                    <Route path="/audit-form/:id" element={<AuditForm />} />
                    <Route path="/research-form" element={<ResearchForm />} />
                    <Route path="/research-form/:id" element={<ResearchForm />} />
                    <Route path="/submited" element={<Submited />} />
                </Route>
                <Route path='/' element={<AuthWrapper allowedRoles={[UserRole.BD, UserRole.ADMIN]} />}>
                    <Route path="/audit-dashboard" element={<AuditDashborad />} />
                </Route> */}
            </Routes>
        </Router>
    )
}

export default App
