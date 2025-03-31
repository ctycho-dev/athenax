import React, { useRef } from "react";
import { Tabs } from '@mantine/core';
import { Toaster } from 'sonner';

import { CustomTabs } from "@/components/customTabs";

import whats_new from '@/assets/cryptos/whats_new.svg'
import help from '@/assets/cryptos/help.svg'
import { Navbar } from "@/components/navbar";



interface CryptoListProps { }


export const CryptoList: React.FC<CryptoListProps> = ({ }) => {


    return (
        <main className="bg-gray-1 min-h-screen flex text-white">
            {/* <aside className="w-[280px] flex flex-col border-r border-gray-2">
                <div className="flex-1 flex flex-col">
                    <div className="p-md">
                        <img src="https://link.storjshare.io/raw/jwruwuwumlzi3djrejlryfuyxtfa/athenax/logo.png" alt="" className="w-[48px]" />
                    </div>
                    <div className="flex-1 flex flex-col">
                        <div className="flex-1 p-xs">
                            <Navbar />
                        </div>
                        <div className="p-md">
                            <button
                                type="button"
                                className="bg-light-blue-3 hover:bg-light-blue-2 transition-all duration-150 rounded-[6px] h-[33px] w-full flex justify-center items-center font-medium text-sm text-white hover:cursor-pointer"

                            >Log In</button>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-2 p-md text-sm font-normal text-gray-3">
                    <div className="grid grid-cols-[16px_1fr] items-center gap-x-[8px] mb-sm">
                        <img src={whats_new} alt="" /><span>What’s New</span>
                    </div>
                    <div className="grid grid-cols-[16px_1fr] items-center gap-x-[8px]">
                        <img src={help} alt="" /><span>Help</span>
                    </div>
                </div>
            </aside> */}
            <aside className="flex-1">
                <div className="border-b border-gray-2 p-md">
                    <h1 className="font-semibold text-[22px]">Top Cryptos</h1>
                </div>
                <CustomTabs />
                <div></div>
            </aside>
        </main>
    );
};