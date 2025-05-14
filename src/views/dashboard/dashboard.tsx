import React, { useEffect, useState } from "react";
import { RootState } from "@/store/store";
import { useSelector } from 'react-redux';
import { Input } from '@mantine/core';

import { usePageColorScheme } from '@/hooks/usePageTheme';
import { useGetAuditByUserQuery } from "@/services/auditApi";
import { useGetResearchAllQuery } from "@/services/researchApi";
import { ReportState } from "@/enums";
import RecentAudits from "./components/recentAudits";
import RecentResearches from "./components/recentResearches";
import DashboardHeader from "./components/header";
import SubmittedMaterials from "./components/submitedMaterials";
import { IoIosSearch } from "react-icons/io";
import { CombinedItem } from "@/types";


export const Dashboard = () => {
    usePageColorScheme('light')
    const privyToken = useSelector((state: RootState) => state.auth.privyToken);

    const { 
        data: audits, 
        isLoading: isAuditsLoading 
    } = useGetAuditByUserQuery(undefined, {
        skip: !privyToken
    });

    const { 
        data: researches, 
        isLoading: isResearchesLoading 
    } = useGetResearchAllQuery(undefined, {
        skip: !privyToken
    });

    const [combinedData, setCombinedData] = useState<CombinedItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!isAuditsLoading && !isResearchesLoading) {
            const withTypeAudits = (audits || []).map(item => ({ ...item, type: 'audit' as const }));
            const withTypeResearches = (researches || []).map(item => ({ ...item, type: 'research' as const }));
            
            const combined = [...withTypeAudits, ...withTypeResearches].sort((a, b) => 
                new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
            );
            
            setCombinedData(combined);
            setIsLoading(false);
        }
    }, [audits, researches, isAuditsLoading, isResearchesLoading]);

    return (
        <main className="min-h-screen flex text-white">
            <aside className="flex-1">
                <DashboardHeader />
                <div className="p-6">
                    <div className="mb-6">
                        <Input
                            placeholder="Search for researches and audits on AthenaX"
                            leftSection={<IoIosSearch className="ml-4 text-2xl" />}
                            styles={{
                                input: {
                                    background: '#16161B',
                                    height: '64px',
                                    fontSize: '16px',
                                    fontWeight: '400',
                                    border: '1px solid #242425',
                                    color: '#949FA8',
                                    padding: '0 40px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    borderRadius: '10px',
                                },
                            }}
                        />
                    </div>
                    <div className="mb-14">
                        <SubmittedMaterials 
                            data={combinedData} 
                            isLoading={isLoading} 
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <RecentResearches 
                            researches={researches?.filter(item => item.state == ReportState.COMPLETED)} 
                            isLoading={isLoading} 
                        />
                        <RecentAudits 
                            audits={audits?.filter(item => item.state == ReportState.COMPLETED)} 
                            isLoading={isLoading} 
                        />
                    </div>
                </div>
            </aside>
        </main>
    );
};
