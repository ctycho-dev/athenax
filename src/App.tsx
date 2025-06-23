// import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { usePrivy } from '@privy-io/react-auth';

import { Home } from '@/views/home/home';
import { Login } from '@/views/login/login';
import { SumbitMaterials } from '@/views/submitMaterials';
// Submit
import { AuditForm } from '@/views/submit/audit/audit';
import { ResearchForm } from '@/views/submit/research/research'
// Review
import { AuditReview } from '@/views/review/audit';
import { ResearchReview } from '@/views/review/research';
import { AuditReviewRecord } from '@/views/review/audit/[id]';
import { ResearchReviewRecord } from '@/views/review/research/[id]';
import { Submited } from '@/views/submited/submited';
import { CryptoList } from '@/views/cryptoList/cryptoList';
import WriteArticle from '@/views/write';
import Layout from '@/components/layout/projectLayout';
import UserLayout from '@/components/layout/userLayout';
import AuthWrapper from '@/components/authWrapper';
import Loading from '@/components/layout/loading';
import { UserRole } from './enums';


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
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Layout />}>
                    <Route path="/submit_materials" element={<SumbitMaterials />} />
                </Route>
                {/* <Route path="/" element={<UserLayout />}>
                    <Route path="/top-cryptos" element={<CryptoList />} />
                </Route> */}

                {/* Private Routes */}
                <Route path="/" element={<AuthWrapper allowedRoles={[UserRole.ADMIN, UserRole.BD]} />}>
                    {/* <Route path="/" element={<AuthWrapper allowedRoles={[]} />}> */}
                    <Route path="/" element={<Layout />}>
                        <Route path="/article/write" element={<WriteArticle />} />
                    </Route>
                    <Route path="/submit/audit" element={<AuditForm />} />
                    <Route path="/submit/audit/:id" element={<AuditForm />} />
                    <Route path="/submit/research" element={<ResearchForm />} />
                    <Route path="/submit/research/:id" element={<ResearchForm />} />
                    <Route path="/submited" element={<Submited />} />
                </Route>
                <Route path='/' element={<AuthWrapper allowedRoles={[UserRole.BD, UserRole.ADMIN]} />}>
                    <Route path="/" element={<Layout />}>
                        <Route path="/review/audit" element={<AuditReview />} />
                        <Route path="/review/audit/:id" element={<AuditReviewRecord />} />
                        <Route path="/review/research" element={<ResearchReview />} />
                        <Route path="/review/research/:id" element={<ResearchReviewRecord />} />
                    </Route>
                </Route>
            </Routes>
        </Router>
    )
}

export default App
