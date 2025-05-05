import React, { useRef } from "react";
import { Tabs } from '@mantine/core';
import { Toaster } from 'sonner';

import { CustomTabs } from "@/views/cryptoList/components/customTabs";

import whats_new from '@/assets/cryptos/whats_new.svg'
import help from '@/assets/cryptos/help.svg'
import { Navbar } from "@/components/layout/projectNavbar";



interface CryptoListProps { }


export const CryptoList: React.FC<CryptoListProps> = ({ }) => {


    return (
        <main className="bg-gray-1 min-h-screen flex text-white">
            <aside className="flex-1">
                <div className="border-b border-gray-2 p-6">
                    <h1 className="font-semibold text-[22px]">Top Cryptos</h1>
                </div>
                <CustomTabs />
                <div></div>
            </aside>
        </main>
    );
};