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
import x from '@/assets/home/x/x.png'

interface XProps { }


export const X: React.FC<XProps> = ({ }) => {

    return (
        <CustomSection>
            <div className="flex flex-col items-center justify-center mb-14">
                <Button className="mb-6">x.com</Button>
                <Title className="mb-6">Research X Wisely</Title>
                <Subtitle className="z-10">
                    Get Insights Based on Twitter Followers
                </Subtitle>
            </div>
            {/* <div className="flex flex-col-reverse md:grid grid-cols-[250px_1fr] lg:grid-cols-[300px_1fr] gap-y-12 gap-x-10"> */}
            <div className="flex flex-col-reverse lg:flex-row gap-14 lg:gap-6 justify-between">
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
                <div className="flex justify-center lg:justify-end">
                    <img src={x} alt="" className="md:max-w-xl" />
                </div>
            </div>
        </CustomSection>
    )
} 