import React from "react";
import logoWhite from '/athenax-white.svg';



interface HeaderProps { }


export const Header: React.FC<HeaderProps> = ({ }) => {

    return (
        <header className="flex flex-col justify-center py-12">
            <div className="flex justify-center">
                {/* <img src={logoWhite} alt="" className="w-[165px] md:w-[206px]" /> */}
                <img src="https://scholarx.mypinx.store/Logo%20Blue%2BWhite.png" className="h-28" alt="" />
            </div>
        </header>
    )
} 