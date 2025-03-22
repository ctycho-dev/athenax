import React from "react";
import CustomSection from "@/components/customSection";
import Button from "@/components/button";
import Title from '@/components/title'
import Subtitle from '@/components/subtitle'
import CardTitle from '@/components/cardTitle'
import CardSubtitle from "../cardSubtitle";


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
                        <source srcSet="https://link.storjshare.io/raw/jw2scactzpq6d3lvr4hyymsnzyya/athenax/chart/chart-2x.webp 2x, https://link.storjshare.io/raw/jwnsx647s3ba6zjybncw5n5ndrxa/athenax/chart/chart-3x.webp 3x" type="image/webp" />
                        <source srcSet="https://link.storjshare.io/raw/jxdqeqvpwvkmt5ojxwcgvt5hcbaq/athenax/chart/chart-2x.png 2x, https://link.storjshare.io/raw/juuqcugrznt2l56do4ncrmpjgt7a/athenax/chart/chart-3x.png 3x" type="image/png" />
                        <img src="https://link.storjshare.io/raw/juuqcugrznt2l56do4ncrmpjgt7a/athenax/chart/chart-3x.png" srcSet="https://link.storjshare.io/raw/jxdqeqvpwvkmt5ojxwcgvt5hcbaq/athenax/chart/chart-2x.png 2x, https://link.storjshare.io/raw/juuqcugrznt2l56do4ncrmpjgt7a/athenax/chart/chart-3x.png 3x" alt="Chart" />
                    </picture>
                    {/* Mobile */}
                    <picture className="md:hidden mt-12 flex-1 w-full max-w-96 flex justify-center">
                        <source srcSet="https://link.storjshare.io/raw/jxfdevmuj4gzoyjwrxu7aia5p3za/athenax/chart/mchart-2x.webp 2x, https://link.storjshare.io/raw/jxzkn6vjgrfdeulmvt2yqybypcfq/athenax/chart/mchart-3x.webp 3x" type="image/webp" />
                        <source srcSet="https://link.storjshare.io/raw/jxdray46kzw7hagkfw2zhiqclgha/athenax/chart/mchart-2x.png 2x, https://link.storjshare.io/raw/jw4thu77cnd32zi743etzmczxmmq/athenax/chart/mchart-3x.png 3x" type="image/png" />
                        <img src="https://link.storjshare.io/raw/jw4thu77cnd32zi743etzmczxmmq/athenax/chart/mchart-3x.png" srcSet="https://link.storjshare.io/raw/jxdray46kzw7hagkfw2zhiqclgha/athenax/chart/mchart-2x.png 2x, https://link.storjshare.io/raw/jw4thu77cnd32zi743etzmczxmmq/athenax/chart/mchart-3x.png 3x" alt="Chart" />
                    </picture>
                </div>
            </div>
        </CustomSection>
    )
} 