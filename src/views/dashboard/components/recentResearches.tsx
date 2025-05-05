import { Skeleton } from '@mantine/core';
import { ResearchType } from '@/types/research';
import Title from "./title";
import researchLogo from '@/assets/dashboard/researches.svg'

interface RecentResearchesProps {
    researches: ResearchType[] | undefined
    isLoading: boolean;
}

const RecentResearches: React.FC<RecentResearchesProps> = ({ researches, isLoading }) => {

    if (!researches || !researches.length) {
        return (
            <div>
                <Title className="mb-6">Recently Posted Audits</Title>
                <div className="bg-console-card rounded-medium h-60 flex justify-center items-center">
                    <div className='flex flex-col justify-center items-center'>
                        <div className='mb-2'><img src={researchLogo} alt="" /></div>
                        <div className='text-gray-3 text-center'>No researches <br /> posted yet</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Title className="mb-6">Recently Posted Researches</Title>
            <div className="bg-console-card rounded-medium">
                {researches.slice(0, 4).map((research) => (
                    <div key={research.id} className="[&:not(:last-child)]:border-b border-gray-2 p-4 flex justify-between items-center">
                        <div className="text-sm">
                            {research.steps.step1.name}
                        </div>
                        <div className="text-xs">
                            Research
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RecentResearches