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
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </Router>

    )
}

export default App
