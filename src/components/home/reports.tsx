import React, { useEffect } from "react";
import CustomSection from "@/components/customSection";
import Button from "@/components/button";
import Title from '@/components/title'
import Subtitle from '@/components/subtitle'
import CardTitle from '@/components/cardTitle'
import CardSubtitle from "../cardSubtitle";
import Card from "@/components/card";

import trends from '@/assets/home/reports/trends.png'
import gradient from '@/assets/home/reports-gradient.png'

import vip from '@/assets/home/reports/vip.svg'

interface ReportsProps { }


export const Reports: React.FC<ReportsProps> = ({ }) => {
    // useEffect(() => {
    //     const linkElement = document.querySelector('a[href="https://unicorn.studio?utm_source=public-url"][target="_blank"]');

    //     // Check if the element exists
    //     if (linkElement) {
    //         // Hide the element by setting display to none
    //         linkElement.style.display = 'none';
    //     } else {
    //         console.log('Element not found');
    //     }
    // }, [])

    return (
        <div className="relative">

            <CustomSection>
                <div className="flex flex-col items-center justify-center">
                    <Button className="mb-6">Reports</Button>
                    <Title className="mb-[8px]">Research Reports with Athena Pro</Title>
                    <Subtitle className="z-10 mb-[32px] md:mb-[48px]">
                        <div className="grid sm:flex gap-2 items-center">
                            <span>Access to quarterly reports</span>
                            <button type="button" className="flex items-center gap-x-2 py-2 px-4 rounded-md bg-light-gold-1 hover:bg-light-gold-2 hover:cursor-pointer">
                                <img src={vip} alt="" />
                                <span className="text-black text-xs font-light">Requires premium subscription</span>
                            </button>
                        </div>
                    </Subtitle>
                </div>
                <div className="flex flex-col md:grid md:grid-cols-2 gap-6">
                    <Card className="p-6 md:p-10 flex flex-col justify-between">
                        <div className="flex justify-center"><img src={trends} alt="" /></div>
                        <div className="pt-6">
                            <CardTitle className="mb-2">Expert Insights & Market Trends</CardTitle>
                            <CardSubtitle>Access quarterly reports with deep dives into blockchain<br />ecosystems, tokenomics, and key market shifts</CardSubtitle>
                        </div>
                    </Card>
                    <Card className="p-6 md:p-10 flex flex-col justify-between">
                        <div className="flex-1 flex justify-center overflow-hidden">
                            <iframe src="https://unicorn.studio/embed/ogeen1Qu7P7Q9noHiKtg"  loading="lazy" width={1200} height={290} className="scale-[185%]"></iframe>
                        </div>
                        <div className="pt-6">
                            <CardTitle className="mb-2">Expert Insights & Market Trends</CardTitle>
                            <CardSubtitle>Access quarterly reports with deep dives into blockchain<br />ecosystems, tokenomics, and key market shifts</CardSubtitle>
                        </div>
                    </Card>
                </div>
            </CustomSection>
            <div><img src={gradient} alt="" className="-z-10 absolute left-0 top-0 -translate-y-1/3" /></div>
        </div>
    )
} 