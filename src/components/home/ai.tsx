import React from "react";
import CustomSection from "@/components/customSection";
import Button from "@/components/button";
import Title from '@/components/title'
import Subtitle from '@/components/subtitle'
import CardTitle from '@/components/cardTitle'
import CardSubtitle from "../cardSubtitle";
import Card from "@/components/card";


interface AIProps { }


export const AI: React.FC<AIProps> = ({ }) => {

    return (
        <div className="relative">

            <CustomSection className="relative">
                <div className="flex flex-col items-center justify-center">
                    <Button className="mb-6">AI</Button>
                    <Title className="mb-[8px]">AI Recaps on Any Asset</Title>
                    <Subtitle className="z-10 mb-[32px] md:mb-[48px]">
                        Quick, AI-generated insights on any cryptocurrency
                    </Subtitle>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    <Card className="p-6 md:p-10">
                        <div className="flex justify-center">
                            <picture>
                                <source srcSet="https://link.storjshare.io/raw/jvvfs2xh7wjofaxtzdp4w3rsd5aa/athenax/ai/summ.webp" type="image/webp" />
                                <source srcSet="https://link.storjshare.io/raw/jxe2xddy62dghkcf2ys4nsn3qgxq/athenax/ai/summ.png" type="image/png" />
                                <img src="https://link.storjshare.io/raw/jxe2xddy62dghkcf2ys4nsn3qgxq/athenax/ai/summ.png" srcSet="https://link.storjshare.io/raw/jxe2xddy62dghkcf2ys4nsn3qgxq/athenax/ai/summ.png" alt="News" />
                            </picture>
                        </div>
                        <div className="pt-6">
                            <CardTitle className="mb-2">Instant AI Summaries</CardTitle>
                            <CardSubtitle>Get concise updates on news, price movements,<br />and key project developments for any asset</CardSubtitle>
                        </div>
                    </Card>
                    <Card className="p-6 md:p-10">
                        <div className="flex justify-center">
                            <picture>
                                <source srcSet="https://link.storjshare.io/raw/jxmnvjemkd223xwl5arzfyqzlxhq/athenax/ai/analysis.webp" type="image/webp" />
                                <source srcSet="https://link.storjshare.io/raw/jushrcy4jw76ulj56fjxfvoaqe4a/athenax/ai/analysis.png" type="image/png" />
                                <img src="https://link.storjshare.io/raw/jushrcy4jw76ulj56fjxfvoaqe4a/athenax/ai/analysis.png" srcSet="https://link.storjshare.io/raw/jushrcy4jw76ulj56fjxfvoaqe4a/athenax/ai/analysis.png" alt="News" />
                            </picture>
                            {/* <img loading="lazy" src={analysis} alt="" /> */}
                        </div>
                        <div className="pt-6">
                            <CardTitle className="mb-2">Market Sentiment Analysis</CardTitle>
                            <CardSubtitle>Track real-time shifts in investor sentiment<br className="hidden md:block" /> and emerging trends across the crypto space</CardSubtitle>
                        </div>
                    </Card>
                </div>
            </CustomSection>

            <div className="overflow-hidden">
                <picture className="-z-10 absolute bottom-0 right-0 translate-y-1/2 w-36">
                    <source srcSet="https://link.storjshare.io/raw/jxd42k36bf5lur2q33lfh2ygm2ga/athenax/ai/half-circle.webp" type="image/webp" />
                    <source srcSet="https://link.storjshare.io/raw/juybhlhmexgrwqhzc7ib3wuk2haq/athenax/ai/half-circle.png" type="image/png" />
                    <img src="https://link.storjshare.io/raw/juybhlhmexgrwqhzc7ib3wuk2haq/athenax/ai/half-circle.png" srcSet="https://link.storjshare.io/raw/juybhlhmexgrwqhzc7ib3wuk2haq/athenax/ai/half-circle.png" alt="News" />
                </picture>
            </div>
        </div>
    )
} 