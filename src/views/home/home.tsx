import React, { useRef } from "react";
import { Toaster } from 'sonner';

import { Header } from "@/components/layout/header";
import { Main } from "@/views/home/components/sections/main";
import { Description } from "@/views/home/components/sections/description";
import { News } from "@/views/home/components/sections/news";
import { Trackers } from "@/views/home/components/sections/trackers";
import { Reports } from "@/views/home/components/sections/reports";
import { Charts } from "@/views/home/components/sections/charts";
import { AI } from "@/views/home/components/sections/ai";
import { Research } from "@/views/home/components/sections/research";
import { X } from "@/views/home/components/sections/x";
import { Footer } from "@/components/layout/footer";
import { usePageColorScheme } from '@/hooks/usePageTheme';



interface HomeProps { }

export const Home: React.FC<HomeProps> = ({ }) => {
    usePageColorScheme('dark');
    const wishlistRef = useRef<HTMLDivElement>(null);

    const scrollToWishlist = () => {
        if (wishlistRef && wishlistRef.current) {
            wishlistRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div>
            <Header />
            <Main scrollToWishlist={scrollToWishlist} />
            <Description />
            <News />
            <Trackers />
            <Reports />
            <Charts />
            <AI />
            <Research />
            <X />
            <Footer formRef={wishlistRef} />
            <Toaster richColors position="top-right" />
        </div>
    );
};