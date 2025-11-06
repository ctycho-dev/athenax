import React, { useState, useEffect, memo } from "react";
import Title from '@/views/home/components/title'
import Subtitle from '@/views/home/components/subtitle'
import CustomButton from "@/views/home/components/customButton";
import { s3 } from "@/utils";

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
            <CustomButton id='scroll-button' className="mb-[80px] md:mb-[97px]" handler={scrollToWishlist}>
                Join the Waitlist Now
            </CustomButton>
            <div className={`w-full flex justify-center px-4 fixed bottom-[64px] z-20 ${isButtonVisible ? '' : 'translate-y-36'} transition-all duration-500`}>
                <CustomButton className="z-20 sticked-btn" handler={scrollToWishlist}>
                    Join the Waitlist Now
                </CustomButton>
            </div>
            <div className="relative md:static w-full flex justify-center">
                <picture>
                    {/* Desktop Dashboard - only loads on desktop */}
                    <source
                        srcSet={`${s3('home/main/dashboard-2x.webp')} 2x, ${s3('home/main/dashboard-4x.webp')} 3x`}
                        type="image/webp"
                        media="(min-width: 768px)"
                    />
                    <source
                        srcSet={`${s3('home/main/dashboard-2x.png')} 2x, ${s3('home/main/dashboard-4x.png')} 3x`}
                        type="image/png"
                        media="(min-width: 768px)"
                    />

                    {/* Mobile Dashboard - only loads on mobile */}
                    <source
                        srcSet={`${s3('home/main/mdash-2x.webp')} 2x, ${s3('home/main/mdash-4x.webp')} 3x`}
                        type="image/webp"
                    />
                    <source
                        srcSet={`${s3('home/main/mdash-2x.png')} 2x, ${s3('home/main/mdash-4x.png')} 3x`}
                        type="image/png"
                    />

                    {/* Fallback */}
                    <img
                        src={s3('home/main/mdash-4x.png')}
                        alt="Dashboard"
                        fetchPriority="high"
                        loading="eager"
                        className="w-full"
                    />
                </picture>
                {/* Desktop Dashboard */}
                {/* <picture className="hidden md:block">
                    <source
                        srcSet={`${s3('home/main/dashboard-2x.webp')} 2x, ${s3('home/main/dashboard-4x.webp')} 3x`}
                        type="image/webp"
                        media="(min-width: 768px)"
                    />
                    <source
                        srcSet={`${s3('home/main/dashboard-2x.png')} 2x, ${s3('home/main/dashboard-4x.png')} 3x`}
                        type="image/png"
                        media="(min-width: 768px)"
                    />
                    <img
                        src={s3('home/main/dashboard-4x.png')}
                        srcSet={`${s3('home/main/dashboard-2x.png')} 2x, ${s3('home/main/dashboard-4x.png')} 3x`}
                        alt="Dashboard"
                        fetchPriority="high"
                        loading="eager"
                    />
                </picture> */}

                {/* Mobile Dashboard */}
                {/* <picture className="md:hidden w-full">
                    <source
                        srcSet={`${s3('home/main/mdash-2x.webp')} 2x, ${s3('home/main/mdash-4x.webp')} 3x`}
                        type="image/webp"
                        media="(max-width: 767px)"
                    />
                    <source
                        srcSet={`${s3('home/main/mdash-2x.png')} 2x, ${s3('home/main/mdash-4x.png')} 3x`}
                        type="image/png"
                        media="(max-width: 767px)"
                    />
                    <img
                        src={s3('home/main/mdash-4x.png')}
                        srcSet={`${s3('home/main/mdash-2x.png')} 2x, ${s3('home/main/mdash-4x.png')} 3x`}
                        alt="Dashboard"
                    />
                </picture> */}

                {/* <picture className="absolute -z-10 left-1/2 top-52 md:top-72 -translate-x-1/2 -translate-y-1/2 max-w-full md:max-w-3xl">
                    <source
                        srcSet={s3('home/main/circle.webp')}
                        type="image/webp"
                        media="(min-width: 768px)"
                    />
                    <source
                        srcSet={s3('home/main/circle.png')}
                        type="image/png"
                        media="(min-width: 768px)"
                    />

                    <source
                        srcSet={s3('home/main/mcircle.webp')}
                        type="image/webp"
                    />
                    <source
                        srcSet={s3('home/main/mcircle.png')}
                        type="image/png"
                    />

                    <img
                        src={s3('home/main/mcircle.png')}
                        alt=""
                        fetchPriority="low"
                    />
                </picture> */}

                {/* Desktop Gradient */}
                <picture className="hidden md:block absolute -z-10 left-1/2 top-52 md:top-72 -translate-x-1/2 -translate-y-1/2 max-w-full md:max-w-3xl">
                    <source srcSet={s3('home/main/circle.webp')} type="image/webp" media="(min-width: 768px)" />
                    <source srcSet={s3('home/main/circle.png')} type="image/png" media="(min-width: 768px)" />
                    <img src={s3('home/main/circle.png')} alt="" />
                </picture>

                {/* Mobile Gradient */}
                <picture className="md:hidden absolute -z-10 left-0 right-0 w-full -top-1/4 scale-125">
                    <source srcSet={s3('home/main/mcircle.webp')} type="image/webp" media="(max-width: 767px)" />
                    <source srcSet={s3('home/main/mcircle.png')} type="image/png" media="(max-width: 767px)" />
                    <img src={s3('home/main/mcircle.png')} alt="" />
                </picture>
            </div>
        </main>
    );
});
