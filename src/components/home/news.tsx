import React, { ReactNode } from "react";
import CustomSection from "@/components/customSection";
import Button from "@/components/button";
import Title from '@/components/title'
import Subtitle from '@/components/subtitle'
import CardTitle from '@/components/cardTitle'
import CardSubtitle from "../cardSubtitle";
import Card from "@/components/card";


import news1 from '@/assets/home/news/news-1x.png'
import news2 from '@/assets/home/news/news-2x.png'
import news3 from '@/assets/home/news/news-3x.png'
import img1 from '@/assets/home/news/img_1.svg'
import img2 from '@/assets/home/news/img_2.svg'
import img3 from '@/assets/home/news/img_3.svg'
import img4 from '@/assets/home/news/img_4.svg'
import img5 from '@/assets/home/news/img_5.svg'
import img6 from '@/assets/home/news/img_6.svg'
import img7 from '@/assets/home/news/img_7.svg'
import img8 from '@/assets/home/news/img_8.svg'
import img9 from '@/assets/home/news/img_9.svg'


interface NewsProps { }

export const News: React.FC<NewsProps> = ({ }) => {

    return (
        <CustomSection>
            <div className="flex flex-col items-center justify-center">
                <Button className="mb-6">News</Button>
                <Title className="mb-[8px]">Smart News Digests</Title>
                <Subtitle className="z-10 mb-[32px] md:mb-[48px]">
                    AI-powered newsfeed summarising news from hundreds of sources
                </Subtitle>
            </div>
            <div className="grid md:grid-cols-2  gap-4">
                <Card className="p-6 md:p-10">
                    <div className="h-full flex flex-col justify-between">
                        <div className="mb-6">
                            <img src={news3} alt="" srcSet={`${news1} 1x, ${news2} 2x, ${news3} 3x`} />
                        </div>
                        <div className="mt-6">
                            <CardTitle className="mb-2">Daily & Real-Time Updates</CardTitle>
                            <CardSubtitle>Receive daily recaps or real-time breaking news<br className="hidden md:block" /> alerts on key market movements</CardSubtitle>
                        </div>
                    </div>
                </Card>
                <Card className="p-6 md:p-10">
                    <div className="h-full flex flex-col justify-between">
                        <div className="flex justify-center">
                            <div className="pt-4 lg:pt-8 grid grid-cols-3 md:grid-cols-4 justify-center gap-4 lg:gap-14 w-max">
                                <div className="p-2 rounded-lg bg-dark-3 w-max"><img src={img1} alt="" className="w-14 lg:w-auto" /></div>
                                <div className="p-2 rounded-lg bg-dark-3 w-max"><img src={img2} alt="" className="w-14 lg:w-auto" /></div>
                                <div className="p-2 rounded-lg bg-dark-3 w-max"><img src={img3} alt="" className="w-14 lg:w-auto" /></div>
                                <div className="p-2 rounded-lg bg-dark-3 w-max"><img src={img4} alt="" className="w-14 lg:w-auto" /></div>
                                <div className="p-2 rounded-lg bg-dark-3 w-max"><img src={img5} alt="" className="w-14 lg:w-auto" /></div>
                                <div className="p-2 rounded-lg bg-dark-3 w-max"><img src={img6} alt="" className="w-14 lg:w-auto" /></div>
                                <div className="p-2 rounded-lg bg-dark-3 w-max"><img src={img7} alt="" className="w-14 lg:w-auto" /></div>
                                <div className="p-2 rounded-lg bg-dark-3 w-max"><img src={img8} alt="" className="w-14 lg:w-auto" /></div>
                                <div className="p-2 rounded-lg bg-dark-3 w-max md:hidden"><img src={img9} alt="" className="w-14 lg:w-auto" /></div>
                            </div>
                        </div>
                        <div className="mt-6">
                            <CardTitle className="mb-2">Customizable News Feed</CardTitle>
                            <CardSubtitle>Personalize your feed by selecting preferred<br className="hidden md:block" /> sources, categories, or assets</CardSubtitle>
                        </div>
                    </div>
                </Card>
            </div>
        </CustomSection>
    )
} 