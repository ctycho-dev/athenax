import React, { ReactNode } from 'react';

interface CardTitleProps {
    children: ReactNode
    className?: string;
}

const CardTitle: React.FC<CardTitleProps> = ({ children, className }) => {
    return <div className={`text-[18px] md:text-[22px] font-bold ${className}`}>{children}</div>
}

export default CardTitle;