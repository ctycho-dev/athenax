// import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { usePrivy } from '@privy-io/react-auth';

import { Home } from '@/views/home/home';
import { Login } from '@/views/login/login';
import { Welcome } from '@/views/welcome/welcome';
import { SumbitMaterials } from '@/views/submitMaterials';
import { Profile } from '@/views/profile';
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
import MyArticles from '@/views/myArticles';
import Layout from '@/components/layout/projectLayout';
import UserLayout from '@/components/layout/userLayout';
import PathTracker from '@/components/PathTracker';
import AuthWrapper from '@/components/authWrapper';
import AuthOnlyWrapper from '@/components/AuthOnlyWrapper';
import Loading from '@/components/layout/loading';
import { UserRole } from './enums';


function App() {
    // const { ready } = usePrivy();

    // if (!ready) {
    //     return <Loading />
    // }

    return (
        // <Router>
        //     <Routes>
        //         <Route path="/" element={<Home />} />
        //     </Routes>
        // </Router>

        <Router>
            <PathTracker />
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                {/* <Route path="/article/:slug" element={<WriteArticle />} /> */}
                {/* <Route path="/" element={<UserLayout />}>
                    <Route path="/top-cryptos" element={<CryptoList />} />
                </Route> */}

                <Route element={<AuthOnlyWrapper />}>
                    <Route path="/welcome" element={<Welcome />} />
                </Route>

                {/* Private Routes */}
                {/* <Route path="/" element={<AuthWrapper allowedRoles={[UserRole.ADMIN, UserRole.BD]} />}> */}
                <Route path="/" element={<AuthWrapper allowedRoles={[]} />}>
                    <Route path="/" element={<Layout />}>
                        <Route path="/article/new" element={<WriteArticle key="write-new" />}  />
                        <Route path="/article/:id/edit" element={<WriteArticle key="edit" />} />
                        <Route path="/article/me" element={<MyArticles />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/submit_materials" element={<SumbitMaterials />} />
                    </Route>
                    {/* <Route path="/submit/audit" element={<AuditForm />} />
                    <Route path="/submit/audit/:id" element={<AuditForm />} /> */}
                    <Route path="/submit/research" element={<ResearchForm />} />
                    <Route path="/submit/research/:id" element={<ResearchForm />} />
                    <Route path="/submited" element={<Submited />} />
                </Route>
                <Route path='/' element={<AuthWrapper allowedRoles={[UserRole.BD, UserRole.ADMIN]} />}>
                    <Route path="/" element={<Layout />}>
                        {/* <Route path="/review/audit" element={<AuditReview />} />
                        <Route path="/review/audit/:id" element={<AuditReviewRecord />} /> */}
                        <Route path="/review/research" element={<ResearchReview />} />
                        <Route path="/review/research/:id" element={<ResearchReviewRecord />} />
                    </Route>
                </Route>
            </Routes>
        </Router>
    )
}

export default App
