import { useEffect } from 'react';
import { Skeleton } from '@mantine/core';
import { AuditType } from "@/types/audit"
import Title from "@/components/ui/pageTitle";

import aidutsLogo from '@/assets/dashboard/audits.svg'

interface RecentAuditsProps {
    audits: AuditType[] | undefined
    isLoading: boolean;
}

const RecentAudits: React.FC<RecentAuditsProps> = ({ audits, isLoading }) => {

    if (!audits || !audits.length) {
        return (
            <div>
                <Title className="mb-6">Recently Posted Audits</Title>
                <div className="bg-console-card rounded-medium h-60 flex justify-center items-center">
                    <div className='flex flex-col justify-center items-center'>
                        <div className='mb-2'><img src={aidutsLogo} alt="" /></div>
                        <div className='text-gray-3 text-center'>No audits<br /> posted yet</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Title className="mb-6">Recently Posted Audits</Title>
            <div className="bg-console-card rounded-medium">
                {audits.slice(0, 4).map((audit) => (
                    <div key={audit.id} className="[&:not(:last-child)]:border-b border-gray-2 p-4 flex justify-between items-center">
                        <div className="text-sm">
                            {audit.steps.step1.name}
                        </div>
                        <div className="text-xs">
                            {audit.steps.step1.blockchain}
                        </div>
                        <div className="text-xs">
                            {audit.steps.step1.ecosystem}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RecentAudits