import React, { ReactNode } from 'react';

interface CardSubtitleProps {
    children: ReactNode
    className?: string;

}


const CardSubtitle: React.FC<CardSubtitleProps> = ({ children, className }) => {
    return <div className={`text-dark-subtitle font-light text-[16px] md:text-[18px] leading-6 ${className}`}>{children}</div>
}

export default CardSubtitle