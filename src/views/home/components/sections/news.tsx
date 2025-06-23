import React, { ReactNode } from "react";
import CustomSection from "@/views/home/components/customSection";
import Button from "@/components/ui/button";
import Title from '@/views/home/components/title'
import Subtitle from '@/views/home/components/subtitle'
import CardTitle from '@/views/home/components/cardTitle'
import CardSubtitle from "@/views/home/components/cardSubtitle";
import Card from "@/views/home/components/card";

import { s3 } from "@/utils";
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
                            <picture>
                                <source
                                    srcSet={`${s3(
                                        'jxtfgdwv6l5qa4xoccju7y5gslza/athenax/news/news-2x.webp'
                                    )} 2x, ${s3(
                                        'jwm5csk2omaaw62khyq36bf56z7q/athenax/news/news-3x.webp'
                                    )} 3x`}
                                    type="image/webp"
                                />
                                <source
                                    srcSet={`${s3(
                                        'jvj3pkyjfl3yihr5ewkouva4o5ja/athenax/news/news-2x.png'
                                    )} 2x, ${s3(
                                        'jwwe5cmqxwlammto4tpllftn45ma/athenax/news/news-3x.png'
                                    )} 3x`}
                                    type="image/png"
                                />
                                <img
                                    src={s3(
                                        'jwwe5cmqxwlammto4tpllftn45ma/athenax/news/news-3x.png'
                                    )}
                                    srcSet={`${s3(
                                        'jvj3pkyjfl3yihr5ewkouva4o5ja/athenax/news/news-2x.png'
                                    )} 2x, ${s3(
                                        'jwwe5cmqxwlammto4tpllftn45ma/athenax/news/news-3x.png'
                                    )} 3x`}
                                    alt="News"
                                />
                            </picture>
                        </div>
                        <div className="mt-6">
                            <CardTitle className="mb-2">Daily & Real-Time Updates</CardTitle>
                            <CardSubtitle className="w-2/3">Receive daily recaps or real-time breaking news alerts on key market movements</CardSubtitle>
                        </div>
                    </div>
                </Card>
                <Card className="p-6 md:p-10">
                    <div className="h-full flex flex-col justify-between">
                        <div className="flex justify-center">
                            <div className="pt-4 lg:pt-8 grid grid-cols-3 md:grid-cols-4 justify-center gap-4 lg:gap-14 w-max">
                                <div className="p-2 rounded-lg bg-dark-3 w-max"><img loading="lazy" src={img1} alt="" className="w-14 lg:w-auto" /></div>
                                <div className="p-2 rounded-lg bg-dark-3 w-max"><img loading="lazy" src={img2} alt="" className="w-14 lg:w-auto" /></div>
                                <div className="p-2 rounded-lg bg-dark-3 w-max"><img loading="lazy" src={img3} alt="" className="w-14 lg:w-auto" /></div>
                                <div className="p-2 rounded-lg bg-dark-3 w-max"><img loading="lazy" src={img4} alt="" className="w-14 lg:w-auto" /></div>
                                <div className="p-2 rounded-lg bg-dark-3 w-max"><img loading="lazy" src={img5} alt="" className="w-14 lg:w-auto" /></div>
                                <div className="p-2 rounded-lg bg-dark-3 w-max"><img loading="lazy" src={img6} alt="" className="w-14 lg:w-auto" /></div>
                                <div className="p-2 rounded-lg bg-dark-3 w-max"><img loading="lazy" src={img7} alt="" className="w-14 lg:w-auto" /></div>
                                <div className="p-2 rounded-lg bg-dark-3 w-max"><img loading="lazy" src={img8} alt="" className="w-14 lg:w-auto" /></div>
                                <div className="p-2 rounded-lg bg-dark-3 w-max md:hidden"><img loading="lazy" src={img9} alt="" className="w-14 lg:w-auto" /></div>
                            </div>
                        </div>
                        <div className="mt-6">
                            <CardTitle className="mb-2">Customizable News Feed</CardTitle>
                            <CardSubtitle className="w-2/3">Personalize your feed by selecting preferred sources, categories, or assets</CardSubtitle>
                        </div>
                    </div>
                </Card>
            </div>
        </CustomSection>
    )
} 