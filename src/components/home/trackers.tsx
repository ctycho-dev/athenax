import React, { ReactNode } from "react";
import CustomSection from "@/components/customSection";
import Button from "@/components/button";
import Title from '@/components/title'
import Subtitle from '@/components/subtitle'
import CardTitle from '@/components/cardTitle'
import CardSubtitle from "../cardSubtitle";
import Card from "@/components/card";

import watchlist1 from '@/assets/home/trackers/watchlist-1x.png'
import watchlist2 from '@/assets/home/trackers/watchlist-2x.png'
import watchlist3 from '@/assets/home/trackers/watchlist-3x.png'
import notification from '@/assets/home/trackers/notification.png'
import trends from '@/assets/home/trackers/trends.png'

interface TrackersProps { }

export const Trackers: React.FC<TrackersProps> = ({ }) => {

    return (
        <CustomSection>
            <div className="flex flex-col items-center justify-center">
                <Button className="mb-6">Trackers</Button>
                <Title className="mb-[8px]">Customized Crypto Trackers</Title>
                <Subtitle className="z-10 mb-[32px] md:mb-[48px]">
                    AI-curated daily or weekly summaries based on your watchlists
                </Subtitle>
            </div>
            <div className="grid grid-cols-12 gap-6">
                <Card className="relative col-span-12 pl-6 md:pl-10 py-6 md:py-10 flex flex-col-reverse md:flex-row justify-between md:items-end">
                    <div className="pt-6 min-w-[220px]">
                        <CardTitle className='mb-2'>Custom Watchlists</CardTitle>
                        <CardSubtitle>Track your favorite tokens, protocols,<br className="hidden md:block" />and DeFi projects in one place</CardSubtitle>
                    </div>
                    <div>
                        <img loading="lazy" src={watchlist3} alt="" srcSet={`${watchlist1} 1x, ${watchlist2} 2x, ${watchlist3} 3x`} />
                    </div>
                </Card>
                <Card className="col-span-12 md:col-span-6 p-6 md:p-10">
                    <div className="flex justify-center">
                        <img loading="lazy" src={notification} alt="" />
                    </div>
                    <div className="pt-6">
                        <CardTitle className='mb-2'>Email & Web Notifications</CardTitle>
                        <CardSubtitle className="w-2/3">Receive key updates directly in your inbox or via browser notifications</CardSubtitle>
                    </div>
                </Card>
                <Card className="card-bg relative col-span-12 md:col-span-6 pl-6 md:pl-10 py-6 md:py-10 -z-10 flex flex-col justify-between">
                    <img loading="lazy" src={trends} alt="" className="" />
                    <div className="pt-6">
                        <CardTitle className='mb-2'>Actionable Market Trends</CardTitle>
                        <CardSubtitle className="w-2/3">AI highlights trends, price movements, and potential opportunities</CardSubtitle>
                    </div>
                </Card>
            </div>
        </CustomSection>
    )
} 