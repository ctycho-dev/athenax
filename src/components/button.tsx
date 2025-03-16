import React, { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  className?: string
  handler?: () => void
}

const Button: React.FC<ButtonProps> = ({ children, className, handler }) => {
  return (
    <button
      className={`p-2 px-6 rounded-3xl border border-white hover:border-white/80 hover:text-white/80 hover:cursor-pointer ${className}`}
      onClick={handler}
    >
      {children}
    </button>
  );
};

export default Button;