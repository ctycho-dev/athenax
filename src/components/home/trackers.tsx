import React, { ReactNode } from "react";
import CustomSection from "@/components/customSection";
import Button from "@/components/button";
import Title from '@/components/title'
import Subtitle from '@/components/subtitle'
import CardTitle from '@/components/cardTitle'
import CardSubtitle from "../cardSubtitle";
import Card from "@/components/card";


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
                    <picture>
                        <source srcSet="https://link.storjshare.io/raw/jujcl5faf3jlqephhuxtky7z23fa/athenax/trackers/watchlist-2x.webp 2x, https://link.storjshare.io/raw/jxzghtjfsdgc6ejrvasdd5i6nipa/athenax/trackers/watchlist-3x.webp 3x" type="image/webp" />
                        <source srcSet="https://link.storjshare.io/raw/jux7m2m7tltel4cuitin6tntuaqa/athenax/trackers/watchlist-2x.png 2x, https://link.storjshare.io/raw/juornzmluxygphi74loha4jgqkia/athenax/trackers/watchlist-3x.png 3x" type="image/png" />
                        <img src="https://link.storjshare.io/raw/juornzmluxygphi74loha4jgqkia/athenax/trackers/watchlist-3x.png" srcSet="https://link.storjshare.io/raw/jux7m2m7tltel4cuitin6tntuaqa/athenax/trackers/watchlist-2x.png 2x, https://link.storjshare.io/raw/juornzmluxygphi74loha4jgqkia/athenax/trackers/watchlist-3x.png 3x" alt="News" />
                    </picture>
                </Card>
                <Card className="col-span-12 md:col-span-6 p-6 md:p-10">
                    <div className="flex justify-center">
                        <picture>
                            <source srcSet="https://link.storjshare.io/raw/julcixio5bguwtgxcztz4ahzivra/athenax/trackers/notification.webp" type="image/webp" />
                            <source srcSet="https://link.storjshare.io/raw/jwblqdfmu3h5w4tvxr2w2og6vapq/athenax/trackers/notification.png" type="image/png" />
                            <img src="https://link.storjshare.io/raw/jwblqdfmu3h5w4tvxr2w2og6vapq/athenax/trackers/notification.png" srcSet="https://link.storjshare.io/raw/jwblqdfmu3h5w4tvxr2w2og6vapq/athenax/trackers/notification.png" alt="Notification" />
                        </picture>
                    </div>
                    <div className="pt-6">
                        <CardTitle className='mb-2'>Email & Web Notifications</CardTitle>
                        <CardSubtitle className="w-2/3">Receive key updates directly in your inbox or via browser notifications</CardSubtitle>
                    </div>
                </Card>
                <Card className="card-bg relative col-span-12 md:col-span-6 pl-6 md:pl-10 py-6 md:py-10 -z-10 flex flex-col justify-between">
                    <picture>
                        <source srcSet="https://link.storjshare.io/raw/jvdwm2lbjmixr2zywytu3poniobq/athenax/trackers/trends.webp" type="image/webp" />
                        <source srcSet="https://link.storjshare.io/raw/jvebd65vhsadwhmnhtqgzfejyhyq/athenax/trackers/trends.png" type="image/png" />
                        <img src="https://link.storjshare.io/raw/jvebd65vhsadwhmnhtqgzfejyhyq/athenax/trackers/trends.png" srcSet="https://link.storjshare.io/raw/jvebd65vhsadwhmnhtqgzfejyhyq/athenax/trackers/trends.png" alt="Notification" />
                    </picture>
                    <div className="pt-6">
                        <CardTitle className='mb-2'>Actionable Market Trends</CardTitle>
                        <CardSubtitle className="w-2/3">AI highlights trends, price movements, and potential opportunities</CardSubtitle>
                    </div>
                </Card>
            </div>
        </CustomSection>
    )
} 