import React, { ReactNode, DetailedHTMLProps, ButtonHTMLAttributes } from 'react';

interface CustomButtonProps {
    id?: string
    children: ReactNode;
    type?: "button" | "submit" | "reset";
    handler?: () => void
    className?: string
}

const CustomButton: React.FC<CustomButtonProps> = ({ id, children, type = 'button', handler, className }) => {
    return (
        <button
            id={id}
            type={type}
            className={`main-btn ${className} disabled:opacity-50 hover:cursor-pointer transition-all duration-100`}
            onClick={handler}
            // disabled
        >
            {children}
        </button>
    )
};

export default CustomButton;