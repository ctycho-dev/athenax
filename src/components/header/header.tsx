import React from "react";
import logoWhite from '/athenax-white.svg';



interface HeaderProps { }


export const Header: React.FC<HeaderProps> = ({ }) => {

    return (
        <header className="flex flex-col justify-center py-20">
            <div className="flex justify-center">
                <img src={logoWhite} alt="" className="h-10 md:h-12 z-10" />
            </div>
        </header>
    )
} 