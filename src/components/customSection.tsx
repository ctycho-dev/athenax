import React, { ReactNode } from 'react';

interface CustomSectionProps {
    children: ReactNode
    className?: string;
}

const CustomSection: React.FC<CustomSectionProps> = ({ children, className = ''}) => {
    return <section className={`max-w-7xl m-auto py-24 sm:py-24 px-4 ${className}`}>{children}</section>
}

export default CustomSection;