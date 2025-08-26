
import React, { ReactNode } from 'react';
import PageTitle from './pageTitle';

interface PageHeaderProps {
    title: string
    children?: ReactNode;
    className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, children, className }) => {
    return (
        <div className="border-b border-gray-2 px-6 py-3.5 flex justify-between items-center">
            <PageTitle className={className}>{title}</PageTitle>
            <div>
                {children}
            </div>
        </div>
    )
};

export default PageHeader;