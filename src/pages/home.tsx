import React, { useRef } from "react";
import { Toaster } from 'sonner';

import gradientTop from '../assets/gradient-top.png';
import { Header } from "@/components/header/header";
import { Main } from "@/components/home/main";
import { Description } from "@/components/home/description";
import { News } from "@/components/home/news";
import { Trackers } from "@/components/home/trackers";
import { Reports } from "@/components/home/reports";
import { Charts } from "@/components/home/charts";
import { AI } from "@/components/home/ai";
import { Research } from "@/components/home/research";
import { X } from "@/components/home/x";
import { Footer } from "@/components/footer/footer";
import UnicornStudioEmbed from "@/components/uvicornStudioEmbed";



interface HomeProps { }

export const Home: React.FC<HomeProps> = ({ }) => {

    const wishlistRef = useRef<HTMLDivElement>(null);

    const scrollToWishlist = () => {
        if (wishlistRef && wishlistRef.current) {
            wishlistRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
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
            <Footer formRef={wishlistRef}/>
            <Toaster richColors position="top-right" />
        </>
    );
};