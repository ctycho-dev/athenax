import React, { ReactNode, DetailedHTMLProps, ButtonHTMLAttributes } from 'react';

interface CustomButtonProps {
    children: ReactNode;
    type?: "button" | "submit" | "reset";
    handler?: () => void
    className?: string
}

const CustomButton: React.FC<CustomButtonProps> = ({ children, type = 'button', handler, className }) => {
    return (
        <button
            type={type}
            className={`bg-light-blue-1 hover:bg-light-blue-2 py-3 px-4 rounded-md ${className} disabled:opacity-50 hover:cursor-pointer transition-all duration-100`}
            onClick={handler}
            // disabled
        >
            {children}
        </button>
    )
};

export default CustomButton;