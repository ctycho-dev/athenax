import React, { ReactNode } from 'react';

interface PageTitleProps {
  children: ReactNode;
  className?: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ children, className }) => {
  return <h1 className={`font-semibold text-[22px] ${className}`}>{children}</h1>;
};

export default PageTitle;