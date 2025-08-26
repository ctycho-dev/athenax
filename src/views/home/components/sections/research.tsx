import React from "react";
import CustomSection from "@/views/home/components/customSection";
import Button from "@/components/ui/button";
import Title from '@/views/home/components/title';
import Subtitle from '@/views/home/components/subtitle';
import CardTitle from '@/views/home/components/cardTitle';
import CardSubtitle from "@/views/home/components/cardSubtitle";
import Card from "@/views/home/components/card";

import { s3 } from "@/utils";  // your s3 helper

interface ResearchProps {}

export const Research: React.FC<ResearchProps> = () => {
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
                    <div className="flex justify-center -mr-6 md:-mr-10">
                        <picture>
                            <source srcSet={s3("ju2w2pwwq3t7q4qtotibpugp4oxq/athenax/research/fees.webp")} type="image/webp" />
                            <source srcSet={s3("jw4tpfuylnazzkngfpvffpsny3eq/athenax/research/fees.png")} type="image/png" />
                            <img
                                src={s3("jw4tpfuylnazzkngfpvffpsny3eq/athenax/research/fees.png")}
                                srcSet={s3("jw4tpfuylnazzkngfpvffpsny3eq/athenax/research/fees.png")}
                                alt="News"
                            />
                        </picture>
                    </div>
                    <div className="pt-6">
                        <CardTitle className="mb-2">TVL, Revenue/Fees, Prices</CardTitle>
                        <CardSubtitle className="md:w-3/4">
                            Track Total Value Locked (TVL), protocol revenues, and asset prices in real time to spot early trends and high-growth projects
                        </CardSubtitle>
                    </div>
                </Card>
                <Card className="p-6 md:p-10 flex flex-col justify-between">
                    <div className="flex justify-center  -mr-6 md:-mr-10">
                        <picture>
                            <source srcSet={s3("juvjf2t434ghmlga7oo7qskdlcxq/athenax/research/token.webp")} type="image/webp" />
                            <source srcSet={s3("jwt72edk7q4igwwh46qds6ldydsq/athenax/research/token.png")} type="image/png" />
                            <img
                                src={s3("jwt72edk7q4igwwh46qds6ldydsq/athenax/research/token.png")}
                                srcSet={s3("jwt72edk7q4igwwh46qds6ldydsq/athenax/research/token.png")}
                                alt="News"
                            />
                        </picture>
                    </div>
                    <div className="pt-6">
                        <CardTitle className="mb-2">Unlocks, Active Users, Token Liquidity</CardTitle>
                        <CardSubtitle className="md:w-3/4">
                            Stay ahead with insights on token unlock schedules, user activity, and liquidity metrics, helping you identify momentum shifts before the market reacts
                        </CardSubtitle>
                    </div>
                </Card>
            </div>
        </CustomSection>
    );
};
