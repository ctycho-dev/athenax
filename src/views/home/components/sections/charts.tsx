import React from "react";
import CustomSection from "@/views/home/components/customSection";
import Button from "@/components/ui/button";
import Title from '@/views/home/components/title'
import Subtitle from '@/views/home/components/subtitle'
import CardTitle from '@/views/home/components/cardTitle'
import CardSubtitle from "@/views/home/components/cardSubtitle";
import { s3 } from '@/utils';

interface ChartsProps { }


export const Charts: React.FC<ChartsProps> = ({ }) => {

    return (
        <CustomSection>
            <div className="flex flex-col items-center justify-center md:mb-14">
                <Button className="mb-6">Charts</Button>
                <Title className="mb-[8px]">Comparative Charts</Title>
                <Subtitle className="z-10 mb-[32px] md:mb-[48px]">
                    Track and analyse multiple assets on one comprehensive chart
                </Subtitle>
            </div>
            <div className="flex flex-col-reverse md:grid grid-cols-[250px_1fr] lg:grid-cols-[300px_1fr] gap-y-12 gap-x-10">
                <div className="">
                    <div className="mb-10">
                        <CardTitle className="mb-2">Multi-Asset Analysis</CardTitle>
                        <CardSubtitle>Compare multiple tokens, blockchains, or DeFi projects side by side</CardSubtitle>
                    </div>
                    <div className="mb-10">
                        <CardTitle className="mb-2">Customizable Metrics</CardTitle>
                        <CardSubtitle>Analyze assets using price, volume, TVL, sentiment, and on-chain activity</CardSubtitle>
                    </div>
                    <div className="mb-10">
                        <CardTitle className="mb-2">Interactive & Real-Time</CardTitle>
                        <CardSubtitle>Dynamic charts that update in real time for better decision-making</CardSubtitle>
                    </div>
                    <div>
                        <CardTitle className="mb-2">Export & Share</CardTitle>
                        <CardSubtitle>Download or share your custom comparisons for easy collaboration</CardSubtitle>
                    </div>
                </div>
                <div className="flex justify-center md:justify-end">
                    {/* Desktop */}
                    <picture className="hidden md:block w-full max-w-3xl">
                        <source 
                            srcSet={`${s3('home/charts/chart-2x.webp')} 2x, ${s3('home/charts/chart-3x.webp')} 3x`} 
                            type="image/webp" 
                        />
                        <source 
                            srcSet={`${s3('home/charts/chart-2x.png')} 2x, ${s3('home/charts/chart-3x.png')} 3x`} 
                            type="image/png" 
                        />
                        <img 
                            src={s3('home/charts/chart-3x.png')} 
                            srcSet={`${s3('home/charts/chart-2x.png')} 2x, ${s3('home/charts/chart-3x.png')} 3x`} 
                            alt="Chart" 
                        />
                    </picture>
                    {/* Mobile */}
                    <picture className="md:hidden mt-12 flex-1 w-full max-w-96 flex justify-center">
                        <source 
                            srcSet={`${s3('home/charts/mchart-2x.webp')} 2x, ${s3('home/charts/mchart-3x.webp')} 3x`} 
                            type="image/webp" 
                        />
                        <source 
                            srcSet={`${s3('home/charts/mchart-2x.png')} 2x, ${s3('home/charts/mchart-3x.png')} 3x`} 
                            type="image/png" 
                        />
                        <img 
                            src={s3('home/charts/mchart-3x.png')} 
                            srcSet={`${s3('home/charts/mchart-2x.png')} 2x, ${s3('home/charts/mchart-3x.png')} 3x`} 
                            alt="Chart" 
                        />
                    </picture>
                </div>
            </div>
        </CustomSection>
    )
} 