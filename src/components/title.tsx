import React, { ReactNode } from 'react';

interface TitleProps {
  children: ReactNode;
  className?: string;
}

const Title: React.FC<TitleProps> = ({ children, className }) => {
  return <h1 className={`gradient-text text-[40px] md:text-[48px] font-bold text-center ${className}`}>{children}</h1>;
};

export default Title;