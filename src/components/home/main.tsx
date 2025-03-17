import React, { useState, useEffect } from "react";
import { Button } from "@mantine/core";
import Title from '@/components/title'
import Subtitle from '@/components/subtitle'
import CustomButton from "@/components/customButton";

import dashboard1 from '@/assets/home/main/dashboard-1x.png'
import dashboard2 from '@/assets/home/main/dashboard-2x.png'
import dashboard4 from '@/assets/home/main/dashboard-4x.png'
import mdash1 from '@/assets/home/main/mdash-1x.png'
import mdash2 from '@/assets/home/main/mdash-2x.png'
import mdash4 from '@/assets/home/main/mdash-4x.png'
import circle from '@/assets/circle.png'

interface MainProps {
    scrollToWishlist: () => void
}


export const Main: React.FC<MainProps> = ({ scrollToWishlist }) => {
    const [isButtonVisible, setIsButtonVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const button = document.getElementById("scroll-button");
            const footer = document.querySelector("footer");

            if (button && footer) {
                const buttonRect = button.getBoundingClientRect();
                const footerRect = footer.getBoundingClientRect();

                if (buttonRect.bottom < 0 && footerRect.top > window.innerHeight) {
                    setIsButtonVisible(true);
                } else {
                    setIsButtonVisible(false);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <main className="max-w-7xl m-auto relative flex flex-col items-center justify-center pb-24 px-4">
            <Title className="mb-[8px]">All-in-One Web3 Data & Research</Title>
            <Subtitle className="z-10 mb-[40px] md:mb-[32px]">
                Access in-depth blockchain data analytics and cryptocurrency insights. Leverage expert-driven research for real-time Web3 intelligence.
            </Subtitle>
            <CustomButton id='scroll-button' className="mb-[97px]" handler={scrollToWishlist} >Join the Waitlist Now</CustomButton>
            <div className={`w-full flex justify-center px-4 fixed bottom-[64px] z-20 ${isButtonVisible ? '' : 'translate-y-36'} transition-all duration-500`}>
                <CustomButton className="z-20" handler={scrollToWishlist} >Join the Waitlist Now</CustomButton>
            </div>
            <div>
                <img src={dashboard4} alt="" srcSet={`${dashboard1} 1x, ${dashboard2} 2x, ${dashboard4} 4x`} className="hidden md:block" />
                <img src={mdash4} srcSet={`${mdash1} 1x, ${mdash2} 2x, ${mdash4} 4x`} alt="" className="md:hidden w-full" />
            </div>
            <img src={circle} alt="" className="absolute -z-10 left-1/2 top-52 md:top-72 -translate-x-1/2 -translate-y-1/2 max-w-full md:max-w-3xl" />
        </main>
    )
} 