import React, { useEffect, useState } from "react";
import { RootState } from "@/store/store";
import { useSelector } from 'react-redux';
import { Input } from '@mantine/core';
import { Link } from "react-router-dom";
import { usePageColorScheme } from '@/hooks/usePageTheme';
import { Menu } from '@mantine/core';

import { useGetAuditByUserQuery } from "@/services/auditApi";
import { useGetResearchByUserQuery } from "@/services/researchApi";
import { ReportState } from "@/enums";
import RecentAudits from "./components/recentAudits";
import RecentResearches from "./components/recentResearches";
import SubmittedMaterials from "./components/submitedMaterials";
import { IoIosSearch } from "react-icons/io";
import { CombinedItem } from "@/types";
import PageHeader from "@/components/ui/header";


export const SumbitMaterials = () => {
    usePageColorScheme('light')
    const privyToken = useSelector((state: RootState) => state.auth.privyToken);
    const [openedDropdown, setOpenedDropdown] = useState(false);

    const {
        data: audits,
        isLoading: isAuditsLoading
    } = useGetAuditByUserQuery(undefined, {
        skip: !privyToken
    });

    const {
        data: researches,
        isLoading: isResearchesLoading
    } = useGetResearchByUserQuery(undefined, {
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
                <PageHeader title="Submit Materials">
                    <Menu opened={openedDropdown} onChange={setOpenedDropdown} shadow="md" width={200}>
                        <Menu.Target>
                            <button
                                onClick={() => { setOpenedDropdown(true) }}
                                className="group h-[46px] rounded-medium w-full border border-border text-border px-4 flex gap-2 items-center justify-center hover:cursor-pointer hover:text-white hover:border-white hover:opacity-80">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-border group-hover:stroke-white">
                                    <path d="M8 3.33301V12.6663" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M3.3335 8H12.6668" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span className="text-sm font-semibold">Add your Project Info</span>
                            </button>
                        </Menu.Target>

                        <Menu.Dropdown styles={{
                            dropdown: {
                                background: '#23232B',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
                                border: 0
                            }
                        }}>
                            {/* <Menu.Item color="white">
                                <Link to='/submit/audit'>
                                    Create Audit Report
                                </Link>
                            </Menu.Item> */}
                            <Menu.Item color="white">
                                <Link to='/submit/research'>
                                    Create Research Report
                                </Link>
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </PageHeader>
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
