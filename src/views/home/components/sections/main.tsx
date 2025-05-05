import React, { useState, useEffect, memo } from "react";
import Title from '@/views/home/components/title'
import Subtitle from '@/views/home/components/subtitle'
import CustomButton from "@/views/home/components/customButton";

interface MainProps {
    scrollToWishlist: () => void
}


export const Main: React.FC<MainProps> = memo(({ scrollToWishlist }) => {
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
            <CustomButton id='scroll-button' className="mb-[80px] md:mb-[97px]" handler={scrollToWishlist} >Join the Waitlist Now</CustomButton>
            <div className={`w-full flex justify-center px-4 fixed bottom-[64px] z-20 ${isButtonVisible ? '' : 'translate-y-36'} transition-all duration-500`}>
                <CustomButton className="z-20 sticked-btn" handler={scrollToWishlist} >Join the Waitlist Now</CustomButton>
            </div>
            <div className="relative md:static w-full flex justify-center">
                {/* Desktop Dashboard */}
                <picture className="hidden md:block">
                    <source srcSet="https://link.storjshare.io/raw/jxcu7h6ekk5nnbvuozrdvlagpn5q/athenax/main/dashboard-2x.webp 2x, https://link.storjshare.io/raw/jvf3wrr444zuojs5ropfpgjcxsdq/athenax/main/dashboard-4x.webp 3x" type="image/webp" />
                    <source srcSet="https://link.storjshare.io/raw/jv6pwbryumbrh4exwx62mmofzyva/athenax/main/dashboard-2x.png 2x, https://link.storjshare.io/raw/juqgij4hyhdqpz2vyg5iwzpgiq5a/athenax/main/dashboard-4x.png 3x" type="image/png" />
                    <img src="https://link.storjshare.io/raw/juid2k5cvcmqgxiom2mrazlnokwq/athenax/dashboard-4x.png" srcSet="https://link.storjshare.io/raw/jv6pwbryumbrh4exwx62mmofzyva/athenax/main/dashboard-2x.png 2x, https://link.storjshare.io/raw/juqgij4hyhdqpz2vyg5iwzpgiq5a/athenax/main/dashboard-4x.png 3x" alt="Dashboard" />
                </picture>
                {/* Mobile Dashboard */}
                <picture className="md:hidden w-full">
                    <source srcSet="https://link.storjshare.io/raw/jxuf3w4gbitvjmy4d73yvzn6v7fa/athenax/main/mdash-2x.webp 2x, https://link.storjshare.io/raw/juylot4hmsoa7eluckw6e34lbfoq/athenax/main/mdash-4x.webp 3x" type="image/webp" />
                    <source srcSet="https://link.storjshare.io/raw/jwcgimkwfgcly6sikoa3an4trrga/athenax/main/mdash-2x.png 2x, https://link.storjshare.io/raw/jwdep2aj5s6k5kogrwxcok5bppwa/athenax/main/mdash-4x.png 3x" type="image/png" />
                    <img src="https://link.storjshare.io/raw/jwdep2aj5s6k5kogrwxcok5bppwa/athenax/main/mdash-4x.png" srcSet="https://link.storjshare.io/raw/jwcgimkwfgcly6sikoa3an4trrga/athenax/main/mdash-2x.png 2x, https://link.storjshare.io/raw/jwdep2aj5s6k5kogrwxcok5bppwa/athenax/main/mdash-4x.png 3x" alt="Dashboard" />
                </picture>
                {/* Desktop Gradient */}
                <picture className="hidden md:block absolute -z-10 left-1/2 top-52 md:top-72 -translate-x-1/2 -translate-y-1/2 max-w-full md:max-w-3xl">
                    <source srcSet="https://link.storjshare.io/raw/jud5sldjbjeceowcua5gkd2wy5za/athenax/main/circle.webp" type="image/webp" />
                    <source srcSet="https://link.storjshare.io/raw/jvds2zvojcry6qnhimc4ijbhii3a/athenax/main/circle.png" type="image/png" />
                    <img src="https://link.storjshare.io/raw/jvds2zvojcry6qnhimc4ijbhii3a/athenax/main/circle.png" alt="" />
                </picture>
                {/* Mobile Gradient */}
                <picture className="md:hidden absolute -z-10 left-0 right-0 w-full -top-1/4 scale-125">
                    <source srcSet="https://link.storjshare.io/raw/jvfkgkmazgf3gru5ijfarc5o3waq/athenax/main/mcircle.webp" type="image/webp" />
                    <source srcSet="https://link.storjshare.io/raw/jwk5552zlcanxzurhq6ur4dmwoiq/athenax/main/mcircle.png" type="image/png" />
                    <img src="https://link.storjshare.io/raw/jwk5552zlcanxzurhq6ur4dmwoiq/athenax/main/mcircle.png" alt="" />
                </picture>
            </div>
        </main>
    )
})