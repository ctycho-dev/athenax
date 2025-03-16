import React from "react";
import CustomSection from "@/components/customSection";
import Button from "@/components/button";
import Title from '@/components/title'
import Subtitle from '@/components/subtitle'
import CardTitle from '@/components/cardTitle'
import CardSubtitle from "../cardSubtitle";
import Card from "@/components/card";

import charts from '@/assets/home/charts/chart.png'

interface ChartsProps { }


export const Charts: React.FC<ChartsProps> = ({ }) => {

    return (
        <CustomSection>
            <div className="flex flex-col items-center justify-center mb-14">
                <Button className="mb-6">Charts</Button>
                <Title className="mb-6">Comparative Charts</Title>
                <Subtitle className="z-10">
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
                <div className=""><img src={charts} alt="" /></div>
            </div>
        </CustomSection>
    )
} 