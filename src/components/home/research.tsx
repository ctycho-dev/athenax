import React from "react";
import CustomSection from "@/components/customSection";
import Button from "@/components/button";
import Title from '@/components/title'
import Subtitle from '@/components/subtitle'
import CardTitle from '@/components/cardTitle'
import CardSubtitle from "../cardSubtitle";
import Card from "@/components/card";

import fees from '@/assets/home/research/fees.png'
import token from '@/assets/home/research/token.png'

interface ResearchProps { }


export const Research: React.FC<ResearchProps> = ({ }) => {

    return (
        <CustomSection className="relative">
            <div className="flex flex-col items-center justify-center">
                <Button className="mb-6">Research</Button>
                <Title className="mb-[8px]">Uncover Alpha Early</Title>
                <Subtitle className="z-10 mb-[32px] md:mb-[48px]">
                    Discover new projects way before everyone else
                </Subtitle>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6 md:p-10 flex flex-col justify-between">
                    <div className="flex justify-center -mr-6 md:-mr-10"><img src={fees} alt="" /></div>
                    <div className="pt-6">
                        <CardTitle className="mb-2">TVL, Revenue/Fees, Prices</CardTitle>
                        <CardSubtitle className="md:w-3/4">Track Total Value Locked (TVL), protocol revenues, and asset prices in real time to spot early trends and high-growth projects</CardSubtitle>
                    </div>
                </Card>
                <Card className="p-6 md:p-10 flex flex-col justify-between">
                    <div className="flex justify-center  -mr-6 md:-mr-10"><img src={token} alt="" /></div>
                    <div className="pt-6">
                        <CardTitle className="mb-2">Unlocks, Active Users, Token Liquidity</CardTitle>
                        <CardSubtitle className="md:w-3/4">Stay ahead with insights on token unlock schedules, user activity, and liquidity metrics, helping you identify momentum shifts before the market reacts</CardSubtitle>
                    </div>
                </Card>
            </div>
        </CustomSection>
    )
} 