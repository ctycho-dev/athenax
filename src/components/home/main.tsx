import React, { useState, useEffect } from "react";
import { Button } from "@mantine/core";
import Title from '@/components/title'
import Subtitle from '@/components/subtitle'

import dashboard from '@/assets/home/main/dashboard.png'
import mobileDashboard from '@/assets/home/main/mobile-dashboard.png'
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
            <Title className="mb-6">All-in-One Web3 Data & Research</Title>
            <Subtitle className="z-10">
                Access in-depth blockchain data analytics and cryptocurrency insights. Leverage expert-driven research for real-time Web3 intelligence.
            </Subtitle>
            <Button id="scroll-button" variant="filled" className="mb-10" size="md" onClick={scrollToWishlist}>Join the Waitlist Now</Button>
            <div className={`fixed bottom-2 z-20 ${isButtonVisible ? '' : 'translate-y-14'} transition-all duration-500`}>
                <Button
                    variant="filled"
                    size="md"
                    onClick={scrollToWishlist}
                >Join the Waitlist Now</Button>
            </div>
            <div>
                <img src={dashboard} alt="" className="hidden md:block" />
                <img src={mobileDashboard} alt="" className="md:hidden" />
            </div>
            <img src={circle} alt="" className="absolute -z-10 left-1/2 top-52 md:top-72 -translate-x-1/2 -translate-y-1/2 max-w-full md:max-w-3xl" />
        </main>
    )
} 