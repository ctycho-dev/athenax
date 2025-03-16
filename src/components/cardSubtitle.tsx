import React, { ReactNode } from 'react';

interface CardSubtitleProps {
    children: ReactNode
    className?: string;

}


const CardSubtitle: React.FC<CardSubtitleProps> = ({ children }) => {
    return <div className="text-dark-subtitle text-sm">{children}</div>
}

export default CardSubtitle