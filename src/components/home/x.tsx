import React from "react";
import CustomSection from "@/components/customSection";
import Button from "@/components/button";
import Title from '@/components/title'
import Subtitle from '@/components/subtitle'
import CardTitle from '@/components/cardTitle'
import CardSubtitle from "../cardSubtitle";

import graph from '@/assets/home/x/graph.png'
import followers from '@/assets/home/x/followers.png'
import progress from '@/assets/home/x/progress.png'
import x1 from '@/assets/home/x/x-1x.png'
import x2 from '@/assets/home/x/x-2x.png'
import x3 from '@/assets/home/x/x-3x.png'

interface XProps { }


export const X: React.FC<XProps> = ({ }) => {

    return (
        <CustomSection>
            <div className="flex flex-col items-center justify-center md:mb-14">
                <Button className="mb-6">x.com</Button>
                <Title className="mb-[8px]">Research X Wisely</Title>
                <Subtitle className="z-10 mb-[32px] md:mb-[48px]">
                    Get Insights Based on Twitter Followers
                </Subtitle>
            </div>
            <div className="flex flex-col-reverse md:grid grid-cols-[250px_1fr] lg:grid-cols-[300px_1fr] gap-y-12 gap-x-10">
                {/* <div className="flex flex-col-reverse lg:flex-row gap-14 lg:gap-6 justify-between"> */}
                <div className="">
                    <div className="mb-10">
                        <CardTitle className="mb-2">See Twitter Score</CardTitle>
                        <CardSubtitle>Score is generated based on the popularity of this account in crypto space</CardSubtitle>
                    </div>
                    <div className="mb-10">
                        <CardTitle className="mb-2">See Account Activity</CardTitle>
                        <CardSubtitle>Analyze assets using price, volume, TVL, sentiment, and on-chain activity</CardSubtitle>
                    </div>
                    <div>
                        <CardTitle className="mb-2">Review Followers</CardTitle>
                        <CardSubtitle>Compare multiple tokens, blockchains, or DeFi projects side by side</CardSubtitle>
                    </div>
                </div>
                <div>
                    <div className="relative flex justify-center md:justify-end w-full md:mt-12">
                        <div className="hidden md:flex">
                            <img loading="lazy" src={progress} alt="" className="max-h-[180px] lg:max-h-[227px] -mr-[20%] -mt-[10%] z-[2]" />
                            <img loading="lazy" src={followers} alt="" className="max-h-[190px] lg:max-h-[233px] absolute bottom-2 lg:bottom-0 left-10" />
                            <img loading="lazy" src={graph} alt="" className="max-h-[400px] top-16 right-0  w-[80%] z-[1]" />
                        </div>
                        <img loading="lazy" src={x3} alt="" srcSet={`${x1} 1x, ${x2} 2x, ${x3} 3x`} className="md:hidden w-full" />
                    </div>
                </div>
            </div>
        </CustomSection>
    )
} 