import React from "react";
import CustomSection from "@/components/customSection";
import Button from "@/components/button";
import Title from '@/components/title'
import Subtitle from '@/components/subtitle'
import CardTitle from '@/components/cardTitle'
import CardSubtitle from "../cardSubtitle";
import Card from "@/components/card";

import summ from '@/assets/home/ai/summ.png'
import analysis from '@/assets/home/ai/analysis.png'
import circle from '@/assets/home/half-circle.png'

interface AIProps { }


export const AI: React.FC<AIProps> = ({ }) => {

    return (
        <div className="relative">

            <CustomSection className="relative">
                <div className="flex flex-col items-center justify-center">
                    <Button className="mb-6">AI</Button>
                    <Title className="mb-6">AI Recaps on Any Asset</Title>
                    <Subtitle className="z-10">
                        Quick, AI-generated insights on any cryptocurrency
                    </Subtitle>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    <Card className="p-6 md:p-10">
                        <div className="flex justify-center"><img src={summ} alt="" /></div>
                        <div className="pt-6">
                            <CardTitle className="mb-2">Instant AI Summaries</CardTitle>
                            <CardSubtitle>Get concise updates on news, price movements,<br />and key project developments for any asset</CardSubtitle>
                        </div>
                    </Card>
                    <Card className="p-6 md:p-10">
                        <div className="flex justify-center"><img src={analysis} alt="" /></div>
                        <div className="pt-6">
                            <CardTitle className="mb-2">Market Sentiment Analysis</CardTitle>
                            <CardSubtitle>Track real-time shifts in investor sentiment<br /> and emerging trends across the crypto space</CardSubtitle>
                        </div>
                    </Card>
                </div>
            </CustomSection>
            <div className="overflow-hidden">
                <img src={circle} alt="" className="-z-10 absolute bottom-0 right-0 translate-y-1/2 w-36" />
            </div>
        </div>
    )
} 