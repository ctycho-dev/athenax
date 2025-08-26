import React from "react";
import CustomSection from "@/views/home/components/customSection";
import Button from "@/components/ui/button";
import Title from '@/views/home/components/title';
import Subtitle from '@/views/home/components/subtitle';
import CardTitle from '@/views/home/components/cardTitle';
import CardSubtitle from "@/views/home/components/cardSubtitle";
import Card from "@/views/home/components/card";

import vip from '@/assets/home/reports/vip.svg';
import { s3 } from "@/utils";  // import your s3 helper

interface ReportsProps {}

export const Reports: React.FC<ReportsProps> = () => {
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
                                <img loading="lazy" src={vip} alt="" />
                                <span className="text-black text-xs font-light">Requires premium subscription</span>
                            </button>
                        </div>
                    </Subtitle>
                </div>
                <div className="flex flex-col md:grid md:grid-cols-2 gap-6">
                    <Card className="p-6 md:p-10 flex flex-col justify-between">
                        <div className="flex justify-center">
                            <picture>
                                <source srcSet={s3("jwzs7c7fxiykxc3gurje4efqcnja/athenax/reports/trends.webp")} type="image/webp" />
                                <source srcSet={s3("jv3kx6pfyeaggcpiy4ojdmsqtfra/athenax/reports/trends.png")} type="image/png" />
                                <img
                                    src={s3("jv3kx6pfyeaggcpiy4ojdmsqtfra/athenax/reports/trends.png")}
                                    srcSet={s3("jv3kx6pfyeaggcpiy4ojdmsqtfra/athenax/reports/trends.png")}
                                    alt="Dashboard"
                                />
                            </picture>
                        </div>
                        <div className="pt-6">
                            <CardTitle className="mb-2">Expert Insights & Market Trends</CardTitle>
                            <CardSubtitle className="w-2/3">
                                Access quarterly reports with deep dives into blockchain ecosystems, tokenomics, and key market shifts
                            </CardSubtitle>
                        </div>
                    </Card>
                    <Card className="p-6 md:p-10 flex flex-col justify-between">
                        <div className="flex-1 flex justify-center overflow-hidden">
                            <video controls width="100%" autoPlay loop playsInline preload="true" muted className="scale-200 py-4">
                                <source src={s3("jvrfafnej3dpagurq6v2s6hso5na/athenax/reports/pro.webm")} type="video/webm" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                        <div className="pt-6">
                            <CardTitle className="mb-2">Exclusive Pro Membership</CardTitle>
                            <CardSubtitle className="w-2/3">
                                Get premium research and data-driven investment insights, tailored for traders, investors, and analysts
                            </CardSubtitle>
                        </div>
                    </Card>
                </div>
            </CustomSection>
            <picture className="-z-10 absolute left-0 top-0 -translate-y-1/3">
                <source srcSet={s3("jvnkzqyanj3jn4en7uwl57bh3wbq/athenax/reports/gradient.webp")} type="image/webp" />
                <source srcSet={s3("jvyywdwrn35su2fdrpkzowmchhna/athenax/reports/gradient.png")} type="image/png" />
                <img
                    src={s3("jvyywdwrn35su2fdrpkzowmchhna/athenax/reports/gradient.png")}
                    srcSet={s3("jvyywdwrn35su2fdrpkzowmchhna/athenax/reports/gradient.png")}
                    alt="Notification"
                />
            </picture>
        </div>
    );
};
