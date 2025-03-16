import React, { ReactNode } from 'react';

interface SubtitleProps {
  children: ReactNode;
  className?: string
}

const Subtitle: React.FC<SubtitleProps> = ({ children, className }) => {
  return <h2 className={`text-md md:text-lg text-center mb-12 max-w-2xl ${className}`}>{children}</h2>;
};

export default Subtitle;